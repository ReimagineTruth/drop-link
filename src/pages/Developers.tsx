
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Database, Zap, Shield, Book, ExternalLink } from "lucide-react";

const Developers = () => {
  const apiFeatures = [
    {
      icon: Code,
      title: "RESTful API",
      description: "Complete REST API for managing profiles, links, and analytics"
    },
    {
      icon: Database,
      title: "Real-time Data",
      description: "WebSocket connections for live analytics and updates"
    },
    {
      icon: Zap,
      title: "Pi Network Integration",
      description: "Native Pi payments and authentication APIs"
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "OAuth 2.0 and Pi Network SSO integration"
    }
  ];

  const codeExamples = [
    {
      title: "Create a Link",
      language: "JavaScript",
      code: `fetch('/api/links', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'My Website',
    url: 'https://example.com',
    position: 1
  })
})`
    },
    {
      title: "Get Analytics",
      language: "JavaScript", 
      code: `fetch('/api/analytics', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer token'
  }
}).then(res => res.json())`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Developers</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Build amazing integrations with Droplink's powerful API and developer tools
            </p>
          </div>

          {/* API Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {apiFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Getting Started */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">1. Get API Keys</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">
                      Sign up for a developer account and get your API credentials
                    </p>
                    <Button className="bg-gradient-hero hover:bg-secondary">
                      Get API Keys
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">2. Read Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">
                      Comprehensive guides and API reference documentation
                    </p>
                    <Button variant="outline">
                      <Book className="w-4 h-4 mr-2" />
                      View Docs
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">3. Start Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">
                      Use our SDKs and code examples to build your integration
                    </p>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
              <div className="space-y-6">
                {codeExamples.map((example, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <CardDescription>{example.language}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Complete API reference and guides</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Book className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>SDKs & Libraries</CardTitle>
                <CardDescription>Official SDKs for popular languages</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Code className="w-4 h-4 mr-2" />
                  Download SDKs
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Developer Support</CardTitle>
                <CardDescription>Get help from our developer community</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Rate Limits */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Rate Limits & Pricing</CardTitle>
              <CardDescription>API usage limits and pricing tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Free Tier</h3>
                  <p className="text-2xl font-bold text-primary mb-2">1,000</p>
                  <p className="text-gray-600">requests/month</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Pro Tier</h3>
                  <p className="text-2xl font-bold text-primary mb-2">10,000</p>
                  <p className="text-gray-600">requests/month</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Enterprise</h3>
                  <p className="text-2xl font-bold text-primary mb-2">Unlimited</p>
                  <p className="text-gray-600">Custom pricing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center p-6 bg-gradient-hero text-white rounded-lg">
            <h3 className="text-xl font-bold mb-2">Ready to Build?</h3>
            <p className="mb-4 opacity-90">
              Join thousands of developers building on the Droplink platform
            </p>
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              Start Development
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Developers;
