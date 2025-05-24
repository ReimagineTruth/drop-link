
import { Helmet } from 'react-helmet-async';

interface ProfileSEOProps {
  username: string;
  displayName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  links?: Array<{ title: string; url: string }>;
}

const ProfileSEO = ({ username, displayName, bio, avatarUrl, links }: ProfileSEOProps) => {
  const title = displayName || `@${username}`;
  const description = bio || `Check out ${username}'s links on Droplink - The Pi Network link-in-bio platform`;
  const profileUrl = `https://droplink.space/@${username}`;
  const imageUrl = avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;

  // Generate structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": title,
      "description": description,
      "image": imageUrl,
      "url": profileUrl,
      "sameAs": links?.map(link => link.url) || []
    },
    "url": profileUrl,
    "name": `${title} - Droplink Profile`,
    "description": description
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title} | Droplink</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`${username}, droplink, pi network, links, profile, creator, ${displayName || ''}`} />
      <link rel="canonical" href={profileUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={`${title} | Droplink`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={profileUrl} />
      <meta property="og:site_name" content="Droplink" />
      <meta property="profile:username" content={username} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Droplink`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={`@${username}`} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={title} />
      <meta property="article:author" content={title} />

      {/* Pi Network Specific */}
      <meta name="pi:creator" content={username} />
      <meta name="pi:profile" content={profileUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Preload important resources */}
      <link rel="preload" href={imageUrl} as="image" />
    </Helmet>
  );
};

export default ProfileSEO;
