
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  Heart, 
  BarChart3, 
  QrCode,
  Star,
  Crown,
  Lock,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DemoPiProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'starter' | 'pro' | 'premium'>('free');

  const planFeatures = {
    free: {
      color: "bg-gray-500",
      icon: <Zap className="w-4 h-4" />,
      features: ["1 Link", "Basic Profile", "Pi Ads"]
    },
    starter: {
      color: "bg-green-500", 
      icon: <Star className="w-4 h-4" />,
      features: ["Unlimited Links", "Analytics", "Custom Themes"]
    },
    pro: {
      color: "bg-blue-500",
      icon: <Star className="w-4 h-4" />,
      features: ["QR Codes", "Scheduling", "Performance Analytics"]
    },
    premium: {
      color: "bg-purple-500",
      icon: <Crown className="w-4 h-4" />,
      features: ["Pi Payments", "Whitelabel", "Priority Support"]
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary">Try Droplink Demo</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Experience how your profile will look and work with different subscription plans
            </p>
          </div>

          {/* Plan Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center p-1 bg-muted rounded-lg">
              {Object.entries(planFeatures).map(([plan, config]) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                    selectedPlan === plan ? 'bg-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  {config.icon}
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Demo Preview */}
            <div className="relative max-w-[360px] mx-auto">
              <div className="absolute -top-6 -left-6 -right-6 -bottom-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl -z-10"></div>
              <Card className="border-2 border-muted overflow-hidden shadow-xl w-full transform transition-all duration-300 hover:shadow-2xl">
                <div className="bg-black text-white p-3 flex items-center justify-center gap-2 text-xs">
                  <Smartphone size={14} />
                  <span>demo.droplink.space/@pioneer</span>
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="bg-muted p-2">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="profile" className="m-0">
                    <div className="h-[500px] overflow-y-auto">
                      <div className="bg-gradient-hero h-32 relative">
                        <Badge className={`absolute top-3 right-3 ${planFeatures[selectedPlan].color} text-white`}>
                          {planFeatures[selectedPlan].icon}
                          {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-center px-4">
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-muted flex items-center justify-center overflow-hidden mt-4">
                          <img 
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80" 
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h2 className="font-bold text-xl mt-2">Pi Pioneer</h2>
                        <p className="text-sm text-muted-foreground text-center">
                          {selectedPlan === 'premium' ? 'Premium Business Profile - Custom branding & Pi payments' :
                           selectedPlan === 'pro' ? 'Pro Creator - Advanced analytics & scheduling' :
                           selectedPlan === 'starter' ? 'Verified Creator - Unlimited links & analytics' :
                           'New Pioneer - Building my presence'}
                        </p>
                        
                        <div className="flex gap-3 mt-3">
                          <Button size="sm" variant="outline">Follow</Button>
                          <Button size="sm">
                            {selectedPlan === 'premium' ? 'Buy with Pi' : 'Tip Pi'}
                          </Button>
                        </div>
                        
                        <div className="w-full space-y-3 mt-6">
                          {selectedPlan === 'free' ? (
                            <DemoLink title="My Main Link" subtitle="Only 1 link available" icon={Calendar} />
                          ) : (
                            <>
                              <DemoLink 
                                title={selectedPlan === 'premium' ? 'Buy My Course - 25π' : 'Latest Pi Network Update'} 
                                subtitle={selectedPlan === 'premium' ? 'Premium course with Pi payments' : 'My analysis on the latest changes'} 
                                icon={selectedPlan === 'premium' ? Heart : Calendar} 
                              />
                              <DemoLink title="Pi Merchant Guide" subtitle="Learn how to accept Pi payments" icon={ArrowUpRight} />
                              <DemoLink title="Weekly Newsletter" subtitle="Subscribe to get Pi news" icon={Clock} />
                              {selectedPlan !== 'starter' && (
                                <>
                                  <DemoLink title="Support My Content" subtitle="Tip 1π to unlock exclusive guides" icon={Heart} />
                                  <DemoLink title="Join Discord Community" subtitle="Connect with other Pioneers" icon={ArrowUpRight} />
                                </>
                              )}
                            </>
                          )}
                        </div>
                        
                        {selectedPlan === 'free' && (
                          <div className="bg-blue-50 p-3 rounded-lg mt-4 text-center">
                            <p className="text-xs text-blue-800">
                              🔒 Upgrade to add more links and features
                            </p>
                          </div>
                        )}
                        
                        <div className="text-center text-xs text-muted-foreground mt-6 py-4">
                          {selectedPlan === 'premium' ? 'Powered by Your Brand' : 'Made with Droplink.space'} · Create your own for free
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dashboard" className="m-0">
                    <div className="h-[500px] overflow-y-auto p-4">
                      <h3 className="font-bold text-lg mb-4">Analytics Dashboard</h3>
                      
                      {selectedPlan === 'free' ? (
                        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Analytics Locked</p>
                            <p className="text-sm text-gray-500">Upgrade to Starter to unlock</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            <Card className="p-3">
                              <p className="text-xs text-muted-foreground">VISITORS</p>
                              <p className="text-2xl font-bold">{selectedPlan === 'premium' ? '5,234' : selectedPlan === 'pro' ? '2,847' : '1,234'}</p>
                              <p className="text-xs text-green-500">↑ {selectedPlan === 'premium' ? '25%' : selectedPlan === 'pro' ? '18%' : '12%'} this week</p>
                            </Card>
                            <Card className="p-3">
                              <p className="text-xs text-muted-foreground">LINK CLICKS</p>
                              <p className="text-2xl font-bold">{selectedPlan === 'premium' ? '3,421' : selectedPlan === 'pro' ? '1,857' : '857'}</p>
                              <p className="text-xs text-green-500">↑ {selectedPlan === 'premium' ? '20%' : selectedPlan === 'pro' ? '15%' : '8%'} this week</p>
                            </Card>
                            <Card className="p-3">
                              <p className="text-xs text-muted-foreground">{selectedPlan === 'premium' ? 'PI SALES' : 'PI TIPS'}</p>
                              <p className="text-2xl font-bold">{selectedPlan === 'premium' ? '145π' : selectedPlan === 'pro' ? '68π' : '42π'}</p>
                              <p className="text-xs text-green-500">↑ {selectedPlan === 'premium' ? '35%' : selectedPlan === 'pro' ? '22%' : '15%'} this week</p>
                            </Card>
                            <Card className="p-3">
                              <p className="text-xs text-muted-foreground">FOLLOWERS</p>
                              <p className="text-2xl font-bold">{selectedPlan === 'premium' ? '2,145' : selectedPlan === 'pro' ? '892' : '268'}</p>
                              <p className="text-xs text-green-500">↑ {selectedPlan === 'premium' ? '12%' : selectedPlan === 'pro' ? '8%' : '5%'} this week</p>
                            </Card>
                          </div>
                          
                          {(selectedPlan === 'pro' || selectedPlan === 'premium') && (
                            <>
                              <h4 className="font-semibold text-sm mb-2">Advanced Analytics</h4>
                              <div className="space-y-2 mb-4">
                                <Card className="p-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Top Country: United States</span>
                                    <span className="font-semibold">45%</span>
                                  </div>
                                </Card>
                                <Card className="p-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Peak Time: 2PM - 4PM</span>
                                    <span className="font-semibold">32%</span>
                                  </div>
                                </Card>
                              </div>
                            </>
                          )}
                          
                          <Button className="w-full">
                            {selectedPlan === 'premium' ? 'Export Full Report' : 'View Detailed Analytics'}
                          </Button>
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="m-0">
                    <div className="h-[500px] overflow-y-auto p-4">
                      <h3 className="font-bold text-lg mb-4">Available Features</h3>
                      
                      <div className="space-y-3">
                        {planFeatures[selectedPlan].features.map((feature, index) => (
                          <Card key={index} className="p-3 bg-green-50 border-green-200">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-green-500" />
                              <span className="font-medium">{feature}</span>
                            </div>
                          </Card>
                        ))}
                        
                        {selectedPlan !== 'premium' && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium text-sm mb-2 text-gray-500">Upgrade for more:</h4>
                            <div className="space-y-2">
                              {selectedPlan === 'free' && (
                                <>
                                  <Card className="p-3 bg-gray-50 border-gray-200">
                                    <div className="flex items-center gap-2">
                                      <Lock className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Unlimited Links</span>
                                      <Badge className="bg-green-500 text-white text-xs">Starter</Badge>
                                    </div>
                                  </Card>
                                  <Card className="p-3 bg-gray-50 border-gray-200">
                                    <div className="flex items-center gap-2">
                                      <Lock className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Analytics Dashboard</span>
                                      <Badge className="bg-green-500 text-white text-xs">Starter</Badge>
                                    </div>
                                  </Card>
                                </>
                              )}
                              {(selectedPlan === 'free' || selectedPlan === 'starter') && (
                                <>
                                  <Card className="p-3 bg-gray-50 border-gray-200">
                                    <div className="flex items-center gap-2">
                                      <Lock className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">QR Code Generator</span>
                                      <Badge className="bg-blue-500 text-white text-xs">Pro</Badge>
                                    </div>
                                  </Card>
                                  <Card className="p-3 bg-gray-50 border-gray-200">
                                    <div className="flex items-center gap-2">
                                      <Lock className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Link Scheduling</span>
                                      <Badge className="bg-blue-500 text-white text-xs">Pro</Badge>
                                    </div>
                                  </Card>
                                </>
                              )}
                              {selectedPlan !== 'premium' && (
                                <>
                                  <Card className="p-3 bg-gray-50 border-gray-200">
                                    <div className="flex items-center gap-2">
                                      <Lock className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Pi Payments</span>
                                      <Badge className="bg-purple-500 text-white text-xs">Premium</Badge>
                                    </div>
                                  </Card>
                                  <Card className="p-3 bg-gray-50 border-gray-200">
                                    <div className="flex items-center gap-2">
                                      <Lock className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-600">Whitelabel</span>
                                      <Badge className="bg-purple-500 text-white text-xs">Premium</Badge>
                                    </div>
                                  </Card>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Plan Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {planFeatures[selectedPlan].icon}
                    <h3 className="text-2xl font-bold">
                      {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
                    </h3>
                    <Badge className={`${planFeatures[selectedPlan].color} text-white`}>
                      {selectedPlan === 'free' ? 'Free' : 
                       selectedPlan === 'starter' ? '8π/month' :
                       selectedPlan === 'pro' ? '12π/month' : '18π/month'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">What you get:</h4>
                      <ul className="space-y-2">
                        {planFeatures[selectedPlan].features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Perfect for:</h4>
                      <p className="text-gray-600 text-sm">
                        {selectedPlan === 'free' && "Getting started and testing the platform"}
                        {selectedPlan === 'starter' && "Individual creators and influencers who want unlimited links and basic analytics"}
                        {selectedPlan === 'pro' && "Professional creators who need advanced features like QR codes and detailed analytics"}
                        {selectedPlan === 'premium' && "Businesses and power users who want to sell products and have full control"}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Link to="/pricing" className="flex-1">
                        <Button className="w-full bg-gradient-hero hover:bg-secondary">
                          {selectedPlan === 'free' ? 'Start Free' : `Get ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}`}
                        </Button>
                      </Link>
                      <Link to="/features">
                        <Button variant="outline">
                          Compare Plans
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">Ready to get started?</h3>
                    <p className="text-gray-600 mb-4">
                      Join thousands of creators already using Droplink to grow their presence
                    </p>
                    <Link to="/signup">
                      <Button className="bg-gradient-hero hover:bg-secondary">
                        Create Your Profile Now
                      </Button>
                    </Link>
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

const DemoLink = ({ title, subtitle, icon: Icon }) => {
  return (
    <Card className="p-4 hover:bg-muted transition-colors cursor-pointer flex items-center gap-3 transform hover:scale-[1.02] duration-200">
      <div className="bg-primary/10 text-primary p-2 rounded-lg">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  );
};

export default DemoPiProfilePage;
