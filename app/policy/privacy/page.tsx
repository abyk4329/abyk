"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

type LegacyPrivacyComponent = (props: { onBack: () => void }) => JSX.Element;

const Privacy = dynamic<LegacyPrivacyComponent>(
  () =>
    import("@/legacy/components/PrivacyPolicy").then(
      (mod) => mod.PrivacyPolicy,
    ),
  { ssr: false },
);

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <Privacy onBack={() => router.push("/")} />
    </main>
  );
}
