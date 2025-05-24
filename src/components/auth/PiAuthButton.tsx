
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
    const initialized = initPiNetwork();
    console.log("Pi SDK initialization in PiAuthButton:", initialized);
  }, []);

  const handlePiAuth = async () => {
    // STRICT Pi Browser requirement - block if not in Pi Browser
    if (!isPiBrowser) {
      console.log("Not in Pi Browser, blocking authentication");
      toast({
        title: "Pi Browser Required",
        description: "You must use Pi Browser to authenticate with Pi Network. Please open this app in Pi Browser.",
        variant: "destructive",
      });
      
      // Dispatch custom event to open the dialog
      window.dispatchEvent(new CustomEvent('open-pi-browser-dialog'));
      return;
    }
    
    try {
      setIsAuthenticating(true);
      console.log("Starting Pi authentication...");
      
      const authResult = await authenticateWithPi(["username", "payments", "wallet_address"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        
        // Store Pi auth data
        localStorage.setItem('pi_access_token', authResult.accessToken);
        localStorage.setItem('pi_user_id', authResult.user.uid);
        localStorage.setItem('pi_username', authResult.user.username || '');
        
        // Set the auth result and show consent prompt
        setPiAuthResult(authResult);
        setShowConsentPrompt(true);
      } else {
        console.error("Pi authentication failed - no user data returned");
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
        description: error instanceof Error ? error.message : "An error occurred during Pi authentication.",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleConsentAccepted = async () => {
    try {
      if (!piAuthResult?.user) {
        console.error("No Pi auth result available");
        return;
      }
      
      console.log("Processing consent acceptance for user:", piAuthResult.user.uid);
      
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', piAuthResult.user.uid)
        .maybeSingle();
        
      if (existingUser) {
        console.log("Existing user found, signing in");
        
        // User exists, sign them in with Pi credentials
        const { data, error } = await supabase.auth.signInWithPassword({
          email: `pi_${piAuthResult.user.uid}@pinetwork.user`,
          password: piAuthResult.user.uid
        });
        
        if (error) {
          console.error("Supabase sign in error:", error);
          throw error;
        }
        
        console.log("Successfully signed in existing user");
        
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
        console.log("User not found, redirecting to signup");
        
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
    console.log("User declined consent");
    
    // Clear Pi auth data
    localStorage.removeItem('pi_access_token');
    localStorage.removeItem('pi_user_id');
    localStorage.removeItem('pi_username');
    
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
        disabled={isAuthenticating || !isPiBrowser}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
        </svg>
        {!isPiBrowser 
          ? "Pi Browser Required" 
          : isAuthenticating 
            ? "Authenticating..." 
            : "Sign in with Pi Network"
        }
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
