
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Heart, Lock, CheckCircle, ShoppingCart, BookOpen, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PlanType = 'free' | 'starter' | 'pro' | 'premium';

const DemoPiProfilePage = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('pro');
  const [tipAmount, setTipAmount] = useState(0);

  const planFeatures = {
    free: ['1 Link Only', 'Basic Profile', 'Pi AdNetwork', 'No .pi Domain', 'Shows Droplink Badge', 'No Pi Tips', 'No Product Sales'],
    starter: ['.pi Domain Connection', 'Unlimited Links', 'Pi Tips', 'Basic Analytics', 'Hide Droplink Badge'],
    pro: ['.pi Domain Connection', 'Pi Tips & Products', 'Digital Sales', 'Performance Analytics', 'Custom Themes', 'Hide Droplink Badge'],
    premium: ['.pi Domain Connection', 'Pi Payments Pro', 'Priority Support', 'Data Export', 'Whitelabel', 'Hide Droplink Badge']
  };

  const planColors = {
    free: 'bg-gray-500',
    starter: 'bg-green-500',
    pro: 'bg-blue-500',
    premium: 'bg-purple-500'
  };

  const planIcons = {
    free: <Lock className="w-4 h-4" />,
    starter: <Heart className="w-4 h-4" />,
    pro: <ShoppingCart className="w-4 h-4" />,
    premium: <BookOpen className="w-4 h-4" />
  };

  // Demo profile data focused on Pi creator
  const demoProfile = {
    username: "alexcrypto",
    displayName: "Alex Chen",
    title: "Pi Network Educator & Course Creator",
    bio: "Teaching Pi Network fundamentals through courses and tutorials 🚀 Support my work with Pi tips!",
    piEarnings: "1,247.8",
    supporters: "89",
    courseSales: "156"
  };

  // Products and content focused on Pi ecosystem
  const getDemoContent = () => {
    if (selectedPlan === 'free') {
      return [
        { 
          title: "My Website", 
          url: "https://example.com", 
          icon: "🌐", 
          type: "link"
        }
      ];
    }

    const tipOptions = selectedPlan !== 'free' ? [
      { title: "☕ Buy me coffee", amount: "1π", description: "Support my daily content creation", type: "tip" },
      { title: "🍕 Buy me lunch", amount: "5π", description: "Fuel my research and tutorials", type: "tip" },
      { title: "💝 Big support", amount: "25π", description: "Help me create premium content", type: "tip" }
    ] : [];

    const digitalProducts = (selectedPlan === 'pro' || selectedPlan === 'premium') ? [
      { 
        title: "🎓 Complete Pi Network Course", 
        price: "15π", 
        description: "Master Pi Network from basics to advanced strategies",
        sales: "89 sales",
        type: "course"
      },
      { 
        title: "📖 Pi Mining Guide eBook", 
        price: "8π", 
        description: "Comprehensive guide to maximizing your Pi earnings",
        sales: "67 sales", 
        type: "ebook"
      },
      { 
        title: "🔮 1-on-1 Pi Consultation", 
        price: "50π", 
        description: "Personal consultation on Pi Network strategies",
        sales: "23 bookings",
        type: "service"
      }
    ] : [];

    const freeContent = [
      { 
        title: "📺 Free Pi Tutorial Series", 
        url: "https://youtube.com/@alexcrypto", 
        icon: "🎥", 
        description: "Weekly Pi Network tutorials",
        type: "free"
      },
      { 
        title: "💬 Join My Discord", 
        url: "https://discord.gg/alexcrypto", 
        icon: "💬", 
        description: "Connect with other Pi pioneers",
        type: "free"
      }
    ];

    return [...tipOptions, ...digitalProducts, ...freeContent];
  };

  // Fixed type checking with explicit plan checks
  const canUsePiDomain = selectedPlan !== 'free';
  const canReceiveTips = selectedPlan !== 'free';
  const canSellProducts = selectedPlan === 'pro' || selectedPlan === 'premium';
  const showDroplinkBadge = selectedPlan === 'free';

  const handleTip = (amount: string) => {
    const piAmount = parseFloat(amount.replace('π', ''));
    setTipAmount(prev => prev + piAmount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Live Pi Creator Demo</h1>
            <p className="text-xl text-gray-600 mb-2">
              See how <span className="font-bold text-blue-600">alexcrypto.pi</span> monetizes with Pi tips & digital products
            </p>
            <p className="text-lg text-gray-500 mb-6">
              <span className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 font-medium">
                ⚠️ .pi domain + Pi products require paid plans
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
                >
                  {planIcons[plan]}
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
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
              <div className="w-80 bg-white rounded-3xl shadow-2xl p-6 border relative">
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
                      <p className="text-xs text-gray-500">Total Earned</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-green-600">{demoProfile.supporters}</p>
                      <p className="text-xs text-gray-500">Supporters</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-purple-600">{demoProfile.courseSales}</p>
                      <p className="text-xs text-gray-500">Sales</p>
                    </div>
                  </div>
                  
                  <Badge className={`${planColors[selectedPlan]} text-white mt-3`}>
                    {planIcons[selectedPlan]}
                    {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
                  </Badge>

                  {tipAmount > 0 && (
                    <div className="mt-3 p-2 bg-green-100 rounded-lg">
                      <p className="text-sm text-green-800 font-semibold">
                        🎉 +{tipAmount}π received in tips!
                      </p>
                    </div>
                  )}
                </div>

                {/* Droplink Badge */}
                {showDroplinkBadge && (
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg rounded-full px-3 py-1 flex items-center gap-1 text-xs">
                      <span className="text-gray-600">Made with</span>
                      <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Droplink
                      </span>
                    </div>
                  </div>
                )}

                {/* Content & Products */}
                <div className="space-y-3">
                  {getDemoContent().map((item, index) => (
                    <div 
                      key={index}
                      className={`w-full p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        item.type === 'tip'
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-md' 
                          : item.type === 'course' || item.type === 'ebook' || item.type === 'service'
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:shadow-md'
                          : item.type === 'free'
                          ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:shadow-md'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        if (item.type === 'tip' && 'amount' in item) {
                          handleTip(item.amount);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{item.icon || '💎'}</span>
                          <div className="text-left">
                            <span className="font-medium text-sm block">{item.title}</span>
                            {'description' in item && (
                              <span className="text-xs text-gray-600">{item.description}</span>
                            )}
                            {'sales' in item && (
                              <span className="text-xs text-green-600 font-semibold">{item.sales}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          {'price' in item && (
                            <span className="font-bold text-purple-600">{item.price}</span>
                          )}
                          {'amount' in item && (
                            <span className="font-bold text-yellow-600">{item.amount}</span>
                          )}
                          {item.type === 'free' && (
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {selectedPlan === 'free' && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800 font-medium text-center mb-2">
                        🔒 Upgrade to monetize with Pi
                      </p>
                      <p className="text-xs text-yellow-600 text-center">
                        Free plan: 1 link only • No Pi tips • No product sales
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
                          feature.includes('No .pi Domain') || feature.includes('Shows Droplink Badge') || feature.includes('No Pi Tips') || feature.includes('No Product Sales')
                            ? 'bg-red-50 text-red-700' 
                            : feature.includes('.pi Domain') || feature.includes('Pi Tips') || feature.includes('Pi Payments') || feature.includes('Hide Droplink Badge') || feature.includes('Digital Sales')
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          feature.includes('No .pi Domain') || feature.includes('Shows Droplink Badge') || feature.includes('No Pi Tips') || feature.includes('No Product Sales')
                            ? 'bg-red-500' 
                            : feature.includes('.pi Domain') || feature.includes('Pi Tips') || feature.includes('Pi Payments') || feature.includes('Hide Droplink Badge') || feature.includes('Digital Sales')
                            ? 'bg-green-500' 
                            : 'bg-blue-500'
                        }`}></div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedPlan !== 'free' && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">Real Pi Earnings Example</CardTitle>
                    <CardDescription className="text-green-600">Based on actual creator performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Tips received (this month)</span>
                        <span className="font-semibold text-green-600">+347.2π</span>
                      </div>
                      {canSellProducts && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm">Course sales</span>
                            <span className="font-semibold text-green-600">+675.5π</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">eBook sales</span>
                            <span className="font-semibold text-green-600">+225.1π</span>
                          </div>
                        </>
                      )}
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total This Month</span>
                          <span className="font-bold text-lg text-green-600">
                            {canSellProducts ? '1,247.8π' : '347.2π'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Pi Creator Monetization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`flex items-start gap-3 ${!canReceiveTips ? 'opacity-50' : ''}`}>
                      <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">💰</div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          Pi Tips
                          {!canReceiveTips && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Paid Plans Only</span>}
                        </h4>
                        <p className="text-sm text-gray-600">Supporters can tip you Pi for your content and tutorials</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start gap-3 ${!canSellProducts ? 'opacity-50' : ''}`}>
                      <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">🎓</div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          Digital Products
                          {!canSellProducts && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Pro+ Plans Only</span>}
                        </h4>
                        <p className="text-sm text-gray-600">Sell courses, eBooks, and services directly for Pi</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">📊</div>
                      <div>
                        <h4 className="font-semibold">Track Performance</h4>
                        <p className="text-sm text-gray-600">See your earnings, supporters, and sales analytics</p>
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
