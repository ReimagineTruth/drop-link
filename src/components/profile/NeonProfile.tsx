
import { Link } from "@/types/link";
import { ExternalLink, Instagram, Twitter, Facebook, Linkedin, Youtube, Link as LinkIcon } from "lucide-react";

interface NeonProfileProps {
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

const NeonProfile = ({ 
  links, 
  onLinkClick, 
  username, 
  displayName, 
  bio, 
  avatarUrl,
  theme 
}: NeonProfileProps) => {
  
  const getSocialIcon = (url: string) => {
    const iconClass = "h-5 w-5";
    if (url.includes('instagram.com')) return <Instagram className={iconClass} />;
    if (url.includes('twitter.com') || url.includes('x.com')) return <Twitter className={iconClass} />;
    if (url.includes('facebook.com')) return <Facebook className={iconClass} />;
    if (url.includes('linkedin.com')) return <Linkedin className={iconClass} />;
    if (url.includes('youtube.com')) return <Youtube className={iconClass} />;
    return <LinkIcon className={iconClass} />;
  };

  const neonColor = theme?.colors?.[0] || '#00ff41';
  const accentColor = theme?.colors?.[1] || '#ff0080';

  return (
    <div className="min-h-screen bg-black py-8" style={{
      backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a2e 0%, #000000 50%)'
    }}>
      <div className="max-w-md mx-auto px-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="mb-4 relative">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`}
              alt={displayName || username}
              className="w-24 h-24 rounded-full mx-auto shadow-xl"
              style={{
                border: `3px solid ${neonColor}`,
                boxShadow: `0 0 20px ${neonColor}50`
              }}
            />
          </div>
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ 
              color: neonColor,
              textShadow: `0 0 10px ${neonColor}80`
            }}
          >
            {displayName || `@${username}`}
          </h1>
          {bio && (
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
              {bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <button
              key={link.id || index}
              onClick={() => onLinkClick(link)}
              className="w-full bg-gray-900/50 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm group"
              style={{
                border: `1px solid ${neonColor}30`,
                boxShadow: `inset 0 0 20px ${neonColor}10`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${neonColor}`;
                e.currentTarget.style.boxShadow = `0 0 15px ${neonColor}50, inset 0 0 20px ${neonColor}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${neonColor}30`;
                e.currentTarget.style.boxShadow = `inset 0 0 20px ${neonColor}10`;
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ 
                      backgroundColor: `${neonColor}20`,
                      border: `1px solid ${neonColor}50`
                    }}
                  >
                    <div style={{ color: neonColor }}>
                      {link.url.startsWith('http') ? getSocialIcon(link.url) : (
                        <span className="text-lg">{link.icon}</span>
                      )}
                    </div>
                  </div>
                  <span 
                    className="font-medium text-left"
                    style={{ color: neonColor }}
                  >
                    {link.title}
                  </span>
                </div>
                <ExternalLink 
                  className="h-4 w-4"
                  style={{ color: `${neonColor}80` }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8">
          <p className="text-xs text-gray-600">
            Create your own link page
          </p>
          <a 
            href="/" 
            className="text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: accentColor }}
          >
            Powered by Droplink
          </a>
        </div>
      </div>
    </div>
  );
};

export default NeonProfile;
