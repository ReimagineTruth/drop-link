
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Users } from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "50-80π/month",
      description: "Join our team building the future of creator tools on Pi Network"
    },
    {
      title: "Community Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      salary: "30-50π/month",
      description: "Help grow and engage our creator community across social platforms"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Contract",
      salary: "40-60π/month",
      description: "Design beautiful and intuitive experiences for our users"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help us build the future of creator tools on Pi Network. 
              We're looking for passionate individuals to join our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Remote First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Work from anywhere in the world with flexible hours</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Pi Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get paid in Pi cryptocurrency with competitive rates</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Work-Life Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Flexible schedules and unlimited time off</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Open Positions</h2>
            
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{position.title}</CardTitle>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {position.department}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {position.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {position.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {position.salary}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  <Button className="bg-gradient-hero hover:bg-secondary">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Don't see a perfect fit?</h3>
            <p className="text-gray-600 mb-4">
              We're always looking for talented individuals to join our team.
            </p>
            <Button variant="outline">
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
