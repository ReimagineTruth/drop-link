
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SubscriptionDetailsCardProps {
  plan: string;
  expiryDate: string;
  startDate: string;
  billingCycle: 'monthly' | 'annual';
  amount: number;
}

const SubscriptionDetailsCard = ({
  plan,
  expiryDate,
  startDate,
  billingCycle,
  amount
}: SubscriptionDetailsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlanColors = () => {
    switch (plan.toLowerCase()) {
      case 'premium':
        return {
          badge: "bg-gradient-to-r from-purple-500 to-pink-500",
          icon: "text-purple-500"
        };
      case 'pro':
        return {
          badge: "bg-gradient-to-r from-blue-500 to-cyan-500",
          icon: "text-blue-500"
        };
      case 'starter':
      default:
        return {
          badge: "bg-gradient-to-r from-green-500 to-teal-500",
          icon: "text-green-500"
        };
    }
  };

  const calculateDaysRemaining = () => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const start = new Date(startDate);
    
    const totalDuration = expiry.getTime() - start.getTime();
    const elapsed = today.getTime() - start.getTime();
    
    const daysTotal = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil(elapsed / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, daysTotal - daysElapsed);
    
    const progressPercentage = Math.min(100, Math.max(0, (daysElapsed / daysTotal) * 100));
    
    return {
      daysRemaining,
      progressPercentage: Math.round(progressPercentage)
    };
  };

  const { daysRemaining, progressPercentage } = calculateDaysRemaining();
  const colors = getPlanColors();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Subscription Details</CardTitle>
            <Badge className={`${colors.badge} text-white`}>
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className={`h-5 w-5 mr-2 ${colors.icon}`} />
                <span className="text-sm font-medium">Time Remaining</span>
              </div>
              <span className="text-sm font-bold">{daysRemaining} days</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Started: {formatDate(startDate)}</span>
              <span>Expires: {formatDate(expiryDate)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center"
            >
              <Badge variant="outline" className="mb-2">Billing</Badge>
              <p className="font-medium">{billingCycle === 'annual' ? 'Annual' : 'Monthly'}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center"
            >
              <Badge variant="outline" className="mb-2">Amount</Badge>
              <p className="font-medium">{amount} π</p>
            </motion.div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100"
          >
            <div className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <h4 className="font-medium">Benefits</h4>
            </div>
            <ul className="mt-2 space-y-1">
              {getPlanBenefits(plan).map((benefit, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const getPlanBenefits = (plan: string) => {
  const baseBenefits = ["Unlimited Links", "Pi Payments", "Basic Analytics"];
  
  if (plan.toLowerCase() === "pro") {
    return [
      ...baseBenefits,
      "Custom Themes",
      "Performance Analytics",
      "QR Codes"
    ];
  }
  
  if (plan.toLowerCase() === "premium") {
    return [
      ...baseBenefits,
      "Custom Themes",
      "Performance Analytics",
      "QR Codes",
      "Priority Support",
      "Advanced Pi Payments"
    ];
  }
  
  return baseBenefits;
};

export default SubscriptionDetailsCard;
