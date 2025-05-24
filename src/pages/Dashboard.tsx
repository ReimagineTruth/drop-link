import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";

// Import dashboard components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewStats from "@/components/dashboard/OverviewStats";
import QuickActions from "@/components/dashboard/QuickActions";
import LinksSection from "@/components/dashboard/LinksSection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import SubscriptionManagement from "@/components/dashboard/SubscriptionManagement";
import LoginPrompt from "@/components/dashboard/LoginPrompt";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import SubscriptionDialog from "@/components/dashboard/SubscriptionDialog";
import UpgradeModal from "@/components/UpgradeModal";
import { UpgradeModalProvider } from "@/hooks/useUpgradeModal";
import ConsentPrompt from "@/components/auth/ConsentPrompt";
import { useConsentStatus } from "@/hooks/useConsentStatus";
import MetadataSettings from "@/components/dashboard/MetadataSettings";

// Import custom hooks
import { usePiPayment } from "@/hooks/usePiPayment";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    user, 
    profile, 
    subscription, 
    isLoading, 
    isLoggedIn,
    isAdmin,
    refreshUserData,
    cancelSubscription
  } = useUser();
  
  const [billingCycle, setBillingCycle] = useState('annual'); // 'annual' or 'monthly'
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [showConsentCheck, setShowConsentCheck] = useState(false);
  
  const { pageViews, linkClicks, conversionRate } = useAnalyticsData();
  const { processingPayment, handlePiLogin, handleSubscribe } = usePiPayment();
  const { hasConsented, isLoading: consentLoading, setConsent } = useConsentStatus();
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoading && !isLoggedIn) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }
    
    // Check consent status after login is confirmed
    if (isLoggedIn && !consentLoading && hasConsented === false) {
      setShowConsentCheck(true);
    }
  }, [isLoading, isLoggedIn, navigate, consentLoading, hasConsented]);
  
  const handleConsentAccepted = () => {
    setConsent(true);
    setShowConsentCheck(false);
  };

  const handleConsentDeclined = async () => {
    // If user declines consent from dashboard, log them out
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out after consent declined:", error);
    }
  };
  
  const handleCancelSubscriptionConfirm = async () => {
    const success = await cancelSubscription();
    if (success) {
      setConfirmCancelOpen(false);
    }
  };
  
  // Create a wrapper function that returns Promise<void> for LoginPrompt
  const handlePiLoginWrapper = async (): Promise<void> => {
    await handlePiLogin();
    // No return value, so TypeScript infers Promise<void>
  };
  
  if (isLoading || consentLoading) {
    return <DashboardLoading />;
  }
  
  return (
    <UpgradeModalProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Promotion banner for free users */}
            {isLoggedIn && profile && !subscription && !isAdmin && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg mb-6 shadow-md">
                <p className="text-center font-medium">
                  🔥 Unlock 10+ tools and remove ads. Start with Starter for just 8π/month!
                  <button 
                    className="ml-4 bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors"
                    onClick={() => navigate('/pricing')}
                  >
                    Upgrade Now
                  </button>
                </p>
              </div>
            )}
            
            {isLoggedIn && profile ? (
              <>
                <DashboardHeader 
                  username={profile.username} 
                  subscription={subscription} 
                />
                
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-5 mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="links">My Links</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <OverviewStats 
                      pageViews={pageViews} 
                      linkClicks={linkClicks} 
                      conversionRate={conversionRate} 
                    />
                    
                    <QuickActions 
                      subscription={subscription}
                      profile={profile}
                      navigate={navigate}
                      setConfirmCancelOpen={setConfirmCancelOpen}
                    />
                  </TabsContent>
                  
                  <TabsContent value="links">
                    <LinksSection />
                  </TabsContent>
                  
                  <TabsContent value="metadata">
                    <MetadataSettings />
                  </TabsContent>
                  
                  <TabsContent value="analytics">
                    <AnalyticsSection subscription={subscription} />
                  </TabsContent>
                  
                  <TabsContent value="subscription">
                    <SubscriptionManagement 
                      subscription={subscription}
                      handleSubscribe={(plan: string) => handleSubscribe(plan, billingCycle)}
                      processingPayment={processingPayment}
                      setConfirmCancelOpen={setConfirmCancelOpen}
                    />
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <LoginPrompt handlePiLogin={handlePiLoginWrapper} />
            )}
          </div>
        </main>
        <Footer />
        
        {/* Subscription Cancellation Dialog */}
        <SubscriptionDialog 
          confirmCancelOpen={confirmCancelOpen}
          setConfirmCancelOpen={setConfirmCancelOpen}
          handleCancelSubscriptionConfirm={handleCancelSubscriptionConfirm}
        />
        
        {/* Consent Check Dialog */}
        {profile && showConsentCheck && (
          <ConsentPrompt
            isOpen={showConsentCheck}
            username={profile.username || "User"}
            onAccept={handleConsentAccepted}
            onDecline={handleConsentDeclined}
          />
        )}
      </div>
    </UpgradeModalProvider>
  );
};

export default Dashboard;
