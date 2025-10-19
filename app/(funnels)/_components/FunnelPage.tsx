"use client";

import type { ReactNode } from "react";

import { StandardPageLayout } from "@/app/components/layout/StandardPageLayout";

export type FunnelPageMaxWidth = "sm" | "md" | "lg" | "xl" | "full";

interface FunnelPageProps {
  children: ReactNode;
  maxWidth?: FunnelPageMaxWidth;
  showSocial?: boolean;
  className?: string;
  contentClassName?: string;
}

/**
 * עטיפת ברירת מחדל למסכי הפאנל. שומרת על עקביות שימוש בפריסת StandardPageLayout.
 */
export function FunnelPage({
  children,
  maxWidth = "lg",
  showSocial = false,
  className,
  contentClassName,
}: FunnelPageProps) {
  return (
    <StandardPageLayout
      maxWidth={maxWidth}
      showSocial={showSocial}
      className={className}
      contentClassName={contentClassName}
    >
      {children}
    </StandardPageLayout>
  );
}

export default FunnelPage;
