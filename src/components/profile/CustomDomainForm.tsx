
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CustomDomainFormProps {
  initialDomain: string | null;
  userId?: string;
  isPremiumUser: boolean;
  onUpdate?: () => void;
}

const CustomDomainForm = ({ initialDomain, userId, isPremiumUser, onUpdate }: CustomDomainFormProps) => {
  const [customDomain, setCustomDomain] = useState(initialDomain || '');
  const [isValidating, setIsValidating] = useState(false);

  const handleSaveCustomDomain = async () => {
    try {
      setIsValidating(true);
      
      // Validate the domain format
      if (customDomain && !customDomain.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/)) {
        toast({
          title: "Invalid domain format",
          description: "Please enter a valid domain (e.g., mydomain.com)",
          variant: "destructive",
        });
        return;
      }
      
      if (!userId) {
        toast({
          title: "Authentication Error",
          description: "User ID not found.",
          variant: "destructive",
        });
        return;
      }

      if (!isPremiumUser && customDomain) {
        toast({
          title: "Premium Feature",
          description: "Custom domains are available for premium users only.",
          variant: "destructive",
        });
        return;
      }
      
      // Check if domain is already taken - using maybeSingle to avoid type issues
      const { data: existingDomain, error: domainError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('custom_domain', customDomain)
        .neq('id', userId)
        .maybeSingle();
        
      if (existingDomain) {
        toast({
          title: "Domain already taken",
          description: "This custom domain is already registered by another user.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the profile directly
      const { error } = await supabase
        .from('user_profiles')
        .update({ custom_domain: customDomain || null })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Domain Updated",
        description: customDomain 
          ? `Your custom domain has been set to ${customDomain}` 
          : "Your custom domain has been removed",
      });
      
      if (onUpdate) onUpdate();
      
    } catch (error) {
      console.error("Error updating domain:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your domain settings.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="custom-domain">Custom Domain</Label>
        {isPremiumUser ? (
          <Badge className="bg-gradient-hero">Premium</Badge>
        ) : (
          <Badge variant="outline">Premium Required</Badge>
        )}
      </div>
      <Input
        id="custom-domain"
        placeholder="mydomain.com"
        value={customDomain}
        onChange={(e) => setCustomDomain(e.target.value)}
        disabled={!isPremiumUser}
      />
      <p className="text-xs text-muted-foreground">
        {isPremiumUser 
          ? "Use your own custom domain (e.g., mydomain.com)" 
          : "Upgrade to Premium to use custom domains"
        }
      </p>
      <Button 
        onClick={handleSaveCustomDomain} 
        disabled={isValidating || !isPremiumUser}
        className="mt-2"
      >
        {isValidating ? "Saving..." : "Save Custom Domain"}
      </Button>
    </div>
  );
};

export default CustomDomainForm;
