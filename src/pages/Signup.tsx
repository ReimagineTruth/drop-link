
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
      console.log("Starting Pi signup authentication...");
      
      const authResult = await authenticateWithPi(["username", "payments", "wallet_address"]);
      
      if (authResult?.user) {
        console.log("Pi authentication successful for signup:", authResult);
        
        // Store Pi auth data
        localStorage.setItem('pi_access_token', authResult.accessToken);
        localStorage.setItem('pi_user_id', authResult.user.uid);
        localStorage.setItem('pi_username', authResult.user.username || '');
        
        // Set auth result and show consent prompt
        setPiAuthResult(authResult);
        setShowConsentPrompt(true);
      } else {
        console.error("Pi signup authentication failed - no user data returned");
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
        description: error instanceof Error ? error.message : "An error occurred during Pi authentication.",
        variant: "destructive",
      });
    } finally {
      setPiAuthenticating(false);
    }
  };
  
  const handleConsentAccepted = async () => {
    try {
      if (!piAuthResult?.user) {
        console.error("No Pi auth result available for signup");
        return;
      }
      
      console.log("Processing signup consent for user:", piAuthResult.user.uid);
      
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', piAuthResult.user.uid)
        .maybeSingle();
        
      if (existingUser) {
        console.log("User already exists, signing them in instead");
        
        // User already exists, sign them in instead
        const { data, error } = await supabase.auth.signInWithPassword({
          email: `pi_${piAuthResult.user.uid}@pinetwork.user`,
          password: piAuthResult.user.uid
        });
        
        if (error) {
          console.error("Supabase sign in error for existing user:", error);
          throw error;
        }
        
        toast({
          title: "Account Already Exists",
          description: "Signing you in with your existing account",
        });
        setShowConsentPrompt(false);
        navigate('/dashboard');
        return;
      }
      
      console.log("Creating new user account");
      
      // Create a secure password for the Pi user
      const securePassword = `${piAuthResult.user.uid}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      
      // Use Supabase Auth to create a new user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: `pi_${piAuthResult.user.uid}@pinetwork.user`,
        password: securePassword,
        options: {
          data: {
            username: piAuthResult.user.username,
            pi_uid: piAuthResult.user.uid,
            auth_method: 'pi_network'
          }
        }
      });
      
      if (authError) {
        console.error("Supabase auth signup error:", authError);
        throw new Error(authError.message);
      }
      
      console.log("Supabase auth user created:", authData.user?.id);
      
      // Create a user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: piAuthResult.user.uid,
          username: piAuthResult.user.username,
          display_name: piAuthResult.user.username,
          auth_method: 'pi_network'
        });
        
      if (profileError) {
        console.error("Error creating user profile:", profileError);
        // Don't throw here as the auth user was created successfully
      } else {
        console.log("User profile created successfully");
      }
      
      toast({
        title: "Pi Registration Successful",
        description: `Welcome, @${piAuthResult.user.username || "Pioneer"}! You're now registered with Pi Network.`,
      });
      
      // Redirect to dashboard
      setShowConsentPrompt(false);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error after signup consent:", error);
      toast({
        title: "Signup Error",
        description: error instanceof Error ? error.message : "An error occurred while creating your account",
        variant: "destructive",
      });
    }
  };

  const handleConsentDeclined = async () => {
    console.log("User declined signup consent");
    
    // Clear Pi auth data
    localStorage.removeItem('pi_access_token');
    localStorage.removeItem('pi_user_id');
    localStorage.removeItem('pi_username');
    
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
            
            {/* Enhanced Pi Browser requirement notice */}
            {!isPiBrowser && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-red-800">Pi Browser Required</span>
                </div>
                <p className="text-sm text-red-700">
                  Registration with Pi Network is only available in Pi Browser. Please open this app in Pi Browser to sign up.
                </p>
              </div>
            )}
            
            {isPiBrowser && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-green-800">Pi Browser Detected</span>
                </div>
                <p className="text-sm text-green-700">
                  Perfect! You can now register with Pi Network.
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
