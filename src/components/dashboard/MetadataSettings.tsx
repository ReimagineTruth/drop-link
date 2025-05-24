
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import FeatureGate from "@/components/FeatureGate";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const MetadataSettings = () => {
  const { permissions } = useUserPermissions();
  const [metadata, setMetadata] = useState({
    title: "My Droplink Profile",
    description: "Check out my links and content",
    image: ""
  });

  const handleSave = () => {
    toast({
      title: "Metadata Updated",
      description: "Your SEO settings have been saved",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Metadata Settings</CardTitle>
        <CardDescription>
          Customize how your page appears when shared on social media
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FeatureGate 
          feature="hasSEOTools" 
          featureName="SEO Tools"
          fallback={
            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">SEO Tools - Pro Feature</h3>
              <p className="text-gray-600 mb-4">
                Customize your page metadata and improve search engine visibility
              </p>
              <Link to="/pricing">
                <Button className="bg-gradient-hero hover:bg-secondary">
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={metadata.title}
                onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                placeholder="My Awesome Profile"
              />
              <p className="text-xs text-gray-500 mt-1">
                This appears in search results and browser tabs
              </p>
            </div>
            
            <div>
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                value={metadata.description}
                onChange={(e) => setMetadata({...metadata, description: e.target.value})}
                placeholder="Brief description of your profile and content"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                This appears in search results and social media previews
              </p>
            </div>
            
            <div>
              <Label htmlFor="image">Social Media Image URL</Label>
              <Input
                id="image"
                value={metadata.image}
                onChange={(e) => setMetadata({...metadata, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Image shown when your page is shared on social media
              </p>
            </div>
            
            <Button onClick={handleSave} className="w-full">
              Save SEO Settings
            </Button>
          </div>
        </FeatureGate>
      </CardContent>
    </Card>
  );
};

export default MetadataSettings;
