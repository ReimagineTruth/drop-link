
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Calendar, CreditCard, Settings, Crown, Star } from "lucide-react";
import { planPricing } from "@/hooks/usePiPayment";

interface SubscriptionConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  billingCycle: 'monthly' | 'annual';
}

const SubscriptionConfirmationDialog = ({
  isOpen,
  onClose,
  plan,
  billingCycle
}: SubscriptionConfirmationDialogProps) => {
  const planKey = plan.toLowerCase() as keyof typeof planPricing;
  
  // Add safety check and fallback values
  const planData = planPricing[planKey];
  if (!planData) {
    console.error(`Invalid plan: ${plan}`);
    return null; // Don't render if plan is invalid
  }
  
  const amount = billingCycle === 'annual' 
    ? planData.annual 
    : planData.monthly;

  // Calculate next renewal date (mock)
  const nextRenewal = new Date();
  if (billingCycle === 'annual') {
    nextRenewal.setFullYear(nextRenewal.getFullYear() + 1);
  } else {
    nextRenewal.setMonth(nextRenewal.getMonth() + 1);
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  const getPlanFeatures = () => {
    switch (plan.toLowerCase()) {
      case 'starter':
        return [
          "Unlimited Links",
          "Connect All Social Profiles", 
          "Pi AdNetwork",
          "Basic Analytics",
          "Email Support"
        ];
      case 'pro':
        return [
          "Everything in Starter",
          "Multi-Factor Authentication",
          "QR Codes for Offline Traffic",
          "Custom Button Styles",
          "Performance Analytics",
          "Custom Themes"
        ];
      case 'premium':
        return [
          "Everything in Pro",
          "Sell Products with Pi Payments",
          "Priority Support (4-Hour)",
          "Historical Insights",
          "Data Export",
          "Whitelabel Option"
        ];
      default:
        return ["Basic Features"];
    }
  };

  const getPlanIcon = () => {
    switch (plan.toLowerCase()) {
      case 'starter':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'pro':
        return <Star className="h-8 w-8 text-blue-500" />;
      case 'premium':
        return <Crown className="h-8 w-8 text-purple-500" />;
      default:
        return <CheckCircle className="h-8 w-8 text-green-500" />;
    }
  };

  const getPlanColor = () => {
    switch (plan.toLowerCase()) {
      case 'starter':
        return 'bg-green-500';
      case 'pro':
        return 'bg-blue-500';
      case 'premium':
        return 'bg-purple-500';
      default:
        return 'bg-green-500';
    }
  };

  // Mock progress (days into billing cycle)
  const mockProgress = Math.floor(Math.random() * 80) + 10; // 10-90%

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            {getPlanIcon()}
          </div>
          <DialogTitle className="text-center text-2xl">
            Thank you for subscribing!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Subscription Summary */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-lg font-medium">You're currently subscribed to plan:</span>
              <Badge className={`${getPlanColor()} text-white text-lg px-3 py-1`}>
                {plan}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              charged at <span className="font-semibold">{amount}π/{billingCycle === 'annual' ? 'year' : 'month'}</span>
            </p>
          </div>

          {/* Billing Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Billing Information</span>
            </div>
            <p className="text-sm text-blue-800 mb-2">
              Your {billingCycle} credits will renew on <span className="font-semibold">{formatDate(nextRenewal)}</span> (at midnight UTC).
            </p>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-blue-700">
                <span>Billing cycle progress</span>
                <span>{mockProgress}% complete</span>
              </div>
              <Progress value={mockProgress} className="h-2" />
            </div>
          </div>

          {/* Plan Features */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              What's included in your {plan} plan:
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {getPlanFeatures().map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              className="flex-1 flex items-center gap-2"
              onClick={onClose}
            >
              <CreditCard className="h-4 w-4" />
              Manage Payment Preferences
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 flex items-center gap-2"
              onClick={onClose}
            >
              <Settings className="h-4 w-4" />
              Change Plan
            </Button>
          </div>

          <div className="text-center">
            <Button onClick={onClose} className="w-full">
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionConfirmationDialog;
