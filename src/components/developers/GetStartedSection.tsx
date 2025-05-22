
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Terminal, BookOpen } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const GetStartedSection = () => {
  return (
    <section id="get-started" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get Started with Droplink API</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to start building with our platform. Our documentation and samples make integration easy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <AnimatedContainer animation="slide" delay={0.1} className="flex flex-col">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code size={20} className="text-primary" />
                  <span>Developer Registration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Create a Droplink account or log in</li>
                  <li>Navigate to your account settings</li>
                  <li>Enable developer mode</li>
                  <li>Create an API key for your application</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button size="sm" asChild className="w-full">
                  <Link to="/signup?developer=true">Register as Developer</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6 flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={20} className="text-primary" />
                  <span>Read Documentation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">
                  Our comprehensive documentation covers everything you need to know about using our API, from basic concepts to advanced techniques.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="#api-docs">Browse Documentation</a>
                </Button>
              </CardFooter>
            </Card>
          </AnimatedContainer>
          
          {/* Right Column */}
          <AnimatedContainer animation="slide" delay={0.3} className="flex flex-col">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal size={20} className="text-primary" />
                  <span>Try Our API</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="bg-zinc-950 p-4 rounded-md font-mono text-sm text-zinc-100 overflow-x-auto">
                  <div>
                    <span className="text-zinc-400"># Install via npm</span>
                  </div>
                  <div className="text-green-400">
                    $ npm install droplink-sdk
                  </div>
                  <div className="mt-4">
                    <span className="text-zinc-400"># Basic authentication</span>
                  </div>
                  <div className="text-cyan-400">
                    import &#123; DroplinkClient &#125; from 'droplink-sdk';
                  </div>
                  <div className="text-white">
                    const client = new DroplinkClient('YOUR_API_KEY');
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm" asChild className="w-full">
                  <Link to="/demo" className="flex items-center gap-2">
                    See in Action
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
