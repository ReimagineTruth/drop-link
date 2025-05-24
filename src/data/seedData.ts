
export const sampleUsers = [
  {
    id: "user1-uuid",
    username: "piexplorer",
    display_name: "Pi Explorer",
    bio: "Pi Network enthusiast sharing the future of digital currency 🔥",
    avatar_url: "https://api.dicebear.com/7.x/adventurer/svg?seed=piexplorer",
    theme: "ocean",
    primary_color: "#3B82F6",
    secondary_color: "#10B981",
    pi_domain: "piexplorer"
  },
  {
    id: "user2-uuid", 
    username: "cryptoqueen",
    display_name: "Crypto Queen",
    bio: "Building the Pi ecosystem one dApp at a time 👑",
    avatar_url: "https://api.dicebear.com/7.x/adventurer/svg?seed=cryptoqueen",
    theme: "sunset",
    primary_color: "#F59E0B",
    secondary_color: "#EF4444",
    pi_domain: "cryptoqueen"
  },
  {
    id: "user3-uuid",
    username: "pidev",
    display_name: "Pi Developer",
    bio: "Full-stack developer creating Pi Network solutions 💻",
    avatar_url: "https://api.dicebear.com/7.x/adventurer/svg?seed=pidev",
    theme: "dark",
    primary_color: "#8B5CF6",
    secondary_color: "#06B6D4",
    pi_domain: "pidev"
  }
];

export const sampleLinks = [
  // Pi Explorer's links
  {
    id: "link1-uuid",
    user_id: "user1-uuid",
    title: "Pi Network Official",
    url: "https://minepi.com",
    icon: "🚀",
    position: 0,
    clicks: 1247
  },
  {
    id: "link2-uuid", 
    user_id: "user1-uuid",
    title: "My Pi Mining Guide",
    url: "https://medium.com/@piexplorer/pi-mining-guide",
    icon: "📖",
    position: 1,
    clicks: 892
  },
  {
    id: "link3-uuid",
    user_id: "user1-uuid", 
    title: "Pi Community Discord",
    url: "https://discord.gg/pi",
    icon: "💬",
    position: 2,
    clicks: 543
  },
  {
    id: "link4-uuid",
    user_id: "user1-uuid",
    title: "Support My Work",
    url: "#tip-in-pi",
    icon: "💝",
    position: 3,
    clicks: 234
  },

  // Crypto Queen's links
  {
    id: "link5-uuid",
    user_id: "user2-uuid",
    title: "Pi dApp Store",
    url: "https://apps.minepi.com",
    icon: "🛍️",
    position: 0,
    clicks: 2341
  },
  {
    id: "link6-uuid",
    user_id: "user2-uuid", 
    title: "My YouTube Channel",
    url: "https://youtube.com/@cryptoqueen",
    icon: "📺",
    position: 1,
    clicks: 1876
  },
  {
    id: "link7-uuid",
    user_id: "user2-uuid",
    title: "Pi Trading Course",
    url: "https://course.cryptoqueen.pi",
    icon: "🎓",
    position: 2,
    clicks: 987
  },
  {
    id: "link8-uuid",
    user_id: "user2-uuid",
    title: "Instagram",
    url: "https://instagram.com/cryptoqueen_pi",
    icon: "📸",
    position: 3,
    clicks: 654
  },

  // Pi Developer's links
  {
    id: "link9-uuid",
    user_id: "user3-uuid",
    title: "GitHub Profile",
    url: "https://github.com/pidev",
    icon: "💻",
    position: 0,
    clicks: 1543
  },
  {
    id: "link10-uuid",
    user_id: "user3-uuid",
    title: "Pi SDK Documentation",
    url: "https://developers.minepi.com",
    icon: "📚",
    position: 1,
    clicks: 1234
  },
  {
    id: "link11-uuid",
    user_id: "user3-uuid",
    title: "My dApp Portfolio",
    url: "https://portfolio.pidev.pi",
    icon: "🎨",
    position: 2,
    clicks: 876
  },
  {
    id: "link12-uuid",
    user_id: "user3-uuid",
    title: "Hire Me",
    url: "mailto:hire@pidev.pi",
    icon: "💼",
    position: 3,
    clicks: 432
  }
];

export const sampleSubscriptions = [
  {
    id: "sub1-uuid",
    user_id: "user1-uuid",
    plan: "starter",
    status: "active",
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  {
    id: "sub2-uuid", 
    user_id: "user2-uuid",
    plan: "pro",
    status: "active",
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: "sub3-uuid",
    user_id: "user3-uuid", 
    plan: "premium",
    status: "active", 
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
  }
];

// Function to seed database (development only)
export const seedDatabase = async () => {
  if (import.meta.env.PROD) {
    console.warn("Seeding is disabled in production");
    return;
  }

  try {
    // Note: This would require admin privileges to seed auth.users
    console.log("Seeding sample data...");
    console.log("Sample users:", sampleUsers.length);
    console.log("Sample links:", sampleLinks.length);
    console.log("Sample subscriptions:", sampleSubscriptions.length);
    
    // In a real implementation, you'd use Supabase admin API or SQL scripts
    // This is just for reference
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
