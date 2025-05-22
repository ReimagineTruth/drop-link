
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoPreview from "@/components/DemoPreview";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, MousePointer, BarChart4, ChevronDown, ChevronUp, Globe, Link as LinkIcon, ShieldCheck } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                <Card className="p-4 hover:bg-muted/50 transition-all duration-300 transform hover:scale-[1.02]">
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
                
                <Card className="p-4 hover:bg-muted/50 transition-all duration-300 transform hover:scale-[1.02]">
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
                
                <Card className="p-4 hover:bg-muted/50 transition-all duration-300 transform hover:scale-[1.02]">
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
          
          {/* Demo.pi Domain Integration Section */}
          <AnimatedContainer animation="fade" delay={0.4} className="mt-24 mb-10">
            <div className="text-center mb-12">
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">NEW FEATURE</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Your Demo.pi Domain Integration
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect your .pi domain with Droplink for a seamless experience in the Pi Browser
              </p>
            </div>
            
            <Tabs defaultValue="features" className="w-full max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="features">Key Features</TabsTrigger>
                  <TabsTrigger value="technical">Technical Details</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="features" className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-muted">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="p-6 hover:shadow-md transition-all transform hover:translate-y-[-5px]">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Globe size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">One Memorable URL</h3>
                    <p className="text-muted-foreground">
                      Replace complex links with a simple, memorable yourdomain.pi address that works directly in Pi Browser.
                    </p>
                  </Card>
                  
                  <Card className="p-6 hover:shadow-md transition-all transform hover:translate-y-[-5px]">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <LinkIcon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Native Browser Experience</h3>
                    <p className="text-muted-foreground">
                      Your .pi domain works directly in Pi Browser with no redirection or setup required.
                    </p>
                  </Card>
                  
                  <Card className="p-6 hover:shadow-md transition-all transform hover:translate-y-[-5px]">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Secure Pi Payments</h3>
                    <p className="text-muted-foreground">
                      Monetize your content by accepting Pi cryptocurrency directly through your .pi domain.
                    </p>
                  </Card>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-md">
                    <Link to="/signup" className="flex items-center gap-2">
                      Get Your Demo.pi Domain <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-muted">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">How Pi Domains Work</h3>
                    <p className="text-muted-foreground">
                      Pi domains are part of the Pi Network ecosystem, providing a decentralized naming system that works natively in the Pi Browser. Droplink integrates seamlessly with these domains.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card className="p-4 bg-muted/30">
                      <h4 className="font-semibold mb-2">Domain Registration</h4>
                      <p className="text-sm text-muted-foreground">Register your .pi domain directly through the Pi Browser or through our platform with a simple one-click process.</p>
                    </Card>
                    
                    <Card className="p-4 bg-muted/30">
                      <h4 className="font-semibold mb-2">Automatic DNS Configuration</h4>
                      <p className="text-sm text-muted-foreground">Our platform automatically configures the necessary DNS settings to connect your Droplink profile to your .pi domain.</p>
                    </Card>
                    
                    <Card className="p-4 bg-muted/30">
                      <h4 className="font-semibold mb-2">Pi Browser Integration</h4>
                      <p className="text-sm text-muted-foreground">Pi Browser recognizes .pi domains natively, allowing for direct access without any redirects or additional apps.</p>
                    </Card>
                    
                    <Card className="p-4 bg-muted/30">
                      <h4 className="font-semibold mb-2">Payment Processing</h4>
                      <p className="text-sm text-muted-foreground">We handle all the technical aspects of Pi payment processing, making it seamless for both you and your audience.</p>
                    </Card>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-md">
                    <Link to="/developers" className="flex items-center gap-2">
                      Technical Documentation <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedContainer>
          
          {/* FAQ Accordion Section */}
          <AnimatedContainer animation="fade" delay={0.5} className="mt-20 mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mt-2">Get quick answers about our Demo.pi domain integration</p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
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
              
              <div className="border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
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
              
              <div className="border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
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
              
              <div className="border rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                <button 
                  onClick={() => toggleSection('faq4')} 
                  className="w-full flex justify-between items-center p-4 bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <span className="font-medium">How do I set up my Demo.pi domain?</span>
                  {activeSection === 'faq4' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {activeSection === 'faq4' && (
                  <div className="p-4 bg-white">
                    <p>After signing up for Droplink, you'll find a dedicated section in your dashboard for domain management. From there, you can register a new .pi domain or connect an existing one with just a few clicks.</p>
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
            <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 transition-colors shadow-md">
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
