
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { Palette, Upload, User } from "lucide-react";
import FeatureGate from "@/components/FeatureGate";

const AppearanceSettings = () => {
  const { profile, updateProfile } = useUser();
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      toast({
        title: "Profile Updated",
        description: "Your profile appearance has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const themeOptions = [
    { name: "Default", bg: "bg-white", text: "text-gray-900" },
    { name: "Dark", bg: "bg-gray-900", text: "text-white" },
    { name: "Gradient", bg: "bg-gradient-to-br from-purple-400 to-pink-400", text: "text-white" },
    { name: "Nature", bg: "bg-gradient-to-br from-green-400 to-blue-500", text: "text-white" }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Customize how your profile appears to visitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                placeholder="Your display name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell people about yourself..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar_url">Profile Image URL</Label>
              <Input
                id="avatar_url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500">
                Enter a URL to an image or upload one using the button below
              </p>
            </div>

            <FeatureGate 
              feature="hasFileUploads" 
              featureName="File Uploads"
              fallback={
                <Button type="button" disabled>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image (Premium Feature)
                </Button>
              }
            >
              <Button type="button" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </FeatureGate>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme & Appearance
          </CardTitle>
          <CardDescription>
            Choose how your page looks to visitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureGate 
            feature="hasAdvancedThemes" 
            featureName="Advanced Themes"
            fallback={
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Advanced Themes - Pro Feature</h3>
                <p className="text-gray-600 mb-4">
                  Unlock beautiful themes and customization options
                </p>
                <Button className="bg-gradient-hero hover:bg-secondary">
                  Upgrade to Pro
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {themeOptions.map((theme) => (
                <div
                  key={theme.name}
                  className={`${theme.bg} ${theme.text} p-4 rounded-lg cursor-pointer border-2 border-transparent hover:border-primary transition-all`}
                >
                  <div className="text-center">
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-sm opacity-75">Preview</div>
                  </div>
                </div>
              ))}
            </div>
          </FeatureGate>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
