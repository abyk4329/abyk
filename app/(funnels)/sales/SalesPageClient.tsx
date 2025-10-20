"use client";

import { SalesPage as SalesSection } from "../_components/wealth-code";

import { FunnelPage } from "../_components/FunnelPage";

interface SalesPageClientProps {
  code?: string;
}

export function SalesPageClient({ code }: SalesPageClientProps) {
  return (
    <FunnelPage maxWidth="lg">
      <SalesSection code={code ?? ""} />
    </FunnelPage>
  );
}
