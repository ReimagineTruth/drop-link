
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Copy, Share2, Heart, Users, BarChart3, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { playSound, sounds } from "@/utils/sounds";
import { useToast } from "@/components/ui/use-toast";
import DemoMobilePreview from "@/components/demo/DemoMobilePreview";

const DemoPiPage = () => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<'profile' | 'dashboard'>('profile');
  const [tipAmount, setTipAmount] = useState(0);
  
  useEffect(() => {
    playSound(sounds.uiTap, 0.2);
  }, []);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://droplink.space/demo.pi");
    playSound(sounds.notification, 0.3);
    toast({
      title: "Link copied",
      description: "Demo link has been copied to clipboard",
    });
  };
  
  const handleTip = (amount: number) => {
    setTipAmount(prev => prev + amount);
    playSound(sounds.notification, 0.3);
    toast({
      title: "Pi Tip Sent!",
      description: `You sent ${amount}π to @demo.pi`,
    });
  };
  
  const handleLinkClick = (linkTitle: string) => {
    playSound(sounds.uiTap, 0.2);
    toast({
      title: "Link clicked",
      description: `Clicked on "${linkTitle}"`,
    });
  };
  
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 px-4 bg-gradient-to-br from-purple-700 to-indigo-900 text-white">
          <div className="container mx-auto">
            <AnimatedContainer animation="fade" className="mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 text-sm"
                onClick={() => playSound(sounds.uiTap, 0.2)}
              >
                <ArrowLeft size={16} />
                <span>Back to main site</span>
              </Link>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide" className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Demo.Pi - Interactive Preview</h1>
              <p className="text-xl mb-8">
                Experience Droplink exactly as your users would see it. This is a live demo showing real app functionality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  variant={activeView === 'profile' ? 'default' : 'outline'}
                  className={activeView === 'profile' ? 'bg-white text-purple-700 hover:bg-white/90' : 'border-white text-white hover:bg-white/20'}
                  onClick={() => setActiveView('profile')}
                >
                  Profile View
                </Button>
                <Button 
                  size="lg" 
                  variant={activeView === 'dashboard' ? 'default' : 'outline'}
                  className={activeView === 'dashboard' ? 'bg-white text-purple-700 hover:bg-white/90' : 'border-white text-white hover:bg-white/20'}
                  onClick={() => setActiveView('dashboard')}
                >
                  Dashboard View
                </Button>
              </div>
            </AnimatedContainer>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Mobile Preview */}
              <DemoMobilePreview
                activeView={activeView}
                setActiveView={setActiveView}
                onTip={handleTip}
                onLinkClick={handleLinkClick}
                tipAmount={tipAmount}
              />
              
              {/* Features Description */}
              <div className="space-y-8">
                <AnimatedContainer animation="fade">
                  <h2 className="text-3xl font-bold mb-6">
                    {activeView === 'profile' ? 'Public Profile Experience' : 'Creator Dashboard'}
                  </h2>
                  
                  {activeView === 'profile' ? (
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Pi Network Integration</h3>
                          <p className="text-gray-600">Users can send Pi tips directly from your profile</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Share2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Easy Sharing</h3>
                          <p className="text-gray-600">QR codes and social sharing built-in</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <ExternalLink className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Smart Links</h3>
                          <p className="text-gray-600">Track clicks and optimize your content strategy</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Real-time Analytics</h3>
                          <p className="text-gray-600">Track visitors, clicks, and Pi earnings</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Easy Management</h3>
                          <p className="text-gray-600">Drag-and-drop link organization</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Plus className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Quick Actions</h3>
                          <p className="text-gray-600">Add content and customize in seconds</p>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatedContainer>
                
                <AnimatedContainer animation="fade" delay={0.2}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="font-bold text-lg mb-4">Ready to create your own?</h3>
                    <p className="text-gray-600 mb-4">
                      Start building your Pi-powered profile in minutes. Join thousands of creators already using Droplink.
                    </p>
                    <div className="flex gap-3">
                      <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600">
                        <Link to="/signup">Get Started Free</Link>
                      </Button>
                      <Button variant="outline" onClick={handleCopyLink}>
                        <Copy size={16} className="mr-2" />
                        Share Demo
                      </Button>
                    </div>
                  </div>
                </AnimatedContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DemoPiPage;
