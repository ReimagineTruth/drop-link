
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
  
  // Enhanced test session handling with full feature access
  const getTestUserSession = () => {
    try {
      const testSession = localStorage.getItem('test_user_session');
      if (testSession) {
        const parsedSession = JSON.parse(testSession);
        if (parsedSession.session.expires_at > Date.now()) {
          return parsedSession;
        } else {
          localStorage.removeItem('test_user_session');
        }
      }
    } catch (error) {
      console.error('Error parsing test session:', error);
      localStorage.removeItem('test_user_session');
    }
    return null;
  };
  
  useEffect(() => {
    // Enhanced security with test mode support
    const checkAuthHeaders = async () => {
      // Check for test session first
      const testSession = getTestUserSession();
      if (testSession) {
        console.log("Using test session with full access");
        return true;
      }
      
      // Check if auth state includes valid tokens
      const { data } = await supabase.auth.getSession();
      
      if (data.session?.access_token) {
        // Validate token expiry
        if (new Date(data.session.expires_at * 1000) < new Date()) {
          console.warn("Access token has expired");
          await signOut(); // Force sign out if token expired
          return false;
        }
        console.log("Valid access token present");
        return true;
      }
      return false;
    };
    
    // Set up auth state change listener with enhanced test mode support
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event, session?.user?.id);
        
        // Check for test session first with enhanced admin detection
        const testSession = getTestUserSession();
        if (testSession) {
          setUser(testSession.user);
          const isTestAdmin = testSession.testPlan === 'admin' || 
                             testSession.user.username === 'admin' || 
                             ADMIN_EMAILS.includes(testSession.user.email);
          setIsAdmin(isTestAdmin);
          setIsLoading(false);
          console.log("Test session active with plan:", testSession.testPlan, "Admin:", isTestAdmin);
          return;
        }
        
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Enhanced admin validation with email verification
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

    // Enhanced initialization with test mode support
    const initAuth = async () => {
      try {
        // Check for test session first with full feature access
        const testSession = getTestUserSession();
        if (testSession) {
          console.log("Found test session with plan:", testSession.testPlan);
          setUser(testSession.user);
          const isTestAdmin = testSession.testPlan === 'admin' || 
                             testSession.user.username === 'admin' || 
                             ADMIN_EMAILS.includes(testSession.user.email);
          setIsAdmin(isTestAdmin);
          setIsLoading(false);
          console.log("Test mode active - Full access granted");
          return;
        }
        
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", session?.user?.id);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Enhanced admin validation with email verification
        if (currentUser && currentUser.email && currentUser.email_confirmed_at) {
          const userIsAdmin = ADMIN_EMAILS.includes(currentUser.email);
          setIsAdmin(userIsAdmin);
          
          if (userIsAdmin) {
            console.log("User has admin privileges");
          }
        }
        
        // Run security check
        await checkAuthHeaders();
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
      // Enhanced cleanup including test sessions
      localStorage.removeItem('test_user_session');
      
      await supabase.auth.signOut();
      
      // Comprehensive cleanup of all auth-related storage
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
      
      console.log("User signed out successfully (including test mode)");
      
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
