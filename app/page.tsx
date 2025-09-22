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

type LegacySalesPageComponent = (props: {
  wealthCode: number;
  codeStructure: LegacyCodeStructure;
  fullData?: unknown;
  onBack: () => void;
  onCalculateNew: () => void;
  onShowThankYou?: (
    wealthCode: number,
    codeStructure: LegacyCodeStructure,
    fullData?: unknown,
  ) => void;
}) => JSX.Element;

const LegacyHome = dynamic<LegacySalesPageComponent>(
  () =>
    import("@/legacy/components/WealthCodeSalesPage").then(
      (mod) => mod.WealthCodeSalesPage,
    ),
  { ssr: false },
);

export default function Home() {
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

  const handleThankYou = useCallback(
    (
      nextWealthCode: number,
      structure: LegacyCodeStructure,
      legacyData?: unknown,
    ) => {
      const params = new URLSearchParams();
      params.set("code", String(nextWealthCode));
      params.set("structure", encodeLegacyPayload(structure));
      if (legacyData) {
        params.set("data", encodeLegacyPayload(legacyData));
      }
      router.push(`/thank-you?${params.toString()}`);
    },
    [router],
  );

  return (
    <main className="min-h-screen">
      <LegacyHome
        wealthCode={wealthCode}
        codeStructure={codeStructure}
        fullData={fullData}
        onBack={() => router.push("/calculator")}
        onCalculateNew={() => router.push("/calculator")}
        onShowThankYou={handleThankYou}
      />
    </main>
  );
}
