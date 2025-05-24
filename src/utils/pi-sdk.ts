
/**
 * Pi Network SDK utility functions with enhanced detection and security
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

// Enhanced Pi Browser detection with multiple methods and security checks
export const isRunningInPiBrowser = (): boolean => {
  try {
    if (typeof window === 'undefined') {
      console.log("❌ Server-side environment detected");
      return false;
    }

    let detectionScore = 0;
    const detectionMethods: string[] = [];

    // Method 1: Check for Pi SDK availability (most reliable)
    if (window.Pi && typeof window.Pi.init === 'function') {
      detectionScore += 10;
      detectionMethods.push("Pi SDK detected");
      console.log("✅ Pi Browser detected: Pi SDK available");
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
        detectionScore += 5;
        detectionMethods.push(`User agent contains "${keyword}"`);
        console.log(`✅ Pi Browser detected: User agent contains "${keyword}"`);
      }
    }
    
    // Method 3: Check for Pi-specific global objects
    const piObjects = ['PiNetwork', 'piNetwork', 'PiBrowser'];
    for (const obj of piObjects) {
      if (typeof window[obj as keyof Window] !== 'undefined') {
        detectionScore += 3;
        detectionMethods.push(`Global object "${obj}" found`);
        console.log(`✅ Pi Browser detected: Global object "${obj}" found`);
      }
    }
    
    // Method 4: Check for Pi Browser specific URL patterns
    const hostname = window.location.hostname;
    const piDomains = ['minepi.com', 'pi.app', 'pinet.com'];
    for (const domain of piDomains) {
      if (hostname.includes(domain)) {
        detectionScore += 2;
        detectionMethods.push(`Running on Pi domain "${domain}"`);
        console.log(`✅ Pi Browser detected: Running on Pi domain "${domain}"`);
      }
    }
    
    // Method 5: Enhanced user agent checks
    if (navigator.userAgent.includes('PiBrowser') || navigator.userAgent.includes('Pi/')) {
      detectionScore += 4;
      detectionMethods.push("Enhanced user agent check");
      console.log("✅ Pi Browser detected: Enhanced user agent check");
    }
    
    // Method 6: Check for custom Pi Browser properties
    if ('piNetwork' in window || 'PiSDK' in window) {
      detectionScore += 3;
      detectionMethods.push("Custom Pi properties found");
      console.log("✅ Pi Browser detected: Custom Pi properties found");
    }

    // Security threshold: require minimum score for positive detection
    const isDetected = detectionScore >= 8;
    
    if (isDetected) {
      console.log(`🔐 Pi Browser CONFIRMED with score ${detectionScore}:`, detectionMethods);
    } else {
      console.log(`🚫 Pi Browser NOT DETECTED (score: ${detectionScore}):`, detectionMethods);
      console.log("Current user agent:", navigator.userAgent);
      console.log("Available window objects:", Object.keys(window).filter(key => key.toLowerCase().includes('pi')));
    }
    
    return isDetected;
  } catch (error) {
    console.error("❌ Error during Pi Browser detection:", error);
    return false;
  }
};

// Initialize Pi SDK with environment detection and security checks
export const initPiNetwork = (): boolean => {
  try {
    // First check if we're in Pi Browser
    if (!isRunningInPiBrowser()) {
      console.warn("🚫 Pi SDK initialization blocked: Not in Pi Browser");
      return false;
    }

    if (typeof window === 'undefined' || !window.Pi) {
      console.warn("❌ Pi SDK not available. This app requires Pi Browser for full functionality.");
      return false;
    }
    
    // Check if we're in development or production
    const isSandbox = import.meta.env.DEV || 
                       window.location.hostname.includes('localhost') || 
                       window.location.hostname.includes('lovableproject.com');
    
    window.Pi.init({ version: "2.0", sandbox: isSandbox });
    console.log("🔐 Pi SDK initialized with sandbox mode:", isSandbox);
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Pi SDK:", error);
    return false;
  }
};

// Authenticate user with Pi Network (requires Pi Browser)
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments", "wallet_address"]
): Promise<PiAuthResult | null> => {
  try {
    // STRICT Pi Browser requirement with enhanced security
    if (!isRunningInPiBrowser()) {
      console.error("🚫 SECURITY BLOCK: Pi authentication attempted from external browser");
      throw new Error("SECURITY VIOLATION: Pi Browser is required for authentication. External browser access is denied for security reasons.");
    }
    
    if (typeof window === 'undefined' || !window.Pi) {
      console.error("❌ Pi SDK not initialized or not available");
      throw new Error("Pi SDK not available. Please ensure you're using Pi Browser.");
    }

    // Handle any incomplete payments
    const onIncompletePaymentFound = (payment: any) => {
      console.log("Incomplete payment found:", payment);
      return null;
    };

    console.log("🔐 Starting SECURE Pi authentication with scopes:", scopes);
    
    // Get authentication result and ensure username is never undefined
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    
    // Ensure the username is always a string, never undefined
    if (!authResult.user.username) {
      console.warn("Pi auth returned undefined username, using empty string instead");
      authResult.user.username = "";
    }
    
    console.log("✅ SECURE Pi authentication successful:", authResult.user.uid);
    return authResult as PiAuthResult;
  } catch (error) {
    console.error("❌ SECURE Pi authentication failed:", error);
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

// Sign out from Pi with security cleanup
export const signOutFromPi = (): void => {
  try {
    // Clear Pi-related storage with enhanced security
    const piStorageKeys = [
      'pi_access_token',
      'pi_user_id', 
      'pi_username',
      'piNetwork_auth',
      'pi_session',
      'pi_auth_data'
    ];
    
    piStorageKeys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    
    console.log("🔐 Securely signed out from Pi Network with data cleanup");
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
