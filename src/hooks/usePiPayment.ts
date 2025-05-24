
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/context/UserContext';

// Centralized pricing structure matching the actual plans
export const planPricing = {
  starter: { monthly: 10, annual: 8 },
  pro: { monthly: 15, annual: 12 },
  premium: { monthly: 22, annual: 18 }
};

export const usePiPayment = () => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const { toast } = useToast();
  const { refreshUserData } = useUser();

  const handleSubscribe = async (plan: string, billingCycle: 'monthly' | 'annual') => {
    setProcessingPayment(true);
    
    try {
      // Get pricing based on plan and billing cycle
      const planKey = plan.toLowerCase() as keyof typeof planPricing;
      const amount = billingCycle === 'annual' 
        ? planPricing[planKey].annual 
        : planPricing[planKey].monthly;

      // In a real implementation, this would integrate with Pi Network payments
      // For now, we'll simulate the subscription process
      console.log(`Subscribing to ${plan} plan (${billingCycle}) for ${amount}π`);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Subscription Successful!",
        description: `You've successfully subscribed to the ${plan} plan for ${amount}π/${billingCycle === 'annual' ? 'year' : 'month'}`,
      });
      
      // Refresh user data to update subscription status
      await refreshUserData();
      
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  return {
    handleSubscribe,
    processingPayment,
    planPricing
  };
};
