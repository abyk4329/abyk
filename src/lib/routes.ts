export const routes = {
  home: '/',
  calculator: '/tools/wealth-code/calculator',
  result: '/tools/wealth-code/result',
  interpretations: '/tools/wealth-code/interpretations',
  thankYou: '/tools/wealth-code/thank-you',
  sales: '/tools/wealth-code/sales',
} as const;

type Primitive = string | number | boolean;

type BuildUrlParams = Record<string, Primitive | null | undefined>;

export function buildUrl(path: string, query?: BuildUrlParams): string {
  if (!query || Object.keys(query).length === 0) {
    return path;
  }

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
    searchParams.set(key, String(value));
  }

  if (searchParams.size === 0) {
    return path;
  }

  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}${searchParams.toString()}`;
}

export type RoutesConfig = typeof routes;
