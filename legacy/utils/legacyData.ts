export type LegacyCodeStructure = {
  digits: number[];
  digitCounts: Record<number, number>;
  repeatedDigits: { digit: number; count: number }[];
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  type: "master" | "diverse" | "focused" | "balanced";
};

export const DEFAULT_WEALTH_CODE = 1234;

export const DEFAULT_CODE_STRUCTURE: LegacyCodeStructure = {
  digits: [1, 2, 3, 4],
  digitCounts: { 1: 1, 2: 1, 3: 1, 4: 1 },
  repeatedDigits: [],
  allSame: false,
  allDifferent: true,
  hasRepeats: false,
  type: "diverse",
};

export function encodeLegacyPayload(data: unknown): string {
  try {
    return encodeURIComponent(JSON.stringify(data));
  } catch (error) {
    console.error("Failed to encode legacy payload", error);
    return "";
  }
}

export function decodeLegacyPayload<T>(value?: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as T;
  } catch (error) {
    console.error("Failed to decode legacy payload", error);
    return null;
  }
}

export function parseWealthCode(value?: string | null): number {
  if (!value) return DEFAULT_WEALTH_CODE;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : DEFAULT_WEALTH_CODE;
}
