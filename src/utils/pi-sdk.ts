
/**
 * Pi Network SDK utility functions with enhanced detection
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

// Enhanced Pi Browser detection with multiple methods
export const isRunningInPiBrowser = (): boolean => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    // Method 1: Check for Pi SDK availability (most reliable)
    if (window.Pi) {
      console.log("✅ Pi Browser detected: Pi SDK available");
      return true;
    }
    
    // Method 2: Check user agent for Pi Browser specific strings
    const userAgent = navigator.userAgent.toLowerCase();
    const piBrowserKeywords = [
      'pibrowser',
      'pi network',
      'pi-browser',
      'pi browser',
      'minepi'
    ];
    
    for (const keyword of piBrowserKeywords) {
      if (userAgent.includes(keyword)) {
        console.log(`✅ Pi Browser detected: User agent contains "${keyword}"`);
        return true;
      }
    }
    
    // Method 3: Check for Pi-specific global objects
    const piObjects = ['PiNetwork', 'piNetwork', 'PiBrowser'];
    for (const obj of piObjects) {
      if (typeof window[obj as keyof Window] !== 'undefined') {
        console.log(`✅ Pi Browser detected: Global object "${obj}" found`);
        return true;
      }
    }
    
    // Method 4: Check for Pi Browser specific URL patterns
    const hostname = window.location.hostname;
    const piDomains = ['minepi.com', 'pi.app', 'pinet.com'];
    for (const domain of piDomains) {
      if (hostname.includes(domain)) {
        console.log(`✅ Pi Browser detected: Running on Pi domain "${domain}"`);
        return true;
      }
    }
    
    // Method 5: Check for Pi Browser specific headers or properties
    if (navigator.userAgent.includes('PiBrowser') || navigator.userAgent.includes('Pi/')) {
      console.log("✅ Pi Browser detected: Enhanced user agent check");
      return true;
    }
    
    // Method 6: Check for custom Pi Browser properties
    if ('piNetwork' in window || 'PiSDK' in window) {
      console.log("✅ Pi Browser detected: Custom Pi properties found");
      return true;
    }
    
    console.log("❌ Pi Browser not detected: All detection methods failed");
    console.log("Current user agent:", navigator.userAgent);
    console.log("Available window objects:", Object.keys(window).filter(key => key.toLowerCase().includes('pi')));
    
    return false;
  } catch (error) {
    console.error("Error during Pi Browser detection:", error);
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
      console.error("❌ Pi authentication blocked: Pi Browser required");
      throw new Error("Pi Browser is required for authentication. Please open this app in Pi Browser.");
    }
    
    if (typeof window === 'undefined' || !window.Pi) {
      console.error("❌ Pi SDK not initialized or not available");
      return null;
    }

    // Handle any incomplete payments
    const onIncompletePaymentFound = (payment: any) => {
      console.log("Incomplete payment found:", payment);
      return null;
    };

    console.log("🔐 Starting Pi authentication with scopes:", scopes);
    
    // Get authentication result and ensure username is never undefined
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    
    // Ensure the username is always a string, never undefined
    if (!authResult.user.username) {
      console.warn("Pi auth returned undefined username, using empty string instead");
      authResult.user.username = "";
    }
    
    console.log("✅ Pi authentication successful:", authResult.user.uid);
    return authResult as PiAuthResult;
  } catch (error) {
    console.error("❌ Pi authentication failed:", error);
    throw error;
  }
};

// Check if user is authenticated with Pi
export const isPiAuthenticated = (): boolean => {
  try {
    if (!isRunningInPiBrowser() || !window.Pi) {
      return false;
    }
    
    // Check if there's a stored access token
    const storedToken = localStorage.getItem('pi_access_token');
    return !!storedToken;
  } catch (error) {
    console.error("Error checking Pi authentication status:", error);
    return false;
  }
};

// Sign out from Pi
export const signOutFromPi = (): void => {
  try {
    // Clear Pi-related storage
    localStorage.removeItem('pi_access_token');
    localStorage.removeItem('pi_user_id');
    localStorage.removeItem('pi_username');
    
    console.log("Signed out from Pi Network");
  } catch (error) {
    console.error("Error signing out from Pi:", error);
  }
};

export default {
  isRunningInPiBrowser,
  initPiNetwork,
  authenticateWithPi,
  isPiAuthenticated,
  signOutFromPi,
};
