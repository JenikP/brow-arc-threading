
interface RateLimitData {
  count: number;
  resetTime: number;
}

const RATE_LIMIT_KEY = 'contact_form_submissions';
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export const checkRateLimit = (): { allowed: boolean; resetIn?: number } => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    
    if (!stored) {
      const data: RateLimitData = {
        count: 1,
        resetTime: now + WINDOW_MS
      };
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
      return { allowed: true };
    }
    
    const data: RateLimitData = JSON.parse(stored);
    
    // Reset if window has passed
    if (now > data.resetTime) {
      const newData: RateLimitData = {
        count: 1,
        resetTime: now + WINDOW_MS
      };
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(newData));
      return { allowed: true };
    }
    
    // Check if limit exceeded
    if (data.count >= MAX_SUBMISSIONS) {
      const resetIn = Math.ceil((data.resetTime - now) / 60000); // minutes
      return { allowed: false, resetIn };
    }
    
    // Increment count
    data.count += 1;
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
    return { allowed: true };
    
  } catch (error) {
    console.error('Rate limiting error:', error);
    return { allowed: true }; // Fail open for better UX
  }
};
