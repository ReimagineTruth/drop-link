
import { useState } from "react";
import { CheckIcon, Lock, Star, Crown, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";

const Features = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'starter' | 'pro' | 'premium'>('starter');
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useUser();
  const { plan: userPlan, permissions } = useUserPermissions();

  const featuresByPlan = {
    free: [
      { name: "1 Link", description: "Add one custom link to your profile", available: true },
      { name: "1 Social Profile", description: "Connect one social media account", available: true },
      { name: "Basic Profile", description: "Simple profile customization", available: true },
      { name: "Pi AdNetwork", description: "Monetize with Pi advertisements", available: true }
    ],
    starter: [
      { name: "Unlimited Links", description: "Add as many links as you want", available: permissions.unlimitedLinks },
      { name: "All Social Profiles", description: "Connect all your social accounts", available: permissions.connectAllSocialProfiles },
      { name: "Basic Analytics", description: "Track clicks and visitor stats", available: permissions.basicAnalytics },
      { name: "Email Support", description: "Get help when you need it", available: permissions.emailSupport },
      { name: "Community Forums", description: "Access to community discussions", available: permissions.communityForumsAccess },
      { name: "Custom Themes", description: "Choose from premium themes", available: permissions.hasAdvancedThemes }
    ],
    pro: [
      { name: "Multi-Factor Authentication", description: "Enhanced security for your account", available: permissions.multiFactorAuth },
      { name: "QR Codes", description: "Generate QR codes for offline sharing", available: permissions.hasQRCode },
      { name: "Link Scheduling", description: "Schedule when links appear", available: permissions.hasScheduling },
      { name: "Link Animations", description: "Animated link transitions", available: permissions.hasLinkAnimations },
      { name: "Custom Button Styles", description: "Personalize your button designs", available: permissions.customButtonStyles },
      { name: "Spotlight Links", description: "Highlight important links", available: permissions.spotlightLinks },
      { name: "Performance Analytics", description: "Advanced visitor insights", available: permissions.performanceAnalytics },
      { name: "Location Analytics", description: "See where visitors come from", available: permissions.locationAnalytics },
      { name: "Email/Phone Collection", description: "Capture visitor contact info", available: permissions.emailPhoneCollection },
      { name: "SEO Tools", description: "Optimize for search engines", available: permissions.hasSEOTools },
      { name: "Community Rewards", description: "Earn rewards for engagement", available: permissions.communityRewards }
    ],
    premium: [
      { name: "Pi Payments Integration", description: "Sell products with Pi cryptocurrency", available: permissions.canSellWithPiPayments },
      { name: "Tailored Onboarding", description: "Personalized setup experience", available: permissions.tailoredOnboarding },
      { name: "Priority Support", description: "4-hour response time guarantee", available: permissions.hasPrioritySupport },
      { name: "Historical Insights", description: "Long-term performance data", available: permissions.historicalInsights },
      { name: "Data Export", description: "Export your analytics data", available: permissions.hasDataExport },
      { name: "Whitelabel Option", description: "Remove Droplink branding", available: permissions.hasWhitelabel },
      { name: "Advanced Pi Payments", description: "Enhanced payment features", available: permissions.advancedPiPayments },
      { name: "Contributor Status", description: "Special community recognition", available: permissions.communityContributorStatus },
      { name: "File Uploads", description: "Upload documents and media", available: permissions.hasFileUploads }
    ]
  };

  const planIcons = {
    free: <Zap className="w-5 h-5" />,
    starter: <CheckIcon className="w-5 h-5" />,
    pro: <Star className="w-5 h-5" />,
    premium: <Crown className="w-5 h-5" />
  };

  const planColors = {
    free: "bg-gray-500",
    starter: "bg-green-500", 
    pro: "bg-blue-500",
    premium: "bg-purple-500"
  };

  const handleUpgrade = (targetPlan: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate('/pricing');
  };

  const canAccessPlan = (planLevel: 'free' | 'starter' | 'pro' | 'premium') => {
    if (isAdmin) return true;
    const planHierarchy = { free: 0, starter: 1, pro: 2, premium: 3 };
    const userPlanLevel = planHierarchy[userPlan] || 0;
    const targetPlanLevel = planHierarchy[planLevel] || 0;
    return userPlanLevel >= targetPlanLevel;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary">All Features</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Discover everything you can do with Droplink. Choose your plan to unlock powerful features.
            </p>
          </div>

          <Tabs value={selectedPlan} onValueChange={(value) => setSelectedPlan(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="free" className="flex items-center gap-2">
                {planIcons.free}
                Free
              </TabsTrigger>
              <TabsTrigger value="starter" className="flex items-center gap-2">
                {planIcons.starter}
                Starter
              </TabsTrigger>
              <TabsTrigger value="pro" className="flex items-center gap-2">
                {planIcons.pro}
                Pro
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-2">
                {planIcons.premium}
                Premium
              </TabsTrigger>
            </TabsList>

            {Object.entries(featuresByPlan).map(([plan, features]) => (
              <TabsContent key={plan} value={plan} className="space-y-6">
                <div className="text-center mb-8">
                  <Badge className={`${planColors[plan as keyof typeof planColors]} text-white text-lg px-4 py-2 mb-4`}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                  </Badge>
                  <p className="text-gray-600">
                    {plan === 'free' && "Get started with basic features"}
                    {plan === 'starter' && "Perfect for individuals and creators"}
                    {plan === 'pro' && "Advanced features for power users"}
                    {plan === 'premium' && "Everything you need for business"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <Card key={index} className={`${feature.available ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {feature.available ? (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                          {feature.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        {!feature.available && !canAccessPlan(plan as any) && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleUpgrade(plan)}
                          >
                            Upgrade to Unlock
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                        {feature.available && (
                          <div className="text-sm text-green-600 font-medium">
                            ✓ Available in your plan
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {!canAccessPlan(plan as any) && (
                  <div className="text-center mt-8">
                    <Card className="bg-blue-50 border-blue-200 max-w-md mx-auto">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">Want {plan} features?</h3>
                        <p className="text-gray-600 mb-4">
                          Upgrade your plan to unlock all these powerful features
                        </p>
                        <Button 
                          className="w-full bg-gradient-hero hover:bg-secondary"
                          onClick={() => handleUpgrade(plan)}
                        >
                          Upgrade to {plan.charAt(0).toUpperCase() + plan.slice(1)}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
