
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Share2, QrCode, Heart, Star, Globe, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import MobileHeader from "@/components/ui/mobile-header";
import SmoothMobileCard from "@/components/ui/smooth-mobile-card";
import { cn } from "@/lib/utils";

const DemoPiProfilePage = () => {
  const demoProfile = {
    username: "demo",
    displayName: "Sarah Chen",
    bio: "Digital creator & Pi pioneer 🚀 Building the future of decentralized social",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
    piDomain: "demo.pi",
    location: "San Francisco, CA"
  };

  const demoLinks = [
    {
      id: "1",
      title: "My Portfolio Website",
      description: "Check out my latest projects",
      url: "https://sarahchen.dev",
      icon: "🌐",
      clicks: 1247,
      type: "featured"
    },
    {
      id: "2", 
      title: "Pi Network Blog",
      description: "My thoughts on Web3 & Pi",
      url: "https://medium.com/@sarahchen",
      icon: "📝",
      clicks: 892,
      type: "featured"
    },
    {
      id: "3",
      title: "Twitter",
      url: "https://twitter.com/sarahchen",
      icon: "🐦",
      clicks: 543,
      type: "social"
    },
    {
      id: "4",
      title: "Instagram", 
      url: "https://instagram.com/sarahchen",
      icon: "📸",
      clicks: 321,
      type: "social"
    },
    {
      id: "5",
      title: "LinkedIn",
      url: "https://linkedin.com/in/sarahchen",
      icon: "💼", 
      clicks: 234,
      type: "social"
    },
    {
      id: "6",
      title: "YouTube Channel",
      description: "Pi tutorials & tech reviews",
      url: "https://youtube.com/@sarahchen",
      icon: "🎥",
      clicks: 678,
      type: "regular"
    },
    {
      id: "7",
      title: "Pi Marketplace Store",
      description: "Digital art & NFTs",
      url: "#pi-store",
      icon: "🛍️",
      clicks: 156,
      type: "regular"
    },
    {
      id: "8",
      title: "Send Pi Tip",
      description: "Support my content creation",
      url: "#tip-pi",
      icon: "💰",
      clicks: 89,
      type: "pi-feature"
    }
  ];

  const handleLinkClick = (link: any) => {
    if (link.url.startsWith('#')) {
      // Handle special Pi features
      console.log(`Demo: ${link.title} clicked`);
      return;
    }
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${demoProfile.displayName} (@${demoProfile.username}.pi)`,
        url: window.location.href,
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Group links by type
  const featuredLinks = demoLinks.filter(link => link.type === "featured");
  const socialLinks = demoLinks.filter(link => link.type === "social");
  const regularLinks = demoLinks.filter(link => link.type === "regular");
  const piFeatures = demoLinks.filter(link => link.type === "pi-feature");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Helmet>
        <title>Sarah Chen (@demo.pi) | Pi Network Profile</title>
        <meta name="description" content="Digital creator & Pi pioneer 🚀 Building the future of decentralized social" />
        <meta property="og:title" content="Sarah Chen (@demo.pi) | Pi Network Profile" />
        <meta property="og:description" content="Digital creator & Pi pioneer 🚀 Building the future of decentralized social" />
        <meta property="og:image" content={demoProfile.avatar} />
        <meta property="og:url" content="https://demo.pi" />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sarah Chen (@demo.pi)" />
        <meta name="twitter:description" content="Digital creator & Pi pioneer 🚀 Building the future of decentralized social" />
        <meta name="twitter:image" content={demoProfile.avatar} />
      </Helmet>

      <MobileHeader />

      <main className="max-w-md mx-auto px-4 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Profile Header */}
          <motion.div variants={itemVariants}>
            <SmoothMobileCard className="text-center">
              <div className="px-6 py-8">
                {/* Avatar with Pi badge */}
                <div className="relative inline-block mb-4">
                  <img
                    src={demoProfile.avatar}
                    alt={demoProfile.displayName}
                    className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-amber-400 dark:ring-amber-500"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white dark:border-gray-800">
                    π
                  </div>
                </div>

                {/* Name and username */}
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {demoProfile.displayName}
                </h1>
                <div className="flex items-center justify-center gap-1 text-sm text-purple-600 dark:text-purple-400 mb-3">
                  <span>@{demoProfile.username}.pi</span>
                  <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    π
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {demoProfile.bio}
                </p>

                {/* Action buttons */}
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="rounded-full px-4 border-purple-200 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <Share2 className="h-3 w-3 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4 border-purple-200 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <QrCode className="h-3 w-3 mr-2" />
                    QR Code
                  </Button>
                </div>
              </div>
            </SmoothMobileCard>
          </motion.div>

          {/* Featured Links */}
          {featuredLinks.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              {featuredLinks.map((link, index) => (
                <SmoothMobileCard
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className="bg-gradient-to-r from-purple-500 to-amber-500 text-white"
                  delay={index * 0.1}
                >
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{link.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{link.title}</h3>
                        {link.description && (
                          <p className="text-xs text-white/80 truncate">{link.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-white/70">{link.clicks} clicks</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-white/80" />
                    </div>
                  </div>
                </SmoothMobileCard>
              ))}
            </motion.div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="flex justify-center gap-3 py-2">
                {socialLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleLinkClick(link)}
                    className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 flex items-center justify-center text-lg hover:scale-110 transition-transform duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular Links */}
          {regularLinks.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              {regularLinks.map((link, index) => (
                <SmoothMobileCard
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  delay={index * 0.1}
                >
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center text-lg">
                        {link.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{link.title}</h3>
                        {link.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{link.description}</p>
                        )}
                        <span className="text-xs text-gray-400 dark:text-gray-500">{link.clicks} clicks</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </SmoothMobileCard>
              ))}
            </motion.div>
          )}

          {/* Pi Features */}
          {piFeatures.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              {piFeatures.map((link, index) => (
                <SmoothMobileCard
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                  delay={index * 0.1}
                >
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{link.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{link.title}</h3>
                        {link.description && (
                          <p className="text-xs text-white/80 truncate">{link.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-white/70">{link.clicks} tips received</span>
                          <div className="text-xs bg-white/20 px-2 py-0.5 rounded">Pi Network</div>
                        </div>
                      </div>
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        π
                      </div>
                    </div>
                  </div>
                </SmoothMobileCard>
              ))}
            </motion.div>
          )}

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center py-6">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <Heart className="h-3 w-3 text-red-500" />
              <span>Powered by</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">Droplink</span>
              <span>&</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">Pi Network</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Help</a>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DemoPiProfilePage;
