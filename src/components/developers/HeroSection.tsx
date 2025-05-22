
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const { isLoggedIn } = useUser();
  
  return (
    <section className="bg-muted py-20 px-4 relative">
      <AnimatedContainer animation="fade" className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Droplink Developer Platform</h1>
        <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
          Open documentation for all developers. Build powerful applications with our APIs and integrate Pi Network payments into your services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedContainer animation="slide" delay={0.2}>
            <Button size="lg" asChild>
              <a href="#api-docs">View API Docs</a>
            </Button>
          </AnimatedContainer>
          <AnimatedContainer animation="slide" delay={0.3}>
            <Button variant="outline" size="lg" asChild>
              <a href="#get-started">Get Started</a>
            </Button>
          </AnimatedContainer>
          
          {!isLoggedIn && (
            <AnimatedContainer animation="slide" delay={0.4}>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/signup?developer=true">Create Account</Link>
              </Button>
            </AnimatedContainer>
          )}
        </div>
        
        <div className="mt-12 animate-bounce">
          <ArrowDown className="mx-auto text-primary" />
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
        </div>
      </AnimatedContainer>
    </section>
  );
};

export default HeroSection;
