"use client";

import { useMemo } from "react";

import { NavigationProvider } from "@/app/lib/navigation";
import { SalesPage as SalesSection } from "@/features/wealth-code/components";

interface SalesPageClientProps {
  code?: string;
}

export function SalesPageClient({ code }: SalesPageClientProps) {
  const navigationOverrides = useMemo(
    () => ({
      isVisible: false,
      showHeader: false,
      showFooter: false,
      lockScroll: false,
    }),
    []
  );

  return (
    <NavigationProvider value={navigationOverrides}>
      <SalesSection code={code ?? ""} />
    </NavigationProvider>
  );
}
