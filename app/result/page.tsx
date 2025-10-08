import { redirect } from "next/navigation";

import { routes } from "@/lib/routes";
import { ResultPageClient } from "./ResultPageClient";

interface ResultPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const rawCode = searchParams?.code;
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  if (!code) {
    redirect(routes.calculator);
  }

  return <ResultPageClient code={code} />;
}
