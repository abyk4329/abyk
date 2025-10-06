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

function useIsMobileViewport(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(MOBILE_VIEWPORT_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQueryList = window.matchMedia(MOBILE_VIEWPORT_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", handleChange);
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
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

  const fullScreenPages = useMemo(() => {
    const entries = ["/", basePrefix || undefined, calculatorPath, resultPath];
    return new Set(entries.filter((value): value is string => Boolean(value)));
  }, [calculatorPath, resultPath]);

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
  const shouldCollapseForMobile = isMinimalPage && isMobileViewport;

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
  } = navigationOverrides ?? {};

  const showNavigation = isVisible ?? true;
  const mustShowNavigation = effectivePath === calculatorPath || effectivePath === resultPath;
  const shouldShowNavigation =
    (showNavigation && (!isHomePage || navigationOverrides)) || mustShowNavigation;

  const shouldShowHeader = showHeader ?? !shouldCollapseForMobile;
  const shouldShowFooter = showFooter ?? !shouldCollapseForMobile;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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

  return (
    <CookieConsentProvider>
      <div
        className="app-shell min-h-[100dvh] w-full"
        data-mobile-layout={shouldCollapseForMobile ? "minimal" : "standard"}
        data-route={effectivePath}
      >
        <TikTokPixel />
        <div className="safe-top" aria-hidden="true" />
        {shouldShowHeader && <Header isHomePage={isHomePage} />}
        <main className={mainClassName} role="main">
          {children}
        </main>
        {shouldShowFooter && (
          <Footer>
            {shouldShowNavigation && (
              <nav aria-label="ניווט משני" role="navigation" className="pt-2 sm:pt-3">
                <NavigationButtons
                  onGoBack={goBack}
                  onGoForward={goForward}
                  onGoHome={goHome}
                  canGoBack={canGoBack}
                  canGoForward={canGoForward}
                />
              </nav>
            )}
          </Footer>
        )}
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
