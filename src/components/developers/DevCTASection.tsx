
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Play } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { playSound, sounds } from "@/utils/sounds";

const DevCTASection = () => {
  const { isLoggedIn } = useUser();
  
  const handleButtonClick = () => {
    playSound(sounds.uiTap, 0.3);
  };
  
  return (
    <section className="py-16 px-4">
      <AnimatedContainer animation="scale" className="container mx-auto max-w-4xl">
        <div className="bg-gradient-hero text-white rounded-xl p-8 md:p-10 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Our developer platform is open to everyone. Join our community and start integrating Pi Network payments into your applications today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                asChild
                onClick={handleButtonClick}
              >
                {isLoggedIn ? (
                  <Link to="/dashboard" className="flex items-center gap-2">
                    Access Developer Dashboard <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link to="/signup?developer=true" className="flex items-center gap-2">
                    Create Developer Account <ArrowRight size={16} />
                  </Link>
                )}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20" 
                asChild
                onClick={handleButtonClick}
              >
                <a href="https://github.com/droplink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github size={16} />
                  View Sample Projects
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="default" 
                className="bg-white text-primary hover:bg-white/90" 
                asChild
                onClick={handleButtonClick}
              >
                <Link to="/demo.pi" className="flex items-center gap-2">
                  <Play size={16} />
                  See in Action
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </section>
  );
};

export default DevCTASection;
