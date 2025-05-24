
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ExternalLink, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import FeatureGate from "@/components/FeatureGate";
import { toast } from "@/hooks/use-toast";

const LinksSection = () => {
  const { permissions, plan } = useUserPermissions();
  const [links, setLinks] = useState([
    { id: 1, title: "My Website", url: "https://example.com", clicks: 124, active: true },
    { id: 2, title: "Instagram", url: "https://instagram.com/username", clicks: 89, active: true }
  ]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  const canAddMoreLinks = () => {
    return links.length < permissions.maxLinks;
  };

  const handleAddLink = () => {
    if (!canAddMoreLinks()) {
      toast({
        title: "Link Limit Reached",
        description: `You can only have ${permissions.maxLinks} link(s) on the free plan. Upgrade to add more.`,
        variant: "destructive",
      });
      return;
    }

    if (newLink.title && newLink.url) {
      const link = {
        id: Date.now(),
        title: newLink.title,
        url: newLink.url,
        clicks: 0,
        active: true
      };
      setLinks([...links, link]);
      setNewLink({ title: "", url: "" });
      setShowAddForm(false);
      toast({
        title: "Link Added",
        description: "Your new link has been added successfully",
      });
    }
  };

  const handleDeleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
    toast({
      title: "Link Deleted",
      description: "Link has been removed from your profile",
    });
  };

  const toggleLinkVisibility = (id: number) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, active: !link.active } : link
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
        <CardDescription>
          Manage your profile links {plan === 'free' && `(${links.length}/${permissions.maxLinks} used)`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FeatureGate 
                  feature="hasLinkAnimations" 
                  featureName="Link Reordering"
                  fallback={<div className="w-5 h-5 text-gray-300">⋮⋮</div>}
                >
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                </FeatureGate>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{link.title}</h3>
                    {!link.active && <EyeOff className="w-4 h-4 text-gray-400" />}
                  </div>
                  <p className="text-sm text-gray-500 truncate max-w-64">{link.url}</p>
                  
                  <FeatureGate 
                    feature="hasAnalytics" 
                    featureName="Link Analytics"
                    fallback={<span className="text-xs text-gray-400">Analytics available with Pro plan</span>}
                  >
                    <span className="text-xs text-green-600">{link.clicks} clicks</span>
                  </FeatureGate>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <FeatureGate 
                  feature="hasScheduling" 
                  featureName="Link Scheduling"
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleLinkVisibility(link.id)}
                  >
                    {link.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </FeatureGate>
                
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeleteLink(link.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {showAddForm && (
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="title">Link Title</Label>
                  <Input
                    id="title"
                    value={newLink.title}
                    onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                    placeholder="My Website"
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddLink} size="sm">Add Link</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)} size="sm">Cancel</Button>
                </div>
              </div>
            </div>
          )}
          
          {!showAddForm && (
            <Button 
              onClick={() => canAddMoreLinks() ? setShowAddForm(true) : toast({
                title: "Upgrade Required",
                description: `You've reached the ${permissions.maxLinks} link limit for the ${plan} plan`,
                variant: "destructive"
              })}
              variant="outline" 
              className="w-full border-dashed"
              disabled={!canAddMoreLinks() && plan === 'free'}
            >
              <Plus className="w-4 h-4 mr-2" />
              {canAddMoreLinks() ? 'Add New Link' : `Upgrade to add more links (${links.length}/${permissions.maxLinks})`}
            </Button>
          )}
          
          {!canAddMoreLinks() && plan === 'free' && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">Want to add more links?</p>
              <Link to="/pricing">
                <Button size="sm" className="bg-gradient-hero hover:bg-secondary">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinksSection;
