
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, BarChart3, Palette, Settings, Zap, Users } from "lucide-react";
import EnhancedLinksManager from "./EnhancedLinksManager";
import AdvancedAnalytics from "./AdvancedAnalytics";
import AppearanceSettings from "./AppearanceSettings";
import MetadataSettings from "./MetadataSettings";
import LockedFeaturesSection from "./LockedFeaturesSection";

const EnhancedDashboardTabs = () => {
  return (
    <Tabs defaultValue="links" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="links" className="flex items-center gap-2">
          <Link className="w-4 h-4" />
          <span className="hidden sm:inline">Links</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Analytics</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline">Appearance</span>
        </TabsTrigger>
        <TabsTrigger value="social" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">Social</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
        <TabsTrigger value="upgrade" className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline">Upgrade</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="links" className="mt-6">
        <EnhancedLinksManager />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-6">
        <AdvancedAnalytics />
      </TabsContent>
      
      <TabsContent value="appearance" className="mt-6">
        <AppearanceSettings />
      </TabsContent>
      
      <TabsContent value="social" className="mt-6">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Social Features</h3>
          <p className="text-gray-600">Advanced social media integration and cross-posting features</p>
        </div>
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <MetadataSettings />
      </TabsContent>
      
      <TabsContent value="upgrade" className="mt-6">
        <LockedFeaturesSection />
      </TabsContent>
    </Tabs>
  );
};

export default EnhancedDashboardTabs;
