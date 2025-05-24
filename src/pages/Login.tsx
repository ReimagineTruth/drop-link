
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { PiAuthButton } from "@/components/auth/PiAuthButton";
import { initPiNetwork } from "@/services/piPaymentService";
import PiBrowserPrompt from "@/components/PiBrowserPrompt";
import PiBrowserDialog from "@/components/PiBrowserDialog";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, AlertTriangle, CheckCircle, Shield, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const isPiBrowser = isRunningInPiBrowser();
  
  console.log("Login page - isPiBrowser:", isPiBrowser, "isLoggedIn:", isLoggedIn);
  console.log("User agent:", navigator.userAgent);
  console.log("Pi SDK available:", !!window.Pi);

  useEffect(() => {
    // Initialize Pi Network SDK
    const initialized = initPiNetwork();
    console.log("Pi SDK initialization status:", initialized);
    
    // Check if user is already logged in
    if (isLoggedIn) {
      console.log("User is already logged in, redirecting to dashboard");
      navigate('/dashboard');
    }

    // Block external login attempts
    if (!isPiBrowser) {
      console.log("⚠️ External login attempt blocked - Pi Browser required");
      toast({
        title: "Access Restricted",
        description: "Login is only allowed through Pi Browser for security reasons.",
        variant: "destructive",
      });
    }
  }, [isLoggedIn, navigate, isPiBrowser]);

  const handleDownloadPiBrowser = () => {
    console.log("Redirecting to Pi Browser download");
    window.open('https://minepi.com/download', '_blank');
  };

  const handleOpenInPiBrowser = () => {
    const currentUrl = window.location.href;
    console.log("Attempting to open in Pi Browser:", currentUrl);
    
    // Try multiple Pi Browser protocols
    const protocols = [
      `pi://browser?url=${encodeURIComponent(currentUrl)}`,
      `pibrowser://open?url=${encodeURIComponent(currentUrl)}`,
      `https://pinet.com/@droplink`
    ];
    
    protocols.forEach((protocol, index) => {
      setTimeout(() => {
        if (index === protocols.length - 1) {
          window.open(protocol, '_blank');
        } else {
          window.location.href = protocol;
        }
      }, index * 500);
    });
  };

  // Block any external authentication attempts
  const blockExternalAuth = () => {
    console.log("🚫 External authentication attempt blocked");
    toast({
      title: "Authentication Blocked",
      description: "For security reasons, authentication is only allowed through Pi Browser.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your Droplink</p>
            
            {/* Enhanced Pi Browser Status Display */}
            <div className="mt-6">
              {isPiBrowser ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <span className="font-semibold text-green-800">Pi Browser Detected</span>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Perfect! You're using Pi Browser and can access all features including Pi Network authentication.
                  </p>
                  <div className="text-xs text-green-600 bg-green-100 rounded p-2">
                    ✓ Pi SDK Available<br/>
                    ✓ Secure Authentication<br/>
                    ✓ Pi Payments Ready
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-center mb-3">
                    <Shield className="h-6 w-6 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">External Browser Detected</span>
                  </div>
                  <p className="text-sm text-red-700 mb-4">
                    For security reasons, authentication is restricted to Pi Browser only. Please use Pi Browser to sign in.
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleOpenInPiBrowser}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in Pi Browser
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={handleDownloadPiBrowser}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Pi Browser
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-xs text-red-600 bg-red-100 rounded p-2">
                    <strong>Security Notice:</strong><br/>
                    • Authentication blocked on external browsers<br/>
                    • Pi Browser required for secure login<br/>
                    • Protection against unauthorized access<br/>
                    • Enhanced security protocols active
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            {isPiBrowser ? (
              <>
                <PiAuthButton />
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Lock className="h-5 w-5 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">Access Restricted</span>
                  </div>
                  <p className="text-sm text-red-700">
                    Authentication is disabled on external browsers for security. Please use Pi Browser to continue.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleOpenInPiBrowser}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Switch to Pi Browser
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleDownloadPiBrowser}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Get Pi Browser
                  </Button>
                  
                  {/* Block any external authentication attempts */}
                  <Button 
                    variant="ghost"
                    onClick={blockExternalAuth}
                    className="w-full text-gray-400 cursor-not-allowed"
                    disabled
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    External Login Blocked
                  </Button>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    New to Droplink?{" "}
                    <span className="text-gray-400">
                      Sign up requires Pi Browser
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
      <PiBrowserDialog 
        redirectUrl="https://pinet.com/@droplink"
        showOnMount={!isPiBrowser}
      />
    </div>
  );
};

export default Login;
