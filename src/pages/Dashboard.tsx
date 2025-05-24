
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LinksSection from "@/components/dashboard/LinksSection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import MetadataSettings from "@/components/dashboard/MetadataSettings";
import LoginPrompt from "@/components/dashboard/LoginPrompt";
import { authenticateWithPi } from "@/services/piPaymentService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ConsentPrompt from "@/components/auth/ConsentPrompt";

const Dashboard = () => {
  const { profile, subscription, isLoading: userLoading, refreshUserData } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);
  const [piAuthResult, setPiAuthResult] = useState<any>(null);
  const navigate = useNavigate();

  // Check for test session to bypass Pi authentication
  const getTestUserSession = () => {
    try {
      const testSession = localStorage.getItem('test_user_session');
      if (testSession) {
        const parsedSession = JSON.parse(testSession);
        if (parsedSession.session.expires_at > Date.now()) {
          console.log("🧪 Test session found - bypassing Pi auth");
          return parsedSession;
        } else {
          localStorage.removeItem('test_user_session');
        }
      }
    } catch (error) {
      console.error('Error parsing test session:', error);
      localStorage.removeItem('test_user_session');
    }
    return null;
  };

  useEffect(() => {
    const checkAuthAndLoadDashboard = async () => {
      // Check for test session first
      const testSession = getTestUserSession();
      if (testSession) {
        console.log("🚀 Test mode active - dashboard access granted");
        setIsLoading(false);
        return;
      }

      // Check Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("User authenticated via Supabase");
        setIsLoading(false);
        return;
      }

      // If no valid session found, show loading state but allow test login
      console.log("No authentication found, showing login prompt");
      setIsLoading(false);
    };

    checkAuthAndLoadDashboard();
  }, []);

  const handlePiLogin = async () => {
    try {
      const authResult = await authenticateWithPi(["username", "payments", "wallet_address"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        setPiAuthResult(authResult);
        setShowConsentPrompt(true);
      } else {
        toast({
          title: "Authentication Failed",
          description: "Could not authenticate with Pi Network",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Pi authentication error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during Pi authentication",
        variant: "destructive",
      });
    }
  };

  const handleConsentAccepted = async () => {
    try {
      if (!piAuthResult?.user) return;
      
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', piAuthResult.user.uid)
        .maybeSingle();
        
      if (existingUser) {
        // User exists, sign them in
        const { error } = await supabase.auth.signInWithPassword({
          email: `pi_${piAuthResult.user.uid}@pinetwork.user`,
          password: piAuthResult.user.uid
        });
        
        if (error) throw error;
        
        await refreshUserData();
        toast({
          title: "Authentication Successful",
          description: `Welcome back, @${piAuthResult.user.username}!`,
        });
      } else {
        // Redirect to signup if user doesn't exist
        navigate('/signup');
        return;
      }
      
      setShowConsentPrompt(false);
    } catch (error) {
      console.error("Error after consent:", error);
      toast({
        title: "Error",
        description: "An error occurred while processing your information",
        variant: "destructive",
      });
    }
  };

  const handleConsentDeclined = () => {
    setShowConsentPrompt(false);
    toast({
      title: "Consent Declined",
      description: "You need to accept the terms to continue",
      variant: "destructive",
    });
  };

  // Check if user is authenticated (either via Supabase or test session)
  const isAuthenticated = () => {
    const testSession = getTestUserSession();
    return testSession || profile;
  };

  if (userLoading || isLoading) {
    return <DashboardLoading />;
  }

  // Show login prompt only if not authenticated and no test session
  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <LoginPrompt handlePiLogin={handlePiLogin} />
          </div>
        </main>
        <Footer />
        
        {piAuthResult && (
          <ConsentPrompt
            isOpen={showConsentPrompt}
            username={piAuthResult.user.username || "Pioneer"}
            onAccept={handleConsentAccepted}
            onDecline={handleConsentDeclined}
          />
        )}
      </div>
    );
  }

  // If authenticated (either via profile or test session), show dashboard
  const testSession = getTestUserSession();
  const displayName = testSession ? testSession.user.username : profile?.username;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <DashboardHeader 
            username={displayName || null} 
            subscription={subscription || null} 
          />
          
          {testSession && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-green-800 font-medium">🧪 Test Mode Active</span>
                <span className="text-green-700">
                  Logged in as {displayName} with {testSession.testPlan} access
                </span>
              </div>
            </div>
          )}
          
          <LinksSection />
          <AnalyticsSection subscription={subscription || null} />
          <MetadataSettings />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
