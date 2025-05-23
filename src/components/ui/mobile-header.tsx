
import React from 'react';
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  className?: string;
  logoSrc?: string;
}

const MobileHeader = ({ className, logoSrc }: MobileHeaderProps) => {
  return (
    <header className={cn(
      "w-full flex justify-center items-center py-4",
      "bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out",
      className
    )}>
      <div className="flex items-center justify-center">
        {logoSrc ? (
          <img 
            src={logoSrc}
            alt="Droplink Logo"
            className="w-16 h-16 transition-opacity duration-300"
          />
        ) : (
          <svg 
            className="w-16 h-16 text-primary dark:text-blue-400 transition-colors duration-300" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            aria-label="Droplink Logo"
          >
            <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
          </svg>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
