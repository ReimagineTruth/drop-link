
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
    // STRICT Pi Browser requirement - block if not in Pi Browser
    if (!isPiBrowser) {
      console.log("Not in Pi Browser, blocking signup");
      toast({
        title: "Pi Browser Required",
        description: "You must use Pi Browser to sign up with Pi Network. Please open this app in Pi Browser.",
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
          description: "Could not authenticate with Pi Network. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Pi signup error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during Pi authentication.",
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
        email: `pi_${piAuthResult.user.uid}@pinetwork.user`,
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
            {!isPiBrowser && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800 font-medium">
                  ⚠️ Pi Browser Required for Registration
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  Please open this app in Pi Browser to sign up
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Button 
              type="button" 
              onClick={handlePiSignup}
              className="w-full bg-gradient-hero hover:bg-secondary flex items-center justify-center gap-2 mb-3"
              disabled={piAuthenticating || !isPiBrowser}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
              </svg>
              {!isPiBrowser 
                ? "Pi Browser Required" 
                : piAuthenticating 
                  ? "Authenticating..." 
                  : "Sign up with Pi Network"
              }
            </Button>
            
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
        </div>
      </main>
      <Footer />
      
      <PiBrowserDialog 
        redirectUrl="https://pinet.com/@droplink"
        showOnMount={!isPiBrowser}
      />
      
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
