"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ThankYou } from "../_components/wealth-code";
import { getInterpretationsUrl, routes } from "@/lib/routes";

import { FunnelPage } from "../_components/FunnelPage";

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
    <FunnelPage maxWidth="md">
      <ThankYou
        onViewInterpretations={handleViewInterpretations}
        onCalculateAnother={handleCalculateAnother}
      />
    </FunnelPage>
  );
}
