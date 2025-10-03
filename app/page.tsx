import { PageLayout } from "@/app/components/layout/PageLayout";
import {
  Calculator,
  Hero,
  Interpretations,
} from "@/modules/wealth-code/components";
import { DesignShowcaseSection } from "@/app/components/sections";

export default function Home() {
  return (
    <PageLayout className="space-y-12" maxWidth="xl">
      <Hero />
      <Calculator variant="compact" />
      <Interpretations />
      <DesignShowcaseSection />
    </PageLayout>
  );
}
