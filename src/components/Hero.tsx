
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
    let timeoutId: NodeJS.Timeout;
    
    const type = () => {
      const currentWord = words[wordIndex];
      
      // Add safety check for the ref
      if (!typedTextRef.current) return;
      
      if (isDeleting) {
        typedTextRef.current.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedTextRef.current.textContent = currentWord.substring(0, charIndex + 1);
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
      
      timeoutId = setTimeout(type, typingSpeed);
    };
    
    timeoutId = setTimeout(type, 500);
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  
  const handleButtonClick = () => {
    try {
      playSound(sounds.uiTap, 0.3);
    } catch (error) {
      console.log('Sound playback failed:', error);
    }
  };
  
  return (
    <section className="gradient-hero text-white dark:text-white py-28 px-6 md:py-32 min-h-[550px] md:min-h-[650px] flex items-center">
      <div className="container mx-auto relative z-20">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedContainer animation="scale" className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white dark:text-white">
              Unify Your World with Droplink
            </h1>
            <p className="text-xl md:text-2xl text-white/95 dark:text-white/95">
              Empower <span ref={typedTextRef} className="font-semibold border-r-2 border-white dark:border-white text-white dark:text-white"></span> on Pi Network with one link to share, sell, and connect seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
                onClick={handleButtonClick}
              >
                <Link to="/signup" className="flex items-center gap-2">
                  Create Your Droplink <ArrowRight size={16} />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
                onClick={handleButtonClick}
              >
                <Link to="/demo" className="flex items-center gap-2">
                  See It in Action <ArrowRight size={16} />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
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
              className="text-white/80 hover:text-white hover:bg-white/10 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10 group flex flex-col items-center gap-1 backdrop-blur-sm"
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
          <span className="text-white/90 dark:text-white/90">📺</span>
        </AnimatedContainer>
        <AnimatedContainer 
          animation="scale" 
          delay={0.5} 
          className="floating-icon top-[25%] right-[10%] text-5xl"
          motionProps={{ 
            animate: { y: [0, -15, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }
          }}
        >
          <span className="text-white/90 dark:text-white/90">✉️</span>
        </AnimatedContainer>
        <AnimatedContainer 
          animation="scale" 
          delay={0.8} 
          className="floating-icon top-[45%] left-[15%] text-5xl"
          motionProps={{ 
            animate: { y: [0, -10, 0], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 } }
          }}
        >
          <span className="text-white/90 dark:text-white/90">💰</span>
        </AnimatedContainer>
        <AnimatedContainer 
          animation="scale" 
          delay={1} 
          className="floating-icon bottom-[20%] right-[15%] text-5xl"
          motionProps={{ 
            animate: { y: [0, -12, 0], transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }
          }}
        >
          <Globe size={28} className="text-white/90 dark:text-white/90" />
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default Hero;
