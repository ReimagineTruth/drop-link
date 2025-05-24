
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Globe, ExternalLink } from "lucide-react";
import { useUser } from "@/context/UserContext";

const DomainsSettings = () => {
  const { profile } = useUser();
  const [customDomain, setCustomDomain] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate domain verification process
    setTimeout(() => {
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link to="/settings">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Settings
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Domain Settings</h1>
              <p className="text-muted-foreground">Manage your custom domains and URLs</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Current URLs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Your Current URLs
                </CardTitle>
                <CardDescription>
                  Here are all the ways people can access your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Droplink URL</p>
                    <p className="text-sm text-muted-foreground">
                      droplink.space/@{profile?.username || 'username'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Pi Domain</p>
                    <p className="text-sm text-muted-foreground">
                      pinet.com/@{profile?.username || 'username'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Custom Domain */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Domain</CardTitle>
                <CardDescription>
                  Connect your own domain to your Droplink profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDomainSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="domain">Domain Name</Label>
                    <Input
                      id="domain"
                      type="text"
                      placeholder="yourdomain.com"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter your domain without http:// or https://
                    </p>
                  </div>
                  
                  <Button type="submit" disabled={isVerifying || !customDomain}>
                    {isVerifying ? "Verifying..." : "Add Domain"}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">DNS Configuration</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    To connect your domain, add these DNS records:
                  </p>
                  <div className="space-y-2 text-sm font-mono bg-white p-3 rounded border">
                    <div>Type: CNAME</div>
                    <div>Name: @ (or your subdomain)</div>
                    <div>Value: droplink.space</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SSL Certificate */}
            <Card>
              <CardHeader>
                <CardTitle>SSL Certificate</CardTitle>
                <CardDescription>
                  Automatic SSL certificates for your custom domains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">SSL Status</p>
                    <p className="text-sm text-green-700">
                      Automatic SSL certificates are enabled
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DomainsSettings;
