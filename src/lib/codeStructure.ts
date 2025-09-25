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
  // שמירה על שלם וחיובי בסיסי
  const safe = Number.isFinite(raw) ? Math.max(0, Math.trunc(raw)) : 0;

  // פירוק לספרות בלי padStart (אין אפסים מובילים)
  const digits = safe.toString().split('').map((ch) => parseInt(ch, 10));

  // ולידציה: אין ספרה 0 במערכת
  if (digits.some((d) => d === 0)) {
    throw new Error('Invalid code: digit 0 is not allowed.');
  }

  const digitCounts = digits.reduce<Record<number, number>>((acc, d) => {
    acc[d] = (acc[d] ?? 0) + 1;
    return acc;
  }, {});

  const uniqueAsc = Array.from(new Set(digits)).sort((a, b) => a - b);
  const repeatedDigits = uniqueAsc
    .filter((digit) => digitCounts[digit] > 1)
    .map((digit) => ({ digit, count: digitCounts[digit] }));

  const allSame = uniqueAsc.length === 1;
  const allDifferent = uniqueAsc.length === digits.length; // כל הספרות שונות
  const hasRepeats = repeatedDigits.length > 0;

  const type: StructureType = allSame ? 'master' : hasRepeats ? 'repeated' : 'diverse';

  return { digits, uniqueAsc, digitCounts, repeatedDigits, allSame, allDifferent, hasRepeats, type };
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