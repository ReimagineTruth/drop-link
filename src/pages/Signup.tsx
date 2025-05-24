
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { authenticateWithPi, initPiNetwork } from "@/services/piPaymentService";
import { supabase } from "@/integrations/supabase/client";
import PiBrowserPrompt from "@/components/PiBrowserPrompt";
import PiBrowserDialog from "@/components/PiBrowserDialog";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";
import ConsentPrompt from "@/components/auth/ConsentPrompt";
import TestLogin from "@/components/auth/TestLogin";

const Signup = () => {
  const [piAuthenticating, setPiAuthenticating] = useState(false);
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);
  const [piAuthResult, setPiAuthResult] = useState<any>(null);
  const navigate = useNavigate();
  const isPiBrowser = isRunningInPiBrowser();

  // Initialize Pi SDK on component mount
  useEffect(() => {
    // Initialize Pi Network SDK
    const initialized = initPiNetwork();
    console.log("Pi SDK initialization status:", initialized);
    
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log("User already logged in, redirecting to dashboard");
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const handlePiSignup = async () => {
    // Show test mode notice for easier bypass
    toast({
      title: "Pi Signup",
      description: "Use the Test Signup below for easier testing without Pi Browser",
      variant: "default",
    });
    
    // If not in Pi Browser, show a toast and open the dialog
    if (!isPiBrowser) {
      console.log("Not in Pi Browser, showing toast and opening dialog");
      toast({
        title: "Pi Browser Required",
        description: "Please use Test Signup below for testing, or open in Pi Browser for real signup",
        variant: "destructive",
      });
      
      // Dispatch custom event to open the dialog
      window.dispatchEvent(new CustomEvent('open-pi-browser-dialog'));
      return;
    }
    
    try {
      setPiAuthenticating(true);
      const authResult = await authenticateWithPi(["username"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful:", authResult);
        
        // Set auth result and show consent prompt
        setPiAuthResult(authResult);
        setShowConsentPrompt(true);
      } else {
        toast({
          title: "Authentication Failed",
          description: "Could not authenticate with Pi Network. Try Test Signup below.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Pi signup error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during Pi authentication. Use Test Signup for testing.",
        variant: "destructive",
      });
    } finally {
      setPiAuthenticating(false);
    }
  };
  
  const handleConsentAccepted = async () => {
    try {
      if (!piAuthResult?.user) return;
      
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('username', piAuthResult.user.username)
        .maybeSingle();
        
      if (existingUser) {
        // User already exists, sign them in instead
        toast({
          title: "Account Already Exists",
          description: "Signing you in with your existing account",
        });
        navigate('/dashboard');
        return;
      }
      
      // Create a random password for the Pi user
      const randomPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
      
      // Use Supabase Auth to create a new user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: `pi_${piAuthResult.user.uid}@pinetwork.user`, // Create a placeholder email
        password: randomPassword,
        options: {
          data: {
            username: piAuthResult.user.username,
            pi_uid: piAuthResult.user.uid
          }
        }
      });
      
      if (authError) {
        throw new Error(authError.message);
      }
      
      // Create a user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: piAuthResult.user.uid,
          username: piAuthResult.user.username,
          display_name: piAuthResult.user.username
        });
        
      if (profileError) {
        console.error("Error creating profile:", profileError);
      }
      
      toast({
        title: "Pi Authentication Successful",
        description: `Welcome, @${piAuthResult.user.username || "Pioneer"}! You're now registered with Pi Network.`,
      });
      
      // Redirect to dashboard
      setShowConsentPrompt(false);
      navigate('/dashboard');
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
    // If user declines during signup, just return to home
    toast({
      title: "Consent Declined",
      description: "You need to accept the data sharing terms to use Droplink with Pi Network.",
      variant: "destructive",
    });
    setShowConsentPrompt(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Create Your Droplink</h1>
            <p className="text-gray-600 mt-2">Join our community on Pi Network</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Button 
              type="button" 
              onClick={handlePiSignup}
              className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2 mb-3"
              disabled={piAuthenticating}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
              </svg>
              {piAuthenticating ? "Authenticating..." : "Sign up with Pi Network"}
            </Button>
            
            <div className="text-center text-sm text-gray-500 mb-4">
              or use Test Signup below for development testing
            </div>
            
            {!isPiBrowser && <PiBrowserPrompt />}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          
          {/* Test Login Component with signup context */}
          <TestLogin />
        </div>
      </main>
      <Footer />
      
      {/* Pi Browser Dialog - will only show if not in Pi Browser */}
      <PiBrowserDialog 
        redirectUrl="https://pinet.com/@droplink"
      />
      
      {/* Consent prompt */}
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
};

export default Signup;
