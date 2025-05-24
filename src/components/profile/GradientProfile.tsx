
import { Link } from "@/types/link";
import { ExternalLink, Instagram, Twitter, Facebook, Linkedin, Youtube, Link as LinkIcon } from "lucide-react";

interface GradientProfileProps {
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

const GradientProfile = ({ 
  links, 
  onLinkClick, 
  username, 
  displayName, 
  bio, 
  avatarUrl,
  theme 
}: GradientProfileProps) => {
  
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
      style={{ background: gradientBg }}
    >
      <div className="max-w-md mx-auto px-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`}
              alt={displayName || username}
              className="w-28 h-28 rounded-full mx-auto border-4 border-white/30 shadow-xl backdrop-blur-sm"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {displayName || `@${username}`}
          </h1>
          {bio && (
            <p className="text-white/90 text-sm leading-relaxed max-w-xs mx-auto drop-shadow">
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
              className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] border border-white/30 hover:bg-white/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white">
                    {link.url.startsWith('http') ? getSocialIcon(link.url) : (
                      <span className="text-xl">{link.icon}</span>
                    )}
                  </div>
                  <span className="font-medium text-white text-left">{link.title}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-white/70" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8">
          <p className="text-xs text-white/60">
            Create your own link page
          </p>
          <a 
            href="/" 
            className="text-xs text-white/80 hover:text-white font-medium transition-colors"
          >
            Powered by Droplink
          </a>
        </div>
      </div>
    </div>
  );
};

export default GradientProfile;
