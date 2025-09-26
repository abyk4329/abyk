// src/lib/codeStructure.ts
export type StructureType = 'master' | 'repeated' | 'diverse';

export type CodeStructure = {
  // הקוד בדיוק כפי שהוזן (לשימור סדר יום/חודש/שנה/סך־הכל)
  digits: number[];                     // למשל 4,4,6,1 עבור 4461
  uniqueAsc: number[];                  // ספרות ייחודיות בסדר עולה: למשל [1,4,6]
  digitCounts: Record<number, number>;  // מפה: ספרה -> מספר הופעות
  repeatedDigits: Array<{ digit: number; count: number }>; // ספרות שחוזרות עם מונה
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  type: StructureType;
};

/**
 * דרישת המערכת:
 * - אין שימוש בספרה 0.
 * - לא מוסיפים אפסים מובילים (אין padStart).
 * - הקוד המקורי נשמר כפי שהוא (digits).
 */
export function computeCodeStructure(raw: number): CodeStructure {
  // Ensure raw is a positive integer.
  const safe = Number.isFinite(raw) ? Math.max(0, Math.trunc(raw)) : 0;
  // Convert number to array of digits without any pad or leading zeros.
  let digits = safe.toString().split('').map(ch => parseInt(ch, 10));

  // Remove any zeros as the system prohibits using digit 0.
  digits = digits.filter(digit => digit !== 0);

  // Count each digit's occurrences.
  const digitCounts = digits.reduce((acc, digit) => {
    acc[digit] = (acc[digit] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Get unique digits sorted in ascending order.
  const uniqueAsc = Array.from(new Set(digits)).sort((a, b) => a - b);

  // Build list of repeated digits.
  const repeatedDigits = uniqueAsc
    .filter(digit => digitCounts[digit] > 1)
    .map(digit => ({ digit, count: digitCounts[digit] }));

  const allSame = uniqueAsc.length === 1;
  const allDifferent = uniqueAsc.length === digits.length;

  // Determine structure type as an example.
  let type: StructureType = allSame
    ? 'master'
    : repeatedDigits.length > 0
      ? 'repeated'
      : 'diverse';

  return {
    digits,
    uniqueAsc,
    digitCounts,
    repeatedDigits,
    allSame,
    allDifferent,
    hasRepeats: repeatedDigits.length > 0,
    type
  };
}

// לתצוגה/מיילים: משתמשים רק במה שצריך
export type ReportableStructure = Pick<
  CodeStructure,
  'digits' | 'uniqueAsc' | 'allSame' | 'allDifferent' | 'hasRepeats' | 'type'
>;

export function toReportableStructure(s: CodeStructure): ReportableStructure {
  const { digits, uniqueAsc, allSame, allDifferent, hasRepeats, type } = s;
  return { digits, uniqueAsc, allSame, allDifferent, hasRepeats, type };
}