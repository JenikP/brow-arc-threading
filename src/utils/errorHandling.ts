
export interface SecurityError {
  type: 'RATE_LIMIT' | 'VALIDATION' | 'NETWORK' | 'UNKNOWN';
  message: string;
  timestamp: number;
}

export const createSecurityError = (type: SecurityError['type'], message: string): SecurityError => ({
  type,
  message,
  timestamp: Date.now()
});

export const logSecurityEvent = (error: SecurityError): void => {
  // In a production environment, this would send to a security monitoring service
  console.warn('Security Event:', {
    type: error.type,
    message: error.message,
    timestamp: new Date(error.timestamp).toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  });
};

export const getSafeErrorMessage = (error: unknown): string => {
  // Return generic messages to avoid information disclosure
  if (error instanceof Error) {
    // Only return safe, generic messages
    if (error.message.includes('rate limit')) {
      return 'Too many requests. Please try again later.';
    }
    if (error.message.includes('validation')) {
      return 'Please check your input and try again.';
    }
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Network error. Please check your connection and try again.';
    }
  }
  
  return 'An error occurred. Please try again later.';
};
