
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import FeatureGate from "@/components/FeatureGate";
import MetadataSettings from "@/components/dashboard/MetadataSettings";
import DomainSettings from "@/components/profile/DomainSettings";
import { Lock, Crown, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const { permissions, plan } = useUserPermissions();
  const [settings, setSettings] = useState({
    notifications: true,
    analytics: true,
    publicProfile: true,
    darkMode: false
  });

  const getPlanBadge = () => {
    switch (plan) {
      case 'premium':
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"><Crown className="w-3 h-3 mr-1" />Premium</Badge>;
      case 'pro':
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"><Star className="w-3 h-3 mr-1" />Pro</Badge>;
      case 'starter':
        return <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white"><Zap className="w-3 h-3 mr-1" />Starter</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Settings</h1>
              {getPlanBadge()}
            </div>
            <p className="text-gray-600 mt-2">Manage your account and preferences</p>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic account preferences and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about your account</p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                    />
                  </div>

                  <FeatureGate 
                    feature="basicAnalytics" 
                    featureName="Analytics Tracking"
                    fallback={
                      <div className="flex items-center justify-between opacity-50">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Analytics Tracking
                          </Label>
                          <p className="text-sm text-muted-foreground">Track visitor analytics (Starter+ feature)</p>
                        </div>
                        <Switch disabled />
                      </div>
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics Tracking</Label>
                        <p className="text-sm text-muted-foreground">Track visitor analytics</p>
                      </div>
                      <Switch
                        checked={settings.analytics}
                        onCheckedChange={(checked) => setSettings({...settings, analytics: checked})}
                      />
                    </div>
                  </FeatureGate>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Make your profile discoverable</p>
                    </div>
                    <Switch
                      checked={settings.publicProfile}
                      onCheckedChange={(checked) => setSettings({...settings, publicProfile: checked})}
                    />
                  </div>

                  <FeatureGate 
                    feature="hasAdvancedThemes" 
                    featureName="Dark Mode"
                    fallback={
                      <div className="flex items-center justify-between opacity-50">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Dark Mode
                          </Label>
                          <p className="text-sm text-muted-foreground">Dark theme support (Pro+ feature)</p>
                        </div>
                        <Switch disabled />
                      </div>
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Use dark theme</p>
                      </div>
                      <Switch
                        checked={settings.darkMode}
                        onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
                      />
                    </div>
                  </FeatureGate>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Customize your public profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" placeholder="Your Name" />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="username" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell people about yourself..." />
                  </div>

                  <FeatureGate 
                    feature="emailPhoneCollection" 
                    featureName="Contact Information"
                    fallback={
                      <div className="space-y-2 opacity-50">
                        <Label className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Contact Information
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="Email" disabled />
                          <Input placeholder="Phone" disabled />
                        </div>
                        <p className="text-xs text-muted-foreground">Contact collection available with Pro plan</p>
                      </div>
                    }
                  >
                    <div className="space-y-2">
                      <Label>Contact Information</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Contact Email" />
                        <Input placeholder="Phone Number" />
                      </div>
                    </div>
                  </FeatureGate>
                  
                  <Button>Save Profile</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="domains">
              <DomainSettings />
            </TabsContent>

            <TabsContent value="seo">
              <MetadataSettings />
            </TabsContent>

            <TabsContent value="advanced">
              <div className="space-y-6">
                <FeatureGate 
                  feature="hasDataExport" 
                  featureName="Data Export"
                  fallback={
                    <Card className="opacity-75">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lock className="w-5 h-5" />
                          Data Export
                        </CardTitle>
                        <CardDescription>Export your profile data (Premium feature)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center p-6 bg-purple-50 rounded-lg">
                          <h3 className="font-medium mb-2">Premium Feature</h3>
                          <p className="text-gray-600 mb-4">Export all your data including analytics, links, and insights</p>
                          <Link to="/pricing">
                            <Button className="bg-gradient-hero hover:bg-secondary">
                              Upgrade to Premium
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  }
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Export</CardTitle>
                      <CardDescription>Export your profile data and analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">Download all your data including links, analytics, and profile information.</p>
                        <Button>Export Data</Button>
                      </div>
                    </CardContent>
                  </Card>
                </FeatureGate>

                <FeatureGate 
                  feature="hasWhitelabel" 
                  featureName="Whitelabel Options"
                  fallback={
                    <Card className="opacity-75">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lock className="w-5 h-5" />
                          Whitelabel Options
                        </CardTitle>
                        <CardDescription>Remove Droplink branding (Premium feature)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center p-6 bg-purple-50 rounded-lg">
                          <h3 className="font-medium mb-2">Premium Feature</h3>
                          <p className="text-gray-600 mb-4">Remove all Droplink branding from your profile</p>
                          <Link to="/pricing">
                            <Button className="bg-gradient-hero hover:bg-secondary">
                              Upgrade to Premium
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  }
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Whitelabel Options</CardTitle>
                      <CardDescription>Customize branding and remove Droplink attribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Remove Droplink Branding</Label>
                            <p className="text-sm text-muted-foreground">Hide "Powered by Droplink" footer</p>
                          </div>
                          <Switch />
                        </div>
                        <Button>Save Settings</Button>
                      </div>
                    </CardContent>
                  </Card>
                </FeatureGate>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border border-red-200 rounded-lg p-4">
                        <h3 className="font-medium text-red-600 mb-2">Delete Account</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
