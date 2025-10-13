import { SalesPageClient } from "./SalesPageClient";

interface SalesPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SalesPage({ searchParams }: SalesPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const rawCode = resolvedParams?.code;
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  return <SalesPageClient code={code} />;
}
