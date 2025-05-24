
import { useUser } from "@/context/UserContext";

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'premium';

export const useUserPermissions = () => {
  const { 
    isLoggedIn, 
    subscription, 
    isAdmin, 
    profile
  } = useUser();

  // DEVELOPER BYPASS MODE - ALL FEATURES UNLOCKED FOR TESTING
  const isDeveloperMode = true; // Set to false for production

  // Enhanced security: Strict check for admin status with additional validation
  let plan: SubscriptionPlan = 'free'; // Default to free
  
  // In developer mode, grant premium access
  if (isDeveloperMode) {
    plan = 'premium';
    console.log("🚀 DEVELOPER MODE: All features unlocked for testing");
  } else if (isLoggedIn && isAdmin && profile?.id) {
    plan = 'premium'; // Admin users get premium plan by default
    console.log("Admin privileges granted to authenticated admin user");
  } else if (isLoggedIn && subscription?.plan) {
    plan = subscription.plan as SubscriptionPlan;
  }
  
  // Improved security: More strict check for subscription validity (bypassed in dev mode)
  const subscriptionEnd = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const isSubscriptionActive = isDeveloperMode || (isLoggedIn && subscription?.is_active && 
    subscriptionEnd && new Date() < subscriptionEnd);
  
  // Double check for subscription validity (bypassed in dev mode)
  if (!isDeveloperMode && !isSubscriptionActive && plan !== 'free' && !(isLoggedIn && isAdmin && profile?.id)) {
    plan = 'free';
    console.log('Subscription invalid or expired. Treating as free plan.');
  }
  
  const username = profile?.username || null;

  // Feature limitations based on actual pricing plan features (all unlocked in dev mode)
  const permissions = {
    // Link limits (unlimited in dev mode)
    maxLinks: isDeveloperMode ? Infinity : (plan === 'free' ? 1 : Infinity),
    maxSocialProfiles: isDeveloperMode ? Infinity : (plan === 'free' ? 1 : Infinity),
    
    // Starter features (8π/month) - all enabled in dev mode
    unlimitedLinks: isDeveloperMode || plan !== 'free',
    connectAllSocialProfiles: isDeveloperMode || plan !== 'free',
    piAdNetwork: isDeveloperMode ? false : (plan === 'free' || plan === 'starter'), // No ads in dev mode
    basicAnalytics: isDeveloperMode || plan !== 'free',
    emailSupport: isDeveloperMode || plan !== 'free',
    communityForumsAccess: isDeveloperMode || plan !== 'free',
    
    // Pro features (12π/month) - all enabled in dev mode
    multiFactorAuth: isDeveloperMode || plan === 'pro' || plan === 'premium',
    hasQRCode: isDeveloperMode || plan === 'pro' || plan === 'premium',
    hasScheduling: isDeveloperMode || plan === 'pro' || plan === 'premium',
    hasLinkAnimations: isDeveloperMode || plan === 'pro' || plan === 'premium',
    customButtonStyles: isDeveloperMode || plan === 'pro' || plan === 'premium',
    spotlightLinks: isDeveloperMode || plan === 'pro' || plan === 'premium',
    performanceAnalytics: isDeveloperMode || plan === 'pro' || plan === 'premium',
    hasAdvancedThemes: isDeveloperMode || plan === 'pro' || plan === 'premium',
    locationAnalytics: isDeveloperMode || plan === 'pro' || plan === 'premium',
    emailPhoneCollection: isDeveloperMode || plan === 'pro' || plan === 'premium',
    hasSEOTools: isDeveloperMode || plan === 'pro' || plan === 'premium',
    communityRewards: isDeveloperMode || plan === 'pro' || plan === 'premium',
    hasCustomDomain: isDeveloperMode || plan === 'pro' || plan === 'premium',
    
    // Premium features (18π/month) - all enabled in dev mode
    canSellWithPiPayments: isDeveloperMode || plan === 'premium',
    tailoredOnboarding: isDeveloperMode || plan === 'premium',
    hasPrioritySupport: isDeveloperMode || plan === 'premium',
    historicalInsights: isDeveloperMode || plan === 'premium',
    hasDataExport: isDeveloperMode || plan === 'premium',
    hasWhitelabel: isDeveloperMode || plan === 'premium',
    advancedPiPayments: isDeveloperMode || plan === 'premium',
    communityContributorStatus: isDeveloperMode || plan === 'premium',
    hasFileUploads: isDeveloperMode || plan === 'premium',
    
    // Pi monetization features - FREE PLAN CANNOT USE THESE
    canReceivePiTips: isDeveloperMode || plan !== 'free', // Only paid plans can receive tips
    canSellDigitalProducts: isDeveloperMode || plan !== 'free', // Only paid plans can sell products
    
    // Badge control - FREE shows badge, ANY PAID PLAN can remove it
    showDroplinkBadge: isDeveloperMode ? false : plan === 'free', // Show badge only on free plan
    canHideDroplinkBadge: isDeveloperMode || plan !== 'free', // Can hide on any paid plan
    
    // Analytics permissions - all enabled in dev mode
    hasAnalytics: isDeveloperMode || plan !== 'free',
    canWithdrawTips: isDeveloperMode || plan !== 'free',
    
    // Enhanced security: Require profile ID validation for full admin access (bypassed in dev mode)
    hasFullAdminAccess: isDeveloperMode || (isLoggedIn && isAdmin && !!profile?.id)
  };

  return {
    isLoggedIn,
    plan,
    username,
    subscriptionEnd,
    isSubscriptionActive,
    permissions,
    isDeveloperMode // Expose developer mode flag
  };
};

export default useUserPermissions;
