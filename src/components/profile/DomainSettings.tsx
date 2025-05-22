
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { AnimatedContainer } from "@/components/ui/animated-container";
import PiDomainForm from "./PiDomainForm";
import CustomDomainForm from "./CustomDomainForm";
import ProfileUrlsList from "./ProfileUrlsList";

interface DomainSettingsProps {
  onUpdate?: () => void;
}

const DomainSettings = ({ onUpdate }: DomainSettingsProps) => {
  const { profile } = useUser();
  
  // Use direct string comparison for plan check to avoid deep type instantiation
  const planType = profile?.subscription?.plan || '';
  const isPremiumUser = planType === 'pro' || planType === 'premium';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Settings</CardTitle>
        <CardDescription>
          Configure your profile domain settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnimatedContainer animation="fade" className="space-y-4">
          <PiDomainForm 
            initialDomain={profile?.pi_domain} 
            userId={profile?.id}
            onUpdate={onUpdate} 
          />
          
          <div className="pt-4 border-t">
            <CustomDomainForm 
              initialDomain={profile?.custom_domain}
              userId={profile?.id}
              isPremiumUser={isPremiumUser}
              onUpdate={onUpdate}
            />
          </div>
          
          <div className="pt-4 border-t">
            <ProfileUrlsList 
              username={profile?.username}
              piDomain={profile?.pi_domain}
              customDomain={profile?.custom_domain}
              isPremiumUser={isPremiumUser}
            />
          </div>
        </AnimatedContainer>
      </CardContent>
    </Card>
  );
};

export default DomainSettings;
