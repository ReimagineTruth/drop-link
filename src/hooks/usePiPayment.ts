
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { authenticateWithPi, createPiPayment } from '@/services/piPaymentService';
import { useUser } from '@/context/UserContext';

// Updated standardized pricing structure
export const planPricing = {
  starter: { monthly: 10, annual: 8 },
  pro: { monthly: 15, annual: 12 },
  premium: { monthly: 22, annual: 18 }
};

export const usePiPayment = () => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const { refreshUserData } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePiLogin = async () => {
    try {
      setProcessingPayment(true);
      const auth = await authenticateWithPi();
      
      if (auth) {
        // Trigger a refresh of user data after successful login
        await refreshUserData();
        
        toast({
          title: "Login Successful",
          description: `Welcome back ${auth.user.username}!`,
        });
        
        return auth;
      } else {
        toast({
          title: "Login Failed",
          description: "Could not authenticate with Pi Network.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Pi Login error:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
    return null;
  };
  
  const handleSubscribe = async (plan: string, billingCycle: string = 'monthly') => {
    try {
      setProcessingPayment(true);
      
      // Convert plan to lowercase for consistency with backend
      const planLower = plan.toLowerCase();
      
      // Get the appropriate price based on plan and billing cycle
      const priceKey = planLower as keyof typeof planPricing;
      const cycleKey = billingCycle as 'monthly' | 'annual';
      
      // Get the price per month
      const pricePerMonth = planPricing[priceKey][cycleKey];
      
      // Calculate total payment amount based on billing cycle
      const totalAmount = billingCycle === 'annual' 
        ? pricePerMonth * 12 // Annual payment
        : pricePerMonth;     // Monthly payment
      
      const paymentData = {
        amount: totalAmount,
        memo: `${plan} Plan Subscription (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`,
        metadata: {
          isSubscription: true,
          plan: planLower,
          duration: billingCycle,
          pricePerMonth
        }
      };
      
      // Ensure user is authenticated with Pi Network
      const authResult = await authenticateWithPi(['payments', 'username', 'wallet_address']);
      
      if (!authResult) {
        toast({
          title: "Authentication Failed",
          description: "Please log in with Pi Network to subscribe.",
          variant: "destructive",
        });
        setProcessingPayment(false);
        return;
      }
      
      // Get current user data from Supabase - capture the return value for logging but don't check truthiness
      await refreshUserData();
      
      // Create the payment - pass the current user context from the useUser hook
      const { user } = useUser();
      await createPiPayment(paymentData, user);
      
      // Note: The actual subscription update is handled by the Pi payment callbacks
      // which will trigger a page refresh or state update once completed
      
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Error",
        description: "An error occurred while processing your subscription.",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };
  
  return { processingPayment, handlePiLogin, handleSubscribe };
};
