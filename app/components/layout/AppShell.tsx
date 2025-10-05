'use client';

import { ReactNode, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { CookieConsent } from "@/app/components/layout/CookieConsent";
import { NavigationButtons } from "@/app/components/layout/NavigationButtons";
import { WEALTH_BASE } from "@/lib/constants";

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
  const fallbackPath = typeof window !== "undefined" ? normalizePath(window.location.pathname) : undefined;
  const effectivePath = normalizedPath ?? fallbackPath ?? "/";

  const isHomePage = homePaths.has(effectivePath);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [effectivePath]);

  return (
    <div className="app-shell min-h-screen w-full">
      <Header isHomePage={isHomePage} />
      <main className="app-main" role="main">
        {children}
      </main>
      {!isHomePage && (
        <nav aria-label="ניווט משני" className="py-6 sm:py-8">
          <NavigationButtons />
        </nav>
      )}
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default AppShell;
