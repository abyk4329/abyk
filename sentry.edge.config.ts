import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const environment =
  process.env.VERCEL_ENV || process.env.NODE_ENV || "development";
const tracesSampleRate = Number(
  process.env.SENTRY_TRACES_SAMPLE_RATE ??
    (environment === "production" ? "0.1" : "1.0")
);

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  environment,
  tracesSampleRate: Number.isFinite(tracesSampleRate) ? tracesSampleRate : 0.1,
});
