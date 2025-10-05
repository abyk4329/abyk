export const ENV = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
} as const;

export function requireEnv<K extends keyof typeof ENV>(key: K): string {
    const value = ENV[key];
    if (!value) {
        throw new Error(`Missing env var: ${key}`);
    }
    return value;
}

export const publicEnv = {
    appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Awakening by Ksenia",
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://abyk.online",
} as const;
