import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import PiPaymentSuccess from './pages/PiPaymentSuccess';
import PiPaymentCancel from './pages/PiPaymentCancel';
import DemoPiPage from './pages/DemoPiPage';
import { UserProvider } from './context/UserContext';
import AdminDashboard from './pages/AdminDashboard';
import DemoPiProfilePage from "@/pages/DemoPiProfilePage";

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <HelmetProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/@:username" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/pi-payment/success" element={<PiPaymentSuccess />} />
              <Route path="/pi-payment/cancel" element={<PiPaymentCancel />} />
              <Route path="/demo.pi" element={<DemoPiPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/demo.pi" element={<DemoPiProfilePage />} />
            </Routes>
          </div>
        </HelmetProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
