"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { NavigationProvider } from "@/app/lib/navigation";
import { ThankYou } from "@/modules/wealth-code/components";
import { getInterpretationsUrl, routes } from "@/lib/routes";

interface ThankYouPageClientProps {
  code?: string;
}

const LAST_CODE_STORAGE_KEY = "abyk:last-code";

const isValidCode = (value: string | undefined | null): value is string => {
  if (!value) {
    return false;
  }
  return /^\d{4}$/.test(value.trim());
};

export function ThankYouPageClient({ code }: ThankYouPageClientProps) {
  const router = useRouter();
  const [resolvedCode, setResolvedCode] = useState(code ?? "");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const sanitizedProp = code?.trim();

    if (isValidCode(sanitizedProp)) {
      const normalized = sanitizedProp;
      setResolvedCode(normalized);
      try {
        window.sessionStorage.setItem(LAST_CODE_STORAGE_KEY, normalized);
      } catch (error) {
        console.warn("Failed to persist code in thank-you page", error);
      }
      return;
    }

    try {
      const stored = window.sessionStorage.getItem(LAST_CODE_STORAGE_KEY) ?? "";
      if (isValidCode(stored) && stored !== resolvedCode) {
        setResolvedCode(stored);
      }
    } catch (error) {
      console.warn("Failed to read stored code", error);
    }
  }, [code, resolvedCode]);

  const search = resolvedCode ? `?code=${encodeURIComponent(resolvedCode)}` : "";

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
        if (resolvedCode) {
          router.push(getInterpretationsUrl(resolvedCode));
        } else {
          router.push(routes.interpretations);
        }
      },
      onGoHome: () => {
        router.push(routes.home);
      },
    }),
    [resolvedCode, router, search]
  );

  const handleViewInterpretations = () => {
    if (resolvedCode) {
      router.push(getInterpretationsUrl(resolvedCode));
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
