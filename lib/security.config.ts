/*
  Security Configuration
  ---------------------
  Centralized security headers and policies for the application.
  Applied in next.config.js for consistent security across all routes.
*/

export const security = {
  // Content Security Policy
  csp: {
    'default-src': "'self'",
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],
    'font-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https:', 'wss:'],
    'media-src': ["'self'", 'https:', 'blob:'],
    'object-src': "'none'",
    'frame-src': ["'self'", 'https:'],
    'base-uri': "'self'",
    'form-action': "'self'",
    'frame-ancestors': "'none'",
  },

  // Security headers
  headers: {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cross-Origin-Embedder-Policy': 'credentialless',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  },

  // Webhook security
  webhooks: {
    // Required header for webhook validation
    secretHeader: 'x-grow-secret',
    // Timeout for webhook processing
    timeout: 30000, // 30 seconds
  },

  // Rate limiting (can be extended with middleware)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // requests per window
  },

  // CORS configuration
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? ['https://abyk.app', 'https://www.abyk.app']
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
} as const;