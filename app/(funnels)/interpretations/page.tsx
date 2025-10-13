import { redirect } from "next/navigation";

import { InterpretationsPageClient } from "./InterpretationsPageClient";
import { routes } from "@/lib/routes";

export const dynamic = "force-dynamic";

interface InterpretationsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function InterpretationsPage({ searchParams }: InterpretationsPageProps) {
  const params = searchParams ? await searchParams : {};
  const rawCode = params?.code;
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  if (!code || !/^\d{4}$/.test(code)) {
    redirect(routes.calculator);
  }

  return <InterpretationsPageClient code={code} />;
}
