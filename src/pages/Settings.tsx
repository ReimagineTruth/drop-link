
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Settings components
import DomainSettings from "@/components/profile/DomainSettings";

const Settings = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState(section || "profile");
  
  // Redirect to login if not logged in - moved this logic after hooks
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/settings/${value}`);
  };
  
  // Early return for loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg">Loading settings...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect to login if not logged in - after hooks have been called
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">Profile settings coming soon</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="domains">
              <DomainSettings />
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">Account settings coming soon</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
