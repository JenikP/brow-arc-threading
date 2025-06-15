
import { useEffect } from 'react';
import { securityHeaders } from '../utils/config';

interface SecurityProviderProps {
  children: React.ReactNode;
}

const SecurityProvider = ({ children }: SecurityProviderProps) => {
  useEffect(() => {
    // Apply meta security tags
    const metaTags = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
      { httpEquiv: 'X-Frame-Options', content: 'DENY' }
    ];

    metaTags.forEach(({ name, httpEquiv, content }) => {
      const existingTag = document.querySelector(
        name ? `meta[name="${name}"]` : `meta[http-equiv="${httpEquiv}"]`
      );
      
      if (!existingTag) {
        const meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (httpEquiv) meta.setAttribute('http-equiv', httpEquiv);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // Log security initialization
    console.log('Security provider initialized');
  }, []);

  return <>{children}</>;
};

export default SecurityProvider;
