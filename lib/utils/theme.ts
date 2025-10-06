/**
 * Theme utilities for updating runtime status bar colors when navigating between pages.
 */

function normalizeHexColor(hex: string): string {
    const value = hex.trim();
    const withoutHash = value.startsWith("#") ? value.slice(1) : value;

    // Validate hex characters
    if (!/^[0-9A-Fa-f]+$/.test(withoutHash)) {
        throw new Error(`Invalid hex color: ${hex}`);
    }

    // Validate length
    if (withoutHash.length !== 3 && withoutHash.length !== 6) {
        throw new Error(`Invalid hex color length: ${hex}`);
    }

    if (value.startsWith("#")) {
        return value.length === 4
            ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
            : value.toUpperCase();
    }

    const expanded = value.length === 3
        ? `${withoutHash[0]}${withoutHash[0]}${withoutHash[1]}${withoutHash[1]}${withoutHash[2]}${withoutHash[2]}`
        : withoutHash;

    return `#${expanded.toUpperCase()}`;
}

function lightenHexChannel(channel: number, amount: number): number {
    return Math.round(channel + (255 - channel) * amount);
}

function deriveCompanionColor(hex: string, lightenAmount = 0.08): string {
    const normalized = normalizeHexColor(hex).slice(1);
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);

    const rLight = lightenHexChannel(r, lightenAmount);
    const gLight = lightenHexChannel(g, lightenAmount);
    const bLight = lightenHexChannel(b, lightenAmount);

    return `#${rLight.toString(16).padStart(2, "0")}${gLight
        .toString(16)
        .padStart(2, "0")}${bLight.toString(16).padStart(2, "0")}`.toUpperCase();
}

export function setThemeColor(hex: string) {
    if (typeof document === "undefined") {
        return;
    }

    const normalized = normalizeHexColor(hex);
    const companion = deriveCompanionColor(normalized);

    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute("content", normalized);
    }

    const root = document.documentElement;
    root.style.setProperty("--header-surface", normalized);
    root.style.setProperty("--header-surface-strong", companion);
}

export function setDarkThemeColor(hex: string) {
    if (typeof document === "undefined") {
        return;
    }

    const normalized = normalizeHexColor(hex);
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
    if (meta) {
        meta.setAttribute("content", normalized);
    }

    document.documentElement.style.setProperty("--status-bar-dark", normalized);
}
