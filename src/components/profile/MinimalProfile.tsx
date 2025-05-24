
import { Link } from "@/types/link";
import { ExternalLink, Instagram, Twitter, Facebook, Linkedin, Youtube, Link as LinkIcon } from "lucide-react";

interface MinimalProfileProps {
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

const MinimalProfile = ({ 
  links, 
  onLinkClick, 
  username, 
  displayName, 
  bio, 
  avatarUrl,
  theme 
}: MinimalProfileProps) => {
  
  const getSocialIcon = (url: string) => {
    if (url.includes('instagram.com')) return <Instagram className="h-4 w-4" />;
    if (url.includes('twitter.com') || url.includes('x.com')) return <Twitter className="h-4 w-4" />;
    if (url.includes('facebook.com')) return <Facebook className="h-4 w-4" />;
    if (url.includes('linkedin.com')) return <Linkedin className="h-4 w-4" />;
    if (url.includes('youtube.com')) return <Youtube className="h-4 w-4" />;
    return <LinkIcon className="h-4 w-4" />;
  };

  const primaryColor = theme?.colors?.[0] || '#6366f1';

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`}
              alt={displayName || username}
              className="w-20 h-20 rounded-full mx-auto"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            {displayName || `@${username}`}
          </h1>
          {bio && (
            <p className="text-gray-600 text-sm leading-relaxed">
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
              className="w-full bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
              style={{
                borderColor: theme?.colors?.[0] ? `${primaryColor}20` : undefined
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-base" style={{ color: primaryColor }}>
                    {link.url.startsWith('http') ? getSocialIcon(link.url) : (
                      <span>{link.icon}</span>
                    )}
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{link.title}</span>
                </div>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <a 
            href="/" 
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Create your Droplink
          </a>
        </div>
      </div>
    </div>
  );
};

export default MinimalProfile;
