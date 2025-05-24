
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import ImageUploader from '@/components/ui/ImageUploader';
import SocialCardPreview from '@/components/ui/SocialCardPreview';

interface MetadataData {
  title: string;
  description: string;
  imageUrl: string;
}

const MetadataSettings = () => {
  const { user, profile } = useUser();
  const { toast } = useToast();
  const [metadata, setMetadata] = useState<MetadataData>({
    title: '',
    description: '',
    imageUrl: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setMetadata({
        title: profile.display_name || profile.username || '',
        description: profile.bio || '',
        imageUrl: profile.avatar_url || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, you'd save this to your backend
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Metadata Updated",
        description: "Your link preview settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save metadata. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof MetadataData, value: string) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const profileUrl = profile?.username ? `@${profile.username}` : '@yourname';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Link Preview Settings</CardTitle>
          <CardDescription>
            Control how your profile appears when shared on social media platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Settings Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Preview Title</Label>
                <Input
                  id="meta-title"
                  placeholder="e.g., John Doe - Creator & Entrepreneur"
                  value={metadata.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {metadata.title.length}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Preview Description</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Add a catchy description that tells people what you're about..."
                  value={metadata.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {metadata.description.length}/160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label>Preview Image</Label>
                <ImageUploader
                  value={metadata.imageUrl}
                  onChange={(url) => handleInputChange('imageUrl', url || '')}
                  placeholder="Upload an image for social media previews"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 1200x630px for best results across all platforms
                </p>
              </div>

              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? 'Saving...' : 'Save Metadata Settings'}
              </Button>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See how your profile will appear when shared:
                </p>
              </div>

              <Tabs defaultValue="facebook" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="facebook">Facebook</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                </TabsList>
                
                <TabsContent value="facebook" className="mt-4">
                  <SocialCardPreview
                    title={metadata.title || `${profile?.display_name || profile?.username || 'Your Name'}`}
                    description={metadata.description || 'Your profile description will appear here'}
                    imageUrl={metadata.imageUrl}
                    url={`droplink.space/${profileUrl}`}
                    type="facebook"
                  />
                </TabsContent>
                
                <TabsContent value="twitter" className="mt-4">
                  <SocialCardPreview
                    title={metadata.title || `${profile?.display_name || profile?.username || 'Your Name'}`}
                    description={metadata.description || 'Your profile description will appear here'}
                    imageUrl={metadata.imageUrl}
                    url={`droplink.space/${profileUrl}`}
                    type="twitter"
                  />
                </TabsContent>
              </Tabs>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Tips for better previews:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Keep titles under 60 characters</li>
                  <li>• Descriptions work best at 120-160 characters</li>
                  <li>• Use high-quality images (1200x630px)</li>
                  <li>• Include relevant keywords</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetadataSettings;
