import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

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
      className="border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.12)] p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="space-y-4 text-center">
        <h3
          className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg"
          style={{ color: "#5E4934" }}
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
    <div className="flex min-h-full flex-col px-4 py-6 sm:px-6 sm:py-8" lang="he">
      {/* Back button */}
      <div className="mb-4 flex justify-start">
        <button
          type="button"
          onClick={onBack}
          aria-label="חזרה"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-[#5E4934] transition hover:opacity-80"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-['Assistant'] text-sm">חזרה</span>
        </button>
      </div>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-4xl space-y-8 font-['Assistant']" dir="rtl">
            <Card className="mx-auto max-w-3xl border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.12)] p-8 backdrop-blur-xl sm:p-12">
              <div className="space-y-6 text-center">
                <div className="space-y-3">
                  <h1 className="text-[32px] font-bold tracking-wide text-[rgba(254,254,254,1)] drop-shadow-lg">
                    תנאי שימוש ומדיניות פרטיות
                  </h1>
                  <h2
                    className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg"
                    style={{ color: "#5E4934" }}
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
    </div>
  );
}