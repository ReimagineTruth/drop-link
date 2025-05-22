
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Globe, Server, BookOpen } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

const GetStartedSection = () => {
  const { isLoggedIn } = useUser();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  return (
    <section className="py-16 px-4 bg-muted" id="get-started">
      <div className="container mx-auto max-w-4xl">
        <AnimatedContainer animation="fade" className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get Started with Development</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Follow these steps to start integrating Droplink into your applications.
          </p>
        </AnimatedContainer>
        
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedContainer
            animation="slide-right" 
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredCard('frontend')}
            onMouseLeave={() => setHoveredCard(null)}
            motionProps={{
              animate: {
                y: hoveredCard === 'frontend' ? -5 : 0,
                boxShadow: hoveredCard === 'frontend' ? "0 10px 30px rgba(0,0,0,0.1)" : "0 0px 0px rgba(0,0,0,0)"
              },
              transition: { duration: 0.3 }
            }}
          >
            <Card className="p-6 h-full flex flex-col">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Frontend Developers</h3>
              <ul className="space-y-3 mb-auto">
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Create a Developer Account</p>
                    <p className="text-sm text-muted-foreground">Sign up for a Droplink developer account</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Generate API Key</p>
                    <p className="text-sm text-muted-foreground">Create an API key in your developer dashboard</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Install SDK</p>
                    <p className="text-sm text-muted-foreground">Add our JavaScript SDK to your project</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <p className="font-medium">Implement Pi Payments</p>
                    <p className="text-sm text-muted-foreground">Add Pi Network payment functionality</p>
                  </div>
                </li>
              </ul>
              
              <Button className="w-full mt-6 gap-2" asChild>
                {isLoggedIn ? (
                  <Link to="/dashboard">Access Developer Dashboard <ArrowRight size={16} /></Link>
                ) : (
                  <Link to="/signup?developer=true">Create Developer Account <ArrowRight size={16} /></Link>
                )}
              </Button>
            </Card>
          </AnimatedContainer>
          
          <AnimatedContainer
            animation="slide-left" 
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredCard('backend')}
            onMouseLeave={() => setHoveredCard(null)}
            motionProps={{
              animate: {
                y: hoveredCard === 'backend' ? -5 : 0,
                boxShadow: hoveredCard === 'backend' ? "0 10px 30px rgba(0,0,0,0.1)" : "0 0px 0px rgba(0,0,0,0)"
              },
              transition: { duration: 0.3 }
            }}
          >
            <Card className="p-6 h-full flex flex-col">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Backend Developers</h3>
              <ul className="space-y-3 mb-auto">
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Create a Developer Account</p>
                    <p className="text-sm text-muted-foreground">Sign up for a Droplink developer account</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Set Up Webhooks</p>
                    <p className="text-sm text-muted-foreground">Configure webhook endpoints to receive events</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Implement Payment Verification</p>
                    <p className="text-sm text-muted-foreground">Verify Pi payments on your server</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <p className="font-medium">Store User Data</p>
                    <p className="text-sm text-muted-foreground">Securely store and manage user information</p>
                  </div>
                </li>
              </ul>
              
              <Button className="w-full mt-6 gap-2" variant="outline" asChild>
                <a href="#api-docs" className="flex items-center justify-center">
                  View API Documentation <BookOpen size={16} className="ml-2" />
                </a>
              </Button>
            </Card>
          </AnimatedContainer>
        </div>
        
        {/* Additional resources section */}
        <div className="mt-12 p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-4">Documentation & Resources</h3>
          <p className="mb-6">
            Our documentation is open to everyone - browse through our guides, examples, and resources to help you implement Droplink's features in your applications.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start" asChild>
              <a href="#api-docs" className="flex items-center gap-2">
                <Code size={16} />
                API Reference
              </a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="https://github.com/droplink/examples" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <BookOpen size={16} />
                Code Samples
              </a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link to="/help" className="flex items-center gap-2">
                <Globe size={16} />
                Integration Guide
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
