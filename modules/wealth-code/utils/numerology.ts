/**
 * Numerology Utilities - כלי עזר לחישוב קוד השפע
 */

export type NumerologyInput = {
    fullName?: string;
    birthDate?: string; // YYYY-MM-DD
};

export type NumerologyCalculation = {
    code: number;
    codeLabel: string;
    nameValue: number;
    birthValue: number;
    reducedName: number;
    reducedBirth: number;
    total: number;
    breakdown: string[];
};

export type Interpretation = {
    title: string;
    description: string;
    mantra: string;
    strengths: string[];
    challenges: string[];
    recommendedActions: string[];
};

const MASTER_NUMBERS = new Set([11, 22, 33]);

const hebrewLetterMap: Record<string, number> = {
    א: 1,
    ב: 2,
    ג: 3,
    ד: 4,
    ה: 5,
    ו: 6,
    ז: 7,
    ח: 8,
    ט: 9,
    י: 1,
    כ: 2,
    ך: 2,
    ל: 3,
    מ: 4,
    ם: 4,
    נ: 5,
    ן: 5,
    ס: 6,
    ע: 7,
    פ: 8,
    ף: 8,
    צ: 9,
    ץ: 9,
    ק: 1,
    ר: 2,
    ש: 3,
    ת: 4,
};

function getEnglishLetterValue(char: string): number {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
        return ((code - 64) % 9) || 9; // A=1 ... I=9, J=1 ...
    }
    if (code >= 97 && code <= 122) {
        return ((code - 96) % 9) || 9;
    }
    return 0;
}

function getLetterValue(char: string): number {
    if (hebrewLetterMap[char]) {
        return hebrewLetterMap[char];
    }
    return getEnglishLetterValue(char);
}

function sumDigits(value: number): number {
    return value
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number(digit), 0);
}

function reduceNumber(value: number): number {
    let current = Math.abs(value);
    if (current === 0) return 0;

    while (current > 9 && !MASTER_NUMBERS.has(current)) {
        current = sumDigits(current);
    }

    return current;
}

function sanitizeName(name?: string): string {
    if (!name) return "";
    return name
        .replace(/[^A-Za-zא-ת\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function sanitizeBirthDate(birthDate?: string): string {
    if (!birthDate) return "";
    const clean = birthDate.trim();
    // Accept YYYY-MM-DD or DD/MM/YYYY
    if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
        return clean;
    }
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(clean)) {
        const [d, m, y] = clean.split("/");
        return `${y}-${m}-${d}`;
    }
    return "";
}

function calculateNameValue(fullName?: string): { raw: number; reduced: number } {
    const sanitized = sanitizeName(fullName);
    if (!sanitized) {
        return { raw: 0, reduced: 0 };
    }

    const raw = [...sanitized].reduce((sum, char) => sum + getLetterValue(char), 0);
    return { raw, reduced: reduceNumber(raw) };
}

function calculateBirthValue(birthDate?: string): { raw: number; reduced: number } {
    const sanitized = sanitizeBirthDate(birthDate);
    if (!sanitized) {
        return { raw: 0, reduced: 0 };
    }

    const digits = sanitized.replace(/[^0-9]/g, "");
    const raw = digits.split("").reduce((sum, digit) => sum + Number(digit), 0);
    return { raw, reduced: reduceNumber(raw) };
}

export function calculateWealthCode(input: NumerologyInput): NumerologyCalculation {
    const name = calculateNameValue(input.fullName);
    const birth = calculateBirthValue(input.birthDate);
    const total = name.reduced + birth.reduced;
    const code = reduceNumber(total);

    const codeLabel = formatCodeLabel(code);

    const breakdown: string[] = [];
    if (input.fullName) {
        breakdown.push(`ערך השם (${input.fullName}): ${name.reduced} (סכום גולמי ${name.raw})`);
    }
    if (input.birthDate) {
        breakdown.push(`ערך תאריך הלידה (${input.birthDate}): ${birth.reduced} (סכום גולמי ${birth.raw})`);
    }
    breakdown.push(`סכום סופי: ${name.reduced} + ${birth.reduced} = ${total}`);

    return {
        code,
        codeLabel,
        nameValue: name.raw,
        birthValue: birth.raw,
        reducedName: name.reduced,
        reducedBirth: birth.reduced,
        total,
        breakdown,
    };
}

/**
 * NOTE:
 * Interpretations content has been decoupled from core numerology logic.
 * Provide your official texts in: modules/wealth-code/data/digitInterpretations.ts
 * and import them directly where needed.
 *
 * Backwards-compatibility stubs below return no data to avoid build breaks
 * until imports are updated across the app.
 */
export function getInterpretation(_code: number): Interpretation | undefined {
    return undefined;
}

export function getAllInterpretations(): Array<Interpretation & { code: number }> {
    return [];
}

export function formatCodeLabel(code: number): string {
    if (MASTER_NUMBERS.has(code)) {
        return `${code}`;
    }
    return code.toString();
}
