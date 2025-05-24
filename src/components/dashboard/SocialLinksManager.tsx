
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Twitter, Facebook, Linkedin, Youtube, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string;
}

const SocialLinksManager = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({
    platform: 'instagram',
    username: ''
  });
  const { toast } = useToast();

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, baseUrl: 'https://instagram.com/' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, baseUrl: 'https://twitter.com/' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, baseUrl: 'https://facebook.com/' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, baseUrl: 'https://linkedin.com/in/' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, baseUrl: 'https://youtube.com/@' }
  ];

  const handleAddSocialLink = () => {
    if (!newLink.username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    const platform = socialPlatforms.find(p => p.id === newLink.platform);
    const socialLink: SocialLink = {
      id: Date.now().toString(),
      platform: newLink.platform,
      url: platform?.baseUrl + newLink.username,
      username: newLink.username
    };

    setSocialLinks([...socialLinks, socialLink]);
    setNewLink({ platform: 'instagram', username: '' });
    setShowAddForm(false);
    
    toast({
      title: "Social link added",
      description: `${platform?.name} link added successfully`,
    });
  };

  const handleRemoveSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
    toast({
      title: "Social link removed",
      description: "Link has been removed",
    });
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = socialPlatforms.find(p => p.id === platform);
    const IconComponent = platformData?.icon || Instagram;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="w-5 h-5" />
          Social Links
        </CardTitle>
        <CardDescription>
          Add your social media profiles ({socialLinks.length} added)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {socialLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getPlatformIcon(link.platform)}
                <div>
                  <div className="font-medium text-sm">
                    {socialPlatforms.find(p => p.id === link.platform)?.name}
                  </div>
                  <div className="text-xs text-gray-500">@{link.username}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveSocialLink(link.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {showAddForm && (
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="platform" className="text-sm">Platform</Label>
                  <select
                    id="platform"
                    value={newLink.platform}
                    onChange={(e) => setNewLink({...newLink, platform: e.target.value})}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                  >
                    {socialPlatforms.map((platform) => (
                      <option key={platform.id} value={platform.id}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="username" className="text-sm">Username</Label>
                  <Input
                    id="username"
                    value={newLink.username}
                    onChange={(e) => setNewLink({...newLink, username: e.target.value})}
                    placeholder="Enter username (without @)"
                    className="text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddSocialLink} size="sm">Add Link</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)} size="sm">Cancel</Button>
                </div>
              </div>
            </div>
          )}

          {!showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              variant="outline" 
              className="w-full border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Social Link
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLinksManager;
