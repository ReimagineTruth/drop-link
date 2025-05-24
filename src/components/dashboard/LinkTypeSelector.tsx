
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Music, Video, FileText, ShoppingBag, Calendar } from "lucide-react";

interface LinkTypeSelectorProps {
  onSelectType: (type: string) => void;
}

const LinkTypeSelector = ({ onSelectType }: LinkTypeSelectorProps) => {
  const linkTypes = [
    {
      id: 'url',
      name: 'Website Link',
      description: 'Link to any website or webpage',
      icon: Link,
      color: 'text-blue-600'
    },
    {
      id: 'music',
      name: 'Music',
      description: 'Spotify, Apple Music, SoundCloud',
      icon: Music,
      color: 'text-green-600'
    },
    {
      id: 'video',
      name: 'Video',
      description: 'YouTube, TikTok, Vimeo',
      icon: Video,
      color: 'text-red-600'
    },
    {
      id: 'document',
      name: 'Document',
      description: 'PDF, Google Docs, presentations',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      id: 'shop',
      name: 'Shop',
      description: 'Online store or product page',
      icon: ShoppingBag,
      color: 'text-orange-600'
    },
    {
      id: 'event',
      name: 'Event',
      description: 'Eventbrite, Facebook events',
      icon: Calendar,
      color: 'text-indigo-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>What type of link are you adding?</CardTitle>
        <CardDescription>
          Choose the type that best describes your link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {linkTypes.map((type) => (
            <Button
              key={type.id}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:border-primary"
              onClick={() => onSelectType(type.id)}
            >
              <type.icon className={`w-6 h-6 ${type.color}`} />
              <div className="text-center">
                <div className="font-medium text-sm">{type.name}</div>
                <div className="text-xs text-gray-500">{type.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkTypeSelector;
