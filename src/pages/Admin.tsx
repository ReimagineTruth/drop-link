
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { BarChart3, Shield, Users, Settings } from "lucide-react";
import PiDomainManager from "@/components/admin/PiDomainManager";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Admin = () => {
  const { isAdmin, isLoading } = useAdminStatus();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Checking admin access...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Access Denied</h2>
              <p className="text-gray-600">You need admin privileges to access this area.</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
            <p className="text-xl text-gray-600">
              Manage users, domains, and system settings
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/dashboard')}>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 text-sm">View comprehensive analytics and metrics</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">User Management</h3>
                <p className="text-gray-600 text-sm">Manage user accounts and permissions</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Settings className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">System Settings</h3>
                <p className="text-gray-600 text-sm">Configure system-wide settings</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Security</h3>
                <p className="text-gray-600 text-sm">Monitor security and access logs</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Admin Tools */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Access frequently used admin tools and features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => navigate('/admin/dashboard')}
                    className="w-full"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics Dashboard
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Export User Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    System Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <PiDomainManager />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
