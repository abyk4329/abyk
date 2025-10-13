interface ThankYouPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

import { ThankYouPageClient } from "./ThankYouPageClient";

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const rawCode = resolvedParams?.code;
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  return <ThankYouPageClient code={code} />;
}
