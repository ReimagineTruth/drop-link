
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { supabase } from "@/integrations/supabase/client";

interface CustomDomainFormProps {
  initialDomain: string | null;
  userId?: string;
  isPremiumUser: boolean;
  onUpdate?: () => void;
}

const CustomDomainForm = ({ 
  initialDomain, 
  userId, 
  isPremiumUser,
  onUpdate 
}: CustomDomainFormProps) => {
  const [isCustomDomain, setIsCustomDomain] = useState(!!initialDomain);
  const [customDomain, setCustomDomain] = useState(initialDomain || '');
  const [isValidating, setIsValidating] = useState(false);

  const handleSaveCustomDomain = async () => {
    try {
      setIsValidating(true);
      
      if (!userId) {
        toast({
          title: "Authentication Error",
          description: "User ID not found.",
          variant: "destructive",
        });
        return;
      }
      
      if (!isPremiumUser) {
        toast({
          title: "Premium Feature",
          description: "Custom domains require a Pro or Premium subscription.",
          variant: "destructive",
        });
        return;
      }
      
      // Only update custom domain if enabled
      const domainToSave = isCustomDomain ? customDomain : null;
      
      // Basic domain validation
      if (domainToSave && !domainToSave.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/)) {
        toast({
          title: "Invalid domain format",
          description: "Please enter a valid domain (e.g., example.com)",
          variant: "destructive",
        });
        return;
      }
      
      // Update the profile using RPC or raw SQL to bypass TypeScript constraints
      const { error } = await supabase.rpc('update_user_custom_domain', { 
        user_id: userId,
        domain_value: domainToSave
      });
      
      if (error) throw error;
      
      toast({
        title: "Custom Domain Updated",
        description: domainToSave 
          ? `Your custom domain has been set to ${domainToSave}` 
          : "Your custom domain has been removed",
      });
      
      if (onUpdate) onUpdate();
      
    } catch (error) {
      console.error("Error updating custom domain:", error);
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
        <Label htmlFor="custom-domain" className="flex items-center">
          Custom Domain
          {!isPremiumUser && (
            <Badge className="ml-2 bg-amber-500">Pro & Premium</Badge>
          )}
        </Label>
        <Switch
          checked={isCustomDomain}
          onCheckedChange={setIsCustomDomain}
          disabled={!isPremiumUser}
        />
      </div>
      {isCustomDomain && (
        <AnimatedContainer animation="fade" className="space-y-2">
          <Input
            id="custom-domain"
            placeholder="yourdomain.com"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
            disabled={!isPremiumUser}
          />
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>
              You'll need to add a CNAME record to your domain pointing to 
              <code className="bg-muted px-1 rounded mx-1">droplink.space</code>
              in your domain provider's DNS settings.
            </p>
          </div>
          <Button
            onClick={handleSaveCustomDomain}
            disabled={isValidating || !isPremiumUser}
            className="mt-2"
          >
            {isValidating ? "Saving..." : "Save Custom Domain"}
          </Button>
        </AnimatedContainer>
      )}
    </div>
  );
};

export default CustomDomainForm;
