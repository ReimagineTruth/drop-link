
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Globe, 
  Palette, 
  Bell, 
  Shield, 
  CreditCard, 
  ArrowRight,
  QrCode,
  Download,
  Eye
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import FeatureGate from "@/components/FeatureGate";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { profile, isAdmin } = useUser();
  const { permissions, plan } = useUserPermissions();
  const [settings, setSettings] = useState({
    displayName: profile?.display_name || "",
    bio: profile?.bio || "",
    emailNotifications: true,
    publicProfile: true,
    showAnalytics: false
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your profile settings have been updated",
    });
  };

  const generateQRCode = () => {
    toast({
      title: "QR Code Generated",
      description: "Your profile QR code has been created",
    });
  };

  const exportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be emailed to you shortly",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{plan}</Badge>
                {isAdmin && <Badge variant="secondary">Admin</Badge>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar Navigation */}
            <div className="space-y-2">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <a href="#profile" className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 text-primary">
                      <User className="w-4 h-4" />
                      Profile
                    </a>
                    <Link to="/settings/domains" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                      <Globe className="w-4 h-4" />
                      Domains
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Link>
                    <a href="#appearance" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                      <Palette className="w-4 h-4" />
                      Appearance
                    </a>
                    <a href="#notifications" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </a>
                    <a href="#privacy" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                      <Shield className="w-4 h-4" />
                      Privacy
                    </a>
                    <a href="#billing" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                      <CreditCard className="w-4 h-4" />
                      Billing
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Profile Settings */}
              <Card id="profile">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your public profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={settings.displayName}
                      onChange={(e) => setSettings({...settings, displayName: e.target.value})}
                      placeholder="Your display name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profile?.username || ""}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Username cannot be changed
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={settings.bio}
                      onChange={(e) => setSettings({...settings, bio: e.target.value})}
                      placeholder="Tell people about yourself"
                      rows={3}
                    />
                  </div>
                  
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardContent>
              </Card>

              {/* Appearance Settings */}
              <Card id="appearance">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how your profile looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FeatureGate 
                    feature="hasAdvancedThemes" 
                    featureName="Custom Themes"
                    fallback={
                      <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <h4 className="font-medium mb-2">Custom Themes - Pro Feature</h4>
                        <p className="text-gray-600 mb-3">
                          Access premium themes and customization options
                        </p>
                        <Link to="/pricing">
                          <Button size="sm" className="bg-gradient-hero hover:bg-secondary">
                            Upgrade Plan
                          </Button>
                        </Link>
                      </div>
                    }
                  >
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 border rounded-lg cursor-pointer hover:border-primary">
                        <div className="w-full h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded mb-2"></div>
                        <p className="text-xs text-center">Gradient</p>
                      </div>
                      <div className="p-3 border rounded-lg cursor-pointer hover:border-primary">
                        <div className="w-full h-20 bg-gray-900 rounded mb-2"></div>
                        <p className="text-xs text-center">Dark</p>
                      </div>
                      <div className="p-3 border rounded-lg cursor-pointer hover:border-primary">
                        <div className="w-full h-20 bg-white border rounded mb-2"></div>
                        <p className="text-xs text-center">Minimal</p>
                      </div>
                    </div>
                  </FeatureGate>
                </CardContent>
              </Card>

              {/* QR Code */}
              <Card>
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                  <CardDescription>
                    Generate a QR code for your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FeatureGate 
                    feature="hasQRCode" 
                    featureName="QR Code Generator"
                    fallback={
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h4 className="font-medium mb-2">QR Code - Pro Feature</h4>
                        <p className="text-gray-600 mb-3">
                          Generate QR codes to share your profile offline
                        </p>
                        <Link to="/pricing">
                          <Button size="sm" className="bg-gradient-hero hover:bg-secondary">
                            Upgrade to Pro
                          </Button>
                        </Link>
                      </div>
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          Generate a QR code for easy sharing of your profile
                        </p>
                        <Button onClick={generateQRCode} variant="outline">
                          <QrCode className="w-4 h-4 mr-2" />
                          Generate QR Code
                        </Button>
                      </div>
                    </div>
                  </FeatureGate>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card id="privacy">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your profile visibility and data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Public Profile</Label>
                      <p className="text-sm text-gray-500">
                        Make your profile visible to everyone
                      </p>
                    </div>
                    <Switch
                      checked={settings.publicProfile}
                      onCheckedChange={(checked) => setSettings({...settings, publicProfile: checked})}
                    />
                  </div>
                  
                  <FeatureGate 
                    feature="hasAnalytics" 
                    featureName="Analytics Visibility"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Analytics Badge</Label>
                        <p className="text-sm text-gray-500">
                          Display view count on your profile
                        </p>
                      </div>
                      <Switch
                        checked={settings.showAnalytics}
                        onCheckedChange={(checked) => setSettings({...settings, showAnalytics: checked})}
                      />
                    </div>
                  </FeatureGate>
                  
                  <FeatureGate 
                    feature="hasDataExport" 
                    featureName="Data Export"
                    fallback={
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-400">Export Your Data</p>
                            <p className="text-sm text-gray-400">Premium feature</p>
                          </div>
                          <Button disabled size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Export Your Data</Label>
                        <p className="text-sm text-gray-500">
                          Download all your profile and analytics data
                        </p>
                      </div>
                      <Button onClick={exportData} size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </FeatureGate>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card id="notifications">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Receive updates about your account
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing */}
              <Card id="billing">
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-medium mb-2">Current Plan: {plan}</h4>
                    <p className="text-gray-600 mb-4">
                      {plan === 'free' ? 
                        'Upgrade to unlock premium features' : 
                        'Manage your subscription and billing settings'
                      }
                    </p>
                    <Link to="/pricing">
                      <Button className="bg-gradient-hero hover:bg-secondary">
                        {plan === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
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

export default Settings;
