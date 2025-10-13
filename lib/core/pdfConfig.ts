import path from "path";
import fs from "fs";
import { Font } from "@react-pdf/renderer";

// Layout & color system for all PDFs
export const PDF_LAYOUT = {
    pagePadding: 40,
    rtl: true,
} as const;

export const PDF_COLORS = {
    bg: "#FDFCFB",
    text: "#473B31",
    accent: "#87674F",
    accentLight: "#9f8572",
    divider: "#B5A393",
    surface: "#FFFFFF",
    surfaceAlt: "#F5F1EE",
} as const;

export interface HebrewFontOptions {
    regular?: string; // path relative to public/fonts
    bold?: string;
    family?: string;
}

// Attempts to register Assistant Hebrew font with multiple weights; safe to call multiple times
let fontsRegistered = false;
export function registerHebrewFonts(opts: HebrewFontOptions = {}) {
    if (fontsRegistered) return;

    const fontsDir = path.join(process.cwd(), "public", "fonts", "Assistant ", "static");

    // Register Assistant font family with all available weights (200-800)
    const weights = [
        { file: "Assistant-ExtraLight.ttf", weight: 200 },
        { file: "Assistant-Light.ttf", weight: 300 },
        { file: "Assistant-Regular.ttf", weight: 400 },
        { file: "Assistant-Medium.ttf", weight: 500 },
        { file: "Assistant-SemiBold.ttf", weight: 600 },
        { file: "Assistant-Bold.ttf", weight: 700 },
        { file: "Assistant-ExtraBold.ttf", weight: 800 },
    ];

    const fontConfig: any = { family: "Assistant", fonts: [] };
    let foundAny = false;

    for (const w of weights) {
        const fontPath = path.join(fontsDir, w.file);
        if (fs.existsSync(fontPath)) {
            fontConfig.fonts.push({ src: fontPath, fontWeight: w.weight });
            foundAny = true;
        }
    }

    if (foundAny) {
        try {
            Font.register(fontConfig);
            fontsRegistered = true;
            console.log(`[pdfConfig] Registered Assistant font family with ${fontConfig.fonts.length} weights (200-800)`);
            return;
        } catch (e) {
            console.error("[pdfConfig] Failed to register Assistant fonts:", e);
        }
    }

    console.warn("[pdfConfig] Assistant fonts not found in public/fonts/Assistant /. Hebrew text may not render properly.");
}
