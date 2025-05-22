
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PiNetworkEcosystem = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advancing the <span className="text-primary">Pi Network</span> Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Droplink is helping drive mass adoption by making .pi domains more useful and accessible
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-card rounded-xl p-8 shadow-lg border border-border relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/5 rounded-full"></div>
              
              <h3 className="text-2xl font-bold mb-6">How .pi Domains Drive Adoption</h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Simplified User Experience</h4>
                    <p className="text-muted-foreground">Easy to remember domains instead of complex wallet addresses</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Enhanced Discoverability</h4>
                    <p className="text-muted-foreground">Find creators, services and projects through intuitive naming</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Digital Identity</h4>
                    <p className="text-muted-foreground">Establish your brand within the Pi ecosystem</p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">No Technical Barriers</h4>
                    <p className="text-muted-foreground">Droplink makes using .pi domains simple for everyone</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8">
                <Button asChild className="bg-gradient-hero">
                  <Link to="/signup">Start Building on Pi Network <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <h3 className="text-2xl font-bold">Droplink + Pi Network: Mass Adoption</h3>
            
            <p>
              By integrating .pi domains, Droplink creates a seamless bridge between 
              the Pi Network ecosystem and content creators, businesses, and everyday users.
            </p>
            
            <div className="bg-muted p-6 rounded-lg border border-border">
              <h4 className="font-semibold mb-2">Why .pi domains with Droplink are powerful:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 text-white p-1 mt-1 flex-shrink-0">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>One-click connection of your .pi domain to your Droplink profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 text-white p-1 mt-1 flex-shrink-0">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Visit your .pi domain directly in Pi Browser to see your Droplink profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 text-white p-1 mt-1 flex-shrink-0">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Monetize content with Pi payments directly through your domain</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 text-white p-1 mt-1 flex-shrink-0">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Build your presence in the Pi ecosystem as it grows</span>
                </li>
              </ul>
            </div>
            
            <div className="flex items-center justify-center p-4 bg-primary/10 rounded-lg">
              <p className="font-medium text-center">
                "Droplink is accelerating mass adoption in Pi Network by making .pi domains functional and valuable for everyday users"
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button asChild variant="outline" className="mt-4">
                <Link to="/demo">See Demo .pi Domain <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PiNetworkEcosystem;
