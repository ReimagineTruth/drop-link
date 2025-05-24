
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Eye } from "lucide-react";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Templates = () => {
  const { plan, permissions } = useUserPermissions();
  const [applyingTemplate, setApplyingTemplate] = useState<number | null>(null);

  const templates = [
    {
      id: 1,
      name: "Minimalist",
      category: "Business",
      colors: ["#ffffff", "#000000"],
      popular: false,
      new: false,
      plan: "starter",
      preview: "Clean and simple design perfect for professionals"
    },
    {
      id: 2,
      name: "Gradient Sunset",
      category: "Creative",
      colors: ["#ff6b6b", "#feca57", "#48cae4"],
      popular: true,
      new: false,
      plan: "pro",
      preview: "Vibrant gradient design for creative professionals"
    },
    {
      id: 3,
      name: "Neon Cyber",
      category: "Tech",
      colors: ["#0f0f0f", "#00ff41", "#ff0080"],
      popular: false,
      new: true,
      plan: "premium",
      preview: "Futuristic neon design for tech enthusiasts"
    },
    {
      id: 4,
      name: "Nature Green",
      category: "Lifestyle",
      colors: ["#27ae60", "#2ecc71", "#f1f2f6"],
      popular: false,
      new: false,
      plan: "starter",
      preview: "Earthy green theme for lifestyle and wellness"
    },
    {
      id: 5,
      name: "Royal Purple",
      category: "Luxury",
      colors: ["#6c5ce7", "#a29bfe", "#fd79a8"],
      popular: true,
      new: false,
      plan: "pro",
      preview: "Elegant purple theme for luxury brands"
    },
    {
      id: 6,
      name: "Ocean Blue",
      category: "Travel",
      colors: ["#0984e3", "#74b9ff", "#00cec9"],
      popular: false,
      new: true,
      plan: "premium",
      preview: "Ocean-inspired design for travel content"
    }
  ];

  const canUseTemplate = (templatePlan: string) => {
    if (templatePlan === "starter") return true;
    if (templatePlan === "pro" && (plan === "pro" || plan === "premium")) return true;
    if (templatePlan === "premium" && plan === "premium") return true;
    return false;
  };

  const getPlanBadge = (templatePlan: string) => {
    switch(templatePlan) {
      case "starter":
        return <Badge variant="outline" className="text-xs">Starter</Badge>;
      case "pro":
        return <Badge variant="secondary" className="text-xs">Pro</Badge>;
      case "premium":
        return <Badge className="bg-gradient-hero text-white text-xs">Premium</Badge>;
      default:
        return null;
    }
  };

  const handleUseTemplate = async (template: any) => {
    if (!canUseTemplate(template.plan)) {
      toast({
        title: "Plan Upgrade Required",
        description: `This template requires a ${template.plan} plan or higher`,
        variant: "destructive",
      });
      return;
    }

    setApplyingTemplate(template.id);
    try {
      // Simulate applying template
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      setApplyingTemplate(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Templates</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates to make your page stand out
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Your current plan: <span className="font-semibold text-primary">{plan}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-all overflow-hidden">
                <div className="relative">
                  {/* Template preview */}
                  <div 
                    className="w-full h-48 relative"
                    style={{
                      background: `linear-gradient(45deg, ${template.colors.join(', ')})`
                    }}
                  >
                    {/* Mock profile preview */}
                    <div className="flex flex-col items-center justify-center h-full px-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full mb-2"></div>
                      <div className="w-20 h-2 bg-white/60 rounded-full mb-1"></div>
                      <div className="w-24 h-1.5 bg-white/40 rounded-full mb-3"></div>
                      <div className="space-y-1.5 w-full max-w-32">
                        <div className="h-3 bg-white/50 rounded-md"></div>
                        <div className="h-3 bg-white/50 rounded-md"></div>
                        <div className="h-3 bg-white/50 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {template.popular && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {template.new && (
                      <Badge className="bg-green-500 text-white text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>

                  <div className="absolute top-2 right-2">
                    {getPlanBadge(template.plan)}
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{template.preview}</p>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    
                    <Button
                      size="sm"
                      className={`flex-1 ${
                        canUseTemplate(template.plan)
                          ? "bg-gradient-hero hover:bg-secondary"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      onClick={() => handleUseTemplate(template)}
                      disabled={!canUseTemplate(template.plan) || applyingTemplate === template.id}
                    >
                      {applyingTemplate === template.id ? "Applying..." : 
                       canUseTemplate(template.plan) ? "Use Template" : "Upgrade Required"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Want More Templates?</h3>
            <p className="text-gray-600 mb-4">
              Upgrade your plan to access premium templates and advanced customization options
            </p>
            <Button className="bg-gradient-hero hover:bg-secondary">
              View Pricing Plans
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
