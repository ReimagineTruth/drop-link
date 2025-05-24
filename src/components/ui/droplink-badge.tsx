
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface DroplinkBadgeProps {
  show?: boolean;
  className?: string;
}

export const DroplinkBadge = ({ show = true, className = "" }: DroplinkBadgeProps) => {
  if (!show) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <a
        href="https://droplink.space"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <Badge 
          variant="secondary" 
          className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105 flex items-center gap-1 text-xs px-2 py-1"
        >
          <span className="text-gray-600 font-medium">Made with</span>
          <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Droplink
          </span>
          <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </Badge>
      </a>
    </div>
  );
};

export default DroplinkBadge;
