"use client";

import { useRouter } from "next/navigation";

import { Result } from "../_components/wealth-code";
import { routes } from "@/lib/routes";

import { FunnelPage } from "../_components/FunnelPage";

interface ResultPageClientProps {
  code: string;
}

export function ResultPageClient({ code }: ResultPageClientProps) {
  const router = useRouter();

  const handleContinue = () => {
    const search = code ? `?code=${encodeURIComponent(code)}` : "";
    router.push(`${routes.sales}${search}`);
  };

  return (
    <FunnelPage maxWidth="md">
      <Result code={code} onContinue={handleContinue} />
    </FunnelPage>
  );
}
