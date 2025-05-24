
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Menu, Twitter, X, LogOut, UserRound } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavbar from "@/components/ui/mobile-navbar";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, signOut, profile } = useUser();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Use mobile navbar for mobile devices - moved after all hooks
  if (isMobile) {
    return <MobileNavbar />;
  }

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm px-6 md:px-12 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 font-poppins font-bold text-2xl text-primary">
        <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
        </svg>
        Droplink
      </Link>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/features" className="nav-link">Features</Link>
        <Link to="/demo" className="nav-link">Demo</Link>
        <Link to="/pricing" className="nav-link">Pricing</Link>
        <Link to="/templates" className="nav-link">Templates</Link>
        
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-primary" 
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Log Out
            </Button>
            {profile && (
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link to="/dashboard">
                  <UserRound size={18} />
                  {profile.username || 'Account'}
                </Link>
              </Button>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Log In</Link>
            <Button asChild className="bg-gradient-hero hover:bg-secondary">
              <Link to="/signup">Start Free</Link>
            </Button>
          </>
        )}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <a href="https://instagram.com" aria-label="Instagram" className="text-primary hover:text-secondary transition-colors">
          <Instagram size={20} />
        </a>
        <a href="https://twitter.com" aria-label="Twitter" className="text-primary hover:text-secondary transition-colors">
          <Twitter size={20} />
        </a>
        <a href="https://facebook.com" aria-label="Facebook" className="text-primary hover:text-secondary transition-colors">
          <Facebook size={20} />
        </a>
      </div>
    </header>
  );
};

export default Navbar;
