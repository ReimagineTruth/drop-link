
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoPreview from "@/components/DemoPreview";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, MousePointer, BarChart4, ChevronDown, ChevronUp, Globe, LinkIcon, ShieldCheck, Play, Smartphone, Users, Star, Zap } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Demo = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [demoStep, setDemoStep] = useState(1);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const demoSteps = [
    {
      title: "Browse Profile",
      description: "Explore how your content looks to visitors",
      icon: <MousePointer className="w-5 h-5" />
    },
    {
      title: "Test Interactions",
      description: "Try Pi payments and link interactions",
      icon: <Play className="w-5 h-5" />
    },
    {
      title: "View Analytics",
      description: "See dashboard insights and metrics",
      icon: <BarChart4 className="w-5 h-5" />
    }
  ];

  const piDomainBenefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Native Pi Browser Support",
      description: "Works seamlessly in Pi Browser without redirects"
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: "Memorable URLs",
      description: "Share simple yourdomain.pi addresses"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure Pi Payments",
      description: "Accept Pi cryptocurrency with full security"
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      username: "@alexcrypto",
      content: "Droplink helped me grow my Pi Network community by 300%! The analytics are incredible.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sarah Williams", 
      username: "@sarahpi",
      content: "Best link-in-bio tool for Pi creators. The Pi payment integration is seamless!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mike Rodriguez",
      username: "@mikebuilds",
      content: "Professional features at an affordable price. My conversion rate doubled!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const faqData = [
    {
      id: 'faq1',
      question: "Can I try all premium features in the demo?",
      answer: "Yes! Our demo gives you access to explore both free and premium features so you can experience the full potential of Droplink before signing up."
    },
    {
      id: 'faq2', 
      question: "How does Pi payment integration work?",
      answer: "Droplink integrates directly with Pi Network's payment system, allowing you to accept Pi cryptocurrency for content, products, or services. The demo shows you exactly how this works."
    },
    {
      id: 'faq3',
      question: "Is my .pi domain compatible with Droplink?",
      answer: "Absolutely! Any registered .pi domain can be connected to your Droplink profile. This creates a memorable URL that works natively in Pi Browser and redirects properly on other browsers."
    },
    {
      id: 'faq4',
      question: "How accurate is the demo data?",
      answer: "The demo uses realistic sample data to show you exactly how your dashboard, analytics, and profile will look with real traffic and interactions."
    },
    {
      id: 'faq5',
      question: "Do I need a Pi Network account to use the demo?",
      answer: "No! The demo is completely free and doesn't require any account. However, to create your own profile and accept Pi payments, you'll need a Pi Network account."
    },
    {
      id: 'faq6',
      question: "Can I export my demo data when I sign up?",
      answer: "The demo uses sample data for demonstration purposes only. When you create your real account, you'll start fresh with your own analytics and content."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Interactive Demo - Droplink | Try Our Pi Network Link Tool</title>
        <meta name="description" content="Experience Droplink with our interactive demo. See how our link-in-bio tool works with Pi Network integration, analytics, and payment features." />
        <meta property="og:title" content="Interactive Demo - Droplink | Try Our Pi Network Link Tool" />
        <meta property="og:description" content="Experience Droplink with our interactive demo. See how our link-in-bio tool works with Pi Network integration, analytics, and payment features." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interactive Demo - Droplink" />
        <meta name="twitter:description" content="Try our interactive demo and see why creators choose Droplink" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20">
        <Navbar />
        
        <main className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Hero Section */}
            <AnimatedContainer animation="fade" className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Play className="w-4 h-4 mr-2" />
                Interactive Demo
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                See Droplink in Action
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Experience the power of Droplink with our interactive demo. Test Pi Network integration, explore analytics, and see how easy it is to create stunning link-in-bio pages.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg">
                  <a href="#demo" className="flex items-center gap-2">
                    Start Demo <ArrowRight size={18} />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5" asChild>
                  <Link to="/signup">Create Free Account</Link>
                </Button>
              </div>

              {/* Demo Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {demoSteps.map((step, index) => (
                  <AnimatedContainer key={index} animation="scale" delay={0.1 * (index + 1)}>
                    <Card className={`transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      demoStep === index + 1 ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`} onClick={() => setDemoStep(index + 1)}>
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          demoStep === index + 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {step.icon}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </CardContent>
                    </Card>
                  </AnimatedContainer>
                ))}
              </div>
            </AnimatedContainer>
            
            {/* Main Demo Section */}
            <div id="demo" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
              {/* Demo Preview */}
              <AnimatedContainer animation="scale" delay={0.3} className="lg:sticky lg:top-8">
                <div className="transform hover:shadow-2xl transition-all duration-500 relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-400/20 rounded-3xl blur-xl opacity-50"></div>
                  <div className="relative">
                    <DemoPreview />
                  </div>
                </div>
              </AnimatedContainer>
              
              {/* Demo Information */}
              <AnimatedContainer animation="slide" delay={0.2} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">How the Demo Works</h2>
                  <div className="space-y-6">
                    {demoSteps.map((step, index) => (
                      <Card key={index} className={`transition-all duration-300 ${
                        demoStep === index + 1 ? 'border-primary shadow-lg bg-primary/5' : 'hover:shadow-md'
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              demoStep === index + 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {step.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                              <p className="text-gray-600 mb-4">{step.description}</p>
                              {demoStep === index + 1 && (
                                <div className="text-sm text-primary font-medium">
                                  👈 Try this feature in the demo preview
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <Card className="bg-gradient-to-br from-gray-50 to-blue-50/50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      What You'll Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Pi Network Authentication",
                        "Real-time Analytics",
                        "Custom Link Management", 
                        "Payment Integration",
                        "Mobile-First Design",
                        "SEO Optimization"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            </div>
            
            {/* Pi Domain Integration */}
            <AnimatedContainer animation="fade" delay={0.4} className="mb-20">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
                  <Globe className="w-4 h-4 mr-2" />
                  Pi Network Integration
                </Badge>
                <h2 className="text-4xl font-bold mb-4">
                  Native .pi Domain Support
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Connect your .pi domain for seamless integration with Pi Browser and the Pi Network ecosystem
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                {piDomainBenefits.map((benefit, index) => (
                  <AnimatedContainer key={index} animation="scale" delay={0.1 * (index + 1)}>
                    <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <div className="text-primary">{benefit.icon}</div>
                        </div>
                        <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </AnimatedContainer>
                ))}
              </div>

              <Tabs defaultValue="features" className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid grid-cols-2 w-full max-w-md h-12">
                    <TabsTrigger value="features" className="h-10">Key Benefits</TabsTrigger>
                    <TabsTrigger value="technical" className="h-10">How It Works</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="features">
                  <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Instant Recognition",
                            description: "Pi Browser instantly recognizes and loads your .pi domain without any setup required."
                          },
                          {
                            title: "Enhanced Security", 
                            description: "Built-in Pi Network security protocols protect your content and user data."
                          },
                          {
                            title: "Native Payments",
                            description: "Accept Pi cryptocurrency payments directly through your custom domain."
                          },
                          {
                            title: "Better SEO",
                            description: "Custom domains improve search engine rankings and user trust."
                          }
                        ].map((item, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-semibold text-lg">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="technical">
                  <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold mb-2">Simple 3-Step Process</h3>
                          <p className="text-gray-600">Get your .pi domain connected in minutes</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { step: "1", title: "Register Domain", desc: "Get your .pi domain through Pi Browser" },
                            { step: "2", title: "Connect to Droplink", desc: "Link your domain in our dashboard" },
                            { step: "3", title: "Go Live", desc: "Your site is instantly accessible" }
                          ].map((item, index) => (
                            <div key={index} className="text-center">
                              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                                {item.step}
                              </div>
                              <h4 className="font-semibold mb-2">{item.title}</h4>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </AnimatedContainer>
            
            {/* Testimonials */}
            <AnimatedContainer animation="fade" delay={0.5} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Creators Are Saying</h2>
                <p className="text-gray-600">Join thousands of Pi Network creators using Droplink</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <AnimatedContainer key={index} animation="scale" delay={0.1 * (index + 1)}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.username}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 italic">"{testimonial.content}"</p>
                        <div className="flex text-yellow-400 mt-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedContainer>
                ))}
              </div>
            </AnimatedContainer>
            
            {/* FAQ Section */}
            <AnimatedContainer animation="fade" delay={0.6} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">Get answers about our demo and Pi Network integration</p>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-4">
                {faqData.map((faq) => (
                  <Card key={faq.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    <button 
                      onClick={() => toggleSection(faq.id)}
                      className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-lg">{faq.question}</span>
                      {activeSection === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {activeSection === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </AnimatedContainer>
            
            {/* Final CTA */}
            <AnimatedContainer animation="fade" delay={0.7} className="text-center">
              <Card className="bg-gradient-to-r from-primary/10 via-blue-50 to-purple-50 border-primary/20 max-w-4xl mx-auto">
                <CardContent className="p-12">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-4">Ready to Build Your Own?</h2>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join thousands of Pi Network creators who trust Droplink to grow their audience and monetize their content.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg" asChild>
                        <Link to="/signup" className="flex items-center gap-2">
                          Start Free Today <ArrowRight size={18} />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5" asChild>
                        <Link to="/features">Explore All Features</Link>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>10k+ creators</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>4.9/5 rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        <span>Free to start</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedContainer>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Demo;
