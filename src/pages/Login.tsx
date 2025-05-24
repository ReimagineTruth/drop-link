
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your Droplink</p>
            
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
                  Authentication with Pi Network is only available in Pi Browser. Please open this app in Pi Browser to continue.
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
                  Great! You're using Pi Browser and can access all features.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <PiAuthButton />
            
            {!isPiBrowser && <PiBrowserPrompt />}
            
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
        showOnMount={!isPiBrowser}
      />
    </div>
  );
};

export default Login;
