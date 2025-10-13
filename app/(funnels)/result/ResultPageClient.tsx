"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { NavigationProvider } from "@/app/lib/navigation";
import { Result } from "@/features/wealth-code/components";
import { routes } from "@/lib/routes";

interface ResultPageClientProps {
  code: string;
}

export function ResultPageClient({ code }: ResultPageClientProps) {
  const router = useRouter();

  const handleContinue = () => {
    const search = code ? `?code=${encodeURIComponent(code)}` : "";
    router.push(`${routes.sales}${search}`);
  };

  const navigationOverrides = useMemo(
    () => ({
      isVisible: true,
      onGoBack: () => router.push(routes.calculator),
      canGoBack: true,
      onGoForward: () => {
        if (code) {
          const search = `?code=${encodeURIComponent(code)}`;
          router.push(`${routes.sales}${search}`);
        }
      },
      canGoForward: Boolean(code),
      onGoHome: () => router.push(routes.home),
    }),
    [code, router]
  );

  return (
    <NavigationProvider value={navigationOverrides}>
      <Result code={code} onContinue={handleContinue} />
    </NavigationProvider>
  );
}
