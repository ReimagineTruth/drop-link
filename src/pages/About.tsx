
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">About Droplink</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering creators on Pi Network with the ultimate link-in-bio solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To provide creators on Pi Network with powerful tools to showcase their content, 
                  connect with their audience, and monetize their presence through Pi payments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in community, innovation, and empowering every creator to build 
                  their digital presence with ease and style.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Community First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built by the Pi Network community, for the Pi Network community. 
                  Every feature is designed with our users' needs in mind.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Global Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connecting creators worldwide through the power of Pi Network's 
                  decentralized ecosystem and cryptocurrency.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-gray-600 mb-6">
              Over 10,000+ creators already trust Droplink to manage their online presence
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
