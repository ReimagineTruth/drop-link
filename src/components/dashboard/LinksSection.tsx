
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { playSound, sounds } from '@/utils/sounds';
import { useUpgradeModal } from "@/hooks/useUpgradeModal";
import { useUserPlan } from "@/hooks/use-user-plan";
import { useIsMobile } from "@/hooks/use-mobile";
import ProfileUrlDisplay from "@/components/profile/ProfileUrlDisplay";
import EmptyLinksState from "./EmptyLinksState";
import LinksLoadingState from "./LinksLoadingState";
import LinkForm from "./LinkForm";
import LinkItem from "./LinkItem";
import AddLinkButton from "./AddLinkButton";
import MobileLinkCard from "@/components/mobile/MobileLinkCard";
import FloatingActionButton from "@/components/ui/floating-action-button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLinks } from "@/hooks/useLinks";
import { Button } from "@/components/ui/button";
import { Settings, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LinksSection = () => {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [previousLinkCount, setPreviousLinkCount] = useState(0);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showAllLinks, setShowAllLinks] = useState(false);
  const { user, profile } = useUser();
  const { links, isLoading, fetchLinks, handleReorderLink } = useLinks(user?.id);
  const { plan, limits } = useUserPlan();
  const { openUpgradeModal } = useUpgradeModal();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (profile?.username) {
      setProfileUrl(`https://droplink.space/@${profile.username}`);
    }
  }, [profile]);

  // Check if user has completed initial link setup
  useEffect(() => {
    // Only run this effect if links are loaded and not currently adding/editing
    if (!isLoading && links && previousLinkCount !== links.length) {
      // If user went from 0 to at least 1 link, consider setup complete
      if (previousLinkCount === 0 && links.length > 0) {
        playSound(sounds.setupComplete, 0.5);
        toast({
          title: "Setup Complete!",
          description: "Great job! You've added your first link.",
        });
      }
      
      // Update the previous count
      setPreviousLinkCount(links.length);
    }
  }, [links, isLoading, previousLinkCount]);

  const handleAddLinkClick = () => {
    // Check if user has reached their link limit
    if (links.length >= limits.maxLinks && plan === 'free') {
      openUpgradeModal("Adding more than 1 link");
      return;
    }
    
    setIsAddingLink(true);
  };

  const navigateToDomainSettings = () => {
    navigate('/settings/domains');
  };

  const displayedLinks = isMobile && !showAllLinks ? links.slice(0, 3) : links;
  const hasMoreLinks = isMobile && links.length > 3;

  const renderMobileLinks = () => {
    return (
      <div className="space-y-3">
        {displayedLinks.map((link, index) => (
          <MobileLinkCard
            key={link.id}
            link={link}
            onEdit={(linkId) => setIsEditingLink(linkId)}
            onDelete={fetchLinks}
            onReorder={handleReorderLink}
            isFirst={index === 0}
            isLast={index === displayedLinks.length - 1}
            compact={viewMode === 'grid'}
          />
        ))}
        
        {hasMoreLinks && !showAllLinks && (
          <Button 
            variant="outline" 
            onClick={() => setShowAllLinks(true)}
            className="w-full h-12 rounded-xl border-dashed"
          >
            Show {links.length - 3} more links
          </Button>
        )}
      </div>
    );
  };

  const renderDesktopLinks = () => {
    return (
      <div className="space-y-4">
        {links.map((link, index) => (
          <LinkItem
            key={link.id}
            link={link}
            onEdit={(linkId) => setIsEditingLink(linkId)}
            onDeleted={fetchLinks}
            onReorder={handleReorderLink}
            isFirst={index === 0}
            isLast={index === links.length - 1}
          />
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LinksLoadingState />;
    }
    
    if (!isAddingLink && links.length === 0) {
      return <EmptyLinksState onAddClick={handleAddLinkClick} />;
    }
    
    return (
      <div className="space-y-4">
        {isAddingLink && (
          <LinkForm 
            userId={user!.id} 
            onCancel={() => setIsAddingLink(false)}
            onSuccess={() => {
              setIsAddingLink(false);
              fetchLinks();
            }}
          />
        )}
        
        {isEditingLink && (
          <LinkForm 
            linkId={isEditingLink}
            userId={user!.id} 
            onCancel={() => setIsEditingLink(null)}
            onSuccess={() => {
              setIsEditingLink(null);
              fetchLinks();
            }}
            initialData={links.find(link => link.id === isEditingLink)}
          />
        )}
        
        {/* Mobile view controls */}
        {isMobile && links.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Your Links ({links.length})</h3>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {isMobile ? renderMobileLinks() : renderDesktopLinks()}
        
        {!isMobile && !isAddingLink && !isEditingLink && (
          <AddLinkButton onClick={handleAddLinkClick} />
        )}
        
        {/* Upgrade prompt for free users */}
        {plan === 'free' && links.length >= limits.maxLinks && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
            <p className="font-medium text-amber-800 mb-1">
              Free plan limited to {limits.maxLinks} link
            </p>
            <p className="text-sm text-amber-700 mb-3">
              Upgrade to Starter (8π/month) for unlimited links and more features
            </p>
            <button
              onClick={() => openUpgradeModal("unlimited links")}
              className="bg-gradient-hero text-white px-4 py-1 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Card className={isMobile ? "mx-4 rounded-2xl shadow-sm" : ""}>
        <CardHeader className={isMobile ? "flex flex-row items-center justify-between p-4" : "flex flex-row items-center justify-between"}>
          <div>
            <CardTitle className={isMobile ? "text-lg" : ""}>My Links</CardTitle>
            <CardDescription className={isMobile ? "text-sm" : ""}>
              Manage and organize all your links in one place
            </CardDescription>
          </div>
          {!isMobile && (
            <Button variant="outline" size="sm" onClick={navigateToDomainSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Domain Settings
            </Button>
          )}
        </CardHeader>
        <CardContent className={isMobile ? "p-4 pt-0" : ""}>
          <ProfileUrlDisplay 
            profileUrl={profileUrl} 
            username={profile?.username} 
            piDomain={profile?.pi_domain}
            customDomain={profile?.custom_domain}
          />
          
          {renderContent()}
        </CardContent>
      </Card>
      
      {/* Mobile floating action button */}
      {isMobile && !isAddingLink && !isEditingLink && (
        <FloatingActionButton
          onClick={handleAddLinkClick}
          icon="plus"
          label="Add Link"
        />
      )}
    </>
  );
};

export default LinksSection;
