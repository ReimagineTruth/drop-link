import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen from '@/components/SplashScreen';
import { UserProvider } from '@/context/UserContext';
import { AdminStatusProvider } from '@/components/admin/AdminStatusProvider';

// Import i18n configuration
import './i18n';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Help from '@/pages/Help';
import Community from '@/pages/Community';
import Blog from '@/pages/Blog';
import Developers from '@/pages/Developers';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import GDPR from '@/pages/GDPR';
import Cookies from '@/pages/Cookies';
import Admin from '@/pages/Admin';
import AdminPortal from '@/pages/AdminPortal';
import AllFaqs from '@/pages/AllFaqs';
import ProfilePage from '@/pages/ProfilePage';
import Templates from '@/pages/Templates';
import TemplatePreview from '@/pages/TemplatePreview';
import Demo from '@/pages/Demo';
import DemoPiPage from '@/pages/DemoPiPage';
import CreatorDirectory from '@/pages/CreatorDirectory';
import Careers from '@/pages/Careers';

// Create a client
const queryClient = new QueryClient();

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const handleSplashComplete = () => {
    setShowSplashScreen(false);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AdminStatusProvider>
            <Router>
              <Helmet>
                <title>Droplink.space - Link in Bio for Pi Network Creators</title>
                <meta name="description" content="Create your professional Pi Network creator profile in seconds. Bio link tool optimized for Pi Network content creators and businesses." />
                <meta property="og:title" content="Droplink.space - Link in Bio for Pi Network Creators" />
                <meta property="og:description" content="Create your professional Pi Network creator profile in seconds. Bio link tool optimized for Pi Network content creators and businesses." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://droplink.space" />
                <meta property="og:image" content="https://droplink.space/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Droplink.space - Link in Bio for Pi Network Creators" />
                <meta name="twitter:description" content="Create your professional Pi Network creator profile in seconds. Bio link tool optimized for Pi Network content creators and businesses." />
                <meta name="twitter:image" content="https://droplink.space/og-image.jpg" />
              </Helmet>
              
              {showSplashScreen && <SplashScreen onComplete={handleSplashComplete} />}
              <Toaster />
              
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help/all-faqs" element={<AllFaqs />} />
                <Route path="/community" element={<Community />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/developers" element={<Developers />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/gdpr" element={<GDPR />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/creators" element={<CreatorDirectory />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/demo/pi-domain" element={<DemoPiPage />} />
                <Route path="/@:username" element={<ProfilePage />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/templates/:id" element={<TemplatePreview />} />
                
                {/* Private routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/portal" element={<AdminPortal />} />
                
                {/* 404 and redirects */}
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </AdminStatusProvider>
        </UserProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
