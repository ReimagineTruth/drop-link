
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';
import { createSubscription } from '@/services/subscriptionService';
import { useSubscriptionNotification } from '@/components/subscription/SubscriptionNotification';

export const planPricing = {
  starter: { monthly: 10, annual: 8 },
  pro: { monthly: 15, annual: 12 },
  premium: { monthly: 22, annual: 18 }
};

export const usePiSubscription = () => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<{
    plan: string;
    expiryDate: string;
    billingCycle: 'monthly' | 'annual';
  } | null>(null);

  const { user, refreshUserData } = useUser();
  const navigate = useNavigate();
  const { showSubscriptionNotification } = useSubscriptionNotification();

  const handleSubscribe = async (plan: string, billingCycle: 'monthly' | 'annual') => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setProcessingPayment(true);
      
      // Create subscription in database
      const subscription = await createSubscription(
        user.id,
        plan.toLowerCase(),
        billingCycle
      );
      
      if (subscription) {
        // Refresh user data to include new subscription
        await refreshUserData();
        
        // Set notification data
        setSubscriptionDetails({
          plan,
          expiryDate: subscription.expires_at,
          billingCycle
        });
        
        // Show subscription notification
        showSubscriptionNotification(
          plan,
          subscription.expires_at,
          billingCycle
        );
        
        // Add animation classes to the dashboard elements
        document.querySelectorAll('.dashboard-card').forEach(card => {
          card.classList.add('animate-fade-in');
        });
        
        toast({
          title: "Subscription Successful",
          description: `You've successfully subscribed to the ${plan} plan.`,
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "There was an error processing your subscription. Please try again.",
          variant: "destructive",
        });
      }
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

  const closeNotification = () => {
    setShowNotification(false);
  };

  return { 
    processingPayment,
    handleSubscribe,
    showNotification,
    subscriptionDetails,
    closeNotification,
    planPricing
  };
};
