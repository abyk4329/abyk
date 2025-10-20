"use client";

import { useRouter } from "next/navigation";

import { Calculator } from "../_components/wealth-code";
import { getResultUrl } from "@/lib/routes";

import { FunnelPage } from "../_components/FunnelPage";

export function CalculatorPageClient() {
  const router = useRouter();

  const handleCalculate = (code: string) => {
    router.push(getResultUrl(code));
  };

  return (
    <FunnelPage maxWidth="md">
      <Calculator onCalculate={handleCalculate} />
    </FunnelPage>
  );
}

export default CalculatorPageClient;
