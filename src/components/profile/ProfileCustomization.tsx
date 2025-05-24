
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUser } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';
import AvatarUpload from './AvatarUpload';
import ThemeSelector from './ThemeSelector';
import ColorCustomizer from './ColorCustomizer';

const ProfileCustomization = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { profile, updateProfile, isLoading } = useUserProfile(user);
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    theme: profile?.theme || 'default',
    primary_color: profile?.primary_color || '#3B82F6',
    secondary_color: profile?.secondary_color || '#10B981'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      toast({
        title: t('common.success'),
        description: "Profile updated successfully"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <div className="text-center py-8">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('profile.editProfile')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="space-y-2">
              <Label>{t('profile.avatar')}</Label>
              <AvatarUpload 
                currentAvatar={profile?.avatar_url}
                onAvatarUpdate={(url) => updateProfile({ avatar_url: url })}
              />
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="display_name">{t('profile.displayName')}</Label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => handleInputChange('display_name', e.target.value)}
                placeholder="Your display name"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">{t('profile.bio')}</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell the world about yourself..."
                rows={4}
              />
            </div>

            {/* Theme Selection */}
            <div className="space-y-2">
              <Label>{t('profile.theme')}</Label>
              <ThemeSelector
                currentTheme={formData.theme}
                onThemeChange={(theme) => handleInputChange('theme', theme)}
              />
            </div>

            {/* Color Customization */}
            <div className="space-y-2">
              <Label>{t('profile.colors')}</Label>
              <ColorCustomizer
                primaryColor={formData.primary_color}
                secondaryColor={formData.secondary_color}
                onPrimaryColorChange={(color) => handleInputChange('primary_color', color)}
                onSecondaryColorChange={(color) => handleInputChange('secondary_color', color)}
              />
            </div>

            <Button type="submit" className="w-full">
              {t('common.save')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCustomization;
