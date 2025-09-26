export const paths = {
  home: () => '/',
  calculator: () => '/calculator',
  sales: (code?: number) => (code ? `/sales?code=${code}` : '/sales'),
  thankYou: (code?: number) => (code ? `/thank-you?code=${code}` : '/thank-you'),
  interpretations: (code: number) => `/interpretations?code=${code}`,
  downloadPdf: (code: number) => `/api/download-pdf?code=${encodeURIComponent(code)}`,
  termsPrivacy: () => '/terms',
};

export const getCodeFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return new URL(window.location.href).searchParams.get('code');
  } catch (error) {
    console.warn('Failed to parse code from URL', error);
    return null;
  }
};

// Guard: accepts a number or string, returns true only for 4-digit codes in [1111..9999]
export const isFourDigitCode = (value: unknown): value is number | string => {
  if (value == null) return false;
  const s = String(value).trim();
  if (!/^\d{4}$/.test(s)) return false;
  const n = Number(s);
  return Number.isFinite(n) && n >= 1111 && n <= 9999;
};
