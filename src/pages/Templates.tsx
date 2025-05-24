
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import TemplateHeader from "@/components/templates/TemplateHeader";
import TemplatesGrid from "@/components/templates/TemplatesGrid";
import TemplatePricingSection from "@/components/templates/TemplatePricingSection";
import CustomTemplateSection from "@/components/templates/CustomTemplateSection";
import { templatesData } from "@/data/templatesData";

const Templates = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredTemplates = activeTab === "all" 
    ? templatesData 
    : templatesData.filter(template => template.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col maximize-space">
      <Helmet>
        <title>Templates | Droplink.space - Link in Bio for Pi Network Creators</title>
        <meta name="description" content="Choose from our collection of professionally designed templates that make your Droplink profile stand out." />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <TemplateHeader setActiveTab={setActiveTab} />
        
        <section className="py-8 px-2 md:px-4">
          <div className="container mx-auto max-w-7xl">
            <TemplatesGrid templates={filteredTemplates} />
          </div>
        </section>
        
        <div className="py-8">
          <TemplatePricingSection />
        </div>
        <div className="py-8">
          <CustomTemplateSection />
        </div>
        <div className="py-8">
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
