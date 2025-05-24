
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SocialCardPreviewProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  type?: 'facebook' | 'twitter';
}

const SocialCardPreview = ({ 
  title = "Your Profile Title", 
  description = "Your profile description will appear here", 
  imageUrl, 
  url = "droplink.space/@yourname",
  type = 'facebook'
}: SocialCardPreviewProps) => {
  const isTwitter = type === 'twitter';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline">
          {isTwitter ? 'Twitter Card' : 'Facebook Preview'}
        </Badge>
      </div>
      
      <Card className="max-w-md overflow-hidden">
        {imageUrl && (
          <div className="aspect-[1.91/1] overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Social preview" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <CardContent className="p-4 space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            {url}
          </div>
          
          <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
            {title}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
          
          {isTwitter && (
            <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px]">t</span>
              </div>
              Twitter Card
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialCardPreview;
