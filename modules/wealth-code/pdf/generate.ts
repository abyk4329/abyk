// Deprecated legacy pdf-lib generator kept only to avoid breaking older imports.
// The application now uses React-PDF implementation in `WealthReport.tsx` via /api/generate-pdf.
// Do NOT add new logic here.

export async function generateWealthPdf() {
    throw new Error("generateWealthPdf is deprecated. Use /api/generate-pdf endpoint (React-PDF) instead.");
}
