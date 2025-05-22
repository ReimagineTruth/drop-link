
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { supabase } from "@/integrations/supabase/client";

interface DomainSettingsProps {
  onUpdate?: () => void;
}

// Define subscription plan type explicitly
type SubscriptionPlanType = 'free' | 'starter' | 'pro' | 'premium' | null;

// Simplified profile type to avoid circular references
type SimpleProfile = {
  id?: string;
  pi_domain?: string | null;
  custom_domain?: string | null;
  username?: string | null;
  subscription?: {
    plan: string; // Using string instead of SubscriptionPlanType to avoid potential circular reference
  } | null;
};

const DomainSettings = ({ onUpdate }: DomainSettingsProps) => {
  const { profile, updateProfile } = useUser();
  const [piDomain, setPiDomain] = useState(profile?.pi_domain || '');
  const [isValidating, setIsValidating] = useState(false);
  const [isCustomDomain, setIsCustomDomain] = useState(!!profile?.custom_domain);
  const [customDomain, setCustomDomain] = useState(profile?.custom_domain || '');
  
  // Use direct string comparison rather than type assertion to avoid deep instantiation
  const planValue: string | null = profile?.subscription?.plan || null;
  const isPremiumUser = planValue === 'pro' || planValue === 'premium';

  const handleSavePiDomain = async () => {
    try {
      setIsValidating(true);
      
      // Validate the domain format
      if (piDomain && !piDomain.match(/^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/)) {
        toast({
          title: "Invalid domain format",
          description: "Domain can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.",
          variant: "destructive",
        });
        return;
      }
      
      // Check if domain is already taken
      const { data: existingDomain, error: domainError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('pi_domain', piDomain)
        .neq('id', profile?.id)
        .single();
        
      if (existingDomain) {
        toast({
          title: "Domain already taken",
          description: "This .pi domain is already registered by another user.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the profile
      await updateProfile({ pi_domain: piDomain });
      
      toast({
        title: "Domain Updated",
        description: piDomain 
          ? `Your .pi domain has been set to ${piDomain}.pi` 
          : "Your .pi domain has been removed",
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

  const handleSaveCustomDomain = async () => {
    try {
      setIsValidating(true);
      
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
      
      // Update the profile
      await updateProfile({ custom_domain: domainToSave });
      
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
    <Card>
      <CardHeader>
        <CardTitle>Domain Settings</CardTitle>
        <CardDescription>
          Configure your profile domain settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnimatedContainer animation="fade" className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="pi-domain">Pi Network Domain</Label>
              <Badge className="bg-gradient-hero">Free</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="pi-domain"
                placeholder="yourdomain"
                value={piDomain}
                onChange={(e) => setPiDomain(e.target.value)}
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">.pi</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your personalized .pi domain (e.g., yourdomain.pi)
            </p>
            <Button 
              onClick={handleSavePiDomain} 
              disabled={isValidating}
              className="mt-2"
            >
              {isValidating ? "Saving..." : "Save Pi Domain"}
            </Button>
          </div>
          
          <div className="pt-4 border-t space-y-2">
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
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Your profile URLs:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">droplink.space/@{profile?.username}</span>
              </li>
              {piDomain && (
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">{piDomain}.pi</span>
                </li>
              )}
              {isCustomDomain && customDomain && isPremiumUser && (
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">{customDomain}</span>
                </li>
              )}
            </ul>
          </div>
        </AnimatedContainer>
      </CardContent>
    </Card>
  );
};

export default DomainSettings;
