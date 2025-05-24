
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div id="pi-domain-features">
          <PiDomainFeatures />
        </div>
        <HowItWorks />
        <PiDomainSection />
        <PiNetworkEcosystem />
        <MobilePreview />
        <DemoPiProfile />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingGoToTop />
    </div>
  );
};

export default Index;
