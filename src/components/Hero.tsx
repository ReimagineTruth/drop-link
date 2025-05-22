
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowRight, Globe, MoveDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { playSound, sounds } from '@/utils/sounds';

const Hero = () => {
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const words = ['creators', 'entrepreneurs', 'influencers', 'artists', 'developers'];
  
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        if (typedTextRef.current) {
          typedTextRef.current.textContent = currentWord.substring(0, charIndex - 1);
        }
        charIndex--;
        typingSpeed = 50;
      } else {
        if (typedTextRef.current) {
          typedTextRef.current.textContent = currentWord.substring(0, charIndex + 1);
        }
        charIndex++;
        typingSpeed = 150;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }
      
      setTimeout(type, typingSpeed);
    };
    
    setTimeout(type, 500);
    
    return () => {
      const highestId = window.setTimeout(() => {}, 0);
      for (let i = 0; i < highestId; i++) {
        clearTimeout(i);
      }
    };
  }, []);
  
  const handleButtonClick = () => {
    playSound(sounds.uiTap, 0.3);
  };
  
  return (
    <section className="gradient-hero text-white py-28 px-6 md:py-32 min-h-[550px] md:min-h-[650px] flex items-center">
      <div className="container mx-auto relative z-20">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedContainer animation="scale" className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unify Your World with Droplink
            </h1>
            <p className="text-xl md:text-2xl">
              Empower <span ref={typedTextRef} className="font-semibold border-r-2 border-white"></span> on Pi Network with one link to share, sell, and connect seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
                onClick={handleButtonClick}
              >
                <Link to="/signup" className="flex items-center gap-2">
                  Create Your Droplink <ArrowRight size={16} />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10"
                onClick={handleButtonClick}
              >
                <Link to="/demo">See It in Action</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-lg transition-all"
                onClick={handleButtonClick}
              >
                <Link to="/demo.pi" className="flex items-center gap-2">
                  Try Pi Domain Demo <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer 
            animation="fade" 
            delay={0.8} 
            className="mt-16 flex justify-center"
          >
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-transparent group flex flex-col items-center gap-1"
              asChild
              onClick={handleButtonClick}
            >
              <a href="#pi-domain-features">
                <span>Explore Pi Domain Features</span>
                <MoveDown size={18} className="animate-bounce" />
              </a>
            </Button>
          </AnimatedContainer>
        </div>
      </div>
      
      {/* Floating Icons with smooth animation */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <AnimatedContainer 
          animation="scale" 
          delay={0.2} 
          className="floating-icon top-[15%] left-[10%] text-5xl"
          motionProps={{ 
            animate: { y: [0, -20, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } }
          }}
        >
          <i className="fab fa-youtube">📺</i>
        </AnimatedContainer>
        <AnimatedContainer 
          animation="scale" 
          delay={0.5} 
          className="floating-icon top-[25%] right-[10%] text-5xl"
          motionProps={{ 
            animate: { y: [0, -15, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }
          }}
        >
          <i className="fab fa-telegram">✉️</i>
        </AnimatedContainer>
        <AnimatedContainer 
          animation="scale" 
          delay={0.8} 
          className="floating-icon top-[45%] left-[15%] text-5xl"
          motionProps={{ 
            animate: { y: [0, -10, 0], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 } }
          }}
        >
          <i className="fab fa-coins">💰</i>
        </AnimatedContainer>
        <AnimatedContainer 
          animation="scale" 
          delay={1} 
          className="floating-icon bottom-[20%] right-[15%] text-5xl"
          motionProps={{ 
            animate: { y: [0, -12, 0], transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }
          }}
        >
          <i className="fab fa-globe"><Globe size={28} className="text-white/90" /></i>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default Hero;
