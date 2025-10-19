type NeuShadowVariant = "elevated" | "inset";

export type NeuShadowSize = "sm" | "md" | "lg";
export type NeuVariant = NeuShadowVariant;

interface NeuShadowConfig {
  readonly dark: string;
  readonly light: string;
}

const SHADOW_MAP = {
  sm: {
    elevated: {
      dark: "var(--shadow-raised)",
      light: "var(--shadow-raised)",
    },
    inset: {
      dark: "var(--shadow-inset)",
      light: "var(--shadow-inset)",
    },
  },
  md: {
    elevated: {
      dark: "var(--shadow-raised)",
      light: "var(--shadow-raised)",
    },
    inset: {
      dark: "var(--shadow-inset)",
      light: "var(--shadow-inset)",
    },
  },
  lg: {
    elevated: {
      dark: "var(--shadow-raised-strong)",
      light: "var(--shadow-raised-strong)",
    },
    inset: {
      dark: "var(--shadow-inset-strong)",
      light: "var(--shadow-inset-strong)",
    },
  },
} as const satisfies Record<NeuShadowSize, Record<NeuVariant, NeuShadowConfig>>;

/**
 * Returns the neumorphic shadow string for the provided size and variant.
 */
export function getNeuShadow(
  size: NeuShadowSize,
  variant: NeuVariant,
  isDark: boolean
): string {
  const config = SHADOW_MAP[size]?.[variant];
  if (!config) {
    throw new Error(
      `Unsupported neu shadow: size="${size}", variant="${variant}"`
    );
  }

  return isDark ? config.dark : config.light;
}

/**
 * Base surface styles shared across neumorphic elements.
 */
export function getNeuBase(): Record<string, string> {
  return {
    backgroundColor: "var(--neu-card)",
    transition: "all 150ms ease-out",
  };
}

const TEXT_COLOR_MAP = {
  accent: "var(--neu-accent)",
  primary: "var(--neu-text-primary)",
  secondary: "var(--neu-text-secondary)",
} as const;

export type NeuTextColor = keyof typeof TEXT_COLOR_MAP;

/**
 * Returns the design system text color for the requested token.
 */
export function getNeuTextColor(type: NeuTextColor): string {
  const color = TEXT_COLOR_MAP[type];
  if (!color) {
    throw new Error(`Unsupported neu text color token: ${type}`);
  }

  return color;
}

/**
 * Pre-configured typography presets for neumorphic components.
 */
export const neuTypography = {
  button: {
    fontWeight: "500",
    letterSpacing: "0.13em",
    whiteSpace: "nowrap" as const,
  },
  buttonCta: {
    fontWeight: "600",
    letterSpacing: "0.13em",
    whiteSpace: "nowrap" as const,
  },
  heading: {
    letterSpacing: "-0.03em",
    lineHeight: "1",
    whiteSpace: "nowrap" as const,
  },
  body: {
    letterSpacing: "0.13em",
    lineHeight: "1.6",
  },
} as const;
