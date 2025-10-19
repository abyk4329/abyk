"use client";

import { useRouter } from "next/navigation";

import { Interpretations } from "@/features/wealth-code/components";
import { routes } from "@/lib/routes";

import { FunnelPage } from "../_components/FunnelPage";

interface InterpretationsPageClientProps {
  code: string;
}

export function InterpretationsPageClient({
  code,
}: InterpretationsPageClientProps) {
  const router = useRouter();

  const handleCalculateAnother = () => {
    router.push(routes.calculator);
  };

  return (
    <FunnelPage maxWidth="lg">
      <Interpretations
        code={code}
        onCalculateAnother={handleCalculateAnother}
      />
    </FunnelPage>
  );
}
