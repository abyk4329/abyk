export const paths = {
  home: () => '/',
  thankYou: (code: string | number) => `/thank-you?code=${code}`,
  thankYouNoCode: () => '/thank-you',
  interpretations: (code: string | number) => `/interpretations?code=${code}`,
  downloadPdf: (code: string | number) => `/api/download-pdf?code=${code}`,
  termsPrivacy: () => '/terms-privacy',
  terms: () => '/terms',
  privacy: () => '/privacy',
};

export const getCodeFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return new URL(window.location.href).searchParams.get('code');
  } catch {
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
