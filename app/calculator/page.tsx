"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { NavigationProvider } from "@/app/lib/navigation";
import { Calculator } from "@/modules/wealth-code/components";
import { getResultUrl, routes } from "@/lib/routes";

export default function CalculatorPage() {
  const router = useRouter();
  const [latestCode, setLatestCode] = useState<string | null>(null);

  const handleCalculate = (code: string) => {
    setLatestCode(code);
    router.push(getResultUrl(code));
  };

  const navigationOverrides = useMemo(
    () => ({
      isVisible: true,
      onGoBack: () => router.push(routes.home),
      canGoBack: true,
      onGoForward: () => {
        if (latestCode) {
          router.push(getResultUrl(latestCode));
        }
      },
      canGoForward: Boolean(latestCode),
      onGoHome: () => router.push(routes.home),
    }),
    [latestCode, router]
  );

  return (
    <NavigationProvider value={navigationOverrides}>
      <Calculator onCalculate={handleCalculate} />
    </NavigationProvider>
  );
}
