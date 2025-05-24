
import { Link } from "@/types/link";
import LinktreeStyleProfile from "./LinktreeStyleProfile";
import MinimalProfile from "./MinimalProfile";
import GradientProfile from "./GradientProfile";
import DarkProfile from "./DarkProfile";
import NeonProfile from "./NeonProfile";
import { DroplinkBadge } from "@/components/ui/droplink-badge";
import useUserPermissions from "@/hooks/useUserPermissions";

interface ThemeVariantsProps {
  theme: string | any;
  links: Link[];
  onLinkClick: (link: Link) => void;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
}

const ThemeVariants = ({ 
  theme, 
  links, 
  onLinkClick, 
  username, 
  displayName, 
  bio, 
  avatarUrl 
}: ThemeVariantsProps) => {
  
  const { permissions } = useUserPermissions();
  
  const commonProps = {
    links,
    onLinkClick,
    username,
    displayName,
    bio,
    avatarUrl
  };

  // Parse theme if it's a JSON string
  let themeData;
  if (typeof theme === 'string') {
    try {
      themeData = JSON.parse(theme);
    } catch {
      themeData = { name: theme };
    }
  } else {
    themeData = theme || {};
  }

  // Determine theme type based on category or name
  const themeType = themeData.category || themeData.name || theme || 'linktree';

  let ProfileComponent;
  
  switch (themeType) {
    case 'minimal':
    case 'basic':
      ProfileComponent = <MinimalProfile {...commonProps} theme={themeData} />;
      break;
    
    case 'gradient':
    case 'colorful':
    case 'vibrant':
    case 'tropical':
    case 'warm':
    case 'cool':
      ProfileComponent = <GradientProfile {...commonProps} theme={themeData} />;
      break;
    
    case 'dark':
    case 'tech':
    case 'cosmic':
    case 'space':
      ProfileComponent = <DarkProfile {...commonProps} theme={themeData} />;
      break;
    
    case 'neon':
    case 'retro':
    case 'futuristic':
    case 'dynamic':
      ProfileComponent = <NeonProfile {...commonProps} theme={themeData} />;
      break;
    
    case 'linktree':
    default:
      ProfileComponent = <LinktreeStyleProfile {...commonProps} theme={themeData} />;
      break;
  }

  return (
    <div className="relative">
      {ProfileComponent}
      <DroplinkBadge show={permissions.showDroplinkBadge} />
    </div>
  );
};

export default ThemeVariants;
