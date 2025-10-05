/**
 * Wealth Code Feature Constants
 * --------------------------------
 * Configuration-only values for the wealth-code module.
 * UI copy and content strings should be defined in components or a separate content file.
 */

export const WEALTH_BASE_PATH = "/wealth-code" as const;

const withWealthBase = (path: `/${string}`) => `${WEALTH_BASE_PATH}${path}` as const;

export const WEALTH_ROUTES = {
    calculator: withWealthBase("/calculator"),
    result: withWealthBase("/result"),
    sales: withWealthBase("/sales"),
    thankYou: withWealthBase("/thank-you"),
    interpretations: withWealthBase("/interpretations"),
} as const;

export type WealthRouteKey = keyof typeof WEALTH_ROUTES;

export const WEALTH_PAYMENT = {
    grow: {
        url: "https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ",
        price: 36.9,
        currency: "₪",
        priceDisplay: "₪ 36.9",
    },
} as const;

export const WEALTH_VALIDATION = {
    date: {
        minYear: 1900,
        maxYear: new Date().getFullYear(),
        minDay: 1,
        maxDay: 31,
        minMonth: 1,
        maxMonth: 12,
    },
    code: {
        length: 4,
        digitRange: [1, 9] as const,
    },
} as const;

export const WEALTH_API = {
    sendEmail: "/api/send-email",
    generatePDF: "/api/generate-pdf",
} as const;

export type WealthCodeType = "master" | "repeating" | "diverse";
