import rateLimit from 'express-rate-limit';

// Sandbox Mode Rate Limiter: Max 30 requests per IP per minute
export const sandboxRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error_code: "RATE_LIMIT_EXCEEDED",
    message: "Too many requests. Please try again later."
  },
  // Custom handler to return 429 status code with the clean JSON payload
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  }
});
