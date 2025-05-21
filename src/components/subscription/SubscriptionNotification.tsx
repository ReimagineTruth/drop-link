
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionNotificationProps {
  plan: string;
  expiryDate: string;
  isVisible: boolean;
  onClose: () => void;
  billingCycle: 'monthly' | 'annual';
}

const SubscriptionNotification = ({
  plan,
  expiryDate,
  isVisible,
  onClose,
  billingCycle
}: SubscriptionNotificationProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlanColor = () => {
    switch (plan.toLowerCase()) {
      case 'premium':
        return 'from-purple-500 to-pink-500';
      case 'pro':
        return 'from-blue-500 to-cyan-500';
      case 'starter':
      default:
        return 'from-green-500 to-teal-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50 max-w-md"
        >
          <motion.div 
            className={`rounded-lg p-4 shadow-lg bg-gradient-to-r ${getPlanColor()} text-white`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold mb-1">
                  {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Activated!
                </h4>
                <p className="text-sm mb-2">
                  Thank you for subscribing to our {plan} plan ({billingCycle}).
                </p>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Expires on {formatDate(expiryDate)}</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="flex-shrink-0 ml-2 text-white/80 hover:text-white transition-colors"
              >
                &times;
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Custom hook to show subscription notifications
export const useSubscriptionNotification = () => {
  const { toast } = useToast();
  
  const showSubscriptionNotification = (plan: string, expiryDate: string, billingCycle: 'monthly' | 'annual') => {
    toast({
      title: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Activated!`,
      description: (
        <div className="space-y-2">
          <p>Thank you for subscribing to our {plan} plan ({billingCycle}).</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Expires on {new Date(expiryDate).toLocaleDateString()}</span>
          </div>
        </div>
      ),
      variant: "default",
      duration: 6000,
    });
  };
  
  return { showSubscriptionNotification };
};

