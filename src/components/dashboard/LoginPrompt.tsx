
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

interface LoginPromptProps {
  handlePiLogin: () => Promise<void>;
}

const LoginPrompt = ({ handlePiLogin }: LoginPromptProps) => {
  const [isPiAuthenticating, setIsPiAuthenticating] = useState(false);
  const isPiBrowser = isRunningInPiBrowser();
  
  const handlePiAuthClick = async () => {
    // Check Pi Browser requirement
    if (!isPiBrowser) {
      toast({
        title: "Pi Browser Required",
        description: "You must use Pi Browser to access the dashboard. Please open this app in Pi Browser.",
        variant: "destructive",
      });
      
      // Dispatch event to show Pi Browser dialog
      window.dispatchEvent(new CustomEvent('open-pi-browser-dialog'));
      return;
    }
    
    try {
      setIsPiAuthenticating(true);
      await handlePiLogin();
    } catch (error) {
      console.error("Pi authentication error:", error);
      toast({
        title: "Authentication Failed",
        description: "Could not authenticate with Pi Network. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPiAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lock className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Please Log In to Access Your Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Sign in with your Pi Network account to access your personalized dashboard
        </p>
        
        {/* Enhanced Pi Browser detection display */}
        {!isPiBrowser && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-medium text-red-800">Pi Browser Required</span>
            </div>
            <p className="text-sm text-red-700">
              You must use Pi Browser to access the dashboard and authenticate with Pi Network.
            </p>
          </div>
        )}
        
        {isPiBrowser && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium text-green-800">Pi Browser Detected</span>
            </div>
            <p className="text-sm text-green-700">
              Ready to authenticate with Pi Network!
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <Button 
            onClick={handlePiAuthClick} 
            className="w-full bg-gradient-hero hover:bg-secondary"
            disabled={isPiAuthenticating || !isPiBrowser}
          >
            {!isPiBrowser 
              ? "Pi Browser Required" 
              : isPiAuthenticating 
                ? "Authenticating..." 
                : "Sign in with Pi Network"
            }
          </Button>
          
          {!isPiBrowser && (
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => window.dispatchEvent(new CustomEvent('open-pi-browser-dialog'))}
                className="text-sm"
              >
                How to open in Pi Browser
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
