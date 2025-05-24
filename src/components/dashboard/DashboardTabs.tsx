
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, BarChart3, Palette, Settings, Zap } from "lucide-react";
import LinksManager from "./LinksManager";
import AnalyticsOverview from "./AnalyticsOverview";
import AppearanceSettings from "./AppearanceSettings";
import MetadataSettings from "./MetadataSettings";
import LockedFeaturesSection from "./LockedFeaturesSection";

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="links" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
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
        <LinksManager />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-6">
        <AnalyticsOverview />
      </TabsContent>
      
      <TabsContent value="appearance" className="mt-6">
        <AppearanceSettings />
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

export default DashboardTabs;
