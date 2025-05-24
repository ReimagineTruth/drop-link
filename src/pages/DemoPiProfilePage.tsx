
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Users, Star, Crown, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUserPermissions } from "@/hooks/useUserPermissions";

const DemoPiProfilePage = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'starter' | 'pro' | 'premium'>('free');
  const { permissions } = useUserPermissions();

  const planFeatures = {
    free: ['1 Link', 'Basic Profile', 'Pi AdNetwork'],
    starter: ['Unlimited Links', 'All Social Profiles', 'Basic Analytics', 'Custom Themes'],
    pro: ['QR Codes', 'Link Scheduling', 'Performance Analytics', 'Custom Button Styles'],
    premium: ['Pi Payments', 'Priority Support', 'Data Export', 'Whitelabel Option']
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

  // Demo links based on plan
  const getDemoLinks = () => {
    const baseLinks = [
      { title: "My Website", url: "https://example.com", icon: "🌐" }
    ];

    if (selectedPlan === 'free') {
      return baseLinks.slice(0, 1); // Only 1 link for free
    }

    return [
      ...baseLinks,
      { title: "Twitter", url: "https://twitter.com/demo", icon: "🐦" },
      { title: "Instagram", url: "https://instagram.com/demo", icon: "📸" },
      { title: "YouTube", url: "https://youtube.com/demo", icon: "🎥" },
      { title: "LinkedIn", url: "https://linkedin.com/demo", icon: "💼" },
    ];
  };

  const canUsePremiumFeatures = selectedPlan === 'premium';
  const canUseProFeatures = selectedPlan === 'pro' || selectedPlan === 'premium';
  const canUseStarterFeatures = selectedPlan !== 'free';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Demo Pi Profile</h1>
            <p className="text-xl text-gray-600 mb-6">
              See how your profile looks with different subscription plans
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mobile Preview */}
            <div className="flex justify-center">
              <div className="w-80 bg-white rounded-3xl shadow-2xl p-6 border">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">@demo.pi</h2>
                  <p className="text-gray-600 mt-2">
                    {canUseStarterFeatures 
                      ? "Content Creator & Entrepreneur" 
                      : "Basic Pi Profile"
                    }
                  </p>
                  <Badge className={`${planColors[selectedPlan]} text-white mt-2`}>
                    {planIcons[selectedPlan]}
                    {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
                  </Badge>
                </div>

                <div className="space-y-3">
                  {getDemoLinks().map((link, index) => (
                    <div 
                      key={index}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        canUseProFeatures 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:shadow-md' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{link.icon}</span>
                          <span className="font-medium">{link.title}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}

                  {/* Feature demonstrations */}
                  {canUseProFeatures && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 font-medium">
                        ⭐ Pro Features Active: Custom animations, scheduling, QR codes
                      </p>
                    </div>
                  )}

                  {canUsePremiumFeatures && (
                    <div className="mt-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-800 font-medium">
                        👑 Premium: Pi payments, whitelabel, priority support
                      </p>
                    </div>
                  )}

                  {selectedPlan === 'free' && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        Limited to 1 link. Upgrade to add more features!
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
                    Features available with your selected plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {planFeatures[selectedPlan].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plan Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(['free', 'starter', 'pro', 'premium'] as const).map((plan) => (
                      <div 
                        key={plan}
                        className={`p-3 rounded-lg border-2 ${
                          selectedPlan === plan 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {planIcons[plan]}
                            <span className="font-medium">
                              {plan.charAt(0).toUpperCase() + plan.slice(1)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {planFeatures[plan].length} features
                          </span>
                        </div>
                      </div>
                    ))}
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
