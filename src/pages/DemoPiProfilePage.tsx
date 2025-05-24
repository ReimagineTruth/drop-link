
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Users, Star, Crown, Zap, Lock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUserPermissions } from "@/hooks/useUserPermissions";

const DemoPiProfilePage = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'starter' | 'pro' | 'premium'>('pro');
  const { permissions } = useUserPermissions();

  const planFeatures = {
    free: ['1 Link Only', 'Basic Profile', 'Pi AdNetwork', 'No .pi Domain'],
    starter: ['.pi Domain Connection', 'Unlimited Links', 'All Social Profiles', 'Basic Analytics'],
    pro: ['.pi Domain Connection', 'QR Codes', 'Link Scheduling', 'Performance Analytics', 'Custom Themes'],
    premium: ['.pi Domain Connection', 'Pi Payments', 'Priority Support', 'Data Export', 'Whitelabel']
  };

  const planColors = {
    free: 'bg-gray-500',
    starter: 'bg-green-500',
    pro: 'bg-blue-500',
    premium: 'bg-purple-500'
  };

  const planIcons = {
    free: <Zap className="w-4 h-4" />,
    starter: <Users className="w-4 h-4" />,
    pro: <Star className="w-4 h-4" />,
    premium: <Crown className="w-4 h-4" />
  };

  // Demo profile data
  const demoProfile = {
    username: "alexcrypto",
    displayName: "Alex Chen",
    title: "Digital Creator & Pi Pioneer",
    bio: "Building the future with Pi Network 🚀 | Crypto educator | NFT artist | DeFi enthusiast",
    piEarnings: "2,847.5",
    followers: "12.3K",
    profileViews: "45.2K"
  };

  // Demo links based on plan
  const getDemoLinks = () => {
    const baseLinks = [
      { title: "My Latest NFT Collection", url: "https://opensea.io/collection/pi-art", icon: "🎨", earnings: "156.7 π", type: "featured" },
      { title: "Pi Network Course", url: "https://udemy.com/pi-course", icon: "📚", earnings: "892.3 π", type: "featured" },
    ];

    if (selectedPlan === 'free') {
      return [{ title: "My Website", url: "https://example.com", icon: "🌐", earnings: "0 π", type: "basic" }];
    }

    const socialLinks = [
      { title: "YouTube Channel", url: "https://youtube.com/@alexcrypto", icon: "🎥", earnings: "234.1 π", type: "social" },
      { title: "Twitter/X", url: "https://x.com/alexcrypto", icon: "🐦", earnings: "67.8 π", type: "social" },
      { title: "Instagram", url: "https://instagram.com/alexcrypto", icon: "📸", earnings: "189.2 π", type: "social" },
      { title: "Discord Community", url: "https://discord.gg/alexcrypto", icon: "💬", earnings: "445.6 π", type: "social" },
    ];

    const regularLinks = [
      { title: "Free Pi Mining Guide", url: "https://guide.alexcrypto.pi", icon: "⛏️", earnings: "678.4 π", type: "regular" },
      { title: "Crypto Newsletter", url: "https://newsletter.alexcrypto.pi", icon: "📧", earnings: "234.5 π", type: "regular" },
      { title: "1-on-1 Consulting", url: "https://cal.com/alexcrypto", icon: "💼", earnings: "1,203.1 π", type: "premium" },
    ];

    return [...baseLinks, ...socialLinks, ...regularLinks];
  };

  const canUsePiDomain = selectedPlan !== 'free';
  const canUseAdvancedFeatures = selectedPlan === 'pro' || selectedPlan === 'premium';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Live Pi Domain Demo</h1>
            <p className="text-xl text-gray-600 mb-2">
              See how <span className="font-bold text-blue-600">alexcrypto.pi</span> connects to a real Droplink profile
            </p>
            <p className="text-lg text-gray-500 mb-6">
              <span className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 font-medium">
                ⚠️ .pi domain connection requires any paid plan (Starter, Pro, or Premium)
              </span>
            </p>
            
            {/* Plan Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {(['free', 'starter', 'pro', 'premium'] as const).map((plan) => (
                <Button
                  key={plan}
                  variant={selectedPlan === plan ? "default" : "outline"}
                  onClick={() => setSelectedPlan(plan)}
                  className={`flex items-center gap-2 ${
                    selectedPlan === plan ? planColors[plan] + ' text-white' : ''
                  }`}
                  disabled={plan === 'free' && canUsePiDomain}
                >
                  {planIcons[plan]}
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                  {plan === 'free' && <Lock className="w-3 h-3 ml-1" />}
                </Button>
              ))}
            </div>

            {/* Domain Connection Status */}
            <div className="max-w-2xl mx-auto mb-8">
              <Card className={`border-2 ${canUsePiDomain ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    {canUsePiDomain ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div className="text-center">
                          <p className="font-bold text-green-800">✅ Pi Domain Connected</p>
                          <p className="text-sm text-green-600">
                            <span className="font-mono font-bold">alexcrypto.pi</span> → <span className="font-mono">droplink.space/@alexcrypto</span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Lock className="w-6 h-6 text-red-600" />
                        <div className="text-center">
                          <p className="font-bold text-red-800">❌ Pi Domain Unavailable</p>
                          <p className="text-sm text-red-600">Upgrade to any paid plan to connect your .pi domain</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mobile Preview */}
            <div className="flex justify-center">
              <div className="w-80 bg-white rounded-3xl shadow-2xl p-6 border">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">AC</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{canUsePiDomain ? '@alexcrypto.pi' : '@alexcrypto'}</h2>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1">{demoProfile.displayName}</h3>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">{demoProfile.title}</p>
                  <p className="text-gray-500 mt-2 text-xs leading-relaxed">{demoProfile.bio}</p>
                  
                  {/* Stats Row */}
                  <div className="flex justify-around mt-4 text-center">
                    <div>
                      <p className="font-bold text-lg text-blue-600">{demoProfile.piEarnings}π</p>
                      <p className="text-xs text-gray-500">Earned</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-green-600">{demoProfile.followers}</p>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-purple-600">{demoProfile.profileViews}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                  </div>
                  
                  <Badge className={`${planColors[selectedPlan]} text-white mt-3`}>
                    {planIcons[selectedPlan]}
                    {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
                  </Badge>
                </div>

                {/* Links */}
                <div className="space-y-3">
                  {getDemoLinks().map((link, index) => (
                    <div 
                      key={index}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        link.type === 'featured'
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:shadow-md' 
                          : link.type === 'premium'
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:shadow-md'
                          : link.type === 'social'
                          ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:shadow-md'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{link.icon}</span>
                          <div className="text-left">
                            <span className="font-medium text-sm block">{link.title}</span>
                            {link.earnings && link.earnings !== "0 π" && (
                              <span className="text-xs text-green-600 font-semibold">+{link.earnings}</span>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}

                  {/* Plan-specific features showcase */}
                  {canUseAdvancedFeatures && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 font-medium text-center">
                        ⭐ {selectedPlan === 'premium' ? 'Premium' : 'Pro'} Features Active
                      </p>
                      <div className="text-xs text-blue-600 mt-2 grid grid-cols-2 gap-1">
                        <span>• QR Codes</span>
                        <span>• Analytics</span>
                        <span>• Scheduling</span>
                        <span>• Custom Themes</span>
                      </div>
                    </div>
                  )}

                  {selectedPlan === 'free' && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800 font-medium text-center mb-2">
                        🔒 Upgrade to connect your .pi domain
                      </p>
                      <p className="text-xs text-yellow-600 text-center">
                        Free plan limited to 1 link • No .pi domain support
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Features Breakdown */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {planIcons[selectedPlan]}
                    {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan Features
                  </CardTitle>
                  <CardDescription>
                    {canUsePiDomain 
                      ? "✅ Pi domain connection included" 
                      : "❌ Pi domain connection requires paid plan"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {planFeatures[selectedPlan].map((feature, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-2 p-2 rounded ${
                          feature.includes('No .pi Domain') 
                            ? 'bg-red-50 text-red-700' 
                            : feature.includes('.pi Domain') 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          feature.includes('No .pi Domain') 
                            ? 'bg-red-500' 
                            : feature.includes('.pi Domain') 
                            ? 'bg-green-500' 
                            : 'bg-blue-500'
                        }`}></div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pi Domain Connection Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">1</div>
                      <div>
                        <h4 className="font-semibold">Upgrade to any paid plan</h4>
                        <p className="text-sm text-gray-600">Starter ($8π/month), Pro ($12π/month), or Premium ($18π/month)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">2</div>
                      <div>
                        <h4 className="font-semibold">Enter your .pi domain</h4>
                        <p className="text-sm text-gray-600">Go to Settings → Domains and connect your existing .pi domain</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">3</div>
                      <div>
                        <h4 className="font-semibold">Start earning Pi</h4>
                        <p className="text-sm text-gray-600">Share your .pi domain and earn Pi from link clicks and tips</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Real Earnings Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Link clicks (this month)</span>
                      <span className="font-semibold text-green-600">+1,247.3 π</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tips received</span>
                      <span className="font-semibold text-green-600">+892.5 π</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Premium content sales</span>
                      <span className="font-semibold text-green-600">+707.7 π</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Earned</span>
                        <span className="font-bold text-lg text-green-600">2,847.5 π</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DemoPiProfilePage;
