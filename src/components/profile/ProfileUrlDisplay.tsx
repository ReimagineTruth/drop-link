
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, ChevronDown, Check, Globe, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileUrlDisplayProps {
  profileUrl: string;
  username: string | null;
  piDomain?: string | null;
  customDomain?: string | null;
}

const ProfileUrlDisplay = ({ 
  profileUrl, 
  username,
  piDomain,
  customDomain
}: ProfileUrlDisplayProps) => {
  const { toast } = useToast();
  const [selectedUrl, setSelectedUrl] = useState<string>(profileUrl);
  const [copied, setCopied] = useState(false);

  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(selectedUrl);
    setCopied(true);
    toast({
      title: "Link Copied",
      description: "Your profile URL has been copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewProfile = () => {
    if (selectedUrl) {
      // If it's the default profile URL
      if (selectedUrl === profileUrl && username) {
        window.open(`/@${username}`, '_blank');
      } else {
        // For custom domains, open the full URL
        window.open(selectedUrl, '_blank');
      }
    }
  };

  // Get all available URLs with proper labeling and icons
  const getAvailableUrls = () => {
    const urls = [
      { 
        label: `droplink.space/@${username}`, 
        value: profileUrl,
        type: 'web',
        icon: Globe,
        description: 'Web'
      }
    ];
    
    if (piDomain) {
      urls.push({ 
        label: `${piDomain}.pi`, 
        value: `https://${piDomain}.pi`,
        type: 'pi',
        icon: Smartphone,
        description: 'Pi Browser'
      });
    }
    
    if (customDomain) {
      urls.push({ 
        label: customDomain, 
        value: `https://${customDomain}`,
        type: 'custom',
        icon: Globe,
        description: 'Custom Domain'
      });
    }
    
    return urls;
  };

  const availableUrls = getAvailableUrls();
  const selectedUrlData = availableUrls.find(u => u.value === selectedUrl) || availableUrls[0];

  if (!username) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 space-y-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-3">
          <span className="text-2xl">π</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          User's Profile
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Accessible via:
        </p>
      </div>

      <div className="space-y-3">
        {availableUrls.map((url, index) => {
          const IconComponent = url.icon;
          const isSelected = selectedUrl === url.value;
          
          return (
            <div 
              key={url.value}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                isSelected 
                  ? 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-600 shadow-sm' 
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`p-2 rounded-md ${
                  url.type === 'pi' 
                    ? 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                }`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {url.label}
                    </span>
                    {url.type === 'pi' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                        Connected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {url.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => {
                    setSelectedUrl(url.value);
                    handleCopyProfileUrl();
                  }}
                  className="h-8 w-8 p-0"
                >
                  {copied && selectedUrl === url.value ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => {
                    setSelectedUrl(url.value);
                    handleViewProfile();
                  }}
                  className="h-8 w-8 p-0"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileUrlDisplay;
