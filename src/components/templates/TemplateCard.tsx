
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Zap, Lock, Eye } from "lucide-react";
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
    case "free":
      return <Badge variant="outline" className="text-xs">Free</Badge>;
    case "starter":
      return <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600">Starter</Badge>;
    case "pro":
      return <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-600">Pro</Badge>;
    case "premium":
      return <Badge className="bg-gradient-hero text-white text-xs">Premium</Badge>;
    default:
      return null;
  }
};

const TemplateCard = ({ template }: TemplateCardProps) => {
  const { isLoggedIn } = useUser();
  const { plan: userPlan, permissions } = useUserPermissions();
  const [applying, setApplying] = useState(false);

  const canUseTemplate = () => {
    // Admin users can use all templates
    if (permissions.hasFullAdminAccess) return true;
    
    // Check if user's plan level is sufficient for this template
    const planHierarchy = { free: 0, starter: 1, pro: 2, premium: 3 };
    const userPlanLevel = planHierarchy[userPlan] || 0;
    const templatePlanLevel = planHierarchy[template.plan] || 0;
    
    return userPlanLevel >= templatePlanLevel;
  };

  const getRequiredPlan = () => {
    if (template.plan === "free") return null;
    return template.plan;
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
      const requiredPlan = getRequiredPlan();
      toast({
        title: "Plan Upgrade Required",
        description: `This template requires a ${requiredPlan} plan or higher`,
        variant: "destructive",
      });
      return;
    }

    setApplying(true);
    try {
      // Simulate applying template
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Template Applied Successfully!",
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

  const isLocked = !canUseTemplate();

  return (
    <div className={`group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${isLocked ? 'opacity-75' : ''}`}>
      <div className="relative overflow-hidden">
        {/* Template preview with more detailed mock content */}
        <div 
          className="w-full h-48 md:h-56 relative"
          style={{
            background: template.colors.length > 2 
              ? `linear-gradient(45deg, ${template.colors.join(', ')})`
              : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
          }}
        >
          {/* Enhanced template mock content */}
          <div className="flex flex-col items-center justify-center h-full px-4 relative">
            {/* Profile avatar */}
            <div className="w-12 md:w-16 h-12 md:h-16 bg-white/20 backdrop-blur-sm rounded-full mb-2 border-2 border-white/30"></div>
            
            {/* Name and bio */}
            <div className="w-20 md:w-24 h-2.5 md:h-3 bg-white/80 rounded-full mb-1.5"></div>
            <div className="w-24 md:w-32 h-1.5 md:h-2 bg-white/60 rounded-full mb-3"></div>
            
            {/* Featured link */}
            <div className="w-24 md:w-32 h-5 md:h-6 bg-white/90 rounded-full mb-2 shadow-sm"></div>
            
            {/* Regular links */}
            <div className="flex flex-col items-center gap-1 md:gap-1.5 w-full max-w-[200px]">
              <div className="w-full h-3 md:h-4 bg-white/50 rounded-md backdrop-blur-sm"></div>
              <div className="w-full h-3 md:h-4 bg-white/50 rounded-md backdrop-blur-sm"></div>
              <div className="w-4/5 h-3 md:h-4 bg-white/50 rounded-md backdrop-blur-sm"></div>
            </div>
            
            {/* Social icons */}
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-4 h-4 bg-white/40 rounded-full"></div>
              ))}
            </div>
          </div>
          
          {/* Lock overlay for restricted templates */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
              <div className="text-center text-white">
                <Lock className="w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-medium">
                  {getRequiredPlan()?.toUpperCase()} Required
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 md:top-3 left-2 md:left-3 flex gap-1 md:gap-2">
          {template.popular && <Badge className="bg-orange-500 text-white text-xs"><Star className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" /> Popular</Badge>}
          {template.new && <Badge variant="secondary" className="bg-green-500 text-white text-xs"><Zap className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" /> New</Badge>}
        </div>
        
        <div className="absolute top-2 md:top-3 right-2 md:right-3">
          {getPlanBadge(template.plan)}
        </div>
      </div>
      
      <div className="p-3 md:p-5">
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <div>
            <h3 className="text-lg md:text-xl font-semibold leading-tight">{template.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground capitalize">{template.category}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center gap-2">
          <Link 
            to={`/templates/${template.id}`}
            className="text-primary font-medium hover:underline flex items-center text-sm md:text-base"
          >
            <Eye className="mr-1" size={14} />
            Preview
          </Link>
          
          <Button 
            size="sm" 
            className={`${
              isLocked 
                ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' 
                : 'bg-gradient-hero hover:scale-105 transition-transform'
            } text-xs md:text-sm px-2 md:px-3`}
            onClick={handleUseTemplate}
            disabled={applying || isLocked}
          >
            {applying ? "Applying..." : 
             isLocked ? `Upgrade to ${getRequiredPlan()}` : 
             "Use Template"}
          </Button>
        </div>
        
        {isLocked && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Unlock with {getRequiredPlan()} plan
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateCard;
