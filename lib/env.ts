/**
 * Environment Variables - קריאה בטוחה למשתני סביבה
 */

// Client-side (NEXT_PUBLIC_*)
export const env = {
    // App metadata
    appName: process.env.NEXT_PUBLIC_APP_NAME || "Awakening by Ksenia",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://abyk.online",

    // Social media
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "@awakening.by.ksenia",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972524616121",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_HANDLE || "@awakening.by.ksenia",
    tiktokPixel: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "",

    // Payment
    productPrice: process.env.NEXT_PUBLIC_PRODUCT_PRICE || "36.9 ש״ח",
    growPaymentLink: process.env.NEXT_PUBLIC_GROW_PAYMENT_LINK || "",
} as const;

// Server-side only
export const serverEnv = {
    // Email
    emailFrom: process.env.EMAIL_FROM || "",
    emailUser: process.env.EMAIL_USER || "",
    emailPassword: process.env.EMAIL_PASSWORD || "",
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: process.env.SMTP_PORT || "",
    resendApiKey: process.env.RESEND_API_KEY || "",
} as const;

/**
 * בדיקה אם משתנה סביבה מוגדר
 */
export function isDefined(value: string | undefined): value is string {
    return typeof value === "string" && value.length > 0;
}

/**
 * קבלת משתנה סביבה עם ערך ברירת מחדל
 */
export function getEnv(key: string, defaultValue = ""): string {
    return process.env[key] || defaultValue;
}
