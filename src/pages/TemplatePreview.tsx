
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Crown, Star, Zap, Lock, Eye, Share2, Heart, ExternalLink } from "lucide-react";
import { templatesData } from "@/data/templatesData";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";
import { getPlanBadge } from "@/components/templates/TemplateCard";

const TemplatePreview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const { plan: userPlan, permissions } = useUserPermissions();
  
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (id) {
      const templateId = parseInt(id);
      const foundTemplate = templatesData.find(t => t.id === templateId);
      
      if (foundTemplate) {
        setTemplate(foundTemplate);
      } else {
        toast({
          title: "Template Not Found",
          description: "The requested template could not be found",
          variant: "destructive",
        });
        navigate("/templates");
      }
    }
    
    setLoading(false);
  }, [id, navigate]);

  const canUseTemplate = () => {
    if (!template) return false;
    
    // Admin users can use all templates
    if (permissions.hasFullAdminAccess) return true;
    
    // Check if user's plan level is sufficient for this template
    const planHierarchy = { free: 0, starter: 1, pro: 2, premium: 3 };
    const userPlanLevel = planHierarchy[userPlan] || 0;
    const templatePlanLevel = planHierarchy[template.plan] || 0;
    
    return userPlanLevel >= templatePlanLevel;
  };

  const handleUseTemplate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to log in to use this template",
        variant: "destructive",
      });
      navigate('/login');
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Template Applied Successfully!",
        description: `The ${template.name} template has been applied to your profile`,
      });
      
      // Navigate to dashboard after successful application
      navigate("/dashboard");
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

  if (loading || !template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="mt-4">Loading template preview...</p>
      </div>
    );
  }

  const needsUpgrade = !canUseTemplate() && isLoggedIn;
  const isLocked = !canUseTemplate();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{template.name} Template | Droplink.space</title>
        <meta name="description" content={`Preview the ${template.name} template for your Droplink profile. ${template.category} category template available for ${template.plan} plan users.`} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4 max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link to="/templates" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">{template.name}</h1>
                {getPlanBadge(template.plan)}
                {template.popular && <Badge className="bg-orange-500 text-white"><Star className="h-3 w-3 mr-1" />Popular</Badge>}
                {template.new && <Badge className="bg-green-500 text-white"><Zap className="h-3 w-3 mr-1" />New</Badge>}
              </div>
              
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <span className="capitalize">Category: {template.category}</span>
                <span>•</span>
                <span>Template ID: #{template.id}</span>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                A beautiful {template.category} template featuring a modern design with gradient colors. 
                Perfect for {template.plan === 'free' ? 'anyone getting started' : `${template.plan} plan users`} 
                looking to create a professional online presence.
              </p>

              {/* Preview Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <Button 
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                >
                  Desktop View
                </Button>
                <Button 
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                >
                  Mobile View
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:w-80">
              <div className="bg-card p-6 rounded-xl border">
                <div className="space-y-4">
                  {needsUpgrade ? (
                    <>
                      <div className="flex items-center gap-2 text-orange-600 mb-3">
                        <Lock className="h-4 w-4" />
                        <span className="font-medium">Upgrade Required</span>
                      </div>
                      <Button asChild className="w-full bg-gradient-hero hover:scale-105 transition-transform">
                        <Link to="/pricing">
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to {template.plan}
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={handleUseTemplate} 
                      disabled={applying}
                      className="w-full bg-gradient-hero hover:scale-105 transition-transform"
                      size="lg"
                    >
                      {applying ? "Applying Template..." : "Use This Template"} 
                      {!applying && <Check className="ml-2 h-4 w-4" />}
                    </Button>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Template Preview */}
          <div className="bg-card shadow-xl rounded-2xl overflow-hidden mb-8">
            <div className={`relative ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
              {/* Preview Container */}
              <div className={`${previewMode === 'mobile' ? 'h-[600px]' : 'h-[700px]'} w-full relative overflow-hidden`}>
                <div 
                  className="absolute inset-0 bg-gradient-to-br"
                  style={{
                    background: template.colors.length > 2 
                      ? `linear-gradient(45deg, ${template.colors.join(', ')})`
                      : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
                  }}
                >
                  {/* Detailed mockup of the template */}
                  <div className="flex flex-col items-center justify-start pt-12 h-full px-6">
                    {/* Profile Section */}
                    <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full mb-4 border-4 border-white/30 shadow-lg"></div>
                    <div className="w-48 h-6 bg-white/80 rounded-full mb-2 shadow-sm"></div>
                    <div className="w-64 h-4 bg-white/60 rounded-full mb-8 shadow-sm"></div>
                    
                    {/* Links Section */}
                    <div className={`w-full ${previewMode === 'mobile' ? 'max-w-xs' : 'max-w-md'} space-y-4`}>
                      {/* Featured Link */}
                      <div className="w-full h-14 bg-white/90 rounded-xl shadow-lg flex items-center px-4 backdrop-blur-sm">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 mr-3"></div>
                        <div className="flex-1">
                          <div className="w-3/4 h-4 bg-black/20 rounded-sm mb-1"></div>
                          <div className="w-1/2 h-3 bg-black/10 rounded-sm"></div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-black/40" />
                      </div>
                      
                      {/* Regular Links */}
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full h-12 bg-white/70 rounded-lg flex items-center px-4 backdrop-blur-sm shadow-md">
                          <div className="w-6 h-6 rounded-full bg-white/70 mr-3"></div>
                          <div className="flex-1">
                            <div className="w-3/4 h-3 bg-black/20 rounded-sm"></div>
                          </div>
                          <div className="text-black/20">
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Social Icons */}
                    <div className="flex justify-center gap-4 mt-8">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-10 h-10 bg-white/70 rounded-full shadow-md backdrop-blur-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Lock overlay for restricted templates */}
                {isLocked && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center text-white bg-black/50 p-6 rounded-xl backdrop-blur-sm">
                      <Lock className="w-12 h-12 mx-auto mb-3" />
                      <div className="text-xl font-bold mb-2">
                        {template.plan.toUpperCase()} Plan Required
                      </div>
                      <div className="text-sm opacity-90">
                        Upgrade your plan to use this template
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Template Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Template Features</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <span>Responsive design that works on all devices</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <span>Custom color palette and gradient backgrounds</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <span>Optimized link display with hover effects</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <span>Social media integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <span>Fast loading and SEO optimized</span>
                </li>
                {template.plan !== 'free' && (
                  <>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <span>Advanced animations and transitions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <span>Custom fonts and typography</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Plan Requirements</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Required Plan</span>
                    {getPlanBadge(template.plan)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This template is available for <span className="font-semibold capitalize">{template.plan}</span> plan users and above.
                  </p>
                </div>
                
                {needsUpgrade && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h3 className="font-medium text-orange-800 mb-2">Upgrade Needed</h3>
                    <p className="text-sm text-orange-700 mb-3">
                      You're currently on the {userPlan} plan. Upgrade to {template.plan} to unlock this template.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/pricing">View Pricing</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TemplatePreview;
