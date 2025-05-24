
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
            <p className="text-xl text-gray-600">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We collect information you provide directly to us and information automatically 
                  collected when you use our service.
                </p>
                
                <h4 className="font-semibold">Information you provide:</h4>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Pi Network username and profile information</li>
                  <li>Profile content (bio, links, custom pages)</li>
                  <li>Payment information for subscriptions</li>
                  <li>Communications with our support team</li>
                </ul>

                <h4 className="font-semibold">Automatically collected information:</h4>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Usage data and analytics</li>
                  <li>Device information and IP addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Page views and click data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide and personalize our services</li>
                  <li>Process transactions and billing</li>
                  <li>Send important service communications</li>
                  <li>Provide customer support</li>
                  <li>Analyze usage patterns to improve our service</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We do not sell, trade, or rent your personal information to third parties. We may 
                  share your information in limited circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist us</li>
                  <li>In connection with a business transfer</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Pi Network Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our service integrates with Pi Network for authentication and payments. When you 
                  connect your Pi Network account:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>We receive your Pi Network username and basic profile information</li>
                  <li>Pi Network's privacy policy applies to data they collect</li>
                  <li>We may process Pi payment transactions on your behalf</li>
                  <li>You can disconnect your Pi Network account at any time</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Monitoring for unauthorized access</li>
                  <li>Incident response procedures</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access and update your profile information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Control cookie preferences</li>
                  <li>Request information about data processing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Essential cookies for service functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>You can control cookies through your browser settings</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We retain your information for as long as necessary to provide our services and 
                  comply with legal obligations. When you delete your account, we will delete or 
                  anonymize your personal information within 30 days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Your information may be transferred to and processed in countries other than your 
                  own. We ensure appropriate safeguards are in place to protect your information 
                  during such transfers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">Email: privacy@droplink.space</p>
                  <p className="font-medium">Data Protection Officer: dpo@droplink.space</p>
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

export default Privacy;
