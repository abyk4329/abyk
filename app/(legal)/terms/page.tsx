import type { Metadata } from "next";

import { TermsPrivacy } from "@/app/components/sections";

export const metadata: Metadata = {
  title: "תנאי שימוש ומדיניות פרטיות",
  description:
    "תנאי השימוש ומדיניות הפרטיות של Awakening by Ksenia הכוללים מידע על שימוש בעוגיות, הגנה על נתונים וזכויות המשתמשים.",
};

export default function TermsPage() {
  return <TermsPrivacy />;
}
