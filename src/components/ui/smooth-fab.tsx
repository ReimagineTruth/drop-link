
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SmoothFABProps {
  onClick?: () => void;
  icon?: 'plus' | 'edit';
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const SmoothFAB = ({ 
  onClick, 
  icon = 'plus', 
  label = 'Add',
  className,
  variant = 'primary'
}: SmoothFABProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePointerDown = () => {
    setIsPressed(true);
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    onClick?.();
  };

  const IconComponent = icon === 'edit' ? Edit3 : Plus;

  return (
    <motion.button
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "h-14 w-14 rounded-full shadow-lg",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        "transform-gpu touch-manipulation",
        variant === 'primary' 
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl" 
          : "bg-white text-gray-700 border border-gray-200 hover:shadow-md",
        className
      )}
      style={{ touchAction: 'manipulation' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: isPressed ? 0.9 : 1, 
        y: 0,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      exit={{ opacity: 0, scale: 0, y: 100 }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
      aria-label={label}
    >
      <IconComponent className="h-6 w-6" />
    </motion.button>
  );
};

export default SmoothFAB;
