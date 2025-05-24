
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.26.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    const pathname = url.searchParams.get('pathname');

    if (!pathname) {
      return new Response(
        JSON.stringify({ error: 'pathname parameter is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('PiNet Meta Request:', { pathname });

    let username: string | null = null;

    // Extract username from pathname (e.g., /@username)
    if (pathname.startsWith('/@')) {
      username = pathname.slice(2);
    } else if (pathname.startsWith('/')) {
      username = pathname.slice(1);
    }

    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Invalid pathname format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Fetch user profile and metadata
    const { data: profile, error: profileError } = await supabaseClient
      .from('user_profiles')
      .select(`
        id,
        username,
        display_name,
        bio,
        avatar_url,
        pi_domain,
        custom_domain,
        user_metadata (
          title,
          description,
          image_url,
          og_title,
          og_description,
          og_image,
          twitter_title,
          twitter_description,
          twitter_image
        )
      `)
      .eq('username', username)
      .maybeSingle();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch profile' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    if (!profile) {
      return new Response(
        JSON.stringify({ error: 'Profile not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    const metadata = profile.user_metadata?.[0];
    
    // Generate default values
    const defaultTitle = metadata?.title || profile.display_name || `@${profile.username}`;
    const defaultDescription = metadata?.description || profile.bio || `Check out ${profile.username}'s links on Droplink`;
    const defaultImage = metadata?.image_url || profile.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${profile.username}`;
    
    // Determine the canonical URL - prefer .pi domain if available
    let canonicalUrl = `https://droplink.space/@${profile.username}`;
    if (profile.custom_domain) {
      canonicalUrl = `https://${profile.custom_domain}`;
    } else if (profile.pi_domain) {
      canonicalUrl = `https://${profile.pi_domain}.pi`;
    }

    // Build metadata response
    const metaResponse = {
      title: defaultTitle,
      description: defaultDescription,
      image: defaultImage,
      url: canonicalUrl,
      type: 'profile',
      site_name: 'Droplink',
      
      // Open Graph
      og: {
        title: metadata?.og_title || defaultTitle,
        description: metadata?.og_description || defaultDescription,
        image: metadata?.og_image || defaultImage,
        url: canonicalUrl,
        type: 'profile',
        site_name: 'Droplink',
        profile: {
          username: profile.username,
          first_name: profile.display_name?.split(' ')[0] || '',
          last_name: profile.display_name?.split(' ').slice(1).join(' ') || ''
        }
      },
      
      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title: metadata?.twitter_title || defaultTitle,
        description: metadata?.twitter_description || defaultDescription,
        image: metadata?.twitter_image || defaultImage,
        creator: `@${profile.username}`,
        site: '@droplink'
      },
      
      // Additional metadata
      profile: {
        username: profile.username,
        display_name: profile.display_name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        pi_domain: profile.pi_domain,
        custom_domain: profile.custom_domain
      }
    };

    console.log('Generated metadata:', metaResponse);

    return new Response(
      JSON.stringify(metaResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
        } 
      }
    );

  } catch (error) {
    console.error('PiNet Meta Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
