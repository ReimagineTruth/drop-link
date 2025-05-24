import { useState } from "react";
import { CheckIcon, Lock, Star, Crown, Zap, ArrowRight, Users, Shield, BarChart3, Palette, Globe, Smartphone } from "lucide-react";
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
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Helmet } from "react-helmet-async";
import { planPricing } from "@/hooks/usePiPayment";

const Features = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'starter' | 'pro' | 'premium'>('starter');
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useUser();
  const { plan: userPlan, permissions } = useUserPermissions();

  // Use pricing from the pricing hook
  const getPlanPrice = (plan: 'starter' | 'pro' | 'premium', cycle: 'monthly' | 'annual' = 'monthly') => {
    return planPricing[plan][cycle];
  };

  const planPricingDisplay = {
    free: { price: "Free", period: "forever" },
    starter: { price: `${getPlanPrice('starter', 'monthly')}π`, period: "/month" },
    pro: { price: `${getPlanPrice('pro', 'monthly')}π`, period: "/month" },
    premium: { price: `${getPlanPrice('premium', 'monthly')}π`, period: "/month" }
  };

  const featureCategories = {
    core: {
      title: "Core Features",
      icon: <Globe className="w-5 h-5" />,
      features: {
        free: [
          { name: "1 Custom Link", description: "Add one personalized link to your profile", available: true, highlight: false },
          { name: "Basic Profile", description: "Simple profile customization with avatar", available: true, highlight: false },
          { name: "Pi AdNetwork", description: "Monetize your profile with Pi advertisements", available: true, highlight: true }
        ],
        starter: [
          { name: "Unlimited Links", description: "Add as many links as you want to your profile", available: permissions.unlimitedLinks, highlight: true },
          { name: "All Social Profiles", description: "Connect all your social media accounts", available: permissions.connectAllSocialProfiles, highlight: false },
          { name: "Custom Themes", description: "Choose from 10+ premium design themes", available: permissions.hasAdvancedThemes, highlight: true },
          { name: "Basic Analytics", description: "Track clicks and visitor statistics", available: permissions.basicAnalytics, highlight: false }
        ],
        pro: [
          { name: "QR Code Generator", description: "Generate QR codes for offline sharing", available: permissions.hasQRCode, highlight: true },
          { name: "Link Scheduling", description: "Schedule when links appear and disappear", available: permissions.hasScheduling, highlight: false },
          { name: "Custom Button Styles", description: "Personalize button designs and animations", available: permissions.customButtonStyles, highlight: true },
          { name: "Performance Analytics", description: "Advanced visitor insights and demographics", available: permissions.performanceAnalytics, highlight: false }
        ],
        premium: [
          { name: "Pi Payments Integration", description: "Accept Pi cryptocurrency for products/services", available: permissions.canSellWithPiPayments, highlight: true },
          { name: "Whitelabel Option", description: "Remove Droplink branding completely", available: permissions.hasWhitelabel, highlight: false },
          { name: "Priority Support", description: "4-hour response time guarantee", available: permissions.hasPrioritySupport, highlight: true },
          { name: "Data Export", description: "Export all your analytics and user data", available: permissions.hasDataExport, highlight: false }
        ]
      }
    },
    security: {
      title: "Security & Privacy",
      icon: <Shield className="w-5 h-5" />,
      features: {
        free: [
          { name: "Basic Security", description: "Standard encryption and data protection", available: true, highlight: false }
        ],
        starter: [
          { name: "Email Support", description: "Dedicated email support channel", available: permissions.emailSupport, highlight: false },
          { name: "Community Access", description: "Access to exclusive community forums", available: permissions.communityForumsAccess, highlight: false }
        ],
        pro: [
          { name: "Multi-Factor Auth", description: "Enhanced account security with 2FA", available: permissions.multiFactorAuth, highlight: true },
          { name: "SEO Optimization", description: "Advanced SEO tools and meta controls", available: permissions.hasSEOTools, highlight: false }
        ],
        premium: [
          { name: "Advanced Security", description: "Enterprise-grade security features", available: permissions.advancedPiPayments, highlight: true },
          { name: "Custom Domain SSL", description: "Free SSL certificates for custom domains", available: permissions.hasWhitelabel, highlight: false }
        ]
      }
    },
    analytics: {
      title: "Analytics & Insights",
      icon: <BarChart3 className="w-5 h-5" />,
      features: {
        free: [
          { name: "Basic Stats", description: "View total clicks and page views", available: true, highlight: false }
        ],
        starter: [
          { name: "Click Analytics", description: "Detailed click tracking per link", available: permissions.basicAnalytics, highlight: false }
        ],
        pro: [
          { name: "Location Analytics", description: "See where your visitors come from", available: permissions.locationAnalytics, highlight: true },
          { name: "Email Collection", description: "Capture visitor contact information", available: permissions.emailPhoneCollection, highlight: false },
          { name: "Spotlight Links", description: "Highlight and promote important links", available: permissions.spotlightLinks, highlight: false }
        ],
        premium: [
          { name: "Historical Data", description: "Long-term performance insights and trends", available: permissions.historicalInsights, highlight: true },
          { name: "Advanced Reports", description: "Comprehensive analytics dashboards", available: permissions.hasDataExport, highlight: false }
        ]
      }
    }
  };

  const planIcons = {
    free: <Zap className="w-5 h-5" />,
    starter: <Users className="w-5 h-5" />,
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
      toast({
        title: "Login Required",
        description: "Please log in to upgrade your plan",
      });
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
    <>
      <Helmet>
        <title>Features - Droplink | Pi Network Link in Bio Tool</title>
        <meta name="description" content="Discover all Droplink features. Create stunning link-in-bio pages, accept Pi payments, and grow your audience with our comprehensive feature set." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30">
        <Navbar />
        
        <main className="flex-grow py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            {/* Hero Section */}
            <AnimatedContainer animation="fade" className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary">Complete Feature Overview</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Everything You Need to Succeed
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
                From basic link sharing to advanced Pi Network integration, discover the complete feature set that makes Droplink the ultimate link-in-bio platform for creators.
              </p>
            </AnimatedContainer>

            {/* Plan Selector */}
            <AnimatedContainer animation="scale" delay={0.2} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6">Choose Your Plan to Explore Features</h2>
                <Tabs value={selectedPlan} onValueChange={(value) => setSelectedPlan(value as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-14 bg-gray-100">
                    {(['free', 'starter', 'pro', 'premium'] as const).map((plan) => (
                      <TabsTrigger 
                        key={plan} 
                        value={plan} 
                        className="flex flex-col gap-1 h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          {planIcons[plan]}
                          <span className="font-medium capitalize">{plan}</span>
                        </div>
                        <span className="text-xs text-gray-500">{planPricingDisplay[plan].price}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Feature Categories */}
                  {Object.entries(featureCategories).map(([categoryKey, category]) => (
                    <TabsContent key={categoryKey} value={selectedPlan} className="mt-8">
                      <div className="space-y-8">
                        <div className="text-center">
                          <Badge className={`${planColors[selectedPlan]} text-white text-lg px-6 py-2 mb-4`}>
                            {planIcons[selectedPlan]}
                            <span className="ml-2">{selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan Features</span>
                          </Badge>
                          
                          {/* Pricing Display */}
                          <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg p-4 max-w-md mx-auto mt-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {planPricingDisplay[selectedPlan].price}
                                <span className="text-lg text-gray-600">{planPricingDisplay[selectedPlan].period}</span>
                              </div>
                              {selectedPlan !== 'free' && (
                                <div className="text-sm text-gray-600 mt-1">
                                  Annual: {getPlanPrice(selectedPlan as 'starter' | 'pro' | 'premium', 'annual')}π/month 
                                  <span className="text-green-600 ml-1">(Save {Math.round(((getPlanPrice(selectedPlan as 'starter' | 'pro' | 'premium', 'monthly') - getPlanPrice(selectedPlan as 'starter' | 'pro' | 'premium', 'annual')) / getPlanPrice(selectedPlan as 'starter' | 'pro' | 'premium', 'monthly')) * 100)}%)</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {Object.entries(featureCategories).map(([catKey, cat]) => {
                          const planFeatures = cat.features[selectedPlan] || [];
                          if (planFeatures.length === 0) return null;

                          return (
                            <div key={catKey} className="space-y-4">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                  {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold">{cat.title}</h3>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {planFeatures.map((feature, index) => (
                                  <Card 
                                    key={index} 
                                    className={`relative transition-all duration-300 hover:shadow-lg ${
                                      feature.available 
                                        ? feature.highlight 
                                          ? 'border-primary bg-gradient-to-br from-primary/5 to-blue-50' 
                                          : 'border-green-200 bg-green-50/50'
                                        : 'border-gray-200 bg-gray-50'
                                    }`}
                                  >
                                    {feature.highlight && feature.available && (
                                      <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs">
                                        Popular
                                      </Badge>
                                    )}
                                    <CardHeader className="pb-3">
                                      <CardTitle className="flex items-center gap-3 text-lg">
                                        {feature.available ? (
                                          <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                          <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        )}
                                        <span className={feature.available ? 'text-gray-900' : 'text-gray-500'}>
                                          {feature.name}
                                        </span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className={`text-sm mb-4 ${feature.available ? 'text-gray-600' : 'text-gray-500'}`}>
                                        {feature.description}
                                      </p>
                                      
                                      {!feature.available && !canAccessPlan(selectedPlan) && (
                                        <Button 
                                          size="sm" 
                                          className="w-full bg-primary hover:bg-primary/90"
                                          onClick={() => handleUpgrade(selectedPlan)}
                                        >
                                          Upgrade to Unlock
                                          <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                      )}
                                      
                                      {feature.available && (
                                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                          <CheckIcon className="w-4 h-4" />
                                          Available in your plan
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          );
                        })}

                        {/* Call to Action */}
                        <AnimatedContainer animation="fade" delay={0.4} className="mt-12">
                          <Card className="bg-gradient-to-r from-primary/10 via-blue-50 to-purple-50 border-primary/20">
                            <CardContent className="p-8 text-center">
                              <div className="max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold mb-4">
                                  Ready to Get Started with {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}?
                                </h3>
                                <p className="text-gray-600 mb-6">
                                  {selectedPlan === 'free' 
                                    ? "Start building your link-in-bio page today with our free plan."
                                    : `Unlock all ${selectedPlan} features and take your content to the next level.`
                                  }
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                  <Button 
                                    size="lg"
                                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg"
                                    onClick={() => selectedPlan === 'free' ? navigate('/signup') : handleUpgrade(selectedPlan)}
                                  >
                                    {selectedPlan === 'free' ? 'Get Started Free' : `Upgrade to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}`}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="lg"
                                    onClick={() => navigate('/demo')}
                                    className="border-primary text-primary hover:bg-primary/5"
                                  >
                                    Try Demo First
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedContainer>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </AnimatedContainer>

            {/* Feature Comparison */}
            <AnimatedContainer animation="fade" delay={0.6} className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Compare All Plans</h2>
                <p className="text-gray-600">See what's included in each plan at a glance</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-6 font-semibold">Features</th>
                        {(['free', 'starter', 'pro', 'premium'] as const).map((plan) => (
                          <th key={plan} className="text-center p-6">
                            <div className="flex flex-col items-center gap-2">
                              {planIcons[plan]}
                              <span className="font-semibold capitalize">{plan}</span>
                              <span className="text-sm text-gray-500">{planPricingDisplay[plan].price}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(featureCategories).map(([catKey, category]) => (
                        <tr key={catKey} className="border-t">
                          <td className="p-6 font-medium bg-gray-50">
                            <div className="flex items-center gap-2">
                              {category.icon}
                              {category.title}
                            </div>
                          </td>
                          {(['free', 'starter', 'pro', 'premium'] as const).map((plan) => (
                            <td key={plan} className="p-6 text-center">
                              <span className="text-sm text-gray-600">
                                {category.features[plan]?.length || 0} features
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Features;
