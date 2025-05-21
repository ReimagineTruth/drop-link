
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSubscription } from "@/hooks/useSubscription";

export type SubscriptionPlan = "starter" | "pro" | "premium" | "free" | null;

interface UserContextType {
  user: any;
  profile: any;
  subscription: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  showAds: boolean;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  refreshUserData: () => Promise<void>;  // Expecting Promise<void>, not Promise<boolean>
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  cancelSubscription: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: authLoading, isLoggedIn, signOut, isAdmin: authIsAdmin } = useAuth();
  const { profile, isLoading: profileLoading, updateProfile, refreshProfile } = useUserProfile(user);
  const { subscription, isLoading: subscriptionLoading, cancelSubscription, refreshSubscription } = useSubscription(user);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Update isAdmin state when authIsAdmin changes
  React.useEffect(() => {
    setIsAdmin(authIsAdmin);
  }, [authIsAdmin]);
  
  // Overall loading state
  const isLoading = authLoading || profileLoading || subscriptionLoading;
  
  // Only show ads for free plan users or starter plan users
  const showAds = isLoggedIn && !isAdmin && 
    (!subscription || subscription?.plan === "free" || subscription?.plan === "starter");

  // Modified to return Promise<void> instead of Promise<boolean>
  const refreshUserData = useCallback(async () => {
    console.log("Refreshing user data...");
    try {
      await Promise.all([
        refreshProfile(),
        refreshSubscription()
      ]);
      console.log("User data refreshed successfully");
      // Don't return a boolean value
    } catch (error) {
      console.error("Error refreshing user data:", error);
      // Don't return a boolean value
    }
  }, [refreshProfile, refreshSubscription]);

  const value: UserContextType = {
    user,
    profile,
    subscription,
    isLoading,
    isLoggedIn,
    showAds,
    isAdmin,
    setIsAdmin,
    refreshUserData,
    signOut,
    updateProfile,
    cancelSubscription
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
