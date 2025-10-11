/**
 * Routes - ניהול נתיבים מרכזי
 */

export const routes = {
    // Main pages
    home: "/",
    calculator: "/calculator",
    result: "/result",
    interpretations: "/interpretations",
    sales: "/sales",
    thankYou: "/thank-you",

    // Legal
    terms: "/terms",
    privacy: "/privacy",

    // Design showcase
    design: "/design",

    // API
    api: {
        generatePdf: "/api/generate-pdf",
        sendEmail: "/api/send-email",
        growWebhook: "/api/webhooks/grow",
    },
} as const;

/**
 * בניית URL מלא עם query parameters
 */
export function buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined>
): string {
    if (!params) return path;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `${path}?${queryString}` : path;
}

/**
 * ניווט לתוצאות עם קוד
 */
export function getResultUrl(wealthCode: string): string {
    return buildUrl(routes.result, { code: wealthCode });
}

/**
 * ניווט לפירושים עם קוד
 */
export function getInterpretationsUrl(wealthCode?: string): string {
    return wealthCode
        ? buildUrl(routes.interpretations, { code: wealthCode })
        : routes.interpretations;
}

/**
 * בדיקה אם נתיב הוא דף פעיל
 */
export function isActivePath(currentPath: string, targetPath: string): boolean {
    if (targetPath === routes.home) {
        return currentPath === routes.home;
    }
    return currentPath.startsWith(targetPath);
}
