
# Droplink Deployment Guide

This guide covers deploying Droplink, a Pi Network-powered link-in-bio platform.

## Architecture Overview

- **Frontend**: React/Vite (Vercel/Netlify)
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Storage**: Supabase Storage (Images, Files)
- **Payments**: Pi Network SDK
- **Email**: Resend (via Edge Functions)

## Prerequisites

1. **Supabase Account** - [supabase.com](https://supabase.com)
2. **Vercel Account** - [vercel.com](https://vercel.com) (for frontend)
3. **Pi Network Developer Account** - [developers.minepi.com](https://developers.minepi.com)
4. **Resend Account** - [resend.com](https://resend.com) (for emails)
5. **Domain** (optional) - for custom .pi domains

## Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PI_API_KEY=your_pi_api_key
VITE_SITE_URL=https://yourdomain.com
```

### Supabase Edge Functions Secrets
```env
RESEND_API_KEY=your_resend_api_key
PI_API_KEY=your_pi_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Database Setup

### 1. Create Supabase Project
```bash
# Create new project at supabase.com
# Note your project URL and keys
```

### 2. Run Database Migrations
```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  theme TEXT DEFAULT 'default',
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#10B981',
  pi_domain TEXT UNIQUE,
  custom_domain TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create links table
CREATE TABLE public.links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'starter', 'pro', 'premium')),
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'sent'
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view public profiles" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own links" ON public.links
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view active links" ON public.links
  FOR SELECT USING (is_active = true);
```

### 3. Create Storage Buckets
```sql
-- Create avatars bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);

-- Create bucket policy
CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Frontend Deployment (Vercel)

### 1. Connect GitHub Repository
```bash
# Push your code to GitHub
git add .
git commit -m "Initial deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Add Environment Variables
In Vercel dashboard, add all frontend environment variables.

### 4. Configure Custom Domain (Optional)
1. Add your domain in Vercel
2. Update DNS records as instructed
3. Enable HTTPS

## Edge Functions Deployment

Edge functions deploy automatically with Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-id

# Deploy functions
supabase functions deploy
```

## Pi Network Integration

### 1. Register Your App
1. Go to [developers.minepi.com](https://developers.minepi.com)
2. Create new app
3. Set callback URLs:
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`

### 2. Configure Pi SDK
```typescript
// In your app
Pi.init({
  version: "2.0",
  sandbox: process.env.NODE_ENV !== 'production'
});
```

## Email Setup (Resend)

### 1. Create Resend Account
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Create API key

### 2. Add to Supabase Secrets
```bash
supabase secrets set RESEND_API_KEY=your_api_key
```

## Custom .pi Domains

### 1. Domain Configuration
```nginx
# Nginx configuration for .pi domains
server {
  listen 80;
  server_name *.pi;
  
  location / {
    proxy_pass http://your-frontend-url;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

### 2. DNS Setup
```dns
# Add CNAME records for subdomains
*.pi CNAME your-frontend-domain.com
```

## Monitoring & Analytics

### 1. Supabase Monitoring
- Database performance
- API usage
- Storage usage

### 2. Vercel Analytics
- Performance metrics
- User behavior
- Error tracking

### 3. Custom Analytics
```sql
-- Create analytics table
CREATE TABLE public.analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Checklist

- [ ] Environment variables secured
- [ ] RLS policies enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] SSL/HTTPS enabled
- [ ] API keys rotated regularly
- [ ] Database backups enabled

## Performance Optimization

### 1. Frontend
- Image optimization
- Code splitting
- CDN usage
- Caching strategies

### 2. Backend
- Database indexing
- Query optimization
- Connection pooling
- Edge function caching

## Troubleshooting

### Common Issues

1. **Pi SDK not loading**
   - Check Pi Browser environment
   - Verify API keys
   - Check sandbox mode

2. **Database connection errors**
   - Verify Supabase URL
   - Check RLS policies
   - Validate API keys

3. **Email delivery issues**
   - Verify Resend domain
   - Check API key
   - Review email templates

### Debugging Tools

```bash
# Check edge function logs
supabase functions logs send-notification

# Monitor database
supabase db logs

# Test email functionality
curl -X POST 'your-edge-function-url' \
  -H 'Content-Type: application/json' \
  -d '{"type":"welcome","email":"test@example.com","data":{}}'
```

## Scaling Considerations

### Database
- Monitor connection pool
- Add read replicas if needed
- Implement database migrations

### Storage
- Monitor storage usage
- Implement CDN for images
- Set up automated backups

### Compute
- Monitor edge function usage
- Implement caching strategies
- Scale based on traffic patterns

## Support

For deployment issues:
1. Check Supabase documentation
2. Review Vercel deployment logs
3. Monitor Pi Network developer resources
4. Check GitHub Issues

---

**Next Steps**: After deployment, test all functionality thoroughly and monitor performance metrics.
