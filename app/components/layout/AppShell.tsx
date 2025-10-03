'use client';

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { CookieConsent } from "@/app/components/layout/CookieConsent";
import { NavigationButtons } from "@/app/components/layout/NavigationButtons";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="app-shell page-bg min-h-screen w-full">
      <Header isHomePage={isHomePage} />
      <main className="app-main">
        {!isHomePage && (
          <div className="mb-6 sm:mb-8">
            <NavigationButtons />
          </div>
        )}
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default AppShell;
