
/**
 * Pi Network SDK utility functions
 */

// Types
export interface PiAuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
}

export interface PiPaymentData {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
}

// Check if running in Pi Browser with enhanced detection
export const isRunningInPiBrowser = (): boolean => {
  try {
    // Enhanced detection for Pi Browser environment
    if (typeof window !== 'undefined') {
      // Check for Pi SDK availability (primary indicator)
      if (window.Pi) {
        console.log("Pi SDK detected - running in Pi Browser");
        return true;
      }
      
      // Check for Pi Browser specific user agent strings
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('pibrowser') || 
          userAgent.includes('pi network') || 
          userAgent.includes('pi-browser') ||
          userAgent.includes('pi browser')) {
        console.log("Pi Browser detected via user agent");
        return true;
      }
      
      // Check for Pi-specific objects or properties
      if (typeof window['PiNetwork'] !== 'undefined' || 
          typeof window['piNetwork'] !== 'undefined') {
        console.log("Pi-specific objects detected");
        return true;
      }
      
      // Check for Pi Browser specific window properties
      if (window.location.hostname.includes('minepi.com') ||
          window.location.hostname.includes('pi.app')) {
        console.log("Pi Browser detected via hostname");
        return true;
      }
    }
    console.log("Not running in Pi Browser - all detection checks failed");
    return false;
  } catch (error) {
    console.error("Error checking Pi Browser environment:", error);
    return false;
  }
};

// Initialize Pi SDK with environment detection
export const initPiNetwork = (): boolean => {
  try {
    if (typeof window === 'undefined' || !window.Pi) {
      console.warn("Pi SDK not available. This app requires Pi Browser for full functionality.");
      return false;
    }
    
    // Check if we're in development or production
    const isSandbox = import.meta.env.DEV || 
                       window.location.hostname.includes('localhost') || 
                       window.location.hostname.includes('lovableproject.com');
    
    window.Pi.init({ version: "2.0", sandbox: isSandbox });
    console.log("Pi SDK initialized with sandbox mode:", isSandbox);
    return true;
  } catch (error) {
    console.error("Failed to initialize Pi SDK:", error);
    return false;
  }
};

// Authenticate user with Pi Network (requires Pi Browser)
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments", "wallet_address"]
): Promise<PiAuthResult | null> => {
  try {
    // Strict Pi Browser requirement
    if (!isRunningInPiBrowser()) {
      console.error("Pi authentication requires Pi Browser");
      throw new Error("Pi Browser is required for authentication");
    }
    
    if (typeof window === 'undefined' || !window.Pi) {
      console.error("Pi SDK not initialized or not available");
      return null;
    }

    // Handle any incomplete payments
    const onIncompletePaymentFound = (payment: any) => {
      console.log("Incomplete payment found:", payment);
      return null;
    };

    // Get authentication result and ensure username is never undefined
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    
    // Ensure the username is always a string, never undefined
    if (!authResult.user.username) {
      console.warn("Pi auth returned undefined username, using empty string instead");
      authResult.user.username = "";
    }
    
    console.log("Authentication successful:", authResult);
    return authResult as PiAuthResult;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
};

export default {
  isRunningInPiBrowser,
  initPiNetwork,
  authenticateWithPi,
};
