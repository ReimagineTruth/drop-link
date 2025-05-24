
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      title: "Getting Started with Droplink on Pi Network",
      excerpt: "Learn how to create your first link-in-bio page and start earning Pi",
      author: "Droplink Team",
      date: "2024-01-15",
      category: "Tutorial"
    },
    {
      title: "Maximizing Your Creator Income with Pi Payments",
      excerpt: "Tips and strategies for monetizing your content through Pi Network",
      author: "Sarah Chen",
      date: "2024-01-10",
      category: "Monetization"
    },
    {
      title: "New Features: Custom Themes and Analytics",
      excerpt: "Announcing our latest Pro plan features for advanced customization",
      author: "Dev Team",
      date: "2024-01-05",
      category: "Updates"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Droplink Blog</h1>
            <p className="text-xl text-gray-600">
              Tips, tutorials, and updates from the Droplink community
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button variant="outline" className="group">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-hero hover:bg-secondary">
              View All Posts
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
