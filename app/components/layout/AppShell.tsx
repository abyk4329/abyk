"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { CookieConsentProvider } from "@/app/components/layout/CookieConsent";
import { TikTokPixel } from "@/app/components/analytics/TikTokPixel";
import { SURFACE, WEALTH_BASE } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { useOptionalNavigationOverrides } from "@/app/components/providers";
import { setDarkThemeColor, setThemeColor } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

const MOBILE_VIEWPORT_QUERY = "(max-width: 767px)";

function normalizePathValue(value?: string | null): string | undefined {
  if (value == null) {
    return undefined;
  }

  if (value === "" || value === "/") {
    return "/";
  }

  const sanitized = value.replace(/\/+/g, "/");
  const trimmed =
    sanitized.endsWith("/") && sanitized !== "/"
      ? sanitized.slice(0, -1)
      : sanitized;
  return trimmed || "/";
}

const basePrefix = (() => {
  const normalized = normalizePathValue(WEALTH_BASE);
  if (!normalized || normalized === "/") {
    return "";
  }
  return normalized;
})();

function withBase(path: string): string | undefined {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizePathValue(`${basePrefix}${normalizedPath}`);
}

// Return null on first render (both SSR and initial hydration) to keep
// server and client markup identical; compute real value after mount.
function useIsMobileViewport(): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(MOBILE_VIEWPORT_QUERY);
    const apply = () => setIsMobile(mq.matches);
    apply();
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isMobileViewport = useIsMobileViewport();

  const homePaths = useMemo(() => {
    const set = new Set<string>();
    set.add("/");
    if (basePrefix) {
      set.add(basePrefix);
    }
    return set;
  }, []);

  const calculatorPath = useMemo(
    () =>
      withBase(routes.calculator) ??
      normalizePathValue(routes.calculator) ??
      routes.calculator,
    []
  );
  const resultPath = useMemo(
    () =>
      withBase(routes.result) ??
      normalizePathValue(routes.result) ??
      routes.result,
    []
  );

  const thankYouPath = useMemo(
    () =>
      withBase(routes.thankYou) ??
      normalizePathValue(routes.thankYou) ??
      routes.thankYou,
    []
  );

  const fullScreenPages = useMemo(() => {
    const entries = [
      "/",
      basePrefix || undefined,
      calculatorPath,
      resultPath,
      thankYouPath,
    ];
    return new Set(entries.filter((value): value is string => Boolean(value)));
  }, [calculatorPath, resultPath, thankYouPath]);

  const minimalPages = useMemo(() => {
    const specialRoutes = [
      routes.sales,
      routes.terms,
      routes.privacy,
      routes.interpretations,
    ];
    const entries = specialRoutes
      .map((path) => withBase(path) ?? normalizePathValue(path))
      .filter((value): value is string => Boolean(value));
    return new Set(entries);
  }, []);

  const normalizedPath = normalizePathValue(pathname);
  const fallbackPath = basePrefix || undefined;
  const effectivePath = normalizedPath ?? fallbackPath ?? "/";

  const isHomePage = homePaths.has(effectivePath);
  const isFullScreenPage = fullScreenPages.has(effectivePath);
  const isMinimalPage = minimalPages.has(effectivePath);
  const shouldCollapseForMobile =
    !isFullScreenPage && isMinimalPage && isMobileViewport === true;

  const navigationOverrides = useOptionalNavigationOverrides();
  const {
    onGoBack: goBack,
    onGoForward: goForward,
    onGoHome: goHome,
    canGoBack,
    canGoForward,
    isVisible,
    showHeader,
    showFooter,
    lockScroll: lockScrollOverride,
  } = navigationOverrides ?? {};

  const showNavigation = isVisible ?? true;
  const isCalculatorOrResult =
    effectivePath === calculatorPath || effectivePath === resultPath;
  const mustShowNavigation = isCalculatorOrResult;
  const shouldShowNavigation =
    (showNavigation && (!isHomePage || navigationOverrides)) ||
    mustShowNavigation;

  const shouldShowHeader = showHeader ?? !shouldCollapseForMobile;
  const shouldShowFooter = showFooter ?? !shouldCollapseForMobile;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { history } = window;
    if ("scrollRestoration" in history) {
      const previous =
        (history.scrollRestoration as "auto" | "manual") ?? "auto";
      history.scrollRestoration = "manual";

      return () => {
        history.scrollRestoration = previous ?? "auto";
      };
    }

    return undefined;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setThemeColor(SURFACE.header);
    setDarkThemeColor(SURFACE.headerDark);
  }, [pathname]);

  const showFixedNavigation = !shouldShowFooter && shouldShowNavigation;
  const mainClassName = [
    "app-main",
    showFixedNavigation ? "app-main--floating-nav" : "",
    !shouldShowNavigation ? "app-main--spacious" : "",
    !shouldShowHeader ? "app-main--no-header" : "",
    !shouldShowFooter ? "app-main--no-footer" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const shellClassName = [
    "app-shell",
    "min-h-[100dvh]",
    "w-full",
    isFullScreenPage ? "app-shell--full-bleed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Central scroll locking for defined full-screen pages (Home / Calculator / Result / ThankYou)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const root = document.documentElement;
    const lockRoutes = new Set(
      [
        withBase("/") ?? "/",
        basePrefix || undefined,
        // calculatorPath, // Allow scroll on calculator page
        resultPath,
        withBase(routes.thankYou) ?? routes.thankYou,
      ].filter(Boolean)
    );

    const applyLock = () => {
      const baseDecision =
        typeof lockScrollOverride === "boolean"
          ? lockScrollOverride
          : lockRoutes.has(effectivePath);
      const viewportHeight =
        typeof window !== "undefined" ? window.innerHeight : undefined;
      const allowLock = viewportHeight ? viewportHeight > 740 : true;
      const shouldLock = baseDecision && allowLock;
      body.classList.toggle("no-scroll", shouldLock);
      root.classList.toggle("no-scroll", shouldLock);
    };

    applyLock();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", applyLock);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", applyLock);
      }
      body.classList.remove("no-scroll");
      root.classList.remove("no-scroll");
    };
  }, [
    effectivePath,
    calculatorPath,
    resultPath,
    thankYouPath,
    lockScrollOverride,
  ]);

  return (
    <CookieConsentProvider>
      <div
        className={shellClassName}
        dir="rtl"
        data-mobile-layout={shouldCollapseForMobile ? "minimal" : "standard"}
        data-route={effectivePath}
        data-has-nav={shouldShowNavigation ? "true" : "false"}
        data-has-header={shouldShowHeader ? "true" : "false"}
        data-has-footer={shouldShowFooter ? "true" : "false"}
      >
        <TikTokPixel />
        <div className="safe-top" aria-hidden="true" />
        <main className={mainClassName} role="main">
          {children}
        </main>
        <div className="safe-bottom" aria-hidden="true" />
      </div>
    </CookieConsentProvider>
  );
}

export default AppShell;
