
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import ImageUploader from '@/components/ui/ImageUploader';
import SocialCardPreview from '@/components/ui/SocialCardPreview';

interface MetadataData {
  title: string;
  description: string;
  image_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
}

const MetadataSettings = () => {
  const { user, profile } = useUser();
  const { toast } = useToast();
  const [metadata, setMetadata] = useState<MetadataData>({
    title: '',
    description: '',
    image_url: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (profile?.id) {
      fetchMetadata();
    }
  }, [profile?.id]);

  const fetchMetadata = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_metadata')
        .select('*')
        .eq('user_id', profile!.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setMetadata({
          title: data.title || '',
          description: data.description || '',
          image_url: data.image_url || '',
          og_title: data.og_title || '',
          og_description: data.og_description || '',
          og_image: data.og_image || '',
          twitter_title: data.twitter_title || '',
          twitter_description: data.twitter_description || '',
          twitter_image: data.twitter_image || ''
        });
      } else {
        // Set default values from profile
        const defaultTitle = profile?.display_name || profile?.username || '';
        const defaultDescription = profile?.bio || '';
        const defaultImage = profile?.avatar_url || '';
        
        setMetadata({
          title: defaultTitle,
          description: defaultDescription,
          image_url: defaultImage,
          og_title: defaultTitle,
          og_description: defaultDescription,
          og_image: defaultImage,
          twitter_title: defaultTitle,
          twitter_description: defaultDescription,
          twitter_image: defaultImage
        });
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
      toast({
        title: "Error",
        description: "Failed to load metadata settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !profile) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('user_metadata')
        .upsert({
          user_id: profile.id,
          ...metadata,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast({
        title: "Metadata Updated",
        description: "Your link preview settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving metadata:', error);
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

  const getCanonicalUrl = () => {
    if (profile?.custom_domain) {
      return `https://${profile.custom_domain}`;
    } else if (profile?.pi_domain) {
      return `https://${profile.pi_domain}.pi`;
    }
    return `https://droplink.space/@${profile?.username}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="facebook">Facebook</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4">
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
                      value={metadata.image_url}
                      onChange={(url) => handleInputChange('image_url', url || '')}
                      placeholder="Upload an image for social media previews"
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended: 1200x630px for best results across all platforms
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="facebook" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="og-title">Facebook Title</Label>
                    <Input
                      id="og-title"
                      placeholder="Custom title for Facebook (optional)"
                      value={metadata.og_title}
                      onChange={(e) => handleInputChange('og_title', e.target.value)}
                      maxLength={60}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="og-description">Facebook Description</Label>
                    <Textarea
                      id="og-description"
                      placeholder="Custom description for Facebook (optional)"
                      value={metadata.og_description}
                      onChange={(e) => handleInputChange('og_description', e.target.value)}
                      maxLength={160}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Facebook Image</Label>
                    <ImageUploader
                      value={metadata.og_image}
                      onChange={(url) => handleInputChange('og_image', url || '')}
                      placeholder="Upload a custom image for Facebook"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="twitter" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter-title">Twitter Title</Label>
                    <Input
                      id="twitter-title"
                      placeholder="Custom title for Twitter (optional)"
                      value={metadata.twitter_title}
                      onChange={(e) => handleInputChange('twitter_title', e.target.value)}
                      maxLength={60}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter-description">Twitter Description</Label>
                    <Textarea
                      id="twitter-description"
                      placeholder="Custom description for Twitter (optional)"
                      value={metadata.twitter_description}
                      onChange={(e) => handleInputChange('twitter_description', e.target.value)}
                      maxLength={160}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Twitter Image</Label>
                    <ImageUploader
                      value={metadata.twitter_image}
                      onChange={(url) => handleInputChange('twitter_image', url || '')}
                      placeholder="Upload a custom image for Twitter"
                    />
                  </div>
                </TabsContent>
              </Tabs>

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
                    title={metadata.og_title || metadata.title || `${profile?.display_name || profile?.username || 'Your Name'}`}
                    description={metadata.og_description || metadata.description || 'Your profile description will appear here'}
                    imageUrl={metadata.og_image || metadata.image_url}
                    url={getCanonicalUrl()}
                    type="facebook"
                  />
                </TabsContent>
                
                <TabsContent value="twitter" className="mt-4">
                  <SocialCardPreview
                    title={metadata.twitter_title || metadata.title || `${profile?.display_name || profile?.username || 'Your Name'}`}
                    description={metadata.twitter_description || metadata.description || 'Your profile description will appear here'}
                    imageUrl={metadata.twitter_image || metadata.image_url}
                    url={getCanonicalUrl()}
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
                  <li>• Test your .pi domain: {profile?.pi_domain ? `${profile.pi_domain}.pi` : 'Set up your .pi domain'}</li>
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
