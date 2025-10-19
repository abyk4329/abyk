"use client";

import { redirect } from "next/navigation";
import { DesignShowcase } from "@/components/sections/DesignShowcase";

export default function DesignPage() {
  // Block access in production
  const isDevelopment = process.env.NODE_ENV === "development";
  const showDesign = process.env.NEXT_PUBLIC_SHOW_DESIGN === "true";

  if (!isDevelopment && !showDesign) {
    redirect("/");
  }

  return <DesignShowcase />;
}
