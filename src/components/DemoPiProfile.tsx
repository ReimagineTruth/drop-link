
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const DemoPiProfile = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try Our Demo Pi Domain</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visit <span className="font-bold">demo.pi</span> in Pi Browser to see how a connected domain works
          </p>
        </div>
        
        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          {/* Profile Header */}
          <div className="bg-gradient-hero p-6 text-white text-center">
            <div className="w-24 h-24 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">D</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Demo Profile</h3>
            <p className="opacity-90">Official Droplink Demo</p>
          </div>
          
          {/* Profile Links */}
          <div className="p-6 space-y-4">
            <div className="bg-muted rounded-lg p-3 flex items-center justify-between hover:bg-muted/80 transition-colors">
              <span>Visit our website</span>
              <ExternalLink className="h-4 w-4 opacity-70" />
            </div>
            <div className="bg-muted rounded-lg p-3 flex items-center justify-between hover:bg-muted/80 transition-colors">
              <span>Follow on social media</span>
              <ExternalLink className="h-4 w-4 opacity-70" />
            </div>
            <div className="bg-muted rounded-lg p-3 flex items-center justify-between hover:bg-muted/80 transition-colors">
              <span>Join our community</span>
              <ExternalLink className="h-4 w-4 opacity-70" />
            </div>
            
            {/* Premium content example */}
            <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Premium Content</span>
                <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded">1.0 π</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Example of premium content that can be unlocked with Pi payment
              </p>
              <Button size="sm" className="w-full">Unlock with Pi</Button>
            </div>
          </div>
          
          <div className="p-6 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                This is just a demo. Create your own profile with Pi domain integration!
              </p>
              <Button asChild>
                <Link to="/signup">Create Your Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoPiProfile;
