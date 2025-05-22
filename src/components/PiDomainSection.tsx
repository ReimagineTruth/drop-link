
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PiDomainSection = () => {
  return (
    <section className="py-20 px-6 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Connect Your <span className="text-primary">.pi</span> Domain
            </h2>
            <p className="text-xl mb-6 text-muted-foreground">
              Already have a Pi Network .pi domain? Connect it directly to your Droplink profile for easy access.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mt-1">1</div>
                <div>
                  <h3 className="font-semibold text-lg">Create your Droplink profile</h3>
                  <p className="text-muted-foreground">Sign up for free and set up your profile</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mt-1">2</div>
                <div>
                  <h3 className="font-semibold text-lg">Go to Domain Settings</h3>
                  <p className="text-muted-foreground">Navigate to Settings {'>'}{'>'} Domains in your dashboard</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mt-1">3</div>
                <div>
                  <h3 className="font-semibold text-lg">Enter your .pi domain</h3>
                  <p className="text-muted-foreground">Connect your existing .pi domain to your profile</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-gradient-hero hover:bg-secondary">
                <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline">
                <a href="demo.pi" target="_blank" rel="noopener noreferrer">
                  Visit Demo <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="bg-background rounded-lg p-4 mb-4 shadow-inner">
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Your .pi domain:</p>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded flex-1">
                    <p className="font-mono"><span className="text-primary font-bold">demo</span>.pi</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm mb-3">
                <ArrowRight className="h-4 w-4 text-primary" />
                <p className="text-muted-foreground">connects to</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Your Droplink profile:</p>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded flex-1">
                    <p className="font-mono">droplink.space/<span className="text-primary font-bold">@demo</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg border border-border">
              <h4 className="font-medium mb-2">Benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 text-white p-1 mt-0.5 flex-shrink-0">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm">Easy to remember .pi domain</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 text-white p-1 mt-0.5 flex-shrink-0">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm">No technical setup required</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500 text-white p-1 mt-0.5 flex-shrink-0">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm">Free for all Pi Network users</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PiDomainSection;
