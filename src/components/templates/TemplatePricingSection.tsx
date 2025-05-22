
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { planPricing } from "@/hooks/usePiPayment";

const TemplatePricingSection = () => {
  // Get pricing from centralized pricing structure
  const starterMonthly = planPricing.starter.monthly;
  const starterAnnual = planPricing.starter.annual;
  const proMonthly = planPricing.pro.monthly;
  const proAnnual = planPricing.pro.annual;
  const premiumMonthly = planPricing.premium.monthly;
  const premiumAnnual = planPricing.premium.annual;

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">Template Availability by Plan</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Starter</h3>
            <p className="text-lg mb-2">{starterAnnual}π/month</p>
            <p className="mb-6 text-muted-foreground">Access to 5+ basic templates</p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Basic color customization
              </li>
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Standard layout options
              </li>
            </ul>
            <Button variant="outline" asChild className="w-full hover:bg-blue-50 transition-colors">
              <Link to="/pricing">Get Starter</Link>
            </Button>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-lg border-primary border-2 transform scale-[1.02]">
            <div className="bg-primary text-white text-sm font-semibold py-1 px-3 rounded-full w-fit mx-auto -mt-10 mb-4">Most Popular</div>
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-lg mb-2">{proAnnual}π/month</p>
            <p className="mb-6 text-muted-foreground">Access to 15+ premium templates</p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Advanced color customization
              </li>
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Custom button styles
              </li>
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Link animations
              </li>
            </ul>
            <Button asChild className="w-full bg-gradient-hero hover:scale-105 transition-transform">
              <Link to="/pricing">Get Pro</Link>
            </Button>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm border border-blue-100">
            <h3 className="text-2xl font-semibold mb-4">Premium</h3>
            <p className="text-lg mb-2">{premiumAnnual}π/month</p>
            <p className="mb-6 text-muted-foreground">Access to all 25+ templates</p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Full template customization
              </li>
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Custom CSS options
              </li>
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Early access to new designs
              </li>
              <li className="flex items-center">
                <svg className="text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Priority template support
              </li>
            </ul>
            <Button variant="outline" asChild className="w-full hover:bg-blue-50 transition-colors">
              <Link to="/pricing">Get Premium</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplatePricingSection;
