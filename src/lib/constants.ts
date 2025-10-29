const DEFAULT_SITE_URL =
  import.meta.env.PUBLIC_SITE_URL ?? 'https://abyk.online';

export const API = {
  sendEmail: '/api/send-email',
  generatePdf: '/api/generate-pdf',
  health: '/api/health',
} as const;

export const PAYMENT = {
  checkout: '/tools/wealth-code/sales',
  thankYou: '/tools/wealth-code/thank-you',
  supportWhatsApp: 'https://wa.me/972524616121',
} as const;

export const VALIDATION = {
  code: {
    length: 4,
    pattern: /^\d{4}$/,
  },
  email: {
    maxLength: 254,
  },
} as const;

export const SITE = {
  url: DEFAULT_SITE_URL,
} as const;

export type ApiConfig = typeof API;
export type PaymentConfig = typeof PAYMENT;
export type ValidationConfig = typeof VALIDATION;
