
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
            <p className="text-xl text-gray-600">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  By accessing and using Droplink, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do 
                  not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Droplink provides a link-in-bio platform that allows users to create customizable 
                  pages to showcase their content and accept Pi Network payments. The service includes 
                  analytics, custom themes, and integration with Pi Network.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  To access certain features of the service, you must create an account using your 
                  Pi Network credentials. You are responsible for maintaining the confidentiality of 
                  your account information and for all activities that occur under your account.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>You must provide accurate and complete information</li>
                  <li>You must update your information to keep it current</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Acceptable Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  You agree not to use the service for any unlawful purpose or in any way that could 
                  damage, disable, or impair the service. Prohibited activities include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Uploading malicious code or viruses</li>
                  <li>Attempting to gain unauthorized access to the service</li>
                  <li>Using the service for illegal activities</li>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Infringing on intellectual property rights</li>
                  <li>Harassing or threatening other users</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Pi Network Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Droplink integrates with Pi Network for authentication and payments. By using our 
                  service, you acknowledge that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Pi Network's terms and conditions apply to Pi-related transactions</li>
                  <li>We are not responsible for Pi Network's availability or functionality</li>
                  <li>Transaction fees may apply for Pi payments</li>
                  <li>You are responsible for complying with Pi Network's policies</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Subscription and Billing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Paid subscriptions are billed in Pi cryptocurrency according to your selected plan. 
                  Subscriptions automatically renew unless canceled before the renewal date.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Billing occurs at the beginning of each billing cycle</li>
                  <li>Subscription fees are non-refundable</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>Access continues until the end of the current billing period</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Privacy and Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Your privacy is important to us. Please review our Privacy Policy to understand 
                  how we collect, use, and protect your information. By using our service, you 
                  consent to our data practices as described in our Privacy Policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  The service and its original content, features, and functionality are owned by 
                  Droplink and are protected by international copyright, trademark, and other 
                  intellectual property laws.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We may terminate or suspend your account and access to the service immediately, 
                  without prior notice, for conduct that we believe violates these Terms of Service 
                  or is harmful to other users, us, or third parties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Disclaimer of Warranties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  The service is provided "as is" without warranties of any kind, either express or 
                  implied. We do not warrant that the service will be uninterrupted, error-free, 
                  or completely secure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">Email: legal@droplink.space</p>
                  <p className="font-medium">Address: Droplink Legal Department</p>
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

export default Terms;
