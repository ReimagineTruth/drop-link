
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CustomTemplateSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4">Looking for Something Custom?</h2>
        <p className="text-xl mb-8">
          Pro and Premium users can create fully customized templates to match their brand identity perfectly.
        </p>
        <Button size="lg" asChild className="bg-gradient-hero hover:scale-105 transition-transform px-8">
          <Link to="/signup" className="flex items-center gap-2">Get Started <ArrowRight size={18} /></Link>
        </Button>
      </div>
    </section>
  );
};

export default CustomTemplateSection;
