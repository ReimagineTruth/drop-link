
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Database, FileJson, Lock, Terminal, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ApiDocsSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ApiDocsSection = ({ activeTab, setActiveTab }: ApiDocsSectionProps) => {
  return (
    <TabsContent value="api" className="border rounded-lg p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">RESTful API</h3>
          <p className="mb-4">
            Our RESTful API allows you to access your Droplink data and integrate with Pi Network. All requests use HTTPS and are authenticated using API keys.
          </p>
          <h4 className="text-lg font-semibold mt-6 mb-2">Authentication</h4>
          <p className="mb-4">
            All API requests require authentication. You can obtain an API key from your developer dashboard.
          </p>
          <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm mb-4">
            <code>
              Authorization: Bearer your_api_key_here
            </code>
          </div>
          
          <Card className="p-4 border border-green-200 bg-green-50 my-6">
            <div className="flex items-start gap-3">
              <Globe className="text-green-600 mt-1" size={20} />
              <div>
                <h5 className="font-medium text-green-800">Public Documentation</h5>
                <p className="text-sm text-green-700">
                  This documentation is available to all users. Sign up for a developer account to get your API keys and access additional resources.
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3">Available Endpoints</h4>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-medium">
                <span className="flex items-center gap-2">
                  <Database size={16} />
                  Profile Data
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-2">
                <p><code className="bg-muted p-1 rounded">GET /api/v1/profile</code> - Get profile information</p>
                <p><code className="bg-muted p-1 rounded">PUT /api/v1/profile</code> - Update profile information</p>
                <p><code className="bg-muted p-1 rounded">GET /api/v1/links</code> - Get all links</p>
                <p><code className="bg-muted p-1 rounded">POST /api/v1/links</code> - Create new link</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-medium">
                <span className="flex items-center gap-2">
                  <FileJson size={16} />
                  Analytics
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-2">
                <p><code className="bg-muted p-1 rounded">GET /api/v1/analytics/overview</code> - Get analytics overview</p>
                <p><code className="bg-muted p-1 rounded">GET /api/v1/analytics/links</code> - Get link analytics</p>
                <p><code className="bg-muted p-1 rounded">GET /api/v1/analytics/visitors</code> - Get visitor analytics</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-medium">
                <span className="flex items-center gap-2">
                  <Lock size={16} />
                  Pi Payments
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-2">
                <p><code className="bg-muted p-1 rounded">POST /api/v1/payments/create</code> - Create payment intent</p>
                <p><code className="bg-muted p-1 rounded">GET /api/v1/payments/:id</code> - Get payment status</p>
                <p><code className="bg-muted p-1 rounded">GET /api/v1/payments/history</code> - Get payment history</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-medium">
                <span className="flex items-center gap-2">
                  <Terminal size={16} />
                  Implementation Examples
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-2">
                <p><code className="bg-muted p-1 rounded">JavaScript/TypeScript</code> - Complete integration examples</p>
                <p><code className="bg-muted p-1 rounded">React/Vue/Angular</code> - Framework-specific implementations</p>
                <p><code className="bg-muted p-1 rounded">Backend (Node.js)</code> - Server-side integration</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-3">Example Request</h4>
        <div className="bg-zinc-950 text-zinc-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
          <code>
            curl -X GET https://api.droplink.space/v1/profile \<br />
            -H "Authorization: Bearer your_api_key_here" \<br />
            -H "Content-Type: application/json"
          </code>
        </div>
      </div>
    </TabsContent>
  );
};

export default ApiDocsSection;
