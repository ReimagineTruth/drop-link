
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { PiAuthButton } from "@/components/auth/PiAuthButton";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { initPiNetwork } from "@/services/piPaymentService";
import PiBrowserDialog from "@/components/PiBrowserDialog";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, CheckCircle, Shield, AlertTriangle } from "lucide-react";
import { AuthDivider } from "@/components/auth/AuthDivider";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const isPiBrowser = isRunningInPiBrowser();
  
  console.log("Login page - isPiBrowser:", isPiBrowser, "isLoggedIn:", isLoggedIn);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your Droplink</p>
            
            {/* Pi Browser Status Display */}
            <div className="mt-6">
              {isPiBrowser ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="font-semibold text-green-800">Pi Browser Detected</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Perfect! You can use both Pi Network and email authentication.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-center mb-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                    <span className="font-semibold text-amber-800">External Browser</span>
                  </div>
                  <p className="text-sm text-amber-700 mb-3">
                    You can still sign in with email, but Pi Network features require Pi Browser.
                  </p>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={handleOpenInPiBrowser}
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in Pi Browser
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadPiBrowser}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Pi Browser
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Pi Authentication Section */}
            {isPiBrowser && (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Shield className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-medium text-gray-700">Pi Network Authentication</span>
                  </div>
                  <PiAuthButton />
                </div>
                
                <AuthDivider />
              </>
            )}
            
            {/* Email Authentication Section */}
            <div className="space-y-4">
              <div className="text-center">
                <span className="font-medium text-gray-700">Email Authentication</span>
              </div>
              <EmailLoginForm />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
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
