
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Features from './pages/Features';
import Demo from './pages/Demo';
import Templates from './pages/Templates';
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Help from './pages/Help';
import CreatorDirectory from './pages/CreatorDirectory';
import Developers from './pages/Developers';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import GDPR from './pages/GDPR';
import AllFaqs from './pages/AllFaqs';
import { UserProvider } from './context/UserContext';
import AdminDashboard from "@/pages/AdminDashboard";

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/help" element={<Help />} />
            <Route path="/creators" element={<CreatorDirectory />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/faq" element={<AllFaqs />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
