
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Copy, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { playSound, sounds } from "@/utils/sounds";
import { useToast } from "@/components/ui/use-toast";

const DemoPiPage = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Play sound when component mounts
    playSound(sounds.uiTap, 0.2);
  }, []);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://droplink.space/demo.pi");
    playSound(sounds.notification, 0.3);
    toast({
      title: "Link copied",
      description: "Link has been copied to clipboard",
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Pi.Demo</h1>
              <p className="text-xl mb-8">
                This is a demonstration of how custom Pi domains work with Droplink. Explore the features and see how you can create your own Pi domain page.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="default" 
                  className="bg-white text-purple-700 hover:bg-white/90"
                  asChild
                >
                  <a 
                    href="https://minepi.com/browser" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                    onClick={() => playSound(sounds.uiTap, 0.2)}
                  >
                    Open in Pi Browser <ExternalLink size={16} />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20"
                  onClick={handleCopyLink}
                >
                  <Copy size={16} className="mr-2" />
                  Copy link
                </Button>
              </div>
            </AnimatedContainer>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <AnimatedContainer animation="scale" className="bg-white rounded-lg shadow-xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">D</div>
                  <div>
                    <h2 className="font-bold text-xl">Droplink Demo</h2>
                    <p className="text-gray-500 text-sm">@demo.pi</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => {
                    playSound(sounds.notification, 0.3);
                    toast({
                      title: "Share action",
                      description: "Sharing is not available in demo mode",
                    });
                  }}
                >
                  <Share2 size={16} />
                  Share
                </Button>
              </div>
              
              <p className="text-gray-700 mb-8">
                Welcome to the Droplink Pi domain demo! This shows how your Pi domain can be customized with Droplink.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Official Pi Website", url: "https://minepi.com", icon: "🌐" },
                  { title: "Pi Documentation", url: "https://developers.minepi.com", icon: "📚" },
                  { title: "Pi Core Team", url: "https://minepi.com/team", icon: "👥" },
                  { title: "Join Pi Discord", url: "https://discord.gg/pi", icon: "💬" },
                  { title: "Premium Pi Content", url: "#premium", locked: true, icon: "🔒" }
                ].map((link, index) => (
                  <AnimatedContainer 
                    key={index} 
                    animation="fade"
                    delay={index * 0.1}
                    className={`block w-full p-4 rounded-lg border ${link.locked 
                      ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                      : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'}`}
                  >
                    {/* Wrap the content in a div with onClick handler instead of putting it on AnimatedContainer */}
                    <div 
                      className="w-full"
                      onClick={() => {
                        if (link.locked) {
                          playSound(sounds.notification, 0.3);
                          toast({
                            title: "Premium Content",
                            description: "This content requires payment to access",
                            variant: "destructive"
                          });
                        } else {
                          playSound(sounds.uiTap, 0.2);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{link.icon}</div>
                        <div className="flex-grow">
                          <div className="font-medium">{link.title}</div>
                          <div className="text-sm text-gray-500">
                            {link.locked ? "Premium content (Pi payment required)" : link.url}
                          </div>
                        </div>
                        {link.locked && (
                          <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            1.0 Pi
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedContainer>
                ))}
              </div>
            </AnimatedContainer>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Ready to create your own Pi domain page?</h3>
              <Button 
                asChild 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => playSound(sounds.uiTap, 0.2)}
              >
                <Link to="/signup">Create your Droplink account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DemoPiPage;
