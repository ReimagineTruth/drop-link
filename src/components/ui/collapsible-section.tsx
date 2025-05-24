
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SmoothMobileCard from './smooth-mobile-card';
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  showCount?: number;
  className?: string;
}

const CollapsibleSection = ({
  title,
  children,
  defaultExpanded = true,
  showCount,
  className
}: CollapsibleSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
  };

  return (
    <div className={cn("mb-4", className)}>
      <SmoothMobileCard
        onClick={toggleExpanded}
        className="mx-4 mb-3"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {showCount !== undefined && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {showCount}
              </span>
            )}
          </div>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </motion.div>
        </div>
      </SmoothMobileCard>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1.0]
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                duration: 0.2,
                ease: "easeInOut"
              }
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;
