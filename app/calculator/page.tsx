"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  encodeLegacyPayload,
  type LegacyCodeStructure,
} from "@/legacy/utils/legacyData";

type LegacyCalculatorComponent = (props: {
  onBack: () => void;
  onShowThankYou?: (
    wealthCode: number,
    codeStructure: LegacyCodeStructure,
    fullData?: unknown,
  ) => void;
  onShowTerms?: () => void;
  onShowPrivacy?: () => void;
  onShowTermsAndPrivacy?: () => void;
}) => JSX.Element;

const Calculator = dynamic<LegacyCalculatorComponent>(
  () =>
    import("@/legacy/components/WealthCodeCalculator").then(
      (mod) => mod.WealthCodeCalculator,
    ),
  { ssr: false },
);

export default function CalculatorPage() {
  const router = useRouter();

  const handleShowThankYou = useCallback(
    (
      wealthCode: number,
      structure: LegacyCodeStructure,
      fullData?: unknown,
    ) => {
      const params = new URLSearchParams();
      params.set("code", String(wealthCode));
      params.set("structure", encodeLegacyPayload(structure));
      if (fullData) {
        params.set("data", encodeLegacyPayload(fullData));
      }
      router.push(`/thank-you?${params.toString()}`);
    },
    [router],
  );

  return (
    <main className="min-h-screen">
      <Calculator
        onBack={() => router.push("/")}
        onShowThankYou={handleShowThankYou}
        onShowTerms={() => router.push("/policy/terms")}
        onShowPrivacy={() => router.push("/policy/privacy")}
        onShowTermsAndPrivacy={() => router.push("/policy/terms")}
      />
    </main>
  );
}
