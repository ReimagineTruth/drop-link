
import { Link } from "@/types/link";
import { ExternalLink, Instagram, Twitter, Facebook, Linkedin, Youtube, Link as LinkIcon } from "lucide-react";

interface DarkProfileProps {
  links: Link[];
  onLinkClick: (link: Link) => void;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  theme?: {
    colors: string[];
    name: string;
    category: string;
  };
}

const DarkProfile = ({ 
  links, 
  onLinkClick, 
  username, 
  displayName, 
  bio, 
  avatarUrl,
  theme 
}: DarkProfileProps) => {
  
  const getSocialIcon = (url: string) => {
    const iconClass = "h-5 w-5";
    if (url.includes('instagram.com')) return <Instagram className={iconClass} />;
    if (url.includes('twitter.com') || url.includes('x.com')) return <Twitter className={iconClass} />;
    if (url.includes('facebook.com')) return <Facebook className={iconClass} />;
    if (url.includes('linkedin.com')) return <Linkedin className={iconClass} />;
    if (url.includes('youtube.com')) return <Youtube className={iconClass} />;
    return <LinkIcon className={iconClass} />;
  };

  const primaryColor = theme?.colors?.[0] || '#6366f1';
  const secondaryColor = theme?.colors?.[1] || '#8b5cf6';

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`}
              alt={displayName || username}
              className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700 shadow-xl"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {displayName || `@${username}`}
          </h1>
          {bio && (
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
              {bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link, index) => (
            <button
              key={link.id || index}
              onClick={() => onLinkClick(link)}
              className="w-full bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] border border-gray-700 hover:border-gray-600 group"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="text-white p-2 rounded-lg"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {link.url.startsWith('http') ? getSocialIcon(link.url) : (
                      <span className="text-lg">{link.icon}</span>
                    )}
                  </div>
                  <span className="font-medium text-white text-left group-hover:text-gray-100">{link.title}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            Create your own link page
          </p>
          <a 
            href="/" 
            className="text-xs text-gray-400 hover:text-white font-medium transition-colors"
          >
            Powered by Droplink
          </a>
        </div>
      </div>
    </div>
  );
};

export default DarkProfile;
