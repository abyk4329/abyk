import * as Sentry from "@sentry/nextjs";

type RequestErrorContext = {
  routerKind?: string;
  routeKind?: string;
  routeType?: string;
  route?: {
    kind?: string;
    page?: string;
    pathname?: string;
    definition?: string;
    type?: string;
    dynamic?: string | boolean;
  };
};

export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  const environment =
    process.env.VERCEL_ENV || process.env.NODE_ENV || "development";

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const tracesSampleRate = Number(
      process.env.SENTRY_TRACES_SAMPLE_RATE ??
        (environment === "production" ? "0.1" : "1.0")
    );
    const profilesSampleRate = Number(
      process.env.SENTRY_PROFILES_SAMPLE_RATE ??
        (environment === "production" ? "0.1" : "1.0")
    );

    Sentry.init({
      dsn,
      enabled: Boolean(dsn),
      environment,
      tracesSampleRate: Number.isFinite(tracesSampleRate)
        ? tracesSampleRate
        : 0.1,
      profilesSampleRate: Number.isFinite(profilesSampleRate)
        ? profilesSampleRate
        : 0.1,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const tracesSampleRate = Number(
      process.env.SENTRY_TRACES_SAMPLE_RATE ??
        (environment === "production" ? "0.1" : "1.0")
    );

    Sentry.init({
      dsn,
      enabled: Boolean(dsn),
      environment,
      tracesSampleRate: Number.isFinite(tracesSampleRate)
        ? tracesSampleRate
        : 0.1,
    });
  }
}

export function onRequestError(
  error: unknown,
  request: Request,
  context: RequestErrorContext = {}
) {
  const headers: Record<string, string> = {};
  request.headers?.forEach((value, key) => {
    headers[key] = value;
  });

  const nextUrl = (request as Request & { nextUrl?: URL }).nextUrl;
  let path = nextUrl?.pathname;

  if (!path) {
    try {
      path = new URL(request.url).pathname;
    } catch {
      path = request.url;
    }
  }

  const routerKind =
    context.routerKind ?? context.routeKind ?? context.route?.kind ?? "app";

  const routePath =
    context.route?.pathname ??
    context.route?.page ??
    context.route?.definition ??
    path;

  const routeType =
    context.routeType ??
    context.route?.type ??
    (context.route?.dynamic ? "dynamic" : "static");

  Sentry.captureRequestError(
    error,
    {
      path,
      method: request.method,
      headers,
    },
    {
      routerKind,
      routePath,
      routeType,
    }
  );
}
