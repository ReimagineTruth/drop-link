
import { Link } from "@/types/link";
import LinktreeStyleProfile from "./LinktreeStyleProfile";
import MinimalProfile from "./MinimalProfile";

interface ThemeVariantsProps {
  theme: string;
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

  switch (theme) {
    case 'minimal':
      return <MinimalProfile {...commonProps} />;
    case 'linktree':
    default:
      return <LinktreeStyleProfile {...commonProps} />;
  }
};

export default ThemeVariants;
