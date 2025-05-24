
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Copy, Share2, Heart, Users, BarChart3, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { playSound, sounds } from "@/utils/sounds";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-[380px] h-[760px] bg-black rounded-3xl p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="bg-black text-white text-xs py-2 px-4 flex justify-between items-center">
                        <span>9:41</span>
                        <span className="font-semibold">demo.pi</span>
                        <span>100%</span>
                      </div>
                      
                      {activeView === 'profile' ? (
                        <ProfileView onTip={handleTip} onLinkClick={handleLinkClick} tipAmount={tipAmount} />
                      ) : (
                        <DashboardView />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
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
                          <Settings className="w-6 h-6 text-yellow-600" />
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

const ProfileView = ({ onTip, onLinkClick, tipAmount }: { onTip: (amount: number) => void, onLinkClick: (title: string) => void, tipAmount: number }) => {
  return (
    <div className="h-full overflow-y-auto">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600 relative"></div>
      
      {/* Profile Section */}
      <div className="px-4 pb-6 -mt-12 relative z-10">
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg mx-auto">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold">Demo Pioneer</h1>
          <p className="text-gray-500 text-sm">@demo.pi</p>
          <p className="text-gray-700 mt-2 text-sm">🚀 Pi Network enthusiast sharing the latest updates and tutorials</p>
          
          <div className="flex justify-center gap-2 mt-4">
            <Button size="sm" variant="outline" onClick={() => onLinkClick('Follow')}>
              <Users size={14} className="mr-1" />
              Follow
            </Button>
            <Button size="sm" onClick={() => onTip(1)} className="bg-purple-600 hover:bg-purple-700">
              <Heart size={14} className="mr-1" />
              Tip 1π
            </Button>
          </div>
          
          {tipAmount > 0 && (
            <p className="text-sm text-green-600 mt-2">💰 {tipAmount}π earned from tips!</p>
          )}
        </div>
      </div>
      
      {/* Links Section */}
      <div className="px-4 space-y-3 pb-6">
        {[
          { title: "📚 Pi Network Beginner Guide", subtitle: "Everything you need to know", clicks: 1247 },
          { title: "🎥 Latest Pi Update Video", subtitle: "Breaking down the mainnet news", clicks: 856 },
          { title: "💬 Join My Discord", subtitle: "Connect with other Pioneers", clicks: 634 },
          { title: "🔒 Premium Content", subtitle: "Unlock exclusive Pi strategies • 2π", premium: true },
          { title: "☕ Buy Me Coffee", subtitle: "Support my content creation", clicks: 423 }
        ].map((link, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onLinkClick(link.title)}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{link.title}</p>
                <p className="text-xs text-gray-500">{link.subtitle}</p>
              </div>
              {link.premium ? (
                <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Premium</div>
              ) : (
                <div className="text-xs text-gray-400">{link.clicks} clicks</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const DashboardView = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Demo Pioneer!</p>
      </div>
      
      {/* Stats Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">1,247</p>
            <p className="text-xs text-gray-500">Total Visitors</p>
            <p className="text-xs text-green-500">↑ 12% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">856</p>
            <p className="text-xs text-gray-500">Link Clicks</p>
            <p className="text-xs text-green-500">↑ 8% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">42π</p>
            <p className="text-xs text-gray-500">Pi Tips Earned</p>
            <p className="text-xs text-green-500">↑ 15% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">5</p>
            <p className="text-xs text-gray-500">Active Links</p>
            <p className="text-xs text-gray-400">Manage →</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            <Plus size={16} className="mr-2" />
            Add New Link
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Settings size={16} className="mr-2" />
            Customize Theme
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <BarChart3 size={16} className="mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {[
            "New tip received: 1π from @pioneer123",
            "Link clicked: Pi Network Guide",
            "New follower: @crypto_enthusiast",
            "Profile updated successfully"
          ].map((activity, index) => (
            <div key={index} className="text-sm p-2 bg-white rounded border-l-4 border-blue-500">
              {activity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoPiPage;
