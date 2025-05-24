
import { Link } from "@/types/link";
import { ExternalLink, Instagram, Twitter, Facebook, Linkedin, Youtube, Link as LinkIcon } from "lucide-react";

interface LinktreeStyleProfileProps {
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

const LinktreeStyleProfile = ({ 
  links, 
  onLinkClick, 
  username, 
  displayName, 
  bio, 
  avatarUrl,
  theme 
}: LinktreeStyleProfileProps) => {
  
  const getSocialIcon = (url: string) => {
    if (url.includes('instagram.com')) return <Instagram className="h-5 w-5" />;
    if (url.includes('twitter.com') || url.includes('x.com')) return <Twitter className="h-5 w-5" />;
    if (url.includes('facebook.com')) return <Facebook className="h-5 w-5" />;
    if (url.includes('linkedin.com')) return <Linkedin className="h-5 w-5" />;
    if (url.includes('youtube.com')) return <Youtube className="h-5 w-5" />;
    return <LinkIcon className="h-5 w-5" />;
  };

  const gradientBg = theme?.colors && theme.colors.length >= 2 
    ? `linear-gradient(135deg, ${theme.colors.join(', ')})`
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  return (
    <div 
      className="min-h-screen py-8"
      style={{ 
        background: theme?.colors ? gradientBg : undefined,
        backgroundColor: !theme?.colors ? '#f8fafc' : undefined
      }}
    >
      <div className="max-w-md mx-auto px-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`}
              alt={displayName || username}
              className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {displayName || `@${username}`}
          </h1>
          {bio && (
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
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
              className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xl">
                    {link.url.startsWith('http') ? getSocialIcon(link.url) : (
                      <span>{link.icon}</span>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{link.title}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Create your own link page
          </p>
          <a 
            href="/" 
            className="text-xs text-primary hover:underline font-medium"
          >
            Powered by Droplink
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinktreeStyleProfile;
