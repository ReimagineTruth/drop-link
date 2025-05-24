
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin emails - add your email here
  const ADMIN_EMAILS = ["admin@pidrop.dev"];
  
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event, session?.user?.id);
        
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Admin validation with email verification
        if (currentUser && currentUser.email && currentUser.email_confirmed_at) {
          const userIsAdmin = ADMIN_EMAILS.includes(currentUser.email);
          setIsAdmin(userIsAdmin);
          
          if (userIsAdmin) {
            console.log("User has admin privileges");
          }
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // Initialize auth
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", session?.user?.id);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Admin validation with email verification
        if (currentUser && currentUser.email && currentUser.email_confirmed_at) {
          const userIsAdmin = ADMIN_EMAILS.includes(currentUser.email);
          setIsAdmin(userIsAdmin);
          
          if (userIsAdmin) {
            console.log("User has admin privileges");
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      
      // Cleanup of auth-related storage
      localStorage.removeItem('userToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPlan');
      localStorage.removeItem('piUsername');
      localStorage.removeItem('piUserId');
      localStorage.removeItem('piAccessToken');
      localStorage.removeItem('subscriptionEnd');
      
      // Clear Supabase storage items
      localStorage.removeItem('supabase.auth.token');
      
      // Clear any session cookies
      document.cookie.split(';').forEach(c => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      
      console.log("User signed out successfully");
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
      
      // Force page reload to clear any in-memory state
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    isLoading,
    isAdmin,
    isLoggedIn: !!user,
    signOut
  };
};
