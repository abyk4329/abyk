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
        return (code - 64) % 9 || 9; // A=1 ... I=9, J=1 ...
    }
    if (code >= 97 && code <= 122) {
        return (code - 96) % 9 || 9;
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

    const codeLabel = MASTER_NUMBERS.has(code) ? `${code}` : code === 0 ? "0" : code.toString();

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

const INTERPRETATIONS: Record<number, Interpretation> = {
    1: {
        title: "מנהיגות והתחלות חדשות",
        description:
            "קוד 1 מסמן אנרגיה של הובלה, עצמאות ועוצמה פנימית. זה הזמן להאמין בקול הייחודי שלך ולהוביל יוזמה חדשה ללא פחד.",
        mantra: "אני מקור האור וההשראה שלי.",
        strengths: ["תעוזה", "יצירתיות", "תעוזה להתחיל מחדש"],
        challenges: ["נטייה לביקורת עצמית", "קושי לבקש עזרה"],
        recommendedActions: ["הציבי יעד חדש לשבוע הקרוב", "תני לעצמך שבח על החלטה אמיצה מהעבר"],
    },
    2: {
        title: "הרמוניה וחיבור",
        description:
            "קוד 2 מדבר על אינטואיציות חדות, יחסים עמוקים ויכולת לראות את שני צידי הסיפור. את מייצרת שלום ומרחב בטוח סביבך.",
        mantra: "אני מקדמת שיתופי פעולה מתוך אהבה.",
        strengths: ["אמפתיה", "הקשבה", "גישור"],
        challenges: ["חשש מעימות", "דחיית צרכים אישיים"],
        recommendedActions: ["שיחה פתוחה עם אדם קרוב", "מדיטציה מחברת של 10 דקות"],
    },
    3: {
        title: "ביטוי ויצירתיות",
        description:
            "קוד 3 מסמל שמחה, ביטוי עצמי ולא פעם גם קריאה לעבודה עם מילים, תנועה או אמנות. זה הזמן להאיר דרך המשחק.",
        mantra: "הקול שלי ראוי להישמע.",
        strengths: ["תקשורת", "אופטימיות", "חוש הומור"],
        challenges: ["פיזור אנרגטי", "רגישות לביקורת"],
        recommendedActions: ["כתיבת דף בוקר", "שירה או תנועה חופשית 5 דקות"],
    },
    4: {
        title: "יציבות ובנייה",
        description:
            "קוד 4 מביא איתו יסודיות, סדר ומחויבות לתהליך. הוא מזכיר שהחלום שלך זקוק למבנה, משמעת וחזרתיות אוהבת.",
        mantra: "אני יוצרת בסיס בטוח להגשמה ארוכת טווח.",
        strengths: ["חריצות", "אחראיות", "חשיבת עומק"],
        challenges: ["קושי לשחרר", "צורך בשליטה"],
        recommendedActions: ["יצירת תוכנית פעולה שבועית", "פינוי מרחב פיזי לעבודה"],
    },
    5: {
        title: "חופש ותנועה",
        description:
            "קוד 5 מחבר לשינוי, אקספלורציה ולחוש ההרפתקה. נשמה סקרנית שקוראת לך לנסות, לנסוע, ללמוד ולהעז.",
        mantra: "אני טסה קדימה עם כנפי החופש שלי.",
        strengths: ["גמישות", "למידה מהירה", "כריזמה"],
        challenges: ["חוסר שגרה", "שעמום מהיר"],
        recommendedActions: ["טיול קצר מחוץ לשגרה", "הצטרפות ללימוד חדש"],
    },
    6: {
        title: "אהבה ושירות",
        description:
            "קוד 6 נושא אנרגיה של בית, קהילה ולב פתוח. רוח של ריפוי וגשר בין אנשים, עם כישרון לטפל ולחבק.",
        mantra: "אני מרפאה דרך אהבה יומיומית.",
        strengths: ["חמלה", "אחריות", "חוש אסתטי"],
        challenges: ["העמסה רגשית", "קושי להציב גבולות"],
        recommendedActions: ["כתיבת מכתב תודה", "יצירת מרחב ביתי נעים"],
    },
    7: {
        title: "חכמה ואינטואיציה עמוקה",
        description:
            "קוד 7 מביא חקר פנימי, רוחניות גבוהה ויכולת לראות אל מעבר לוויזואל. זהו מסע להתבוננות עמוקה ולשילוב ידע עתיק.",
        mantra: "התשובות נמצאות בתוכי.",
        strengths: ["למידה מעמיקה", "אינטואיציה", "ראיית עומק"],
        challenges: ["בידוד", "סקפטיות או ביקורתיות יתר"],
        recommendedActions: ["יומן חלומות", "מדיטציה מודרכת"],
    },
    8: {
        title: "הגשמה ושפע חומרי",
        description:
            "קוד 8 מדבר על השפעה, עוצמה אמיתית ועבודה נכונה עם אנרגיית הכסף. הוא מזמין אותך לנהל וליצור מערכות סביב שפע.",
        mantra: "אני בוחרת להנהיג מתוך נדיבות וחכמה.",
        strengths: ["אסטרטגיה", "כושר ניהול", "עמידה מול אתגרים"],
        challenges: ["לחץ", "חשש מכישלון"],
        recommendedActions: ["קביעת יעדי הכנסה", "חיזוק תודעת שפע ביומן תודה"],
    },
    9: {
        title: "חזון אוניברסלי וריפוי",
        description:
            "קוד 9 מסמל נשמה ותיקה עם צורך לחלוק ידע, לרפא ולהוביל שינוי קולקטיבי. הקול שלך נועד לגעת בלבבות רבים.",
        mantra: "אני הופכת את החזון שלי למציאות מיטיבה.",
        strengths: ["אלטרואיזם", "חמלה גלובלית", "יצירתיות רוחנית"],
        challenges: ["קושי לשחרר עבר", "עייפות רגשית"],
        recommendedActions: ["התנדבות", "פרויקט יצירה למען הקהילה"],
    },
};

export function getInterpretation(code: number): Interpretation | undefined {
    return INTERPRETATIONS[code];
}

export function getAllInterpretations(): Array<Interpretation & { code: number }> {
    return Object.entries(INTERPRETATIONS).map(([code, data]) => ({
        code: Number(code),
        ...data,
    }));
}

export function formatCodeLabel(code: number): string {
    if (MASTER_NUMBERS.has(code)) {
        return `${code}`;
    }
    return code.toString();
}
