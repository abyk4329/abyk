/**
 * Barrel for library exports.
 * Notes:
 * - Keep server-only modules clearly marked (avoid importing them in client components).
 * - Grouped for readability; export surface is unchanged.
 */

export * from "./env"; // env schema & accessors (client-safe)
export * from "./constants"; // app constants (client-safe)
export * from "./routes"; // route helpers (client-safe)
export * from "./email/transport"; // SERVER-ONLY (Node/Edge): do not import in client components
export * from "./email/wealth"; // email templates/helpers (pure functions)
export * from "./utils"; // shared utilities (client-safe)
export * from "./neu-styles"; // design tokens & helpers (client-safe)
// לקבלת רכיבי ליבה (BRAND, PDF וכו') השתמשו ב-"@/lib/core" ישירות כדי למנוע כפל שמות
// export * from "./core";
