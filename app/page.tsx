import { PageLayout } from "@/app/components/layout/PageLayout";
import {
  HeroSection,
  CalculatorSection,
  InterpretationsSection,
  DesignShowcaseSection,
} from "@/app/components/sections";

export default function Home() {
  return (
    <PageLayout className="space-y-12" maxWidth="xl">
      <HeroSection />
      <CalculatorSection variant="compact" />
      <InterpretationsSection />
      <DesignShowcaseSection />
    </PageLayout>
  );
}
