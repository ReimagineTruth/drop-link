
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Cookies = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true
  });

  const handleSavePreferences = () => {
    // Save cookie preferences to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    // Implementation would update actual cookie consent
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Cookie Policy</h1>
            <p className="text-xl text-gray-600">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Cookies are small text files that are stored on your device when you visit a website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  understanding how you use our service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">Necessary Cookies</h4>
                  <p className="text-gray-600 mt-1">
                    These cookies are essential for the website to function properly. They enable basic 
                    features like security, network management, and accessibility.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
                    <li>Authentication and login state</li>
                    <li>Security features and CSRF protection</li>
                    <li>Load balancing and performance</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">Analytics Cookies</h4>
                  <p className="text-gray-600 mt-1">
                    These cookies help us understand how visitors interact with our website by 
                    collecting and reporting information anonymously.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
                    <li>Page views and user behavior</li>
                    <li>Performance metrics</li>
                    <li>Error tracking and diagnostics</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">Preference Cookies</h4>
                  <p className="text-gray-600 mt-1">
                    These cookies remember your preferences and settings to provide you with a 
                    more personalized experience.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
                    <li>Language and region preferences</li>
                    <li>Theme and display settings</li>
                    <li>Dashboard customizations</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800">Marketing Cookies</h4>
                  <p className="text-gray-600 mt-1">
                    These cookies are used to track visitors across websites to display relevant 
                    and engaging advertisements.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
                    <li>Advertising campaign tracking</li>
                    <li>Social media integration</li>
                    <li>Third-party analytics</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 mb-4">
                  You can control which cookies we use on your device. Note that disabling certain 
                  cookies may affect the functionality of our website.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Necessary Cookies</h4>
                      <p className="text-sm text-gray-600">Required for basic functionality</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={cookiePreferences.necessary} 
                      disabled 
                      className="scale-125"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Analytics Cookies</h4>
                      <p className="text-sm text-gray-600">Help us improve our service</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={cookiePreferences.analytics}
                      onChange={(e) => setCookiePreferences({
                        ...cookiePreferences,
                        analytics: e.target.checked
                      })}
                      className="scale-125"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Preference Cookies</h4>
                      <p className="text-sm text-gray-600">Remember your settings</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={cookiePreferences.preferences}
                      onChange={(e) => setCookiePreferences({
                        ...cookiePreferences,
                        preferences: e.target.checked
                      })}
                      className="scale-125"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Marketing Cookies</h4>
                      <p className="text-sm text-gray-600">Personalized advertising</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={cookiePreferences.marketing}
                      onChange={(e) => setCookiePreferences({
                        ...cookiePreferences,
                        marketing: e.target.checked
                      })}
                      className="scale-125"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSavePreferences}
                  className="w-full mt-4 bg-gradient-hero hover:bg-secondary"
                >
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  You can also manage cookies through your browser settings:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                  <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
                  <li>Safari: Preferences → Privacy → Manage Website Data</li>
                  <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> Blocking all cookies may prevent some features of our 
                    website from working properly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our website may contain links to third-party websites and services that have their 
                  own cookie policies:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Pi Network authentication</li>
                  <li>Analytics providers (Google Analytics)</li>
                  <li>Social media platforms</li>
                  <li>Payment processors</li>
                </ul>
                <p className="text-gray-600">
                  We recommend reviewing the cookie policies of these third parties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">Email: privacy@droplink.space</p>
                  <p className="font-medium">Subject: Cookie Policy Inquiry</p>
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

export default Cookies;
