
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedContainer } from '@/components/ui/animated-container';

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
  
  return (
    <section className="gradient-hero text-white py-28 px-6 md:py-32 min-h-[500px] md:min-h-[600px] flex items-center">
      <div className="container mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedContainer animation="fade" className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unify Your World with Droplink
            </h1>
            <p className="text-xl md:text-2xl">
              Empower <span ref={typedTextRef} className="font-semibold border-r-2 border-white"></span> on Pi Network with one link to share, sell, and connect seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/signup" className="flex items-center gap-2">
                  Create Your Droplink <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/demo">See It in Action</Link>
              </Button>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer animation="scale" className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-400 rounded-full text-primary font-bold">π</div>
                <h3 className="text-xl font-semibold">Your Pi Domain</h3>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <div className="font-mono text-xl mb-1 text-amber-300">yourdomain.pi</div>
                <div className="text-sm opacity-75 flex items-center gap-1">
                  <span>Seamlessly connects to</span>
                  <ArrowRight size={12} />
                </div>
                <div className="font-mono text-xl text-green-300">droplink.space/@you</div>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                  <span>One memorable link</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                  <span>Native Pi Browser support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                  <span>Receive Pi payments</span>
                </li>
              </ul>
              
              <Button asChild size="sm" className="w-full bg-amber-400 text-primary hover:bg-amber-500">
                <Link to="/signup">Connect Your .pi Domain</Link>
              </Button>
            </div>
          </AnimatedContainer>
        </div>
      </div>
      
      {/* Floating Icons with improved animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="floating-icon top-[15%] left-[10%] text-5xl">
          <i className="fab fa-youtube">📺</i>
        </div>
        <div className="floating-icon top-[25%] right-[10%] text-5xl animation-delay-300">
          <i className="fab fa-telegram">✉️</i>
        </div>
        <div className="floating-icon top-[45%] left-[15%] text-5xl animation-delay-600">
          <i className="fab fa-coins">💰</i>
        </div>
      </div>
    </section>
  );
};

export default Hero;
