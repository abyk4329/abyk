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
    <div className="app-shell min-h-screen w-full">
      <Header isHomePage={isHomePage} />
      <main className="app-main">
        {children}
      </main>
      {!isHomePage && (
        <div className="py-6 sm:py-8">
          <NavigationButtons />
        </div>
      )}
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default AppShell;
