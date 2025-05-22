
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PiDomainFeatures = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 py-1.5">Pi Network Integration</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What You Can Do With Your <span className="text-primary">.pi Domain</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect your Pi Network domain to Droplink and unlock powerful features
            to grow your audience and monetize your content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature Card 1 */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">One Memorable URL</h3>
            <p className="text-muted-foreground mb-4">
              Replace long, complex links with a simple, memorable yourdomain.pi address that's easy to share with anyone.
            </p>
            <div className="bg-muted p-3 rounded-lg border border-border font-mono text-sm">
              <span className="text-primary font-bold">yourdomain.pi</span> → droplink.space/@username
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <line x1="2" y1="12" x2="22" y2="12"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Pi Browser Integration</h3>
            <p className="text-muted-foreground mb-4">
              Your .pi domain works directly in Pi Browser, making your content instantly accessible to the Pi Network community.
            </p>
            <div className="bg-muted p-3 rounded-lg border border-border text-sm">
              <span className="flex items-center gap-2">
                <svg className="text-primary w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>No redirection or technical setup required</span>
              </span>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Receive Pi Payments</h3>
            <p className="text-muted-foreground mb-4">
              Monetize your content by accepting Pi cryptocurrency directly through your personalized .pi domain.
            </p>
            <div className="bg-muted p-3 rounded-lg border border-border text-sm">
              <span className="flex items-center gap-2">
                <svg className="text-primary w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Seamless Pi payment integration</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-8 border border-border">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2 lg:pr-8">
              <h3 className="text-2xl font-bold mb-4">How to Connect Your .pi Domain</h3>
              <ol className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Sign up for Droplink</p>
                    <p className="text-sm text-muted-foreground">Create your free account in just a few seconds</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Go to Domain Settings</p>
                    <p className="text-sm text-muted-foreground">Access your profile settings and find the domain section</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Enter your .pi domain</p>
                    <p className="text-sm text-muted-foreground">Type your Pi Network domain without the .pi extension</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Save your changes</p>
                    <p className="text-sm text-muted-foreground">Your domain is now connected and ready to use</p>
                  </div>
                </li>
              </ol>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button asChild className="bg-gradient-hero hover:bg-gradient-hero">
                  <Link to="/signup">Connect Your .pi Domain <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="demo.pi" target="_blank" rel="noopener noreferrer">
                    See Example <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 bg-muted rounded-xl p-6 border border-border">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                <div className="bg-background rounded-lg p-4 shadow-inner border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                      <div>
                        <p className="font-semibold">User's Profile</p>
                        <p className="text-xs text-muted-foreground">Accessible via:</p>
                      </div>
                    </div>
                    <Badge className="bg-primary">Connected</Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="rounded-md bg-muted p-2 border border-border flex items-center justify-between">
                      <span className="text-sm font-mono">example.pi</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Pi Browser</span>
                    </div>
                    <div className="rounded-md bg-muted p-2 border border-border flex items-center justify-between">
                      <span className="text-sm font-mono">droplink.space/@example</span>
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded">Web</span>
                    </div>
                  </div>
                  
                  <div className="text-center pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Both URLs point to the same profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PiDomainFeatures;
