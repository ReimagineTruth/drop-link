
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from "@/lib/utils";

const FloatingGoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 100px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg",
            "bg-white dark:bg-gray-800",
            "border border-gray-200 dark:border-gray-600",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-50 dark:hover:bg-gray-700",
            "hover:shadow-xl dark:hover:shadow-gray-900/30",
            "transition-all duration-300 ease-in-out",
            "transform-gpu touch-manipulation",
            "flex items-center justify-center",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "active:scale-95",
            "backdrop-blur-sm",
            "safe-area-inset-bottom"
          )}
          style={{ 
            touchAction: 'manipulation',
            bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
            right: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Go to top"
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingGoToTop;
