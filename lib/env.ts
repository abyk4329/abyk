export const ENV = {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "Awakening by Ksenia",
    APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "https://abyk.online",

    RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
    EMAIL_FROM:
        process.env.EMAIL_FROM ?? "AWAKENING BY KSENIA <awakening.by.ksenia@gmail.com>",

    SMTP_HOST: process.env.SMTP_HOST ?? "",
    SMTP_PORT: +(process.env.SMTP_PORT ?? 465),
    EMAIL_USER: process.env.EMAIL_USER ?? "",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ?? "",
} as const;

export function requireEnv<K extends keyof typeof ENV>(key: K): (typeof ENV)[K] {
    const value = ENV[key];
    if (!value) {
        throw new Error(`Missing env var: ${key}`);
    }
    return value;
}

export const publicEnv = {
    appName: ENV.APP_NAME,
    appUrl: ENV.APP_URL,
} as const;
