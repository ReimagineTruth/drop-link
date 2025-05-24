// Define interfaces for Pi Network authentication
interface PiAuthResult {
  accessToken: string;
  user: {
    uid: string;
    username?: string;
  };
}

interface PiPaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: any) => void;
}

// Get environment variables
const PI_API_KEY = "ckta3qej1mjqit2rlqt6nutpw089uynyotj3g9spwqlhrvvggqv7hoe6cn3plgb5";
const PI_SANDBOX = true;

// Enhanced Pi SDK initialization with better error handling
export const initPiNetwork = (): boolean => {
  try {
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: PI_SANDBOX });
      console.log("✅ Pi SDK initialized with sandbox mode:", PI_SANDBOX);
      return true;
    }
    console.warn("⚠️ Pi SDK not found. This is normal if running server-side or in an environment without the Pi SDK.");
    return false;
  } catch (error) {
    console.error("❌ Failed to initialize Pi SDK:", error);
    return false;
  }
};

// Enhanced authentication with better error handling
export const authenticateWithPi = async (
  scopes: string[] = ["username", "payments", "wallet_address"]
): Promise<PiAuthResult | null> => {
  try {
    if (typeof window === 'undefined' || !window.Pi) {
      throw new Error("Pi SDK not initialized or not available");
    }

    // Make sure SDK is initialized
    const initialized = initPiNetwork();
    if (!initialized) {
      throw new Error("Failed to initialize Pi SDK");
    }

    // Handle any incomplete payments
    const onIncompletePaymentFound = (payment: any) => {
      console.log("🔄 Incomplete payment found:", payment);
      // Here you would typically handle the incomplete payment
      return null;
    };

    console.log("🔐 Starting Pi authentication with scopes:", scopes);
    const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    
    if (!auth) {
      throw new Error("Authentication failed - no result returned");
    }
    
    console.log("✅ Pi authentication successful:", auth);
    return auth;
  } catch (error) {
    console.error("❌ Pi authentication failed:", error);
    throw error;
  }
};

// Enhanced payment creation with comprehensive error handling
export const createPiPayment = async (
  paymentData: {
    amount: number;
    memo: string;
    metadata?: Record<string, any>;
  }, 
  user: any
): Promise<any> => {
  try {
    // Validate inputs
    if (!paymentData.amount || paymentData.amount <= 0) {
      throw new Error("Invalid payment amount");
    }

    if (!user?.id) {
      throw new Error("User authentication required");
    }

    // Make sure SDK is initialized
    const initialized = initPiNetwork();
    if (!initialized) {
      throw new Error("Pi SDK initialization failed");
    }
    
    if (typeof window === 'undefined' || !window.Pi) {
      throw new Error("Pi SDK not available");
    }

    const payment = {
      amount: paymentData.amount,
      identifier: `droplink-${user.id}-${Date.now()}`,
      memo: paymentData.memo,
      metadata: {
        ...paymentData.metadata,
        app: 'droplink',
        user_id: user.id,
        created_at: new Date().toISOString()
      },
    };

    console.log("💰 Creating Pi payment:", payment);

    const callbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("🔄 Ready for server approval:", paymentId);
        
        try {
          const { data, error } = await supabase.functions.invoke('pi-payment', {
            body: { 
              paymentData: { ...payment, paymentId }, 
              user, 
              accessToken: localStorage.getItem('pi_access_token') 
            }
          });
          
          if (error) {
            console.error("❌ Server approval error:", error);
            throw error;
          }
          
          console.log("✅ Payment recorded on server:", data);
        } catch (error) {
          console.error("❌ Error during server approval:", error);
          throw error;
        }
      },
      
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("✅ Payment completed:", paymentId, "Transaction ID:", txid);
        
        try {
          const { data, error } = await supabase.functions.invoke('complete-payment', {
            body: { 
              paymentId, 
              transactionId: txid, 
              status: 'completed',
              accessToken: localStorage.getItem('pi_access_token')
            }
          });
          
          if (error) {
            console.error("❌ Server completion error:", error);
            throw error;
          }
          
          console.log("✅ Payment completed on server:", data);
          
          toast({
            title: "Payment Successful",
            description: `Your payment of ${paymentData.amount}π has been completed successfully.`,
          });
          
          // Trigger subscription update if needed
          if (paymentData.metadata?.isSubscription) {
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('subscription-updated'));
            }, 2000);
          }
        } catch (error) {
          console.error("❌ Error during payment completion:", error);
          throw error;
        }
      },
      
      onCancel: async (paymentId: string) => {
        console.log("❌ Payment cancelled:", paymentId);
        
        try {
          const { data, error } = await supabase.functions.invoke('cancel-payment', {
            body: { 
              paymentId, 
              status: 'cancelled',
              accessToken: localStorage.getItem('pi_access_token')
            }
          });
          
          if (error) {
            console.error("❌ Server cancellation error:", error);
          } else {
            console.log("✅ Payment cancelled on server:", data);
          }
        } catch (error) {
          console.error("❌ Error during payment cancellation:", error);
        }
        
        toast({
          title: "Payment Cancelled",
          description: "Your payment has been cancelled.",
          variant: "destructive",
        });
      },
      
      onError: (error: Error, payment?: any) => {
        console.error("❌ Payment error:", error, payment);
        
        // Enhanced error categorization
        let errorMessage = "An error occurred during payment processing.";
        
        if (error.message.toLowerCase().includes('insufficient')) {
          errorMessage = "Insufficient Pi balance to complete this payment.";
        } else if (error.message.toLowerCase().includes('network')) {
          errorMessage = "Network connection error. Please check your internet connection.";
        } else if (error.message.toLowerCase().includes('cancelled')) {
          errorMessage = "Payment was cancelled by user.";
        }
        
        toast({
          title: "Payment Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        throw error;
      },
    };

    // Ensure fresh authentication
    const auth = await authenticateWithPi(["username", "payments", "wallet_address"]);
    if (auth?.accessToken) {
      localStorage.setItem('pi_access_token', auth.accessToken);
    }

    console.log("🚀 Calling Pi Network createPayment...");
    const result = await window.Pi.createPayment(payment, callbacks);
    
    console.log("✅ Pi payment created successfully:", result);
    return result;
    
  } catch (error) {
    console.error("❌ Payment creation failed:", error);
    
    // Enhanced error handling
    if (error instanceof Error) {
      if (error.message.includes('Pi SDK')) {
        toast({
          title: "Pi SDK Error",
          description: "Please ensure you're using Pi Browser for payments.",
          variant: "destructive",
        });
      } else if (error.message.includes('authentication')) {
        toast({
          title: "Authentication Error",
          description: "Please log in again to make payments.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
    
    throw error;
  }
};

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Get current auth context - remove the reference to currentUser which doesn't exist
let auth = null;
try {
  if (typeof window !== 'undefined' && window.Pi) {
    // Fixed: Replace the nonexistent currentUser with a fresh authentication
    auth = null; // Initialize as null, will be populated when needed
  }
} catch (e) {
  console.error("Error getting Pi auth context:", e);
}

export default {
  initPiNetwork,
  authenticateWithPi,
  createPiPayment,
};
