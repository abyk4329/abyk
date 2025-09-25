import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Footer } from "./Footer";
import {
  POLICY_UPDATED_AT,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  TERMS_INTRO,
  TERMS_SECTIONS,
  type PolicyParagraph,
  type PolicySection,
} from "@/data/policyTexts";

type TabKey = "terms" | "privacy";

interface TermsAndPrivacyProps {
  onBack: () => void;
  initialTab?: TabKey;
}

export function TermsAndPrivacy({
  onBack,
  initialTab = "terms",
}: TermsAndPrivacyProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("page", activeTab === "privacy" ? "privacy" : "terms");
    window.history.replaceState(
      {},
      document.title,
      `${window.location.pathname}?${params.toString()}`,
    );
  }, [activeTab]);

  const { sections, introParagraphs } = useMemo(() => {
    return activeTab === "terms"
      ? { sections: TERMS_SECTIONS, introParagraphs: TERMS_INTRO }
      : { sections: PRIVACY_SECTIONS, introParagraphs: PRIVACY_INTRO };
  }, [activeTab]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const renderParagraph = (paragraph: PolicyParagraph, index: number) => {
    if (paragraph.type === "email") {
      return (
        <p
          key={`${paragraph.address}-${index}`}
          className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <Mail className="h-5 w-5 text-[rgba(71,59,49,1)]" />
            {paragraph.prefix ? (
              <span>{paragraph.prefix}</span>
            ) : null}
            <a
              href={`mailto:${paragraph.address}`}
              className="font-normal tracking-wide text-[rgba(71,59,49,1)] underline decoration-[rgba(71,59,49,0.4)] transition-colors duration-200 hover:text-[rgba(71,59,49,0.8)] hover:decoration-[rgba(71,59,49,0.8)]"
            >
              {paragraph.address}
            </a>
          </span>
        </p>
      );
    }

    return (
      <p
        key={`${paragraph.text}-${index}`}
        className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md"
      >
        {paragraph.text}
      </p>
    );
  };

  const renderSection = (section: PolicySection) => (
    <Card
      key={section.title}
      className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8"
    >
      <div className="space-y-4 text-center">
        <h3
          className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg"
          style={{ color: "#473B31" }}
        >
          {section.title}
        </h3>
        <div className="space-y-3 text-center">
          {section.paragraphs.map(renderParagraph)}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="relative min-h-screen" lang="he">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20" />
        <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="border-b border-white/30 bg-[rgba(254,254,254,0.12)] shadow-xl backdrop-blur-lg sm:border-white/25 sm:backdrop-blur-md">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="w-16">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="border-0 p-2 font-['Assistant'] font-normal tracking-wide text-[rgba(254,254,254,1)] hover:bg-white/15 hover:text-white/90"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </div>

              <span
                className="text-center font-['Assistant'] text-xs font-normal tracking-[0.25em] drop-shadow-lg sm:text-sm md:text-lg"
                style={{ color: "#473B31" }}
                dir="ltr"
              >
                YOUR PERSONAL SPACE FOR GROWTH
              </span>

              <div className="w-16" />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-4xl space-y-8 font-['Assistant']" dir="rtl">
            <Card className="mx-auto max-w-3xl border border-white/20 bg-[rgba(254,254,254,0.1)] p-8 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-12">
              <div className="space-y-6 text-center">
                <div className="space-y-3">
                  <h1 className="text-[32px] font-bold tracking-wide text-[rgba(254,254,254,1)] drop-shadow-lg">
                    תנאי שימוש ומדיניות פרטיות
                  </h1>
                  <h2
                    className="text-[24px] font-bold tracking-wide drop-shadow-lg"
                    style={{ color: "#473B31" }}
                  >
                    Awakening by Ksenia
                  </h2>
                  <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                    תאריך עדכון אחרון: {POLICY_UPDATED_AT}
                  </p>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Button
                    onClick={() => handleTabChange("terms")}
                    className={`font-normal transition-all duration-300 font-['Assistant'] tracking-wide ${
                      activeTab === "terms"
                        ? "bg-[rgba(149,112,82,0.5)] hover:bg-[rgba(149,112,82,0.7)] border-none text-[rgba(254,254,254,1)] shadow-lg"
                        : "bg-[rgba(149,112,82,0.2)] hover:bg-[rgba(149,112,82,0.4)] border-none text-[rgba(254,254,254,0.8)]"
                    }`}
                  >
                    תנאי שימוש
                  </Button>
                  <Button
                    onClick={() => handleTabChange("privacy")}
                    className={`font-normal transition-all duration-300 font-['Assistant'] tracking-wide ${
                      activeTab === "privacy"
                        ? "bg-[rgba(149,112,82,0.5)] hover:bg-[rgba(149,112,82,0.7)] border-none text-[rgba(254,254,254,1)] shadow-lg"
                        : "bg-[rgba(149,112,82,0.2)] hover:bg-[rgba(149,112,82,0.4)] border-none text-[rgba(254,254,254,0.8)]"
                    }`}
                  >
                    מדיניות פרטיות
                  </Button>
                </div>

                <div className="space-y-3 text-center">
                  {introParagraphs.map((paragraph, index) => (
                    <p
                      key={`${activeTab}-intro-${index}`}
                      className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Card>

            {sections.map(renderSection)}
          </div>
        </main>

        <div className="flex justify-center pb-6">
          <Image
            src={logoImage}
            alt="AWAKENING"
            className="h-32 w-auto opacity-90 drop-shadow-lg sm:h-40"
            priority
          />
        </div>

        <Footer
          onShowTerms={() => handleTabChange("terms")}
          onShowPrivacy={() => handleTabChange("privacy")}
          onShowTermsAndPrivacy={() => handleTabChange("terms")}
        />
      </div>
    </div>
  );
}