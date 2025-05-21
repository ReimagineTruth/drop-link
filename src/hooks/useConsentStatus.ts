import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";

export function useConsentStatus() {
  const { user } = useUser();
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConsentStatus = async () => {
      if (!user) {
        setHasConsented(null);
        setIsLoading(false);
        return;
      }

      try {
        // First check if consent is stored in the database
        const { data, error } = await supabase
          .from('user_consents')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error && error.code !== 'PGRST116') {
          console.error("Error checking consent status:", error);
        }
        
        if (data) {
          // If found in database, use that value
          console.log("Consent status from database:", data);
          setHasConsented(true);
        } else {
          // Otherwise check localStorage as fallback
          const storedConsent = localStorage.getItem(`user_consent_${user.id}`);
          console.log("Consent status from localStorage:", storedConsent);
          setHasConsented(storedConsent === 'true');
        }
      } catch (error) {
        console.error("Error checking consent status:", error);
        setHasConsented(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkConsentStatus();
  }, [user]);

  const setConsent = async (value: boolean) => {
    if (!user) return;
    
    try {
      // Store consent in localStorage as a fallback
      localStorage.setItem(`user_consent_${user.id}`, value ? 'true' : 'false');
      
      // Also try to store in database if possible
      try {
        const { error } = await supabase
          .from('user_consents')
          .upsert({ 
            user_id: user.id, 
            consented: value,
            consented_at: new Date().toISOString(),
            auth_consent: value,
            username_consent: value,
            wallet_consent: value
          });
          
        if (error) {
          console.error("Error saving consent to database:", error);
        }
      } catch (dbError) {
        console.error("Database error when saving consent:", dbError);
      }
      
      setHasConsented(value);
    } catch (error) {
      console.error("Error setting consent:", error);
    }
  };

  return {
    hasConsented,
    isLoading,
    setConsent
  };
}
