"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { NavigationProvider } from "@/app/lib/navigation";
import { SalesPage as SalesSection } from "@/modules/wealth-code/components";
import { routes } from "@/lib/routes";

interface SalesPageClientProps {
  code?: string;
}

export function SalesPageClient({ code }: SalesPageClientProps) {
  const router = useRouter();

  const navigationOverrides = useMemo(
    () => ({
      isVisible: true,
      showHeader: false,
      showFooter: false,
      lockScroll: false,
      canGoBack: true,
      onGoBack: () => {
        const search = code ? `?code=${encodeURIComponent(code)}` : "";
        router.push(`${routes.result}${search}`);
      },
      onGoHome: () => router.push(routes.home),
      canGoForward: true,
      onGoForward: () => {
        const search = code ? `?code=${encodeURIComponent(code)}` : "";
        router.push(`${routes.thankYou}${search}`);
      },
    }),
    [code, router]
  );

  const handleMockPurchase = () => {
    const search = code ? `?code=${encodeURIComponent(code)}` : "";
    router.push(`${routes.thankYou}${search}`);
  };

  return (
    <NavigationProvider value={navigationOverrides}>
      <SalesSection code={code ?? ""} onMockPurchase={handleMockPurchase} />
    </NavigationProvider>
  );
}
