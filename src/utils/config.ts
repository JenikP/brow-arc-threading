
// Environment configuration with fallbacks
export const config = {
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_upmue6g',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ssjw2rx',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Lb6xJjZn1vHkJrjle'
  },
  recaptcha: {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcNy_YqAAAAAAg2_QQqh0o7qSaSazRnXuXWEF8A'
  }
};

// Security headers configuration
export const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.emailjs.com",
    "frame-src https://www.google.com"
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
