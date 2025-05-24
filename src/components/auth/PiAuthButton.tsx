
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { authenticateWithPi, initPiNetwork } from "@/services/piPaymentService";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";
import ConsentPrompt from "@/components/auth/ConsentPrompt";

export function PiAuthButton() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);
  const [piAuthResult, setPiAuthResult] = useState<any>(null);
  const navigate = useNavigate();
  const { refreshUserData } = useUser();
  const isPiBrowser = isRunningInPiBrowser();

  console.log("PiAuthButton - isPiBrowser:", isPiBrowser);

  // Initialize Pi SDK when component mounts
  useEffect(() => {
    initPiNetwork();
  }, []);

  const handlePiAuth = async () => {
    // If not in Pi Browser, show a toast and open the dialog
    if (!isPiBrowser) {
      console.log("Not in Pi Browser, showing toast and opening dialog");
      toast({
        title: "Pi Browser Required",
        description: "Please open this page in the Pi Browser to authenticate with Pi Network",
        variant: "destructive",
      });
      
      // Dispatch custom event to open the dialog
      window.dispatchEvent(new CustomEvent('open-pi-browser-dialog'));
      return;
    }
    
    try {
      setIsAuthenticating(true);
      const authResult = await authenticateWithPi(["username", "payments", "wallet_address"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        
        // Set the auth result and show consent prompt
        setPiAuthResult(authResult);
        setShowConsentPrompt(true);
      } else {
        toast({
          title: "Authentication Failed",
          description: "Could not authenticate with Pi Network. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Pi authentication error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during Pi authentication.",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
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
        // User exists, sign them in with Pi credentials
        const { data, error } = await supabase.auth.signInWithPassword({
          email: `pi_${piAuthResult.user.uid}@pinetwork.user`,
          password: piAuthResult.user.uid
        });
        
        if (error) {
          throw error;
        }
        
        // Refresh user data
        await refreshUserData();
        
        toast({
          title: "Authentication Successful",
          description: `Welcome back, @${piAuthResult.user.username || "Pioneer"}!`,
        });
        
        setShowConsentPrompt(false);
        
        // Always redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        // User doesn't exist, redirect to signup
        toast({
          title: "Account Not Found",
          description: "Please sign up to create an account",
        });
        setShowConsentPrompt(false);
        navigate('/signup');
      }
    } catch (error) {
      console.error("Error after consent:", error);
      toast({
        title: "Error",
        description: "An error occurred while processing your information",
        variant: "destructive",
      });
    }
  };

  const handleConsentDeclined = async () => {
    // If user declines, logout and redirect to home
    try {
      await supabase.auth.signOut();
      toast({
        title: "Consent Declined",
        description: "You've declined to share your information. You've been logged out.",
        variant: "destructive",
      });
      setShowConsentPrompt(false);
      navigate('/');
    } catch (error) {
      console.error("Error signing out after consent declined:", error);
    }
  };

  return (
    <>
      <Button 
        onClick={handlePiAuth}
        className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2 mb-3"
        disabled={isAuthenticating}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
        </svg>
        {isAuthenticating ? "Authenticating..." : "Sign in with Pi Network"}
      </Button>
      
      {piAuthResult && (
        <ConsentPrompt
          isOpen={showConsentPrompt}
          username={piAuthResult.user.username || "Pioneer"}
          onAccept={handleConsentAccepted}
          onDecline={handleConsentDeclined}
        />
      )}
    </>
  );
}
