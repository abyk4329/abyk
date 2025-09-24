import type { CodeStructureKey } from "@/data/codeStructures";

export function detectCodeStructure(code: string): CodeStructureKey {
  const digits = code.split("");
  const allSame = digits.every((d) => d === digits[0]);
  if (allSame) return "master";

  const counts: Record<string, number> = {};
  digits.forEach((d) => (counts[d] = (counts[d] ?? 0) + 1));
  const hasRepeat = Object.values(counts).some((n) => n >= 2);
  return hasRepeat ? "repeated" : "diverse";
}

export function countDigits(code: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const d of code) counts[d] = (counts[d] ?? 0) + 1;
  return counts;
}
