
// Environment configuration — values must be provided via env vars
const requireEnv = (key: string): string => {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  if (!value) {
    console.error(`[config] Missing required environment variable: ${key}`);
    return '';
  }
  return value;
};

export const config = {
  emailjs: {
    serviceId: requireEnv('VITE_EMAILJS_SERVICE_ID'),
    templateId: requireEnv('VITE_EMAILJS_TEMPLATE_ID'),
    publicKey: requireEnv('VITE_EMAILJS_PUBLIC_KEY')
  },
  recaptcha: {
    siteKey: requireEnv('VITE_RECAPTCHA_SITE_KEY')
  },
  googleMaps: {
    apiKey: requireEnv('VITE_GOOGLE_MAPS_API_KEY')
  }
};

// Security headers configuration
export const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.emailjs.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "frame-src https://www.google.com"
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
