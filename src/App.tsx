
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
import Pricing from './pages/Pricing';
import DemoPiPage from './pages/DemoPiPage';
import { UserProvider } from './context/UserContext';
import Admin from './pages/Admin';
import DemoPiProfilePage from "@/pages/DemoPiProfilePage";

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
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/demo.pi" element={<DemoPiProfilePage />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </HelmetProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

