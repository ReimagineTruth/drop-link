
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TestLogin = () => {
  const [testUsername, setTestUsername] = useState('testuser');
  const [testPlan, setTestPlan] = useState('premium');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTestLogin = async () => {
    try {
      setIsLoading(true);
      
      // Create comprehensive test user data with full access
      const testUserData = {
        id: testPlan === 'admin' ? 'admin-user-123' : `test-user-${testUsername}-123`,
        email: `${testUsername}@test.com`,
        user_metadata: {
          username: testUsername,
          pi_uid: `test-pi-uid-${testUsername}-123`
        },
        aud: 'authenticated',
        role: 'authenticated'
      };

      // Check if test profile exists, create if not
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('username', testUsername)
        .maybeSingle();

      if (!existingProfile) {
        // Create test profile with comprehensive data
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: testUserData.id,
            username: testUsername,
            display_name: testUsername,
            email: testUserData.email,
            bio: `Test user - ${testPlan} plan`,
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + testUsername
          });

        if (profileError) {
          console.error('Error creating test profile:', profileError);
        }
      }

      // Create test subscription for premium features
      if (testPlan !== 'free' && testPlan !== 'admin') {
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: testUserData.id,
            plan: testPlan,
            is_active: true,
            started_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
            amount: testPlan === 'starter' ? 10 : testPlan === 'pro' ? 15 : 22
          });

        if (subscriptionError) {
          console.error('Error creating test subscription:', subscriptionError);
        }
      }

      // Add admin privileges if admin plan selected
      if (testPlan === 'admin') {
        const { error: adminError } = await supabase
          .from('admin_users')
          .upsert({
            pi_user_id: testUserData.id,
            username: testUsername
          });

        if (adminError) {
          console.error('Error creating admin user:', adminError);
        }
      }

      // Create test consent record
      const { error: consentError } = await supabase
        .from('user_consents')
        .upsert({
          user_id: testUserData.id,
          consented: true,
          auth_consent: true,
          username_consent: true,
          wallet_consent: true
        });

      if (consentError) {
        console.error('Error creating consent record:', consentError);
      }

      // Store comprehensive test user data in localStorage
      localStorage.setItem('test_user_session', JSON.stringify({
        user: testUserData,
        session: {
          access_token: 'test-access-token',
          refresh_token: 'test-refresh-token',
          expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
          user: testUserData
        },
        testPlan: testPlan,
        isAdmin: testPlan === 'admin'
      }));

      toast({
        title: "🧪 Test Login Successful",
        description: `Bypassed Pi auth - logged in as ${testUsername} with ${testPlan} access`,
      });

      // Force a page refresh to trigger auth state change
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Test login error:', error);
      toast({
        title: "Test Login Error",
        description: "Failed to create test login session",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4 border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-800">🚀 Quick Test Login (Bypass Pi Auth)</CardTitle>
        <CardDescription className="text-green-700">
          Skip Pi authentication for development testing - Full access to all features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="testUsername" className="block text-sm font-medium text-green-800 mb-1">
            Test Username
          </label>
          <Input
            id="testUsername"
            type="text"
            value={testUsername}
            onChange={(e) => setTestUsername(e.target.value)}
            placeholder="Enter test username"
            className="border-green-300 focus:border-green-500"
          />
        </div>

        <div>
          <label htmlFor="testPlan" className="block text-sm font-medium text-green-800 mb-1">
            Test Plan/Access Level
          </label>
          <Select value={testPlan} onValueChange={setTestPlan}>
            <SelectTrigger className="border-green-300 focus:border-green-500">
              <SelectValue placeholder="Select test plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free Plan</SelectItem>
              <SelectItem value="starter">Starter Plan (10π/month)</SelectItem>
              <SelectItem value="pro">Pro Plan (15π/month)</SelectItem>
              <SelectItem value="premium">Premium Plan (22π/month)</SelectItem>
              <SelectItem value="admin">Admin Access (Full Control)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleTestLogin}
          disabled={isLoading || !testUsername.trim()}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-3"
        >
          {isLoading ? 'Creating Test Session...' : `🧪 BYPASS & LOGIN (${testPlan.toUpperCase()})`}
        </Button>

        <div className="text-xs text-green-600 space-y-1">
          <p className="font-medium">✅ Test Features Available:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Full dashboard access</li>
            <li>Payment system testing</li>
            <li>Subscription management</li>
            <li>Analytics and insights</li>
            <li>Admin portal (if admin selected)</li>
            <li>All premium features</li>
            <li>No Pi Browser required</li>
          </ul>
        </div>
        
        <p className="text-xs text-orange-600 text-center font-medium">
          ⚠️ Development only - Remove before production
        </p>
      </CardContent>
    </Card>
  );
};

export default TestLogin;
