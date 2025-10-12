"use client";

import { DesignShowcase } from "@/design-system/components/DesignShowcase";
import { redirect } from "next/navigation";

export default function DesignPage() {
  // Block access in production
  const isDevelopment = process.env.NODE_ENV === "development";
  const showDesign = process.env.NEXT_PUBLIC_SHOW_DESIGN === "true";

  if (!isDevelopment && !showDesign) {
    redirect("/");
  }

  return <DesignShowcase />;
}
