
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import Settings from './pages/Settings';
import DomainsSettings from './pages/DomainsSettings';
import Pricing from './pages/Pricing';
import DemoPiPage from './pages/DemoPiPage';
import NotFound from './pages/NotFound';
import { UserProvider } from './context/UserContext';
import Admin from './pages/Admin';
import DemoPiProfilePage from "@/pages/DemoPiProfilePage";

// Import existing pages that are referenced in footer
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Templates from './pages/Templates';
import CreatorDirectory from './pages/CreatorDirectory';
import Developers from './pages/Developers';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import GDPR from './pages/GDPR';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <HelmetProvider>
          <div className="w-screen h-screen overflow-auto hide-scrollbar smooth-scroll bg-background text-foreground">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/@:username" element={<ProfilePage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/domains" element={<DomainsSettings />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/demo.pi" element={<DemoPiProfilePage />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* Footer pages */}
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/creators" element={<CreatorDirectory />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/gdpr" element={<GDPR />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </HelmetProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
