
import React from 'react';
import { ExternalLink, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SmoothMobileCard from "@/components/ui/smooth-mobile-card";
import { cn } from "@/lib/utils";

interface OptimizedLinkCardProps {
  link: {
    id: string;
    title: string;
    url: string;
    icon?: string;
    description?: string;
    clicks?: number;
  };
  onEdit?: (linkId: string) => void;
  onDelete?: (linkId: string) => void;
  compact?: boolean;
  delay?: number;
}

const OptimizedLinkCard = ({ 
  link, 
  onEdit, 
  onDelete, 
  compact = false,
  delay = 0
}: OptimizedLinkCardProps) => {
  const handleLinkClick = () => {
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle menu actions
  };

  return (
    <SmoothMobileCard
      onClick={handleLinkClick}
      className="mx-4 mb-3"
      delay={delay}
    >
      <div className={cn(
        "flex items-center gap-4",
        compact ? "px-3 py-2" : "px-4 py-3"
      )}>
        {/* Icon/Avatar */}
        <div className={cn(
          "flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50",
          "flex items-center justify-center font-medium",
          compact ? "w-10 h-10 text-lg" : "w-12 h-12 text-xl"
        )}>
          {link.icon || '🔗'}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-gray-900 font-semibold truncate",
            compact ? "text-sm" : "text-base"
          )}>
            {link.title}
          </h3>
          {!compact && link.description && (
            <p className="text-xs text-gray-500 truncate mt-1">
              {link.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <p className={cn(
              "text-gray-400 truncate",
              compact ? "text-xs" : "text-xs"
            )}>
              {link.url.replace(/^https?:\/\//, '')}
            </p>
            {link.clicks !== undefined && (
              <span className="text-xs text-gray-400">
                • {link.clicks} clicks
              </span>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full text-gray-400 hover:text-gray-600",
              "hover:bg-gray-100 transition-colors duration-200",
              compact ? "h-8 w-8" : "h-9 w-9"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleLinkClick();
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          
          {(onEdit || onDelete) && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full text-gray-400 hover:text-gray-600",
                "hover:bg-gray-100 transition-colors duration-200",
                compact ? "h-8 w-8" : "h-9 w-9"
              )}
              onClick={handleMenuClick}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </SmoothMobileCard>
  );
};

export default OptimizedLinkCard;
