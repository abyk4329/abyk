import { codeStructures, codeApplication } from "@/data/codeStructures";
import { wealthCodeTexts } from "@/data/wealthCodeTexts";
import { detectCodeStructure } from "@/lib/detectCodeStructure";

type DigitKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitBlock = {
    digit: number;
    title: string;
    essence: string;
    gifts: string[];
    challenges: string[];
    imbalanceSigns: string[];
    growthAreas: string[];
    careerPaths: string[];
    dailyPractice: string;
    bottomLine: string;
};

type RepeatedDigit = { digit: number; count: number };
type CodeStructureSummary = {
    digits: number[];
    repeatedDigits: RepeatedDigit[];
    allSame: boolean;
    allDifferent: boolean;
    hasRepeats: boolean;
    type: "master" | "repeated" | "diverse";
};

type EmailData = {
    wealthCode: number;
    viewUrl: string;
    downloadUrl: string;
    codeStructure?: CodeStructureSummary;
};

export function generateEmailHTML(data: EmailData): string {
    const codeStr = String(data.wealthCode);
    const key = data.codeStructure?.type ?? detectCodeStructure(codeStr);
    const structure = codeStructures[key] ?? { title: "", description: "" };
    const uniqueDigits = Array.from(new Set(codeStr.split("").map(Number)));
    const wct = wealthCodeTexts as unknown as Record<DigitKey, DigitBlock>;

    const digitsBlocks = uniqueDigits
        .map((d) => {
            const b = wct[d as DigitKey];
            if (!b) return "";
            return `
            <section style="margin:24px 0; text-align:center;">
                <h3 style="margin:0 0 8px 0;font-weight:600;">${b.digit}&nbsp;|&nbsp;${b.title}</h3>
                <h4 style="margin:8px 0 4px 0;font-weight:600;">מהות הספרה</h4>
                <p style="white-space:pre-line;margin:0;">${b.essence}</p>

                <h4 style="margin:16px 0 4px 0;font-weight:600;">מתנות מרכזיות</h4>
                <ul style="margin:0; padding:0; direction:rtl; list-style-position:inside; text-align:right; display:inline-block;">${b.gifts
                    .map((li) => `<li>${li}</li>`)
                    .join("")}</ul>

                <h4 style="margin:16px 0 4px 0;font-weight:600;">חסימות ואתגרים עיקריים</h4>
                <ul style="margin:0; padding:0; direction:rtl; list-style-position:inside; text-align:right; display:inline-block;">${b.challenges
                    .map((li) => `<li>${li}</li>`)
                    .join("")}</ul>

                <h4 style="margin:16px 0 4px 0;font-weight:600;">נורות אדומות – סימנים לחוסר איזון</h4>
                <ul style="margin:0; padding:0; direction:rtl; list-style-position:inside; text-align:right; display:inline-block;">${b.imbalanceSigns
                    .map((li) => `<li>${li}</li>`)
                    .join("")}</ul>

                <h4 style="margin:16px 0 4px 0;font-weight:600;">מוקדי צמיחה והתפתחות</h4>
                <ul style="margin:0; padding:0; direction:rtl; list-style-position:inside; text-align:right; display:inline-block;">${b.growthAreas
                    .map((li) => `<li>${li}</li>`)
                    .join("")}</ul>

                <h4 style="margin:16px 0 4px 0;font-weight:600;">תחומים מתאימים לקריירה ולשליחות</h4>
                <ul style="margin:0; padding:0; direction:rtl; list-style-position:inside; text-align:right; display:inline-block;">${b.careerPaths
                    .map((li) => `<li>${li}</li>`)
                    .join("")}</ul>

                <h4 style="margin:16px 0 4px 0;font-weight:600;">דוגמה יומית לתרגול</h4>
                <p style="white-space:pre-line;margin:0;">${b.dailyPractice}</p>

                <h4 style="margin:16px 0 4px 0;font-weight:600;">בשורה התחתונה</h4>
                <p style="white-space:pre-line;margin:0;">${b.bottomLine}</p>
            </section>`;
        })
        .join("");

    return `
    <!doctype html>
    <html lang="he" dir="rtl">
    <body style="margin:0;padding:0;background:#faf6f2;color:#473B31;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f2;">
            <tr><td align="center">
                <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #eadfd6;border-radius:12px;margin:24px;">
                    <tr><td style="padding:24px; text-align:center;">
                        <h1 style="margin:0 0 8px 0;font-size:22px;font-weight:600;">שלום,</h1>
                        <p style="margin:0 0 16px 0;">הנה הפירוש המלא לקוד האישי שלך – <strong>${codeStr}</strong>.</p>

                        <h2 style="margin:24px 0 8px 0;font-size:18px;font-weight:700;">מבנה הקוד</h2>
                        <h3 style="margin:0 0 8px 0;font-weight:600;">${structure.title}</h3>
                        <p style="white-space:pre-line;margin:0 0 16px 0;">${structure.description}</p>

                        <h2 style="margin:24px 0 8px 0;font-size:18px;font-weight:700;">המספרים</h2>
                        ${digitsBlocks}

                        <h2 style="margin:24px 0 8px 0;font-size:18px;font-weight:700;">יישום הקוד בחיי היומיום</h2>
                        <p style="white-space:pre-line;margin:0;">${codeApplication.description}</p>

                        <div style="margin:24px 0 0 0;">
                            <a href="${data.viewUrl}" style="display:inline-block;padding:12px 16px;background:#87674F;color:#fff;text-decoration:none;border-radius:8px;">צפייה בעמוד הפירושים</a>
                            <div style="height:8px;"></div>
                            <a href="${data.downloadUrl}" style="display:inline-block;padding:12px 16px;background:#C9A28F;color:#fff;text-decoration:none;border-radius:8px;">הורדת PDF</a>
                        </div>
                    </td></tr>
                </table>
            </td></tr>
        </table>
    </body>
    </html>`;
}

// Function to generate email subject
export function generateEmailSubject(code: string | number): string {
    return `הפירוש המלא לקוד האישי שלך – ${code}`;
}

// Function to generate plain text version of email
export function generateEmailText(data: EmailData): string {
    const codeStr = String(data.wealthCode);
    const key = data.codeStructure?.type ?? detectCodeStructure(codeStr);
    const structure = codeStructures[key] ?? { title: "", description: "" };
    const uniqueDigits = Array.from(new Set(codeStr.split("").map(Number)));
    const wct = wealthCodeTexts as unknown as Record<DigitKey, DigitBlock>;

    const lines: string[] = [];
    lines.push("שלום,");
    lines.push(`הנה הפירוש המלא לקוד האישי שלך – ${codeStr}.`);
    lines.push("");
    lines.push(`מבנה הקוד: ${structure.title}`);
    lines.push(structure.description);
    lines.push("");

    lines.push("המספרים:");
    uniqueDigits.forEach((d) => {
        const b = wct[d as DigitKey];
        if (!b) return;
        lines.push(`- ${b.digit} | ${b.title}`);
        lines.push(`  מהות: ${b.essence}`);
    });
    lines.push("");
    lines.push("יישום הקוד בחיי היומיום:");
    lines.push(codeApplication.description);
    lines.push("");
    lines.push(`צפייה בעמוד הפירושים: ${data.viewUrl}`);
    lines.push(`הורדת PDF: ${data.downloadUrl}`);
    return lines.join("\n");
}