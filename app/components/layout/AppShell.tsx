'use client';

import { ReactNode, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { CookieConsent } from "@/app/components/layout/CookieConsent";
import { NavigationButtons } from "@/app/components/layout/NavigationButtons";
import { TikTokPixel } from "@/app/components/analytics/TikTokPixel";
import { WEALTH_BASE } from "@/lib/constants";
import { useOptionalNavigationOverrides } from "@/app/lib/navigation";

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

  const normalizedPath = normalizePath(pathname);
  const fallbackPath = normalizePath(WEALTH_BASE);
  const preferredPath = normalizedPath ?? fallbackPath;
  const effectivePath = preferredPath ?? "/";

  const isHomePage = homePaths.has(effectivePath);
  const navigationOverrides = useOptionalNavigationOverrides();
  const {
    onGoBack: goBack,
    onGoForward: goForward,
    onGoHome: goHome,
    canGoBack,
    canGoForward,
    isVisible,
  } = navigationOverrides ?? {};
  const showNavigation = isVisible ?? true;
  const shouldShowNavigation = showNavigation && (!isHomePage || navigationOverrides);

  // Scroll to top on route change
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Scroll immediately and smoothly to top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]); // Changed from effectivePath to pathname for more reliable detection

  return (
    <div className="app-shell min-h-screen w-full">
      <TikTokPixel />
      <Header isHomePage={isHomePage} />
      <main className="app-main" role="main">
        {children}
      </main>
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
      <CookieConsent />
    </div>
  );
}

export default AppShell;
