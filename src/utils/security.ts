
// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const sanitizeEmail = (email: string): string => {
  // Basic email sanitization
  return email.toLowerCase().trim().replace(/[^\w@.-]/g, '');
};

export const validateMessage = (message: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeInput(message);
  
  if (sanitized.length < 10) {
    return { isValid: false, error: 'Message too short' };
  }
  
  if (sanitized.length > 1000) {
    return { isValid: false, error: 'Message too long' };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\b(eval|exec|system|shell_exec)\b/i,
    /<\s*script/i,
    /javascript\s*:/i,
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, error: 'Invalid content detected' };
    }
  }
  
  return { isValid: true };
};
