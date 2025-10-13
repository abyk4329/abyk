import { redirect } from "next/navigation";

import { routes } from "@/lib/routes";
import { ResultPageClient } from "./ResultPageClient";

interface ResultPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const rawCode = resolvedParams?.code;
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  if (!code) {
    redirect(routes.calculator);
  }

  return <ResultPageClient code={code} />;
}
