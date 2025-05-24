
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const TestLogin = () => {
  const [testUsername, setTestUsername] = useState('testuser');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTestLogin = async () => {
    try {
      setIsLoading(true);
      
      // Create a test user session directly
      const testUserData = {
        id: 'test-user-123',
        email: `${testUsername}@test.com`,
        user_metadata: {
          username: testUsername,
          pi_uid: 'test-pi-uid-123'
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
        // Create test profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: testUserData.id,
            username: testUsername,
            display_name: testUsername,
            email: testUserData.email
          });

        if (profileError) {
          console.error('Error creating test profile:', profileError);
        }
      }

      // Store test user data in localStorage to simulate authentication
      localStorage.setItem('test_user_session', JSON.stringify({
        user: testUserData,
        session: {
          access_token: 'test-access-token',
          refresh_token: 'test-refresh-token',
          expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
          user: testUserData
        }
      }));

      toast({
        title: "Test Login Successful",
        description: `Logged in as test user: ${testUsername}`,
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
    <Card className="w-full max-w-md mx-auto mt-6 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-yellow-800">🧪 Test Login (Development Only)</CardTitle>
        <CardDescription className="text-yellow-700">
          Bypass authentication for testing features and payments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="testUsername" className="block text-sm font-medium text-yellow-800 mb-1">
            Test Username
          </label>
          <Input
            id="testUsername"
            type="text"
            value={testUsername}
            onChange={(e) => setTestUsername(e.target.value)}
            placeholder="Enter test username"
            className="border-yellow-300 focus:border-yellow-500"
          />
        </div>
        
        <Button 
          onClick={handleTestLogin}
          disabled={isLoading || !testUsername.trim()}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          {isLoading ? 'Creating Test Session...' : 'Login as Test User'}
        </Button>
        
        <p className="text-xs text-yellow-600 text-center">
          ⚠️ Remove this component before production deployment
        </p>
      </CardContent>
    </Card>
  );
};

export default TestLogin;
