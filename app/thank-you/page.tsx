"use client";

import { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_CODE_STRUCTURE,
  decodeLegacyPayload,
  encodeLegacyPayload,
  parseWealthCode,
  type LegacyCodeStructure,
} from "@/legacy/utils/legacyData";

type LegacyThankYouComponent = (props: {
  wealthCode?: number;
  codeStructure?: LegacyCodeStructure;
  fullData?: unknown;
  onBack: () => void;
  onShowInterpretations?: (code: number) => void;
  onCalculateNew: () => void;
}) => JSX.Element;

const ThankYou = dynamic<LegacyThankYouComponent>(
  () =>
    import("@/legacy/components/ThankYouPage").then(
      (mod) => mod.ThankYouPage,
    ),
  { ssr: false },
);

export default function ThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const codeParam = searchParams.get("code");
  const structureParam = searchParams.get("structure");
  const dataParam = searchParams.get("data");

  const wealthCode = useMemo(
    () => parseWealthCode(codeParam),
    [codeParam],
  );

  const codeStructure = useMemo(
    () =>
      decodeLegacyPayload<LegacyCodeStructure>(structureParam) ||
      DEFAULT_CODE_STRUCTURE,
    [structureParam],
  );

  const fullData = useMemo(
    () => decodeLegacyPayload<unknown>(dataParam) || undefined,
    [dataParam],
  );

  const handleInterpretations = useCallback(
    (code: number) => {
      const params = new URLSearchParams();
      params.set("code", String(code));
      params.set("structure", encodeLegacyPayload(codeStructure));
      if (fullData) {
        params.set("data", encodeLegacyPayload(fullData));
      }
      router.push(`/reading?${params.toString()}`);
    },
    [codeStructure, fullData, router],
  );

  const handleBack = useCallback(() => {
    const params = new URLSearchParams();
    params.set("code", String(wealthCode));
    params.set("structure", encodeLegacyPayload(codeStructure));
    if (fullData) {
      params.set("data", encodeLegacyPayload(fullData));
    }
    router.push(`/?${params.toString()}`);
  }, [codeStructure, fullData, router, wealthCode]);

  const handleNewCalculation = useCallback(() => {
    router.push("/calculator");
  }, [router]);

  return (
    <main className="min-h-screen">
      <ThankYou
        wealthCode={wealthCode}
        codeStructure={codeStructure}
        fullData={fullData}
        onBack={handleBack}
        onShowInterpretations={handleInterpretations}
        onCalculateNew={handleNewCalculation}
      />
    </main>
  );
}
