"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { CookieConsentProvider } from "@/app/components/layout/CookieConsent";
import { NavigationButtons } from "@/app/components/layout/NavigationButtons";
import { TikTokPixel } from "@/app/components/analytics/TikTokPixel";
import { SURFACE, WEALTH_BASE } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { useOptionalNavigationOverrides } from "@/app/lib/navigation";
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
  const trimmed = sanitized.endsWith("/") && sanitized !== "/" ? sanitized.slice(0, -1) : sanitized;
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
    () => withBase(routes.calculator) ?? normalizePathValue(routes.calculator) ?? routes.calculator,
    []
  );
  const resultPath = useMemo(
    () => withBase(routes.result) ?? normalizePathValue(routes.result) ?? routes.result,
    []
  );

  const thankYouPath = useMemo(
    () => withBase(routes.thankYou) ?? normalizePathValue(routes.thankYou) ?? routes.thankYou,
    []
  );

  const fullScreenPages = useMemo(() => {
    const entries = ["/", basePrefix || undefined, calculatorPath, resultPath, thankYouPath];
    return new Set(entries.filter((value): value is string => Boolean(value)));
  }, [calculatorPath, resultPath, thankYouPath]);

  const minimalPages = useMemo(() => {
    const specialRoutes = [routes.sales, routes.terms, routes.privacy, routes.thankYou, routes.interpretations];
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
  const shouldCollapseForMobile = isMinimalPage && isMobileViewport === true;

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
  const isCalculatorOrResult = effectivePath === calculatorPath || effectivePath === resultPath;
  const mustShowNavigation = isCalculatorOrResult;
  const shouldShowNavigation =
    (showNavigation && (!isHomePage || navigationOverrides)) || mustShowNavigation;

  const shouldShowHeader = showHeader ?? !shouldCollapseForMobile;
  const shouldShowFooter = showFooter ?? !shouldCollapseForMobile;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { history } = window;
    if ("scrollRestoration" in history) {
      const previous = history.scrollRestoration as ScrollRestoration;
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
    isFullScreenPage ? "no-bottom-gap" : "",
    showFixedNavigation ? "app-main--floating-nav" : "",
    !shouldShowNavigation ? "app-main--spacious" : "",
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
        calculatorPath,
        resultPath,
        withBase(routes.thankYou) ?? routes.thankYou,
      ].filter(Boolean)
    );

    const shouldLock =
      typeof lockScrollOverride === "boolean"
        ? lockScrollOverride
        : lockRoutes.has(effectivePath);
    body.classList.toggle("no-scroll", shouldLock);
    root.classList.toggle("no-scroll", shouldLock);

    return () => {
      body.classList.remove("no-scroll");
      root.classList.remove("no-scroll");
    };
  }, [effectivePath, calculatorPath, resultPath, thankYouPath, lockScrollOverride]);

  return (
    <CookieConsentProvider>
      <div
        className={shellClassName}
        data-mobile-layout={shouldCollapseForMobile ? "minimal" : "standard"}
        data-route={effectivePath}
      >
        <TikTokPixel />
        <div className="safe-top" aria-hidden="true" />
        {shouldShowHeader && <Header isHomePage={isHomePage} />}
        {/* Top-attached navigation under header for calculator/result pages */}
        {isCalculatorOrResult && shouldShowNavigation && (
          <div className="top-attached-nav w-full border-0">
            <div className="mx-auto flex w-full max-w-screen-xl justify-center px-2 sm:px-4 lg:px-6">
              <nav aria-label="ניווט שלבים" role="navigation" className="w-full">
                <NavigationButtons
                  onGoBack={goBack}
                  onGoForward={goForward}
                  onGoHome={goHome}
                  canGoBack={canGoBack}
                  canGoForward={canGoForward}
                  className="justify-center"
                />
              </nav>
            </div>
          </div>
        )}
        <main className={mainClassName} role="main">
          {children}
        </main>
        {shouldShowNavigation && shouldShowFooter && (
          <div className="container mx-auto px-2 sm:px-4 lg:px-6 pt-2 sm:pt-3">
            <nav aria-label="ניווט משני" role="navigation">
              <NavigationButtons
                onGoBack={goBack}
                onGoForward={goForward}
                onGoHome={goHome}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
                className={isCalculatorOrResult ? "justify-center" : undefined}
              />
            </nav>
          </div>
        )}
        {shouldShowFooter && <Footer />}
        {showFixedNavigation && (
          <div className="fixed bottom-0 left-0 right-0 z-40">
            <nav aria-label="ניווט ממוזער" role="navigation">
              <NavigationButtons
                onGoBack={goBack}
                onGoForward={goForward}
                onGoHome={goHome}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
                className="floating-nav"
              />
            </nav>
          </div>
        )}
        <div className="safe-bottom" aria-hidden="true" />
      </div>
    </CookieConsentProvider>
  );
}

export default AppShell;
