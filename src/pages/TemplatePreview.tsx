
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { templatesData } from "@/data/templatesData";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";

const TemplatePreview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const { plan: userPlan } = useUserPermissions();
  
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Template Applied",
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

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{template.name} Template | Droplink.space</title>
        <meta name="description" content={`Preview the ${template.name} template for your Droplink profile.`} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link to="/templates" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Templates
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{template.name} Template</h1>
                <div className="flex items-center mt-2">
                  <span className="text-muted-foreground mr-2">Category:</span>
                  <span className="capitalize">{template.category}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                {needsUpgrade ? (
                  <Button asChild className="bg-gradient-hero hover:scale-105 transition-transform">
                    <Link to="/pricing">Upgrade to {template.plan}</Link>
                  </Button>
                ) : (
                  <Button 
                    onClick={handleUseTemplate} 
                    disabled={applying}
                    className="bg-gradient-hero hover:scale-105 transition-transform"
                  >
                    {applying ? "Applying..." : "Use This Template"} 
                    {!applying && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-card shadow-lg rounded-xl overflow-hidden">
            {/* Full-size template preview */}
            <div className="h-[600px] w-full relative">
              <div 
                className="absolute inset-0 bg-gradient-to-br"
                style={{
                  background: template.colors.length > 2 
                    ? `linear-gradient(45deg, ${template.colors.join(', ')})`
                    : `linear-gradient(45deg, ${template.colors[0]}, ${template.colors[1]})`
                }}
              >
                {/* Larger mockup of the template */}
                <div className="flex flex-col items-center justify-start pt-16 h-full">
                  <div className="w-24 h-24 bg-white rounded-full mb-4"></div>
                  <div className="w-48 h-5 bg-white/80 rounded-full mb-2"></div>
                  <div className="w-64 h-4 bg-white/60 rounded-full mb-6"></div>
                  
                  <div className="w-80 mx-auto">
                    <div className="w-full h-10 bg-white/90 rounded-md mb-4 flex items-center justify-center">
                      <div className="w-1/2 h-5 bg-black/10 rounded-sm"></div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full h-12 bg-white/50 rounded-md flex items-center px-4">
                          <div className="w-8 h-8 rounded-full bg-white/70 mr-3"></div>
                          <div className="w-3/4 h-4 bg-white/70 rounded-sm"></div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 bg-white/70 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-background">
              <h2 className="text-2xl font-semibold mb-4">Template Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Custom color palette</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Responsive layout</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Modern design</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>Optimized link display</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Availability</h3>
                  <p className="mb-2">This template is available for <span className="font-semibold capitalize">{template.plan}</span> plan users and above.</p>
                  
                  {needsUpgrade ? (
                    <Button asChild variant="outline" className="mt-2">
                      <Link to="/pricing">View Pricing</Link>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={handleUseTemplate} 
                      disabled={applying}
                      className="mt-2"
                    >
                      {applying ? "Applying..." : "Apply Template"}
                    </Button>
                  )}
                </div>
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
