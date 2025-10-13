"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { NavigationProvider } from "@/app/lib/navigation";
import { Interpretations } from "@/features/wealth-code/components";
import { getInterpretationsUrl, routes } from "@/lib/routes";

interface InterpretationsPageClientProps {
  code: string;
}

export function InterpretationsPageClient({
  code,
}: InterpretationsPageClientProps) {
  const router = useRouter();

  const search = `?code=${encodeURIComponent(code)}`;

  const navigationOverrides = useMemo(
    () => ({
      isVisible: true,
      showHeader: false,
      showFooter: false,
      lockScroll: false,
      canGoBack: true,
      onGoBack: () => {
        router.push(`${routes.thankYou}${search}`);
      },
      canGoForward: false,
      onGoHome: () => {
        router.push(routes.home);
      },
    }),
    [router, search]
  );

  const handleCalculateAnother = () => {
    router.push(routes.calculator);
  };

  return (
    <NavigationProvider value={navigationOverrides}>
      <Interpretations
        code={code}
        onCalculateAnother={handleCalculateAnother}
      />
    </NavigationProvider>
  );
}
