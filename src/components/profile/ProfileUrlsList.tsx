
import { Check } from "lucide-react";

interface ProfileUrlsListProps {
  username: string | null;
  piDomain: string | null;
  customDomain: string | null;
  isPremiumUser: boolean;
}

const ProfileUrlsList = ({ 
  username, 
  piDomain, 
  customDomain, 
  isPremiumUser 
}: ProfileUrlsListProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Your profile URLs:</h4>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-muted-foreground">droplink.space/@{username}</span>
        </li>
        {piDomain && (
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-muted-foreground">{piDomain}.pi</span>
          </li>
        )}
        {customDomain && isPremiumUser && (
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-muted-foreground">{customDomain}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileUrlsList;
