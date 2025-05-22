
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Zap } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

type TemplateCardProps = {
  template: {
    id: number;
    name: string;
    category: string;
    image: string;
    popular: boolean;
    new: boolean;
    plan: string;
    colors: string[];
  };
};

export const getPlanBadge = (plan: string) => {
  switch(plan) {
    case "starter":
      return <Badge variant="outline">Starter</Badge>;
    case "pro":
      return <Badge variant="secondary">Pro</Badge>;
    case "premium":
      return <Badge className="bg-gradient-hero text-white">Premium</Badge>;
    default:
      return null;
  }
};

const TemplateCard = ({ template }: TemplateCardProps) => {
  const { isLoggedIn } = useUser();
  const { plan: userPlan, permissions } = useUserPermissions();
  const [applying, setApplying] = useState(false);

  const canUseTemplate = () => {
    // Check if user's plan level is sufficient for this template
    if (template.plan === "starter") return true; // All plans can use starter templates
    if (template.plan === "pro" && (userPlan === "pro" || userPlan === "premium")) return true;
    if (template.plan === "premium" && userPlan === "premium") return true;
    return false;
  };

  const handleUseTemplate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to log in to use this template",
        variant: "destructive",
      });
      return;
    }

    if (!canUseTemplate()) {
      toast({
        title: "Plan Upgrade Required",
        description: `This template requires a ${template.plan} plan or higher`,
        variant: "destructive",
      });
      return;
    }

    setApplying(true);
    try {
      // Simulate applying template
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Template Applied",
        description: `The ${template.name} template has been applied to your profile`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="relative overflow-hidden">
        {/* Template preview with gradient overlay */}
        <div 
          className="w-full h-56"
          style={{
            background: template.colors.length > 2 
              ? `linear-gradient(45deg, ${template.colors.join(', ')})`
              : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
          }}
        >
          {/* Template mock content */}
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-white rounded-full mb-2"></div>
            <div className="w-24 h-3 bg-white/80 rounded-full mb-1.5"></div>
            <div className="w-32 h-2 bg-white/60 rounded-full mb-3"></div>
            <div className="w-32 h-6 bg-white/90 rounded-full mb-2"></div>
            <div className="flex flex-col items-center gap-1.5 w-3/4">
              <div className="w-full h-4 bg-white/50 rounded-md"></div>
              <div className="w-full h-4 bg-white/50 rounded-md"></div>
              <div className="w-full h-4 bg-white/50 rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          {template.popular && <Badge className="bg-primary text-white"><Star className="h-3 w-3 mr-1" /> Popular</Badge>}
          {template.new && <Badge variant="secondary"><Zap className="h-3 w-3 mr-1" /> New</Badge>}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">{template.name}</h3>
          {getPlanBadge(template.plan)}
        </div>
        <div className="flex justify-between items-center">
          <Link 
            to={`/templates/${template.id}`}
            className="text-primary font-medium hover:underline flex items-center"
          >
            Preview <ArrowRight className="ml-1" size={16} />
          </Link>
          <Button 
            size="sm" 
            className="bg-gradient-hero hover:scale-105 transition-transform"
            onClick={handleUseTemplate}
            disabled={applying}
          >
            {applying ? "Applying..." : "Use Template"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
