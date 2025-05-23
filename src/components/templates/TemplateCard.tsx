
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Zap, Lock, Eye, Share2, Heart, ExternalLink } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { applyTemplateToProfile } from "@/services/templateService";
import TemplatePreviewModal from "./TemplatePreviewModal";

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
      return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">Premium</Badge>;
    default:
      return null;
  }
};

const TemplateCard = ({ template }: TemplateCardProps) => {
  const { isLoggedIn, user } = useUser();
  const { plan: userPlan, permissions } = useUserPermissions();
  const [applying, setApplying] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const canUseTemplate = () => {
    if (permissions.hasFullAdminAccess) return true;
    
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
    if (!isLoggedIn || !user) {
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
      await applyTemplateToProfile(user.id, template.id);
      
      toast({
        title: "Template Applied Successfully!",
        description: `The ${template.name} template has been applied to your profile`,
      });
    } catch (error) {
      console.error("Template application error:", error);
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
    <>
      <div className={`group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${isLocked ? 'opacity-75' : ''}`}>
        <div className="relative overflow-hidden">
          <div 
            className="w-full h-48 md:h-56 relative cursor-pointer"
            style={{
              background: template.colors.length > 2 
                ? `linear-gradient(45deg, ${template.colors.join(', ')})`
                : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
            }}
            onClick={() => setShowPreview(true)}
          >
            {/* Enhanced template preview */}
            <div className="flex flex-col items-center justify-center h-full px-4 relative">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-white/20 backdrop-blur-sm rounded-full mb-2 border-2 border-white/30"></div>
              <div className="w-20 md:w-24 h-2.5 md:h-3 bg-white/80 rounded-full mb-1.5"></div>
              <div className="w-24 md:w-32 h-1.5 md:h-2 bg-white/60 rounded-full mb-3"></div>
              <div className="w-24 md:w-32 h-5 md:h-6 bg-white/90 rounded-full mb-2 shadow-sm"></div>
              <div className="flex flex-col items-center gap-1 md:gap-1.5 w-full max-w-[200px]">
                <div className="w-full h-3 md:h-4 bg-white/50 rounded-md backdrop-blur-sm"></div>
                <div className="w-full h-3 md:h-4 bg-white/50 rounded-md backdrop-blur-sm"></div>
                <div className="w-4/5 h-3 md:h-4 bg-white/50 rounded-md backdrop-blur-sm"></div>
              </div>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-4 h-4 bg-white/40 rounded-full"></div>
                ))}
              </div>
            </div>
            
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

            {/* Preview overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-800">
                Click to Preview
              </div>
            </div>
          </div>
          
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
            <Button 
              variant="outline"
              size="sm" 
              onClick={() => setShowPreview(true)}
              className="text-primary font-medium flex items-center text-sm md:text-base"
            >
              <Eye className="mr-1" size={14} />
              Preview
            </Button>
            
            <Button 
              size="sm" 
              className={`${
                isLocked 
                  ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary to-blue-600 hover:scale-105 transition-transform'
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

      <TemplatePreviewModal
        template={template}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
};

export default TemplateCard;
