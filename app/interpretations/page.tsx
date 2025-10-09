import { redirect } from "next/navigation";

import { InterpretationsPageClient } from "./InterpretationsPageClient";
import { routes } from "@/lib/routes";

export const dynamic = "force-dynamic";

interface InterpretationsPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function InterpretationsPage({ searchParams }: InterpretationsPageProps) {
  const rawCode = searchParams?.code;
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  if (!code || !/^\d{4}$/.test(code)) {
    redirect(routes.calculator);
  }

  return <InterpretationsPageClient code={code} />;
}
