
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import MobilePreview from "@/components/MobilePreview";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PiDomainSection from "@/components/PiDomainSection";
import DemoPiProfile from "@/components/DemoPiProfile";
import PiNetworkEcosystem from "@/components/PiNetworkEcosystem";
import PiDomainFeatures from "@/components/PiDomainFeatures";
import FloatingGoToTop from "@/components/ui/floating-go-to-top";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col maximize-space">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div id="pi-domain-features" className="py-8 md:py-12">
          <PiDomainFeatures />
        </div>
        <div className="py-8 md:py-12">
          <HowItWorks />
        </div>
        <div className="py-8 md:py-12">
          <PiDomainSection />
        </div>
        <div className="py-8 md:py-12">
          <PiNetworkEcosystem />
        </div>
        <div className="py-8 md:py-12">
          <MobilePreview />
        </div>
        <div className="py-8 md:py-12">
          <DemoPiProfile />
        </div>
        <div className="py-8 md:py-12">
          <Features />
        </div>
        <div className="py-8 md:py-12">
          <Testimonials />
        </div>
        <div className="py-8 md:py-12">
          <FAQ />
        </div>
        <div className="py-8 md:py-12">
          <CTA />
        </div>
      </main>
      <Footer />
      <FloatingGoToTop />
    </div>
  );
};

export default Index;
