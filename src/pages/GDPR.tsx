
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download, Trash2, Eye, Edit, AlertCircle } from "lucide-react";

const GDPR = () => {
  const handleDataRequest = (type: string) => {
    // Implementation would handle actual data requests
    console.log(`Processing ${type} request`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">GDPR Compliance</h1>
            <p className="text-xl text-gray-600">
              Your data protection rights under the General Data Protection Regulation
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Your GDPR Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Under the General Data Protection Regulation (GDPR), EU residents have the following rights:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Right to Access</h4>
                    <p className="text-sm text-gray-600">
                      Request access to your personal data and information about how we process it.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Right to Rectification</h4>
                    <p className="text-sm text-gray-600">
                      Request correction of inaccurate or incomplete personal data.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Right to Erasure</h4>
                    <p className="text-sm text-gray-600">
                      Request deletion of your personal data under certain circumstances.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Right to Portability</h4>
                    <p className="text-sm text-gray-600">
                      Request transfer of your data to another service provider.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Right to Restrict Processing</h4>
                    <p className="text-sm text-gray-600">
                      Request limitation of how we process your personal data.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Right to Object</h4>
                    <p className="text-sm text-gray-600">
                      Object to processing of your data for certain purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Request Center</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600">
                  Submit requests to exercise your GDPR rights. We will respond within 30 days.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Eye className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold">Access My Data</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Get a copy of all personal data we have about you.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDataRequest('access')}
                      className="w-full"
                    >
                      Request Data Access
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Download className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold">Export My Data</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Download your data in a portable format.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDataRequest('export')}
                      className="w-full"
                    >
                      Export Data
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Edit className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-semibold">Correct My Data</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Request correction of inaccurate information.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDataRequest('correct')}
                      className="w-full"
                    >
                      Request Correction
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Trash2 className="w-5 h-5 text-red-500" />
                      <h4 className="font-semibold">Delete My Data</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Request permanent deletion of your account and data.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDataRequest('delete')}
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Request Deletion
                    </Button>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Processing Lawful Basis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We process your personal data based on the following lawful grounds:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Contractual Necessity</h4>
                      <p className="text-sm text-gray-600">
                        Processing necessary to provide our services as outlined in our Terms of Service.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Legitimate Interest</h4>
                      <p className="text-sm text-gray-600">
                        Analytics and service improvement, fraud prevention, and security.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Consent</h4>
                      <p className="text-sm text-gray-600">
                        Marketing communications and optional features (you can withdraw consent anytime).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Legal Obligation</h4>
                      <p className="text-sm text-gray-600">
                        Compliance with applicable laws and regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We retain your personal data for different periods depending on the type of data:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Data Type</th>
                        <th className="text-left p-3">Retention Period</th>
                        <th className="text-left p-3">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">Account Information</td>
                        <td className="p-3">Until account deletion</td>
                        <td className="p-3">Service provision</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Usage Analytics</td>
                        <td className="p-3">26 months</td>
                        <td className="p-3">Service improvement</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Payment Records</td>
                        <td className="p-3">7 years</td>
                        <td className="p-3">Legal obligation</td>
                      </tr>
                      <tr>
                        <td className="p-3">Support Communications</td>
                        <td className="p-3">3 years</td>
                        <td className="p-3">Customer service</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Data Protection Authority
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  If you're not satisfied with how we handle your GDPR request, you have the right to 
                  lodge a complaint with your local data protection authority.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Our Data Protection Officer</h4>
                  <p className="text-sm">Email: dpo@droplink.space</p>
                  <p className="text-sm">Response time: Within 72 hours</p>
                </div>
                
                <p className="text-sm text-gray-600">
                  For EU residents, you can find your local data protection authority at: 
                  <a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-primary underline">
                    European Data Protection Board
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We may transfer your personal data outside the European Economic Area (EEA). 
                  When we do, we ensure appropriate safeguards are in place:
                </p>
                
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Adequacy decisions by the European Commission</li>
                  <li>Standard Contractual Clauses (SCCs)</li>
                  <li>Binding Corporate Rules (BCRs)</li>
                  <li>Certification schemes and codes of conduct</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GDPR;
