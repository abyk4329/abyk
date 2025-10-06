"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { CookieConsent } from "@/app/components/layout/CookieConsent";
import { NavigationButtons } from "@/app/components/layout/NavigationButtons";
import { TikTokPixel } from "@/app/components/analytics/TikTokPixel";
import { SURFACE, WEALTH_BASE } from "@/lib/constants";
import { useOptionalNavigationOverrides } from "@/app/lib/navigation";
import { setDarkThemeColor, setThemeColor } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const normalizePath = (value?: string | null) => {
    if (value == null) {
      return undefined;
    }

    if (value === "" || value === "/") {
      return "/";
    }

    return value.endsWith("/") ? value.slice(0, -1) : value;
  };

  const homePaths = useMemo(() => {
    const basePath = normalizePath(WEALTH_BASE);
    return new Set(["/", basePath ?? "/"]);
  }, []);

  // Pages that should show full screen with header/footer only (no vertical scrolling)
  const fullScreenPages = useMemo(() => {
    const basePath = normalizePath(WEALTH_BASE);
    return new Set([
      "/",
      basePath ?? "/",
      `${basePath}/calculator`,
      `${basePath}/result`,
    ]);
  }, []);

  // Pages that should hide header/footer completely, show only minimized navigation
  const minimalPages = useMemo(() => {
    const basePath = normalizePath(WEALTH_BASE);
    return new Set([
      `${basePath}/sales`,
      `${basePath}/thankyou`,
      `${basePath}/interpretations`,
    ]);
  }, []);

  const normalizedPath = normalizePath(pathname);
  const fallbackPath = normalizePath(WEALTH_BASE);
  const preferredPath = normalizedPath ?? fallbackPath;
  const effectivePath = preferredPath ?? "/";

  const isHomePage = homePaths.has(effectivePath);
  const isFullScreenPage = fullScreenPages.has(effectivePath);
  const isMinimalPage = minimalPages.has(effectivePath);
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
  const shouldShowNavigation = showNavigation && (!isHomePage || navigationOverrides);

  // Use navigation overrides for header/footer visibility, fallback to route-based logic
  const shouldShowHeader = showHeader ?? !isMinimalPage;
  const shouldShowFooter = showFooter ?? !isMinimalPage;

  // Scroll to top on route change
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Scroll immediately and smoothly to top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]); // Changed from effectivePath to pathname for more reliable detection

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // For now all routes share the same header tone. Adjust here if future routes diverge.
    setThemeColor(SURFACE.header);
    setDarkThemeColor(SURFACE.headerDark);
  }, [isHomePage, pathname]);

  return (
    <div className="app-shell min-h-[100dvh] w-full">
      <TikTokPixel />
      <div className="safe-top" aria-hidden="true" />
      {shouldShowHeader && <Header isHomePage={isHomePage} />}
      <main className={`app-main ${isFullScreenPage ? 'no-bottom-gap' : ''}`} role="main">
        {children}
      </main>
      {shouldShowFooter && (
        <Footer>
          {shouldShowNavigation && (
            <nav aria-label="ניווט משני" className="pb-2 sm:pb-3">
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
      {!shouldShowFooter && shouldShowNavigation && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-transparent">
          <nav aria-label="ניווט ממוזער" className="pb-safe-bottom">
            <NavigationButtons
              onGoBack={goBack}
              onGoForward={goForward}
              onGoHome={goHome}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
            />
          </nav>
        </div>
      )}
      <div className="safe-bottom" aria-hidden="true" />
      <CookieConsent />
    </div>
  );
}

export default AppShell;
