
import { Button } from "@/components/ui/button";
import { Lock, Heart, ShoppingCart, BookOpen } from "lucide-react";

type PlanType = 'free' | 'starter' | 'pro' | 'premium';

interface PlanSelectorProps {
  selectedPlan: PlanType;
  onPlanChange: (plan: PlanType) => void;
}

const PlanSelector = ({ selectedPlan, onPlanChange }: PlanSelectorProps) => {
  const planColors: Record<PlanType, string> = {
    free: 'bg-gray-500',
    starter: 'bg-green-500',
    pro: 'bg-blue-500',
    premium: 'bg-purple-500'
  };

  const planIcons: Record<PlanType, JSX.Element> = {
    free: <Lock className="w-4 h-4" />,
    starter: <Heart className="w-4 h-4" />,
    pro: <ShoppingCart className="w-4 h-4" />,
    premium: <BookOpen className="w-4 h-4" />
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {(['free', 'starter', 'pro', 'premium'] as const).map((plan) => (
        <Button
          key={plan}
          variant={selectedPlan === plan ? "default" : "outline"}
          onClick={() => onPlanChange(plan)}
          className={`flex items-center gap-2 ${
            selectedPlan === plan ? planColors[plan] + ' text-white' : ''
          }`}
        >
          {planIcons[plan]}
          {plan.charAt(0).toUpperCase() + plan.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default PlanSelector;
