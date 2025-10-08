import { SalesPageClient } from "./SalesPageClient";

interface SalesPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function SalesPage({ searchParams }: SalesPageProps) {
  const rawCode = searchParams?.code;
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  return <SalesPageClient code={code} />;
}
