import type { Metadata } from "next";

import { StandardPageLayout } from "@/app/components/layout/StandardPageLayout";
import { TermsPrivacy } from "@/app/components/sections";

export const metadata: Metadata = {
  title: "תנאי שימוש ומדיניות פרטיות",
  description:
    "תנאי השימוש ומדיניות הפרטיות של Awakening by Ksenia הכוללים מידע על שימוש בעוגיות, הגנה על נתונים וזכויות המשתמשים.",
};

export default function PrivacyPage() {
  return (
    <StandardPageLayout maxWidth="lg">
      <TermsPrivacy />
    </StandardPageLayout>
  );
}
