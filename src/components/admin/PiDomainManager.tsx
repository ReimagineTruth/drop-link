
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, User, Globe, Calendar, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface UserWithDomain {
  id: string;
  username: string;
  display_name: string | null;
  pi_domain: string | null;
  custom_domain: string | null;
  created_at: string | null;
}

const PiDomainManager = () => {
  const [users, setUsers] = useState<UserWithDomain[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithDomain | null>(null);
  const [newPiDomain, setNewPiDomain] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { isAdmin } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, username, display_name, pi_domain, custom_domain, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.pi_domain?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignPiDomain = async () => {
    if (!selectedUser || !newPiDomain.trim()) return;

    setIsUpdating(true);
    try {
      // Validate domain format
      if (!newPiDomain.match(/^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/)) {
        toast({
          title: "Invalid domain format",
          description: "Domain can only contain lowercase letters, numbers, and hyphens",
          variant: "destructive",
        });
        return;
      }

      // Check if domain is already taken
      const { data: existing } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('pi_domain', newPiDomain)
        .neq('id', selectedUser.id)
        .maybeSingle();

      if (existing) {
        toast({
          title: "Domain already taken",
          description: "This .pi domain is already registered",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_profiles')
        .update({ pi_domain: newPiDomain })
        .eq('id', selectedUser.id);

      if (error) throw error;

      toast({
        title: "Domain assigned",
        description: `${newPiDomain}.pi has been assigned to ${selectedUser.username}`,
      });

      setNewPiDomain('');
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error assigning domain:', error);
      toast({
        title: "Assignment failed",
        description: "Failed to assign domain",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemovePiDomain = async (userId: string, domain: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ pi_domain: null })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Domain removed",
        description: `${domain}.pi has been removed`,
      });

      fetchUsers();
    } catch (error) {
      console.error('Error removing domain:', error);
      toast({
        title: "Removal failed",
        description: "Failed to remove domain",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Access denied. Admin privileges required.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Pi Domain Manager
          </CardTitle>
          <CardDescription>
            Manage .pi domain assignments for users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by username, name, or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Assign New Domain */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Assign New Domain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Select User</Label>
                  <select
                    className="w-full mt-1 p-2 border rounded-md"
                    value={selectedUser?.id || ''}
                    onChange={(e) => {
                      const user = users.find(u => u.id === e.target.value);
                      setSelectedUser(user || null);
                    }}
                  >
                    <option value="">Choose a user...</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.username} ({user.display_name || 'No display name'})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Pi Domain</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="domain"
                      value={newPiDomain}
                      onChange={(e) => setNewPiDomain(e.target.value.toLowerCase())}
                    />
                    <span className="flex items-center text-sm text-muted-foreground">.pi</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleAssignPiDomain}
                disabled={!selectedUser || !newPiDomain.trim() || isUpdating}
                className="w-full"
              >
                {isUpdating ? 'Assigning...' : 'Assign Domain'}
              </Button>
            </CardContent>
          </Card>

          {/* Users List */}
          <div className="space-y-3">
            <h3 className="font-medium">Users ({filteredUsers.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">@{user.username}</p>
                        {user.display_name && (
                          <p className="text-sm text-muted-foreground">{user.display_name}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {user.pi_domain ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            {user.pi_domain}.pi
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemovePiDomain(user.id, user.pi_domain!)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Badge variant="outline">No .pi domain</Badge>
                      )}
                      
                      {user.custom_domain && (
                        <Badge className="bg-blue-100 text-blue-800">
                          {user.custom_domain}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PiDomainManager;
