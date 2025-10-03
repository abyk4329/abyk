/**
 * Format Utils - פונקציות עזר לעיצוב טקסט, תאריכים, מספרים
 */

/**
 * עיצוב תאריך לעברית
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;

    return new Intl.DateTimeFormat("he-IL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(d);
}

/**
 * עיצוב תאריך עם שעה
 */
export function formatDateTime(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;

    return new Intl.DateTimeFormat("he-IL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(d);
}

/**
 * עיצוב מספר עם פסיקים
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat("he-IL").format(num);
}

/**
 * עיצוב מחיר (₪)
 */
export function formatPrice(amount: number, currency = "ILS"): string {
    return new Intl.NumberFormat("he-IL", {
        style: "currency",
        currency,
    }).format(amount);
}

/**
 * חיתוך טקסט עם ...
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
}

/**
 * הפיכת string ל-slug (URL friendly)
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * בדיקה אם טקסט הוא RTL (עברית/ערבית)
 */
export function isRTL(text: string): boolean {
    const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/;
    return rtlChars.test(text);
}

/**
 * ניקוי רווחים מיותרים
 */
export function cleanWhitespace(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

/**
 * המרת שם מלא לאתחול (ק.ח.)
 */
export function getInitials(fullName: string): string {
    return fullName
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/**
 * בדיקת תקינות אימייל
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * בדיקת תקינות מספר טלפון ישראלי
 */
export function isValidIsraeliPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, "");
    return /^(972|0)?5\d{8}$/.test(cleanPhone);
}

/**
 * עיצוב מספר טלפון
 */
export function formatPhone(phone: string): string {
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.startsWith("972")) {
        return `+${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 5)}-${cleanPhone.slice(5, 8)}-${cleanPhone.slice(8)}`;
    }

    if (cleanPhone.startsWith("0")) {
        return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
    }

    return phone;
}

/**
 * המתנה (delay)
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * גנרציה של ID ייחודי
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}
