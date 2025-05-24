
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, ExternalLink, Star } from "lucide-react";
import { useState } from "react";

const CreatorDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const creators = [
    {
      username: "techpioneer",
      displayName: "Tech Pioneer",
      bio: "Blockchain enthusiast and Pi Network educator",
      category: "Technology",
      followers: "12.5K",
      rating: 4.9,
      verified: true,
      avatar: "🚀"
    },
    {
      username: "cryptoartist",
      displayName: "Crypto Artist",
      bio: "Digital artist creating NFTs on Pi Network",
      category: "Art & Design",
      followers: "8.2K",
      rating: 4.8,
      verified: true,
      avatar: "🎨"
    },
    {
      username: "pitrader",
      displayName: "Pi Trader",
      bio: "Trading insights and Pi market analysis",
      category: "Finance",
      followers: "15.1K",
      rating: 4.7,
      verified: false,
      avatar: "📈"
    },
    {
      username: "healthguru",
      displayName: "Health Guru",
      bio: "Wellness coach accepting Pi for consultations",
      category: "Health & Fitness",
      followers: "6.8K",
      rating: 4.9,
      verified: true,
      avatar: "💪"
    },
    {
      username: "foodiechef",
      displayName: "Foodie Chef",
      bio: "Culinary artist sharing recipes and cooking tips",
      category: "Food & Lifestyle",
      followers: "9.3K",
      rating: 4.6,
      verified: false,
      avatar: "👨‍🍳"
    },
    {
      username: "musicmaker",
      displayName: "Music Maker",
      bio: "Independent musician selling albums for Pi",
      category: "Music",
      followers: "11.7K",
      rating: 4.8,
      verified: true,
      avatar: "🎵"
    }
  ];

  const categories = [
    "All", "Technology", "Art & Design", "Finance", "Health & Fitness", 
    "Food & Lifestyle", "Music", "Education", "Gaming", "Travel"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || creator.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Creator Directory</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing creators on Pi Network and connect with the community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-hero hover:bg-secondary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCreators.map((creator, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{creator.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{creator.displayName}</CardTitle>
                        {creator.verified && (
                          <Badge variant="secondary" className="text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription>@{creator.username}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{creator.bio}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{creator.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {creator.followers}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{creator.rating}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Visit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCreators.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No creators found matching your search.</p>
              <Button variant="outline" onClick={() => {setSearchQuery(""); setSelectedCategory("All")}}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Join CTA */}
          <div className="text-center p-6 bg-gradient-hero text-white rounded-lg">
            <h3 className="text-xl font-bold mb-2">Join the Creator Directory</h3>
            <p className="mb-4 opacity-90">
              Get featured in our directory and connect with thousands of Pi Network users
            </p>
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              Apply to Join
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorDirectory;
