
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedContainer } from "@/components/ui/animated-container";

// Import developer components
import AdminBanner from "@/components/developers/AdminBanner";
import HeroSection from "@/components/developers/HeroSection";
import ApiDocsSection from "@/components/developers/ApiDocsSection";
import WebhooksSection from "@/components/developers/WebhooksSection";
import PiIntegrationSection from "@/components/developers/PiIntegrationSection";
import SdksSection from "@/components/developers/SdksSection";
import GetStartedSection from "@/components/developers/GetStartedSection";
import DevCTASection from "@/components/developers/DevCTASection";

const Developers = () => {
  const [activeTab, setActiveTab] = useState("api");
  
  // Handler function for tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Developers - Droplink.space API Documentation</title>
        <meta name="description" content="Access the Droplink.space API to integrate Pi Network payments and user data into your applications." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        {/* Admin Notice Banner */}
        <AdminBanner />
      
        {/* Hero Section */}
        <HeroSection />
        
        {/* API Overview */}
        <section id="api-docs" className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold mb-8">API Documentation</h2>
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="api">REST API</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                <TabsTrigger value="pi-integration">Pi Integration</TabsTrigger>
                <TabsTrigger value="sdks">SDKs</TabsTrigger>
              </TabsList>
              
              <AnimatedContainer animation="fade" className="mt-6">
                <ApiDocsSection activeTab={activeTab} setActiveTab={handleTabChange} />
                <WebhooksSection />
                <PiIntegrationSection />
                <SdksSection />
              </AnimatedContainer>
            </Tabs>
          </div>
        </section>
        
        {/* Get Started */}
        <GetStartedSection />
        
        {/* Call to Action */}
        <DevCTASection />
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Developers;
