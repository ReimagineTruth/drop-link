
export default {
  // Application configuration
  name: 'Droplink',
  slug: 'droplink',
  version: '1.0.0',
  
  // Security configuration
  security: {
    enforceHttps: true,
    enableCors: true,
    allowedOrigins: [
      'https://droplink.vercel.app',
      'https://droplink.lovable.app',
      'https://pinet.com',
      'https://minepi.com'
    ],
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://sdk.minepi.com; connect-src 'self' https://api.minepi.com https://api.sandbox.minepi.com"
    }
  },
  
  // Pi Network configuration
  piNetwork: {
    sdkVersion: '2.0',
    sandbox: process.env.NODE_ENV !== 'production',
    requiredScopes: ['username', 'payments', 'wallet_address'],
    apiEndpoints: {
      production: 'https://api.minepi.com/v2',
      sandbox: 'https://api.sandbox.minepi.com/v2'
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.NODE_ENV === 'development'
  }
};
