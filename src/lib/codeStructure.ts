export type CodeStructure = {
  digits: number[];
  digitCounts: Record<number, number>;
  repeatedDigits: { digit: number; count: number }[];
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  // Canonical structure types used across the app
  type?: 'master' | 'repeated' | 'diverse';
};

export function computeCodeStructure(code: number | string): CodeStructure {
  const codeStr = typeof code === "number" ? code.toString() : code;
  const digits = codeStr.split("").map((d) => parseInt(d, 10));

  const digitCounts = digits.reduce<Record<number, number>>((acc, d) => {
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});

  const repeatedDigits = Object.entries(digitCounts)
    .filter(([, count]) => (count as number) > 1)
    .map(([digit, count]) => ({ digit: parseInt(digit, 10), count: count as number }));

  const distinctSize = new Set(digits).size;

  return {
    digits,
    digitCounts,
    repeatedDigits,
    allSame: distinctSize === 1,
    allDifferent: distinctSize === 4,
    hasRepeats: repeatedDigits.length > 0,
  };
}
