
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PiDomainFormProps {
  initialDomain: string | null;
  userId?: string;
  onUpdate?: () => void;
}

const PiDomainForm = ({ initialDomain, userId, onUpdate }: PiDomainFormProps) => {
  const [piDomain, setPiDomain] = useState(initialDomain || '');
  const [isValidating, setIsValidating] = useState(false);

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
      
      if (!userId) {
        toast({
          title: "Authentication Error",
          description: "User ID not found.",
          variant: "destructive",
        });
        return;
      }
      
      // Check if domain is already taken - avoiding deep type instantiation with explicit type
      const { data: existingDomain, error: domainError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('pi_domain', piDomain)
        .neq('id', userId)
        .maybeSingle();
        
      if (existingDomain) {
        toast({
          title: "Domain already taken",
          description: "This .pi domain is already registered by another user.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the profile directly
      const { error } = await supabase
        .from('user_profiles')
        .update({ pi_domain: piDomain })
        .eq('id', userId);
      
      if (error) throw error;
      
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

  return (
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
  );
};

export default PiDomainForm;
