
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface SmoothMobileCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const SmoothMobileCard = ({ 
  children, 
  onClick, 
  className,
  animate = true,
  delay = 0
}: SmoothMobileCardProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePointerDown = () => {
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  const handlePointerLeave = () => {
    setIsPressed(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const CardComponent = animate ? motion.div : 'div';

  return (
    <CardComponent
      {...(animate && {
        variants: cardVariants,
        initial: "hidden",
        animate: "visible",
        exit: "exit"
      })}
      className={cn(
        "bg-white rounded-2xl shadow-md border border-gray-100",
        "transition-all duration-300 ease-in-out",
        "transform-gpu", // Use GPU acceleration
        isPressed ? "scale-[0.97] shadow-lg" : "scale-100 hover:shadow-lg",
        onClick && "cursor-pointer touch-manipulation", // Remove tap delays
        className
      )}
      style={{ touchAction: 'manipulation' }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      {children}
    </CardComponent>
  );
};

export default SmoothMobileCard;
