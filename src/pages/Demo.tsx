
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoPreview from "@/components/DemoPreview";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, MousePointer, BarChart4, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Card } from "@/components/ui/card";

const Demo = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <>
      <Helmet>
        <title>Droplink Demo - Try Our Link in Bio Tool for Pi Network</title>
        <meta name="description" content="See Droplink in action with our interactive demo. Experience how our link in bio tool helps Pi Network creators connect with their audience." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen py-16 px-4 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto">
          <AnimatedContainer animation="fade" className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Experience Droplink in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try our interactive demo to see how Droplink can help you create stunning link in bio pages for your Pi Network content.
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedContainer animation="slide" delay={0.2} className="flex flex-col space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="text-lg">
                Our demo gives you a taste of the Droplink experience. Explore a sample profile, interact with links, and see the analytics dashboard.
              </p>
              
              <div className="space-y-4 mt-4">
                <Card className="p-4 hover:bg-muted/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-hero rounded-full p-3 text-white flex-shrink-0">
                      <MousePointer size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Browse a Sample Profile</h3>
                      <p className="text-muted-foreground">See how your links, products, and content will look to your visitors.</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-muted/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-hero rounded-full p-3 text-white flex-shrink-0">
                      <Check size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Interact with Features</h3>
                      <p className="text-muted-foreground">Test Pi payment integration, newsletter signups, and more.</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:bg-muted/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-hero rounded-full p-3 text-white flex-shrink-0">
                      <BarChart4 size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">View Analytics</h3>
                      <p className="text-muted-foreground">See how you can track visits, clicks, and earnings with our dashboard.</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 transition-colors">
                  <Link to="/signup" className="flex items-center gap-2">
                    Create Your Own <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover:bg-blue-50">
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="scale" delay={0.3} className="w-full flex justify-center order-1 lg:order-2">
              <div className="transform hover:shadow-2xl transition-all duration-500">
                <DemoPreview />
              </div>
            </AnimatedContainer>
          </div>
          
          {/* Pi Domain Integration Section */}
          <AnimatedContainer animation="fade" delay={0.4} className="mt-24 mb-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pi Domain Integration
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Use your .pi domains with Droplink to create a seamless experience for your Pi Network audience
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-muted">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <Card className="p-6 hover:shadow-md transition-all">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">π</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">One Memorable URL</h3>
                  <p className="text-muted-foreground">
                    Replace complex links with a simple, memorable yourdomain.pi address that works directly in Pi Browser.
                  </p>
                </Card>
                
                {/* Feature 2 */}
                <Card className="p-6 hover:shadow-md transition-all">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Native Browser Experience</h3>
                  <p className="text-muted-foreground">
                    Your .pi domain works directly in Pi Browser with no redirection or setup required.
                  </p>
                </Card>
                
                {/* Feature 3 */}
                <Card className="p-6 hover:shadow-md transition-all">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Receive Pi Payments</h3>
                  <p className="text-muted-foreground">
                    Monetize your content by accepting Pi cryptocurrency directly through your .pi domain.
                  </p>
                </Card>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/signup" className="flex items-center gap-2">
                    Connect Your .pi Domain <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedContainer>
          
          {/* FAQ Accordion Section */}
          <AnimatedContainer animation="fade" delay={0.5} className="mt-20 mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mt-2">Get quick answers to common questions about our demo</p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection('faq1')} 
                  className="w-full flex justify-between items-center p-4 bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <span className="font-medium">Can I try all premium features in the demo?</span>
                  {activeSection === 'faq1' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeSection === 'faq1' && (
                  <div className="p-4 bg-white">
                    <p>Yes, the demo allows you to explore both free and premium features so you can get a complete idea of what Droplink offers before signing up.</p>
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection('faq2')} 
                  className="w-full flex justify-between items-center p-4 bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <span className="font-medium">How does Pi payment integration work?</span>
                  {activeSection === 'faq2' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeSection === 'faq2' && (
                  <div className="p-4 bg-white">
                    <p>Droplink integrates directly with the Pi Network payment platform, allowing creators to receive Pi cryptocurrency for content, products, or services. In the demo, you can see a simulation of the payment process.</p>
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleSection('faq3')} 
                  className="w-full flex justify-between items-center p-4 bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <span className="font-medium">Is my .pi domain compatible with Droplink?</span>
                  {activeSection === 'faq3' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeSection === 'faq3' && (
                  <div className="p-4 bg-white">
                    <p>Yes! Any registered .pi domain can be seamlessly connected to your Droplink profile. This provides a memorable URL that works natively in the Pi Browser and redirects properly on regular web browsers.</p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer animation="fade" delay={0.6} className="mt-20 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to create your own Droplink page?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Sign up for free and start connecting with your audience through a beautiful, customizable link in bio page that accepts Pi payments.
            </p>
            <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 transition-colors">
              <Link to="/signup">Get Started for Free</Link>
            </Button>
          </AnimatedContainer>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Demo;
