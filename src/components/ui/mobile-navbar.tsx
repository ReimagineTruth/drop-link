
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowLeft, Settings, LogOut, UserRound } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import DarkModeToggle from "./dark-mode-toggle";
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavbarProps {
  showBackButton?: boolean;
  title?: string;
}

const MobileNavbar = ({ showBackButton = false, title }: MobileNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, signOut, profile } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleBack = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Enable smooth scrolling globally
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <header className={cn(
        "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-50",
        "border-b border-gray-100 dark:border-gray-800",
        "px-4 py-3 flex justify-between items-center min-h-[56px]",
        "transition-all duration-300 ease-in-out"
      )}>
        {/* Left side */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className={cn(
                "h-10 w-10 rounded-full touch-manipulation",
                "transition-all duration-200 ease-in-out",
                "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              style={{ touchAction: 'manipulation' }}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          {!showBackButton && (
            <Link 
              to="/" 
              className="flex items-center gap-2 font-poppins font-bold text-xl text-primary dark:text-blue-400 transition-colors duration-200"
            >
              <motion.svg 
                className="w-6 h-6" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
              </motion.svg>
              Droplink
            </Link>
          )}
          
          {title && (
            <h1 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">{title}</h1>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          
          {isLoggedIn && profile && (
            <Button 
              asChild 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-10 w-10 rounded-full touch-manipulation",
                "transition-all duration-200 ease-in-out",
                "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              style={{ touchAction: 'manipulation' }}
            >
              <Link to="/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className={cn(
              "h-10 w-10 rounded-full touch-manipulation",
              "transition-all duration-200 ease-in-out",
              "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
            style={{ touchAction: 'manipulation' }}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 z-50 shadow-xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
                    </svg>
                    <span className="font-poppins font-bold text-xl text-primary dark:text-blue-400">Droplink</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleMobileMenu}
                    className="h-10 w-10 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* User Profile Section */}
                {isLoggedIn && profile && (
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        <img 
                          src={profile.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profile.username}`}
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">@{profile.username}</p>
                        <p className="text-sm text-gray-500">{profile.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-2">
                  <Link 
                    to="/" 
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">🏠</span>
                    <span className="font-medium">Home</span>
                  </Link>
                  
                  <Link 
                    to="/features" 
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">⚡</span>
                    <span className="font-medium">Features</span>
                  </Link>
                  
                  <Link 
                    to="/pricing" 
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">💎</span>
                    <span className="font-medium">Pricing</span>
                  </Link>
                  
                  <Link 
                    to="/templates" 
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">🎨</span>
                    <span className="font-medium">Templates</span>
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        onClick={toggleMobileMenu}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg">📊</span>
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      
                      <Link 
                        to="/settings" 
                        onClick={toggleMobileMenu}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Settings</span>
                      </Link>
                    </>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <UserRound className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Log In</span>
                    </Link>
                  )}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  {isLoggedIn ? (
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout}
                      className={cn(
                        "w-full justify-start gap-3 h-12 text-red-600 hover:text-red-700",
                        "hover:bg-red-50 dark:hover:bg-red-900/20 touch-manipulation"
                      )}
                      style={{ touchAction: 'manipulation' }}
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Sign Out</span>
                    </Button>
                  ) : (
                    <Button 
                      asChild 
                      className={cn(
                        "w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600",
                        "hover:from-blue-600 hover:to-purple-700 touch-manipulation"
                      )}
                      style={{ touchAction: 'manipulation' }}
                    >
                      <Link to="/signup" onClick={toggleMobileMenu}>
                        Get Started
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
