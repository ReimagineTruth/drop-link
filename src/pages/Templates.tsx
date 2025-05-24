
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplatesGrid from "@/components/templates/TemplatesGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Crown, Zap, Star } from "lucide-react";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { templatesData } from "@/data/templatesData";
import { Link } from "react-router-dom";

const Templates = () => {
  const { plan, permissions } = useUserPermissions();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState("all");

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(templatesData.map(t => t.category)))];
  
  // Filter templates
  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesPlan = selectedPlan === "all" || template.plan === selectedPlan;
    
    return matchesSearch && matchesCategory && matchesPlan;
  });

  // Get template counts by plan
  const templateCounts = {
    free: templatesData.filter(t => t.plan === "free").length,
    starter: templatesData.filter(t => t.plan === "starter").length,
    pro: templatesData.filter(t => t.plan === "pro").length,
    premium: templatesData.filter(t => t.plan === "premium").length,
  };

  const getPlanIcon = (planType: string) => {
    switch(planType) {
      case "premium": return <Crown className="w-4 h-4" />;
      case "pro": return <Zap className="w-4 h-4" />;
      case "starter": return <Star className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Templates Gallery</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Choose from our collection of 100+ professionally designed templates to make your page stand out
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>Your current plan:</span>
              <Badge variant="outline" className={`
                ${plan === 'premium' ? 'bg-gradient-hero text-white' : ''}
                ${plan === 'pro' ? 'bg-purple-50 text-purple-600' : ''}
                ${plan === 'starter' ? 'bg-blue-50 text-blue-600' : ''}
                ${plan === 'free' ? 'bg-gray-50 text-gray-600' : ''}
              `}>
                {getPlanIcon(plan)}
                <span className="ml-1 capitalize font-semibold">{plan}</span>
              </Badge>
            </div>
          </div>

          {/* Plan Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{templateCounts.free}</div>
              <div className="text-sm text-gray-500">Free Templates</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{templateCounts.starter}</div>
              <div className="text-sm text-blue-500">Starter Templates</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{templateCounts.pro}</div>
              <div className="text-sm text-purple-500">Pro Templates</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">{templateCounts.premium}</div>
              <div className="text-sm text-purple-500">Premium Templates</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} of {templatesData.length} total
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
              {selectedPlan !== "all" && ` (${selectedPlan} plan)`}
            </p>
          </div>

          {/* Templates Grid */}
          <TemplatesGrid templates={filteredTemplates} />

          {/* Upgrade CTA */}
          {plan !== 'premium' && (
            <div className="text-center mt-16 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <h3 className="text-2xl font-bold mb-3">Unlock More Templates</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {plan === 'free' 
                  ? `Upgrade to access ${templateCounts.starter + templateCounts.pro + templateCounts.premium} additional professional templates`
                  : plan === 'starter'
                  ? `Upgrade to Pro or Premium to access ${templateCounts.pro + templateCounts.premium} more advanced templates`
                  : `Upgrade to Premium to access ${templateCounts.premium} exclusive premium templates`
                }
              </p>
              <Link to="/pricing">
                <Button className="bg-gradient-hero hover:scale-105 transition-transform">
                  <Crown className="w-4 h-4 mr-2" />
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
