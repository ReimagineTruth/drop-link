
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Smartphone, Download } from "lucide-react";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

interface PiBrowserDialogProps {
  title?: string;
  description?: string;
  redirectUrl?: string;
  showOnMount?: boolean;
  onClose?: () => void;
}

const PiBrowserDialog = ({
  title = "Pi Browser Required",
  description = "To use all features of Droplink, including Pi Network authentication and payments, please open this app in Pi Browser.",
  redirectUrl = "https://pinet.com/@droplink",
  showOnMount = true,
  onClose
}: PiBrowserDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Directly check Pi Browser status on each render to ensure it's current
  const isPiBrowser = isRunningInPiBrowser();

  useEffect(() => {
    console.log("PiBrowserDialog - isPiBrowser:", isPiBrowser, "showOnMount:", showOnMount);
    // Only show dialog if not in Pi Browser and showOnMount is true
    if (!isPiBrowser && showOnMount) {
      console.log("Opening Pi Browser dialog");
      setIsOpen(true);
    }
    
    // Listen for custom event to open dialog
    const handleOpenDialog = () => {
      console.log("Custom event received: open-pi-browser-dialog");
      if (!isPiBrowser) {
        setIsOpen(true);
      }
    };
    
    window.addEventListener('open-pi-browser-dialog', handleOpenDialog);
    
    return () => {
      window.removeEventListener('open-pi-browser-dialog', handleOpenDialog);
    };
  }, [isPiBrowser, showOnMount]);

  const handleClose = () => {
    console.log("Closing Pi Browser dialog");
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const redirectToPiBrowser = () => {
    console.log("Redirecting to:", redirectUrl);
    window.location.href = redirectUrl;
  };

  const downloadPiBrowser = () => {
    window.open('https://minepi.com/download', '_blank');
  };

  // Debug check
  console.log("PiBrowserDialog rendering - isPiBrowser:", isPiBrowser, "isOpen:", isOpen);

  // Don't render anything if in Pi Browser
  if (isPiBrowser) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Smartphone className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
            </svg>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Why Pi Browser?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Secure Pi Network authentication</li>
              <li>• Native Pi payment integration</li>
              <li>• Enhanced security features</li>
              <li>• Full access to all app features</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button 
            onClick={redirectToPiBrowser}
            className="w-full sm:w-auto bg-gradient-hero hover:bg-secondary"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in Pi Browser
          </Button>
          
          <Button 
            variant="outline"
            onClick={downloadPiBrowser}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Pi Browser
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleClose}
            className="w-full sm:w-auto text-sm"
          >
            Continue with limited features
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PiBrowserDialog;
