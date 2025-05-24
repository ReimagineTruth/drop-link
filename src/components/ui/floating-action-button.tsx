
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Edit3, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  href?: string;
  onClick?: () => void;
  icon?: 'edit' | 'plus';
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const FloatingActionButton = ({ 
  href, 
  onClick, 
  icon = 'edit', 
  label = 'Edit',
  className,
  variant = 'primary'
}: FloatingActionButtonProps) => {
  const baseClasses = cn(
    "fixed bottom-6 right-6 z-40",
    "h-14 w-14 rounded-full shadow-lg",
    "transition-all duration-300 ease-out",
    "hover:scale-105 active:scale-95",
    "focus:outline-none focus:ring-4 focus:ring-primary/20",
    variant === 'primary' ? "bg-gradient-hero hover:shadow-xl" : "bg-white hover:bg-gray-50 border shadow-md",
    className
  );

  const iconClasses = cn(
    "h-6 w-6",
    variant === 'primary' ? "text-white" : "text-primary"
  );

  const IconComponent = icon === 'edit' ? Edit3 : Plus;

  if (href) {
    return (
      <Button asChild className={baseClasses} size="icon" aria-label={label}>
        <Link to={href}>
          <IconComponent className={iconClasses} />
        </Link>
      </Button>
    );
  }

  return (
    <Button 
      onClick={onClick} 
      className={baseClasses} 
      size="icon"
      aria-label={label}
    >
      <IconComponent className={iconClasses} />
    </Button>
  );
};

export default FloatingActionButton;
