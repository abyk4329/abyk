export const ENV = {
  RESEND_API_KEY: process.env.RESEND_API_KEY as string | undefined,
  EMAIL_FROM: process.env.EMAIL_FROM as string | undefined,
  SMTP_HOST: process.env.SMTP_HOST as string | undefined,
  SMTP_PORT: process.env.SMTP_PORT as string | undefined,
  EMAIL_USER: process.env.EMAIL_USER as string | undefined,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string | undefined,
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
