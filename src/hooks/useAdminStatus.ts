
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";

interface AdminData {
  id: string;
  pi_user_id: string;
  username: string;
  created_at?: string;
}

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useUser();

  // DEVELOPER BYPASS MODE - GRANT ADMIN ACCESS FOR TESTING
  const isDeveloperMode = true; // Set to false for production

  useEffect(() => {
    const checkAdminStatus = async () => {
      // In developer mode, grant admin access immediately
      if (isDeveloperMode) {
        console.log("🚀 DEVELOPER MODE: Admin access granted for testing");
        setIsAdmin(true);
        setAdminData({
          id: 'dev-admin-001',
          pi_user_id: 'developer-bypass',
          username: 'developer'
        });
        setIsLoading(false);
        return;
      }

      if (!profile?.id) {
        setIsLoading(false);
        setIsAdmin(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        console.log("Checking admin status for user:", profile.username);
        
        // Call our edge function to check admin status
        const { data, error } = await supabase.functions.invoke("check-admin", {
          body: { 
            piUserId: profile.id,
            username: profile.username
          }
        });

        if (error) throw error;

        console.log("Admin check result:", data);
        
        setIsAdmin(data.isAdmin);
        setAdminData(data.adminData);

      } catch (err) {
        console.error("Error checking admin status:", err);
        setError(err instanceof Error ? err.message : "Failed to verify admin status");
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [profile?.id, profile?.username, isDeveloperMode]);

  return { 
    isAdmin, 
    adminData, 
    isLoading, 
    error,
    isDeveloperMode // Expose developer mode flag
  };
};

export default useAdminStatus;
