"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

type LegacyTermsComponent = (props: { onBack: () => void }) => JSX.Element;

const Terms = dynamic<LegacyTermsComponent>(
  () =>
    import("@/legacy/components/TermsOfService").then(
      (mod) => mod.TermsOfService,
    ),
  { ssr: false },
);

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <Terms onBack={() => router.push("/")} />
    </main>
  );
}
