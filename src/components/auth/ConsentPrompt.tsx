
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, User, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ConsentPromptProps {
  isOpen: boolean;
  username: string;
  onAccept: () => void;
  onDecline: () => void;
}

const ConsentPrompt = ({ isOpen, username, onAccept, onDecline }: ConsentPromptProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAccept = async () => {
    try {
      setIsSubmitting(true);
      
      // Record the acceptance in the console for debugging
      console.log("User accepted consent");
      
      // Here you could store the user's consent in the database if needed
      // The actual database storage is handled in the useConsentStatus hook
      
      toast({
        title: "Consent accepted",
        description: "Thank you for sharing your information with Droplink",
      });
      
      onAccept();
    } catch (error) {
      console.error("Error saving consent:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your consent",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = () => {
    // Record the declination in the console for debugging
    console.log("User declined consent");
    
    toast({
      title: "Consent declined",
      description: "You've declined to share your information. Some features may be limited.",
      variant: "destructive",
    });
    
    onDecline();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Data Sharing Consent</DialogTitle>
          <DialogDescription className="text-center">
            Welcome {username}! Before you proceed, please confirm the information you're willing to share with Droplink.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground text-center mb-4">
            Sharing this information allows you to access your profile dashboard and make Pi payments for plans.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center p-3 border rounded-md bg-secondary/30">
              <Shield className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h4 className="font-medium">Authentication via Pi account</h4>
                <p className="text-xs text-muted-foreground">Used to securely identify you and log you in</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 border rounded-md bg-secondary/30">
              <User className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h4 className="font-medium">Username (Pi username)</h4>
                <p className="text-xs text-muted-foreground">Used to personalize your experience</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 border rounded-md bg-secondary/30">
              <Wallet className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h4 className="font-medium">Wallet address</h4>
                <p className="text-xs text-muted-foreground">Required for Pi payments and subscriptions</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            onClick={handleDecline}
            disabled={isSubmitting}
            className="sm:w-auto w-full"
          >
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            disabled={isSubmitting}
            className="sm:w-auto w-full bg-gradient-hero hover:bg-secondary"
          >
            {isSubmitting ? "Processing..." : "Accept & Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentPrompt;
