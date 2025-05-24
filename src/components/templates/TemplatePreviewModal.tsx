
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, Instagram, Twitter, Facebook, Linkedin, Youtube, Link as LinkIcon, Check, Lock } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";
import { applyTemplateToProfile } from "@/services/templateService";
import { getPlanBadge } from "./TemplateCard";

interface Template {
  id: number;
  name: string;
  category: string;
  colors: string[];
  plan: string;
  popular: boolean;
  new: boolean;
}

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

const TemplatePreviewModal = ({ template, isOpen, onClose }: TemplatePreviewModalProps) => {
  const { isLoggedIn, user } = useUser();
  const { plan: userPlan, permissions } = useUserPermissions();
  const [applying, setApplying] = useState(false);

  if (!template) return null;

  const canUseTemplate = () => {
    if (permissions.hasFullAdminAccess) return true;
    
    const planHierarchy = { free: 0, starter: 1, pro: 2, premium: 3 };
    const userPlanLevel = planHierarchy[userPlan] || 0;
    const templatePlanLevel = planHierarchy[template.plan] || 0;
    
    return userPlanLevel >= templatePlanLevel;
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
      toast({
        title: "Plan Upgrade Required",
        description: `This template requires a ${template.plan} plan or higher`,
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
      onClose();
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

  const gradientBg = template.colors.length >= 2 
    ? `linear-gradient(135deg, ${template.colors.join(', ')})`
    : `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[0]}cc)`;

  const isLocked = !canUseTemplate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl">{template.name}</DialogTitle>
              {getPlanBadge(template.plan)}
              {template.popular && <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>}
              {template.new && <Badge className="bg-green-500 text-white text-xs">New</Badge>}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Live Preview</h3>
            <div className="border rounded-xl overflow-hidden shadow-lg">
              <div 
                className="h-[500px] relative"
                style={{ background: gradientBg }}
              >
                {/* Mockup Profile Content */}
                <div className="flex flex-col items-center justify-start pt-8 h-full px-4 relative">
                  {/* Profile Avatar */}
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-3 border-3 border-white/30 shadow-lg"></div>
                  
                  {/* Profile Name */}
                  <div className="w-32 h-4 bg-white/80 rounded-full mb-1 shadow-sm"></div>
                  <div className="w-40 h-3 bg-white/60 rounded-full mb-6 shadow-sm"></div>
                  
                  {/* Links */}
                  <div className="w-full max-w-xs space-y-3">
                    {/* Featured Link */}
                    <div className="w-full h-12 bg-white/90 rounded-lg shadow-md flex items-center px-3 backdrop-blur-sm">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 mr-3"></div>
                      <div className="flex-1">
                        <div className="w-3/4 h-3 bg-black/20 rounded-sm mb-1"></div>
                        <div className="w-1/2 h-2 bg-black/10 rounded-sm"></div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-black/40" />
                    </div>
                    
                    {/* Regular Links */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-full h-10 bg-white/70 rounded-lg flex items-center px-3 backdrop-blur-sm shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-white/70 mr-3"></div>
                        <div className="flex-1">
                          <div className="w-2/3 h-2.5 bg-black/20 rounded-sm"></div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-black/20" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Social Icons */}
                  <div className="flex justify-center gap-3 mt-6">
                    {[Instagram, Twitter, Facebook, Linkedin, Youtube].map((Icon, i) => (
                      <div key={i} className="w-8 h-8 bg-white/70 rounded-full shadow-sm backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-4 h-4 text-black/40" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Lock overlay for restricted templates */}
                {isLocked && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center text-white bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                      <Lock className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-lg font-bold mb-1">
                        {template.plan.toUpperCase()} Required
                      </div>
                      <div className="text-sm opacity-90">
                        Upgrade to use this template
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Template Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Template Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Category:</span> {template.category}</p>
                <p><span className="font-medium">Plan Required:</span> {template.plan}</p>
                <div>
                  <span className="font-medium">Colors:</span>
                  <div className="flex gap-2 mt-1">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Responsive design for all devices</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Custom gradient backgrounds</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Optimized link display</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Social media integration</span>
                </li>
                {template.plan !== 'free' && (
                  <>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Advanced animations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Premium styling options</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="pt-4 border-t">
              {isLocked ? (
                <div className="space-y-3">
                  <div className="text-sm text-orange-600 font-medium">
                    This template requires a {template.plan} plan or higher
                  </div>
                  <Button className="w-full" variant="outline">
                    Upgrade to {template.plan}
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleUseTemplate} 
                  disabled={applying}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:scale-105 transition-transform"
                >
                  {applying ? "Applying Template..." : "Use This Template"}
                  {!applying && <Check className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
