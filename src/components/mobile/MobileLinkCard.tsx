
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2, ExternalLink, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTouchDevice } from "@/hooks/use-mobile";

interface MobileLinkCardProps {
  link: {
    id: string;
    title: string;
    url: string;
    icon?: string;
    description?: string;
    order_index: number;
  };
  onEdit?: (linkId: string) => void;
  onDelete?: (linkId: string) => void;
  onReorder?: (linkId: string, direction: 'up' | 'down') => void;
  isFirst?: boolean;
  isLast?: boolean;
  compact?: boolean;
}

const MobileLinkCard = ({ 
  link, 
  onEdit, 
  onDelete, 
  onReorder, 
  isFirst, 
  isLast,
  compact = false 
}: MobileLinkCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isTouch = useTouchDevice();

  const handleLinkClick = (e: React.MouseEvent) => {
    if (showActions) {
      e.preventDefault();
      setShowActions(false);
      return;
    }
    
    // Add ripple effect
    if (isTouch) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
    }
    
    // Open link
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const handleTouchStart = () => {
    if (isTouch) {
      setIsPressed(true);
    }
  };

  const handleTouchEnd = () => {
    if (isTouch) {
      setTimeout(() => setIsPressed(false), 150);
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200 ease-out",
      "border border-gray-200 hover:border-gray-300",
      "hover:shadow-md active:scale-[0.98]",
      isPressed && "scale-[0.98] shadow-md",
      compact ? "rounded-lg" : "rounded-2xl"
    )}>
      {/* Ripple effect overlay */}
      {isPressed && (
        <div className="absolute inset-0 bg-primary/10 animate-ping rounded-inherit pointer-events-none" />
      )}
      
      <div 
        className={cn(
          "flex items-center gap-4 cursor-pointer select-none",
          compact ? "p-3" : "p-4"
        )}
        onClick={handleLinkClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Icon */}
        <div className={cn(
          "flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-2xl",
          compact ? "w-10 h-10" : "w-12 h-12"
        )}>
          {link.icon || '🔗'}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold text-gray-900 truncate",
            compact ? "text-sm" : "text-base"
          )}>
            {link.title}
          </h3>
          {!compact && link.description && (
            <p className="text-sm text-gray-500 truncate mt-1">
              {link.description}
            </p>
          )}
          <p className={cn(
            "text-gray-400 truncate",
            compact ? "text-xs mt-1" : "text-sm mt-1"
          )}>
            {link.url}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full opacity-60 hover:opacity-100",
              compact ? "h-8 w-8" : "h-10 w-10"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Action Menu */}
      {showActions && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(link.id);
                  setShowActions(false);
                }}
                className="h-8 px-2 text-xs"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(link.id);
                  setShowActions(false);
                }}
                className="h-8 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
            
            <div className="flex gap-1">
              {!isFirst && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder?.(link.id, 'up');
                    setShowActions(false);
                  }}
                  className="h-8 w-8"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
              )}
              
              {!isLast && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder?.(link.id, 'down');
                    setShowActions(false);
                  }}
                  className="h-8 w-8"
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MobileLinkCard;
