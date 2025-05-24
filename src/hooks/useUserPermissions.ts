
import { useUser } from "@/context/UserContext";

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'premium';

export const useUserPermissions = () => {
  const { 
    isLoggedIn, 
    subscription, 
    isAdmin, 
    profile
  } = useUser();

  // Enhanced security: Strict check for admin status with additional validation
  let plan: SubscriptionPlan = 'free'; // Default to free
  
  if (isLoggedIn && isAdmin && profile?.id) {
    plan = 'premium'; // Admin users get premium plan by default
    console.log("Admin privileges granted to authenticated admin user");
  } else if (isLoggedIn && subscription?.plan) {
    plan = subscription.plan as SubscriptionPlan;
  }
  
  // Improved security: More strict check for subscription validity
  const subscriptionEnd = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const isSubscriptionActive = isLoggedIn && subscription?.is_active && 
    subscriptionEnd && new Date() < subscriptionEnd;
  
  // Double check for subscription validity
  if (!isSubscriptionActive && plan !== 'free' && !(isLoggedIn && isAdmin && profile?.id)) {
    plan = 'free';
    console.log('Subscription invalid or expired. Treating as free plan.');
  }
  
  const username = profile?.username || null;

  // Feature limitations based on actual pricing plan features
  const permissions = {
    // Link limits
    maxLinks: plan === 'free' ? 1 : Infinity,
    maxSocialProfiles: plan === 'free' ? 1 : Infinity,
    
    // Starter features (8π/month)
    unlimitedLinks: plan !== 'free',
    connectAllSocialProfiles: plan !== 'free',
    piAdNetwork: plan === 'free' || plan === 'starter', // Only free and starter show ads
    basicAnalytics: plan !== 'free',
    emailSupport: plan !== 'free',
    communityForumsAccess: plan !== 'free',
    
    // Pro features (12π/month) 
    multiFactorAuth: plan === 'pro' || plan === 'premium',
    hasQRCode: plan === 'pro' || plan === 'premium',
    hasScheduling: plan === 'pro' || plan === 'premium',
    hasLinkAnimations: plan === 'pro' || plan === 'premium',
    customButtonStyles: plan === 'pro' || plan === 'premium',
    spotlightLinks: plan === 'pro' || plan === 'premium',
    performanceAnalytics: plan === 'pro' || plan === 'premium',
    hasAdvancedThemes: plan === 'pro' || plan === 'premium',
    locationAnalytics: plan === 'pro' || plan === 'premium',
    emailPhoneCollection: plan === 'pro' || plan === 'premium',
    hasSEOTools: plan === 'pro' || plan === 'premium',
    communityRewards: plan === 'pro' || plan === 'premium',
    hasCustomDomain: plan === 'pro' || plan === 'premium',
    
    // Premium features (18π/month)
    canSellWithPiPayments: plan === 'premium',
    tailoredOnboarding: plan === 'premium',
    hasPrioritySupport: plan === 'premium',
    historicalInsights: plan === 'premium',
    hasDataExport: plan === 'premium',
    hasWhitelabel: plan === 'premium',
    advancedPiPayments: plan === 'premium',
    communityContributorStatus: plan === 'premium',
    hasFileUploads: plan === 'premium',
    
    // Analytics permissions
    hasAnalytics: plan !== 'free',
    canWithdrawTips: plan !== 'free',
    
    // Enhanced security: Require profile ID validation for full admin access
    hasFullAdminAccess: isLoggedIn && isAdmin && !!profile?.id
  };

  return {
    isLoggedIn,
    plan,
    username,
    subscriptionEnd,
    isSubscriptionActive,
    permissions
  };
};

export default useUserPermissions;
