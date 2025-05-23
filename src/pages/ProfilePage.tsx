
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PiAdsNetwork from "@/components/PiAdsNetwork";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createPiPayment } from "@/services/piPaymentService";
import { Helmet } from "react-helmet-async";
import { getUserTemplate } from "@/services/templateService";

// Import refactored components
import ThemeVariants from "@/components/profile/ThemeVariants";
import LoadingState from "@/components/profile/LoadingState";
import ErrorState from "@/components/profile/ErrorState";
import TipModal from "@/components/profile/TipModal";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
  type?: "featured" | "social" | "regular";
}

interface ProfileData {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  theme?: any;
  links: Link[];
}

const ProfilePage = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [processingTip, setProcessingTip] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  
  const { user, showAds } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        if (!username) {
          setError("User not found");
          setLoading(false);
          return;
        }
        
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();
        
        if (profileError || !profileData) {
          setError("User profile not found");
          setLoading(false);
          return;
        }
        
        // Fetch user's template
        const userTemplate = await getUserTemplate(profileData.id);
        
        // Fetch links data
        const { data: linksData, error: linksError } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', profileData.id)
          .eq('is_active', true)
          .order('position', { ascending: true });
        
        if (linksError) {
          console.error("Failed to fetch links:", linksError);
        }
        
        // Register page view in analytics
        if (profileData.id) {
          await supabase
            .from('analytics')
            .insert({
              user_id: profileData.id,
              page_view: true,
              referrer: document.referrer,
              user_agent: navigator.userAgent,
            })
            .select();
        }
        
        // Process links to categorize them
        const processedLinks = linksData ? linksData.map(link => {
          let type: "featured" | "social" | "regular" | undefined = undefined;
          
          if (
            link.url.includes('instagram.com') ||
            link.url.includes('twitter.com') ||
            link.url.includes('facebook.com') ||
            link.url.includes('linkedin.com') ||
            link.url.includes('youtube.com') ||
            link.icon.toLowerCase() === 'instagram' ||
            link.icon.toLowerCase() === 'twitter' ||
            link.icon.toLowerCase() === 'facebook' ||
            link.icon.toLowerCase() === 'linkedin' ||
            link.icon.toLowerCase() === 'youtube'
          ) {
            type = "social";
          } else if (linksData.indexOf(link) < 2) {
            type = "featured";
          } else {
            type = "regular";
          }
          
          return { ...link, type };
        }) : [];
        
        // Default links if none found
        const defaultLinks = [
          { id: 'default-1', title: "Tip in Pi", url: "#tip-in-pi", icon: "💰", clicks: 0 },
        ];
        
        setProfileData({
          ...profileData,
          theme: userTemplate || 'linktree',
          links: processedLinks && processedLinks.length > 0 ? processedLinks : defaultLinks,
        });
        
        setLoading(false);
        
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [username]);

  const handleLinkClick = async (link: Link) => {
    // Handle tip link specially
    if (link.url === "#tip-in-pi") {
      handleTipClick();
      return;
    }

    // Register link click in analytics
    if (profileData?.id) {
      try {
        // Update click count
        await supabase
          .from('links')
          .update({ clicks: link.clicks + 1 })
          .eq('id', link.id)
          .select();
        
        // Register analytics
        await supabase
          .from('analytics')
          .insert({
            user_id: profileData.id,
            link_id: link.id,
            link_click: true,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
          })
          .select();
          
        // Open the URL
        window.open(link.url, '_blank');
      } catch (err) {
        console.error("Failed to register link click:", err);
      }
    }
  };

  const handleTipSubmit = async (amount: number, message: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to send a tip",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setProcessingTip(true);
    
    try {
      const paymentData = {
        amount: amount,
        memo: message || `Tip to @${profileData?.username}`,
        metadata: {
          recipientId: profileData?.id,
          type: 'tip',
          message: message
        }
      };
      
      await createPiPayment(paymentData, user);
      
      toast({
        title: "Sending Tip",
        description: "Follow the Pi payment flow to complete your tip",
      });
      
      setShowTipModal(false);
    } catch (error) {
      console.error("Tip error:", error);
      toast({
        title: "Tip failed",
        description: "There was an error processing your tip",
        variant: "destructive",
      });
    } finally {
      setProcessingTip(false);
    }
  };

  const handleTipClick = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to send a tip",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setShowTipModal(true);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profileData) {
    return <ErrorState username={username} />;
  }

  const profileUrl = `https://droplink.space/@${profileData.username}`;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{profileData.display_name || `@${profileData.username}`} | Droplink</title>
        <meta name="description" content={profileData.bio || `Check out ${profileData.username}'s profile on Droplink`} />
        <meta property="og:title" content={`${profileData.display_name || `@${profileData.username}`} | Droplink`} />
        <meta property="og:description" content={profileData.bio || `Check out ${profileData.username}'s profile on Droplink`} />
        <meta property="og:image" content={profileData.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profileData.username}`} />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:type" content="profile" />
      </Helmet>
      
      {showAds && (
        <div className="mx-4 mb-4">
          <PiAdsNetwork placementId="profile-page" />
        </div>
      )}
      
      <ThemeVariants
        theme={profileData.theme}
        links={profileData.links}
        onLinkClick={handleLinkClick}
        username={profileData.username}
        displayName={profileData.display_name}
        bio={profileData.bio}
        avatarUrl={profileData.avatar_url}
      />
      
      <TipModal
        isOpen={showTipModal}
        onOpenChange={setShowTipModal}
        username={profileData.username}
        onSubmit={handleTipSubmit}
        isProcessing={processingTip}
      />
    </div>
  );
};

export default ProfilePage;
