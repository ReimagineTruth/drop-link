
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnhancedDashboardTabs from "@/components/dashboard/EnhancedDashboardTabs";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import LoginPrompt from "@/components/dashboard/LoginPrompt";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { user, isLoading, isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      const timer = setTimeout(() => {
        setShowLoginPrompt(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isLoggedIn) {
    return <LoginPrompt visible={showLoginPrompt} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Dashboard | Droplink</title>
        <meta name="description" content="Manage your Droplink profile, links, and analytics" />
      </Helmet>
      
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardHeader />
          <EnhancedDashboardTabs />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
