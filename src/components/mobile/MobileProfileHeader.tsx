
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, QrCode, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SmoothMobileCard from "@/components/ui/smooth-mobile-card";
import { cn } from "@/lib/utils";

interface MobileProfileHeaderProps {
  username: string;
  displayName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  location?: string;
  onShareClick?: () => void;
  onQrCodeClick?: () => void;
  isOwnProfile?: boolean;
}

const MobileProfileHeader = ({
  username,
  displayName,
  bio,
  avatarUrl,
  location,
  onShareClick,
  onQrCodeClick,
  isOwnProfile = false
}: MobileProfileHeaderProps) => {
  const defaultAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;

  return (
    <SmoothMobileCard className="mx-4 mb-4">
      <div className="px-4 py-6 text-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="relative mx-auto mb-4"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-1">
            <img
              src={avatarUrl || defaultAvatar}
              alt={displayName || username}
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
            />
          </div>
          {isOwnProfile && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
          )}
        </motion.div>

        {/* Name and Username */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mb-3"
        >
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {displayName || `@${username}`}
          </h1>
          {displayName && (
            <p className="text-sm text-gray-500">@{username}</p>
          )}
        </motion.div>

        {/* Bio */}
        {bio && (
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-sm text-gray-600 mb-4 max-w-xs mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        )}

        {/* Location */}
        {location && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-4"
          >
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={onShareClick}
            className={cn(
              "rounded-full px-4 h-9 text-xs font-medium",
              "border-gray-200 hover:border-gray-300",
              "transition-all duration-200 touch-manipulation"
            )}
            style={{ touchAction: 'manipulation' }}
          >
            <Share2 className="h-3 w-3 mr-2" />
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onQrCodeClick}
            className={cn(
              "rounded-full px-4 h-9 text-xs font-medium",
              "border-gray-200 hover:border-gray-300",
              "transition-all duration-200 touch-manipulation"
            )}
            style={{ touchAction: 'manipulation' }}
          >
            <QrCode className="h-3 w-3 mr-2" />
            QR Code
          </Button>
        </motion.div>
      </div>
    </SmoothMobileCard>
  );
};

export default MobileProfileHeader;
