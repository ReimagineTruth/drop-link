
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Book, Video, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      question: "How do I get started with Droplink?",
      answer: "Simply sign up with your Pi Network account, customize your profile, and start adding links to your page."
    },
    {
      question: "How do Pi payments work?",
      answer: "Pi payments are processed through the Pi Network. Users can send you tips or purchase products directly through your Droplink page."
    },
    {
      question: "What's included in the Pro plan?",
      answer: "Pro plan includes custom themes, advanced analytics, QR codes, link scheduling, and priority support."
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes! Pro and Premium users can connect custom domains to their Droplink pages."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. You'll retain access until the end of your billing period."
    }
  ];

  const helpCategories = [
    {
      title: "Getting Started",
      icon: Book,
      articles: ["Creating your first page", "Adding links", "Customizing your profile"]
    },
    {
      title: "Pi Payments",
      icon: Video,
      articles: ["Setting up payments", "Managing tips", "Product sales"]
    },
    {
      title: "Advanced Features",
      icon: MessageCircle,
      articles: ["Custom themes", "Analytics", "QR codes"]
    },
    {
      title: "Account Management",
      icon: Mail,
      articles: ["Subscription plans", "Billing", "Account settings"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to your questions and learn how to make the most of Droplink
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="text-gray-600 hover:text-primary cursor-pointer">
                        • {article}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Still need help?</h3>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button className="bg-gradient-hero hover:bg-secondary">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
