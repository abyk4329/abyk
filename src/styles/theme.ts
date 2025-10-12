export type Theme = {
  direction: {
    default: "rtl" | "ltr";
    inlineStart: string;
    inlineEnd: string;
  };
  typography: {
    fontFamily: string;
    weights: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
    };
    mobile: Record<
      "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption",
      string
    >;
    sm: Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body", string>;
    md: Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body", string>;
    lg: Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body", string>;
    xl: Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body", string>;
  };
  spacing: {
    "0-5": string;
    1: string;
    "1-5": string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
  };
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    inputBackground: string;
    switchBackground: string;
    ring: string;
    brown: {
      dark: string;
      heading: string;
      bronze: string;
      neutral: string;
    };
    sand: {
      light: string;
      lighter: string;
      lightest: string;
      cream: string;
    };
    sidebar: {
      background: string;
      foreground: string;
      primary: string;
      primaryForeground: string;
      accent: string;
      accentForeground: string;
      border: string;
      ring: string;
    };
    charts: [string, string, string, string, string];
  };
  layout: {
    headerHeight: string;
    heroOffsets: {
      groupA: string;
      groupB: string;
      groupAMobile: string;
      groupBMobile: string;
    };
    primaryCard: {
      maxWidth: string;
      gutter: string;
      paddingBlock: string;
      width: string;
    };
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
  gradients: {
    page: string;
    cardPrimary: string;
    cardSecondary: string;
    cardFloating: string;
    nav: string;
    heroTop: string;
    heroBottom: string;
    heroMobileTop: string;
    heroMobileBottom: string;
  };
  shadows: {
    cardMain: string;
    cardMainHover: string;
    cardSecondary: string;
    cardSecondaryHover: string;
    cardFloating: string;
    cardFloatingHover: string;
    icon: string;
    iconHover: string;
    button: string;
    buttonHover: string;
    buttonActive: string;
  };
  transitions: {
    smooth: string;
    durations: {
      fast: string;
      normal: string;
      slow: string;
    };
    splash: {
      logoDelay: string;
      logoDuration: string;
      fadeOutDelay: string;
      fadeOutDuration: string;
      totalDuration: string;
    };
  };
};

const asVar = (token: string) => `var(${token})`;

export const theme: Theme = {
  direction: {
    default: "rtl",
    inlineStart: asVar("--inline-start"),
    inlineEnd: asVar("--inline-end"),
  },
  typography: {
    fontFamily: asVar("--font-family-base"),
    weights: {
      regular: asVar("--font-weight-regular"),
      medium: asVar("--font-weight-medium"),
      semibold: asVar("--font-weight-semibold"),
      bold: asVar("--font-weight-bold"),
      extrabold: asVar("--font-weight-extrabold"),
    },
    mobile: {
      h1: asVar("--font-size-h1-mobile"),
      h2: asVar("--font-size-h2-mobile"),
      h3: asVar("--font-size-h3-mobile"),
      h4: asVar("--font-size-h4-mobile"),
      h5: asVar("--font-size-h5-mobile"),
      h6: asVar("--font-size-h6-mobile"),
      body: asVar("--font-size-body-mobile"),
      caption: asVar("--font-size-caption-mobile"),
    },
    sm: {
      h1: asVar("--font-size-h1-sm"),
      h2: asVar("--font-size-h2-sm"),
      h3: asVar("--font-size-h3-sm"),
      h4: asVar("--font-size-h4-sm"),
      h5: asVar("--font-size-h5-sm"),
      h6: asVar("--font-size-h6-sm"),
      body: asVar("--font-size-body-sm"),
    },
    md: {
      h1: asVar("--font-size-h1-md"),
      h2: asVar("--font-size-h2-md"),
      h3: asVar("--font-size-h3-md"),
      h4: asVar("--font-size-h4-md"),
      h5: asVar("--font-size-h5-md"),
      h6: asVar("--font-size-h6-md"),
      body: asVar("--font-size-body-md"),
    },
    lg: {
      h1: asVar("--font-size-h1-lg"),
      h2: asVar("--font-size-h2-lg"),
      h3: asVar("--font-size-h3-lg"),
      h4: asVar("--font-size-h4-lg"),
      h5: asVar("--font-size-h5-lg"),
      h6: asVar("--font-size-h6-lg"),
      body: asVar("--font-size-body-lg"),
    },
    xl: {
      h1: asVar("--font-size-h1-xl"),
      h2: asVar("--font-size-h2-xl"),
      h3: asVar("--font-size-h3-xl"),
      h4: asVar("--font-size-h4-xl"),
      h5: asVar("--font-size-h5-xl"),
      h6: asVar("--font-size-h6-xl"),
      body: asVar("--font-size-body-xl"),
    },
  },
  spacing: {
    "0-5": asVar("--space-0-5"),
    1: asVar("--space-1"),
    "1-5": asVar("--space-1-5"),
    2: asVar("--space-2"),
    3: asVar("--space-3"),
    4: asVar("--space-4"),
    5: asVar("--space-5"),
    6: asVar("--space-6"),
    8: asVar("--space-8"),
    10: asVar("--space-10"),
  },
  colors: {
    background: asVar("--color-background"),
    foreground: asVar("--color-foreground"),
    card: asVar("--color-card"),
    cardForeground: asVar("--color-card-foreground"),
    popover: asVar("--color-popover"),
    popoverForeground: asVar("--color-popover-foreground"),
    primary: asVar("--color-primary"),
    primaryForeground: asVar("--color-primary-foreground"),
    secondary: asVar("--color-secondary"),
    secondaryForeground: asVar("--color-secondary-foreground"),
    muted: asVar("--color-muted"),
    mutedForeground: asVar("--color-muted-foreground"),
    accent: asVar("--color-accent"),
    accentForeground: asVar("--color-accent-foreground"),
    destructive: asVar("--color-destructive"),
    destructiveForeground: asVar("--color-destructive-foreground"),
    border: asVar("--color-border"),
    input: asVar("--color-input"),
    inputBackground: asVar("--color-input-background"),
    switchBackground: asVar("--color-switch-background"),
    ring: asVar("--color-ring"),
    brown: {
      dark: asVar("--brown-dark"),
      heading: asVar("--brown-heading"),
      bronze: asVar("--brown-bronze"),
      neutral: asVar("--brown-neutral"),
    },
    sand: {
      light: asVar("--sand-light"),
      lighter: asVar("--sand-lighter"),
      lightest: asVar("--sand-lightest"),
      cream: asVar("--white-cream"),
    },
    sidebar: {
      background: asVar("--sidebar"),
      foreground: asVar("--sidebar-foreground"),
      primary: asVar("--sidebar-primary"),
      primaryForeground: asVar("--sidebar-primary-foreground"),
      accent: asVar("--sidebar-accent"),
      accentForeground: asVar("--sidebar-accent-foreground"),
      border: asVar("--sidebar-border"),
      ring: asVar("--sidebar-ring"),
    },
    charts: [
      asVar("--chart-1"),
      asVar("--chart-2"),
      asVar("--chart-3"),
      asVar("--chart-4"),
      asVar("--chart-5"),
    ],
  },
  layout: {
    headerHeight: asVar("--layout-header-height"),
    heroOffsets: {
      groupA: asVar("--layout-hero-offset-group-a"),
      groupB: asVar("--layout-hero-offset-group-b"),
      groupAMobile: asVar("--layout-hero-offset-group-a-mobile"),
      groupBMobile: asVar("--layout-hero-offset-group-b-mobile"),
    },
    primaryCard: {
      maxWidth: asVar("--primary-card-max-width"),
      gutter: asVar("--primary-card-gutter"),
      paddingBlock: asVar("--primary-card-padding-block"),
      width: asVar("--primary-card-width"),
    },
  },
  radius: {
    sm: asVar("--radius-sm"),
    md: asVar("--radius-md"),
    lg: asVar("--radius-lg"),
    xl: asVar("--radius-xl"),
    "2xl": asVar("--radius-2xl"),
  },
  gradients: {
    page: asVar("--gradient-page"),
    cardPrimary: asVar("--gradient-card-primary"),
    cardSecondary: asVar("--gradient-card-secondary"),
    cardFloating: asVar("--gradient-card-floating"),
    nav: asVar("--gradient-nav"),
    heroTop: asVar("--gradient-hero-top"),
    heroBottom: asVar("--gradient-hero-bottom"),
    heroMobileTop: asVar("--gradient-hero-mobile-top"),
    heroMobileBottom: asVar("--gradient-hero-mobile-bottom"),
  },
  shadows: {
    cardMain: asVar("--shadow-card-main"),
    cardMainHover: asVar("--shadow-card-main-hover"),
    cardSecondary: asVar("--shadow-card-secondary"),
    cardSecondaryHover: asVar("--shadow-card-secondary-hover"),
    cardFloating: asVar("--shadow-card-floating"),
    cardFloatingHover: asVar("--shadow-card-floating-hover"),
    icon: asVar("--shadow-icon"),
    iconHover: asVar("--shadow-icon-hover"),
    button: asVar("--shadow-button"),
    buttonHover: asVar("--shadow-button-hover"),
    buttonActive: asVar("--shadow-button-active"),
  },
  transitions: {
    smooth: asVar("--transition-smooth"),
    durations: {
      fast: asVar("--duration-fast"),
      normal: asVar("--duration-normal"),
      slow: asVar("--duration-slow"),
    },
    splash: {
      logoDelay: asVar("--splash-logo-delay"),
      logoDuration: asVar("--splash-logo-duration"),
      fadeOutDelay: asVar("--splash-fade-out-delay"),
      fadeOutDuration: asVar("--splash-fade-out-duration"),
      totalDuration: asVar("--splash-total-duration"),
    },
  },
};

export default theme;
