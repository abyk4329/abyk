"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { NavigationProvider } from "@/app/lib/navigation";
import { ThankYou } from "@/modules/wealth-code/components";
import { getInterpretationsUrl, routes } from "@/lib/routes";

interface ThankYouPageClientProps {
  code?: string;
}

export function ThankYouPageClient({ code }: ThankYouPageClientProps) {
  const router = useRouter();

  const search = code ? `?code=${encodeURIComponent(code)}` : "";

  const navigationOverrides = useMemo(
    () => ({
      isVisible: true,
      showHeader: false,
      showFooter: false,
      lockScroll: true,
      canGoBack: true,
      onGoBack: () => {
        router.push(`${routes.sales}${search}`);
      },
      canGoForward: true,
      onGoForward: () => {
        if (code) {
          router.push(getInterpretationsUrl(code));
        } else {
          router.push(routes.interpretations);
        }
      },
      onGoHome: () => {
        router.push(routes.home);
      },
    }),
    [code, router, search]
  );

  const handleViewInterpretations = () => {
    if (code) {
      router.push(getInterpretationsUrl(code));
    } else {
      router.push(routes.interpretations);
    }
  };

  const handleCalculateAnother = () => {
    router.push(routes.calculator);
  };

  return (
    <NavigationProvider value={navigationOverrides}>
      <ThankYou
        onViewInterpretations={handleViewInterpretations}
        onCalculateAnother={handleCalculateAnother}
      />
    </NavigationProvider>
  );
}
