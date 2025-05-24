
import { Link } from "@/types/link";
import LinktreeStyleProfile from "./LinktreeStyleProfile";
import MinimalProfile from "./MinimalProfile";
import GradientProfile from "./GradientProfile";
import DarkProfile from "./DarkProfile";
import NeonProfile from "./NeonProfile";

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

  switch (themeType) {
    case 'minimal':
    case 'basic':
      return <MinimalProfile {...commonProps} theme={themeData} />;
    
    case 'gradient':
    case 'colorful':
    case 'vibrant':
    case 'tropical':
    case 'warm':
    case 'cool':
      return <GradientProfile {...commonProps} theme={themeData} />;
    
    case 'dark':
    case 'tech':
    case 'cosmic':
    case 'space':
      return <DarkProfile {...commonProps} theme={themeData} />;
    
    case 'neon':
    case 'retro':
    case 'futuristic':
    case 'dynamic':
      return <NeonProfile {...commonProps} theme={themeData} />;
    
    case 'linktree':
    default:
      return <LinktreeStyleProfile {...commonProps} theme={themeData} />;
  }
};

export default ThemeVariants;
