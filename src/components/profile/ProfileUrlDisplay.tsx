
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, ChevronDown, Check } from "lucide-react";
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

  // Get all available URLs
  const getAvailableUrls = () => {
    const urls = [{ label: `droplink.space/@${username}`, value: profileUrl }];
    
    if (piDomain) {
      urls.push({ label: `${piDomain}.pi`, value: `https://${piDomain}.pi` });
    }
    
    if (customDomain) {
      urls.push({ label: customDomain, value: `https://${customDomain}` });
    }
    
    return urls;
  };

  const availableUrls = getAvailableUrls();
  const selectedUrlLabel = availableUrls.find(u => u.value === selectedUrl)?.label || profileUrl;

  if (!username) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <p className="text-sm font-medium mb-2">Your public profile URL</p>
      <div className="flex gap-2">
        {availableUrls.length > 1 ? (
          <DropdownMenu>
            <div className="flex flex-1 gap-2">
              <DropdownMenuTrigger asChild className="flex-1">
                <Button variant="outline" className="w-full justify-between">
                  <span className="truncate">{selectedUrlLabel}</span>
                  <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                {availableUrls.map((url) => (
                  <DropdownMenuItem 
                    key={url.value}
                    className="cursor-pointer"
                    onClick={() => setSelectedUrl(url.value)}
                  >
                    {url.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
        ) : (
          <Input 
            value={profileUrl} 
            readOnly 
            className="bg-white"
          />
        )}
        
        <Button 
          size="icon" 
          variant="outline" 
          onClick={handleCopyProfileUrl}
          className="relative overflow-hidden transition-all"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <Button size="icon" variant="outline" onClick={handleViewProfile}>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileUrlDisplay;
