
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { authenticateWithPi, createPiPayment } from "@/services/piPaymentService";
import { useUser } from "@/context/UserContext";

// Define consistent pricing across the application
export const planPricing = {
  starter: { monthly: 10, annual: 8 },
  pro: { monthly: 15, annual: 12 },
  premium: { monthly: 22, annual: 18 }
};

export function usePiPayment() {
  const { toast } = useToast();
  const { user, refreshUserData } = useUser();
  const [processingPayment, setProcessingPayment] = useState(false);

  const handlePiLogin = async () => {
    try {
      const auth = await authenticateWithPi(["username", "payments", "wallet_address"]);
      if (auth) {
        if (auth.accessToken) {
          // Store access token for API calls
          localStorage.setItem('pi_access_token', auth.accessToken);
        }
        
        refreshUserData();
        
        toast({
          title: "Logged in successfully",
          description: `Welcome, ${auth.user.username || "User"}!`,
        });
      }
      return auth;
    } catch (error) {
      console.error("Pi authentication failed:", error);
      toast({
        title: "Authentication failed",
        description: "Could not log in with Pi Network",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSubscribe = async (plan: string, billingCycle: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to subscribe",
        variant: "destructive", 
      });
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Make sure user is authenticated with Pi
      const auth = await handlePiLogin();
      if (!auth) {
        throw new Error("Pi authentication required");
      }
      
      // Get plan pricing from consistent planPricing object
      const planName = plan.toLowerCase();
      let amount = 0;
      
      if (planName === "starter") {
        amount = billingCycle === 'annual' ? planPricing.starter.annual * 12 : planPricing.starter.monthly;
      } else if (planName === "pro") {
        amount = billingCycle === 'annual' ? planPricing.pro.annual * 12 : planPricing.pro.monthly;
      } else if (planName === "premium") {
        amount = billingCycle === 'annual' ? planPricing.premium.annual * 12 : planPricing.premium.monthly;
      }
      
      // Calculate expiration date
      const expireDate = new Date();
      if (billingCycle === 'annual') {
        expireDate.setFullYear(expireDate.getFullYear() + 1);
      } else {
        expireDate.setMonth(expireDate.getMonth() + 1);
      }
      
      // Create payment through Pi Network
      const paymentData = {
        amount,
        memo: `${plan} Plan Subscription (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`,
        metadata: {
          isSubscription: true,
          plan: planName,
          duration: billingCycle,
          expiresAt: expireDate.toISOString(),
          sandbox: true // Set to true for testing, false for production
        }
      };
      
      await createPiPayment(paymentData, user);
      
      // The payment flow will be handled by callbacks in piPaymentService
      toast({
        title: "Payment Processing",
        description: "Follow the Pi payment flow to complete your subscription",
      });
      
      // After a successful payment, refresh user data to get updated subscription
      // This is now handled by the event listener in the payment service
      
      // Add event listener for subscription updates
      const handleSubscriptionUpdate = () => {
        console.log("Subscription update detected, refreshing user data");
        refreshUserData();
        
        toast({
          title: "Subscription Updated",
          description: "Your subscription has been successfully updated",
        });
      };
      
      window.addEventListener('subscription-updated', handleSubscriptionUpdate);
      
      // Clean up event listener after 10 minutes (in case payment flow takes time)
      setTimeout(() => {
        window.removeEventListener('subscription-updated', handleSubscriptionUpdate);
      }, 10 * 60 * 1000);
      
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  return {
    processingPayment,
    handlePiLogin,
    handleSubscribe,
    planPricing
  };
}
