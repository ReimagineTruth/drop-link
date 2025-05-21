
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
        // You can implement this if you decide to store consent in the database
        // For now, we'll use localStorage as a simple solution
        const storedConsent = localStorage.getItem(`user_consent_${user.id}`);
        setHasConsented(storedConsent === 'true');
      } catch (error) {
        console.error("Error checking consent status:", error);
        setHasConsented(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkConsentStatus();
  }, [user]);

  const setConsent = (value: boolean) => {
    if (user) {
      localStorage.setItem(`user_consent_${user.id}`, value ? 'true' : 'false');
      setHasConsented(value);
    }
  };

  return {
    hasConsented,
    isLoading,
    setConsent
  };
}
