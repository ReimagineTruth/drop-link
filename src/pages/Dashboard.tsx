import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  
  const [billingCycle, setBillingCycle] = useState('annual');
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [showConsentCheck, setShowConsentCheck] = useState(false);
  
  const { pageViews, linkClicks, conversionRate } = useAnalyticsData();
  const { processingPayment, handlePiLogin, handleSubscribe } = usePiPayment();
  const { hasConsented, isLoading: consentLoading, setConsent } = useConsentStatus();
  const isMobile = useIsMobile();
  
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
      <div className="min-h-screen flex flex-col bg-gray-50/50">
        <Navbar />
        <main className={cn(
          "flex-grow",
          isMobile ? "pb-20" : "py-12 px-6"
        )}>
          <div className={cn(
            "container mx-auto",
            isMobile ? "px-0" : "max-w-6xl"
          )}>
            {/* Promotion banner for free users */}
            {isLoggedIn && profile && !subscription && !isAdmin && (
              <div className={cn(
                "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md mb-6",
                isMobile ? "mx-4 p-3 rounded-xl text-sm" : "p-4 rounded-lg"
              )}>
                <p className={cn(
                  "text-center font-medium",
                  isMobile ? "text-sm" : ""
                )}>
                  🔥 Unlock 10+ tools and remove ads. Start with Starter for just 8π/month!
                  <button 
                    className={cn(
                      "bg-white text-blue-600 px-4 py-1 rounded-full font-bold hover:bg-blue-50 transition-colors",
                      isMobile ? "ml-2 text-xs" : "ml-4 text-sm"
                    )}
                    onClick={() => navigate('/pricing')}
                  >
                    Upgrade Now
                  </button>
                </p>
              </div>
            )}
            
            {isLoggedIn && profile ? (
              <>
                {!isMobile && (
                  <DashboardHeader 
                    username={profile.username} 
                    subscription={subscription} 
                  />
                )}
                
                <Tabs defaultValue="overview" className={isMobile ? "w-full" : ""}>
                  <TabsList className={cn(
                    "mb-8",
                    isMobile 
                      ? "grid w-full grid-cols-3 mx-4 h-12 rounded-xl bg-white shadow-sm" 
                      : "grid w-full grid-cols-5"
                  )}>
                    <TabsTrigger value="overview" className={isMobile ? "text-xs" : ""}>
                      {isMobile ? "Overview" : "Overview"}
                    </TabsTrigger>
                    <TabsTrigger value="links" className={isMobile ? "text-xs" : ""}>
                      {isMobile ? "Links" : "My Links"}
                    </TabsTrigger>
                    {!isMobile && <TabsTrigger value="metadata">Metadata</TabsTrigger>}
                    {!isMobile && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
                    <TabsTrigger value="subscription" className={isMobile ? "text-xs" : ""}>
                      {isMobile ? "Plan" : "Subscription"}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className={isMobile ? "mt-4" : ""}>
                    {!isMobile && (
                      <OverviewStats 
                        pageViews={pageViews} 
                        linkClicks={linkClicks} 
                        conversionRate={conversionRate} 
                      />
                    )}
                    
                    <QuickActions 
                      subscription={subscription}
                      profile={profile}
                      navigate={navigate}
                      setConfirmCancelOpen={setConfirmCancelOpen}
                    />
                  </TabsContent>
                  
                  <TabsContent value="links" className={isMobile ? "mt-4" : ""}>
                    <LinksSection />
                  </TabsContent>
                  
                  {!isMobile && (
                    <>
                      <TabsContent value="metadata">
                        <MetadataSettings />
                      </TabsContent>
                      
                      <TabsContent value="analytics">
                        <AnalyticsSection subscription={subscription} />
                      </TabsContent>
                    </>
                  )}
                  
                  <TabsContent value="subscription" className={isMobile ? "mt-4" : ""}>
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
        {!isMobile && <Footer />}
        
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
