
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Upload, Camera } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { uploadFile } from '@/services/storageService';

interface AvatarUploadProps {
  currentAvatar?: string | null;
  onAvatarUpdate: (url: string) => void;
}

const AvatarUpload = ({ currentAvatar, onAvatarUpdate }: AvatarUploadProps) => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: t('common.error'),
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t('common.error'),
        description: "Image size must be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      const url = await uploadFile(file, "avatars", "avatars");
      if (url) {
        onAvatarUpdate(url);
        toast({
          title: t('common.success'),
          description: "Avatar updated successfully"
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: "Failed to upload avatar",
        variant: "destructive"
      });
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const displayAvatar = previewUrl || currentAvatar;

  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src={displayAvatar || undefined} alt="Profile picture" />
        <AvatarFallback>
          <Camera className="w-8 h-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      
      <div className="space-y-2">
        <Button 
          type="button"
          variant="outline" 
          onClick={triggerFileSelect}
          disabled={isUploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Upload Avatar'}
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <p className="text-xs text-muted-foreground">
          Recommended: Square image, max 5MB
        </p>
      </div>
    </div>
  );
};

export default AvatarUpload;
