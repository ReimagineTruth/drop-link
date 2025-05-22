
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import SplashScreen from "./components/SplashScreen";
import { UserProvider } from "./context/UserContext";
import { UpgradeModalProvider, useUpgradeModal } from "./hooks/useUpgradeModal";
import UpgradeModal from "./components/UpgradeModal";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Templates from "./pages/Templates";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import GDPR from "./pages/GDPR";
import Demo from "./pages/Demo";
import DemoPiPage from "./pages/DemoPiPage";
import Help from "./pages/Help";
import AllFaqs from "./pages/AllFaqs";
import Community from "./pages/Community";
import CreatorDirectory from "./pages/CreatorDirectory";
import Developers from "./pages/Developers";
import AdminStatusProvider from "./components/admin/AdminStatusProvider";
import Settings from "@/pages/Settings";

// App component
function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  // Check if splash screen has been shown already in this session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);
  
  // Handle splash screen completion
  const handleSplashComplete = () => {
    sessionStorage.setItem("hasSeenSplash", "true");
    setShowSplash(false);
  };
  
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <UserProvider>
      <AdminStatusProvider>
        <UpgradeModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/@:username" element={<ProfilePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/gdpr" element={<GDPR />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/demo.pi" element={<DemoPiPage />} />
              <Route path="/help" element={<Help />} />
              <Route path="/help/all-faqs" element={<AllFaqs />} />
              <Route path="/community" element={<Community />} />
              <Route path="/creators" element={<CreatorDirectory />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/:section" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            {/* Modal needs to be inside Router */}
            <UpgradeModalConsumer />
          </Router>
        </UpgradeModalProvider>
      </AdminStatusProvider>
    </UserProvider>
  );
}

// Component to consume the upgrade modal context and render the modal inside Router context
const UpgradeModalConsumer = () => {
  const navigate = useNavigate(); // Now this is inside Router context
  const { isModalOpen, featureName, closeUpgradeModal } = useUpgradeModal();
  
  // Navigation handler to pass to the modal
  const handleNavigateToPricing = () => {
    navigate('/pricing');
  };
  
  return (
    <UpgradeModal 
      isOpen={isModalOpen} 
      onClose={closeUpgradeModal} 
      featureName={featureName}
      onNavigateToPricing={handleNavigateToPricing}
    />
  );
};

export default App;
