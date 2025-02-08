export const allowedOrigins = process.env.ALLOWED_ORIGIN || 'https://yourdomain.com';
export const rateLimit = { windowMs: 15 * 60 * 1000, max: 100 };