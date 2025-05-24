
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
import { Download, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";

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
  }, [isLoggedIn, navigate]);

  const handleDownloadPiBrowser = () => {
    window.open('https://minepi.com/download', '_blank');
  };

  const handleOpenInPiBrowser = () => {
    const currentUrl = window.location.href;
    // Try to open in Pi Browser with custom protocol
    const piBrowserUrl = `pi://browser?url=${encodeURIComponent(currentUrl)}`;
    window.location.href = piBrowserUrl;
    
    // Fallback: redirect to Pi Network domain
    setTimeout(() => {
      window.open('https://pinet.com/@droplink', '_blank');
    }, 1000);
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
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">Pi Browser Required</span>
                  </div>
                  <p className="text-sm text-red-700 mb-4">
                    You're currently using a standard browser. To sign in with Pi Network and access all features, you need to use Pi Browser.
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
                    <strong>Why Pi Browser?</strong><br/>
                    • Secure Pi Network authentication<br/>
                    • Native Pi payment integration<br/>
                    • Enhanced security features<br/>
                    • Full access to all app features
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
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Limited Access Mode</strong><br/>
                    Authentication with Pi Network requires Pi Browser. Please switch to Pi Browser to continue.
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
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    New to Droplink?{" "}
                    <Link to="/signup" className="text-primary hover:underline font-medium">
                      Learn more
                    </Link>
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
        showOnMount={false}
      />
    </div>
  );
};

export default Login;
