"use client";

import { useState, useRef } from "react";
import { GlassButton } from "@/app/components/shared/GlassButton";
import { Calculator, MessageCircle, Download, Share2 } from "lucide-react";
import { CodeInset } from "../shared/CodeInset";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { codeStructures } from "../../data/codeStructures";
import { digitInterpretations } from "../../data/digitInterpretations";
import { dailyApplication } from "../../data/dailyApplication";
import styles from "./Interpretations.module.css";
import { SOCIAL } from "@/lib/constants";
import { publicEnv } from "@/lib/env";

interface InterpretationsProps {
  code: string;
  onCalculateAnother: () => void;
}

export function Interpretations({ code, onCalculateAnother }: InterpretationsProps) {
  const [activeTab, setActiveTab] = useState<string>("0");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // קבלת ספרות ייחודיות בסדר עולה
  const uniqueDigits = Array.from(new Set(code.split("")))
    .sort()
    .map(d => parseInt(d));
  
  // זיהוי סוג הקוד
  const getCodeType = (): "master" | "repeating" | "diverse" => {
    const digits = code.split("");
    const uniqueCount = new Set(digits).size;
    
    if (uniqueCount === 1) return "master";
    if (uniqueCount === 4) return "diverse";
    return "repeating";
  };

  const codeType = getCodeType();
  const structureText = codeStructures[codeType];

  // פונקציה להורדת PDF
  const handleDownload = async () => {
    setIsGeneratingPDF(true);

    try {
      // Call the PDF generation API
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          userName: "", // Add user name if available
          userEmail: "", // Add user email if available
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const data = await response.json();
      
      if (!data.ok || !data.pdfBase64) {
        throw new Error(data.error || "Failed to generate PDF");
      }

      // Convert base64 to blob
      const byteCharacters = atob(data.pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `wealth-code-${code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleCalculateAnother = () => {
    onCalculateAnother();
  };
  const handleConsultation = () => {
    window.open(SOCIAL.whatsapp.getUrl(), "_blank");
  };

  const handleShare = () => {
    const shareUrl = publicEnv.appUrl || "https://abyk.online/";
    const shareText = "גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית";
    const message = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <section className={["hero-shell", styles.viewportFrame].join(" ")}>
      <div
        className={[
          "relative z-10 mx-auto w-full px-0",
          styles.contentContainer,
        ].join(" ")}
      >
        {/* Main Card */}
        <section 
          ref={contentRef} 
          data-hero-group="b"
          className={["neuro-card-main", "hero-card", styles.heroCardAdjust, "rounded-[32px]", "sm:rounded-[40px]", "mb-8", "border-0", "transition-all", "duration-500"].join(" ")}
        >
          
          {/* קוד העושר */}
          <h1 className={["mb-8 sm:mb-10 text-center", styles.mainHeading].join(" ")}>
            קוד העושר שלך
          </h1>
          
          {/* הצגת הקוד - כרטיסיה שקועה משותפת */}
          <div className="mb-8 sm:mb-10 text-center">
            <CodeInset code={code} />
          </div>

          {/* מבוא קבוע */}
          <div className="mb-6">
            <p className={["text-center", styles.tightLineHeight].join(" ")}>
              {codeStructures.intro}
            </p>
          </div>

          {/* הסבר על מבנה הקוד */}
          {/* Code Display Card */}
          <div
            className="neuro-card-inset rounded-2xl p-6 sm:p-8 mb-8 border-0"
          >
            <h3 className="mb-4 text-center subheading-h3">
              {codeType === "master" && "קוד מאסטר - כל הספרות זהות"}
              {codeType === "repeating" && "קוד עם ספרות חוזרות - אנרגיות מועצמות"}
              {codeType === "diverse" && "קוד מגוון - כל הספרות שונות"}
            </h3>
            <p className={["text-center", styles.tightLineHeight].join(" ")}>
              {structureText}
            </p>
          </div>

        </section>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          dir="rtl"
          className={styles.tabsRoot}
        >
          <section
            className={[
              "neuro-card-main",
              "border-0",
              "rounded-[32px]",
              styles.tabsCard,
            ].join(" ")}
          >
            <TabsList className={styles.tabsList}>
              {uniqueDigits.map((digit, index) => (
                <TabsTrigger
                  key={digit}
                  value={index.toString()}
                  className={styles.tabTrigger}
                >
                  {digit}
                </TabsTrigger>
              ))}
              <TabsTrigger value="daily" className={styles.tabTrigger}>
                יישום יומי
              </TabsTrigger>
            </TabsList>
          </section>

          {uniqueDigits.map((digit, index) => {
            const interpretation = digitInterpretations[digit];
            return (
              <TabsContent key={digit} value={index.toString()} className={styles.tabPanel}>
                <section
                  className={[
                    "neuro-card-main",
                    "border-0",
                    "rounded-[32px]",
                    styles.digitCard,
                  ].join(" ")}
                >
                  <div className={styles.digitHeader}>
                    <div className={["text-[#5e4934]", styles.digitNumber].join(" ")}>
                      {digit}
                    </div>
                    <h2 className="text-[#5e4934]">{interpretation.title}</h2>
                  </div>

                  <div className={styles.digitSections}>
                    <div
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">מהות הספרה</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>
                        {interpretation.essence}
                      </p>
                    </div>

                    <div
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">מתנות מרכזיות</h4>
                      <ul className="space-y-2">
                        {interpretation.gifts.map((gift, i) => {
                          const parts = gift.split(" – ");
                          return (
                            <li key={i} className={["text-center", styles.tightLineHeight].join(" ")}>
                              {parts.length >= 2 ? (
                                <>
                                  <span className={styles.boldText}>{parts[0]}</span>
                                  {" – "}
                                  {parts.slice(1).join(" – ")}
                                </>
                              ) : (
                                gift
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">חסימות ואתגרים עיקריים</h4>
                      <ul className="space-y-2">
                        {interpretation.blocks.map((block, i) => {
                          const parts = block.split(" – ");
                          return (
                            <li key={i} className={["text-center", styles.tightLineHeight].join(" ")}>
                              {parts.length >= 2 ? (
                                <>
                                  <span className={styles.boldText}>{parts[0]}</span>
                                  {" – "}
                                  {parts.slice(1).join(" – ")}
                                </>
                              ) : (
                                block
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">נורות אדומות – סימנים לחוסר איזון</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>
                        {interpretation.redFlags}
                      </p>
                    </div>

                    <div
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">מוקדי צמיחה והתפתחות</h4>
                      <ul className="space-y-2">
                        {interpretation.growth.map((growth, i) => {
                          const parts = growth.split(" – ");
                          return (
                            <li key={i} className={["text-center", styles.tightLineHeight].join(" ")}>
                              {parts.length >= 2 ? (
                                <>
                                  <span className={styles.boldText}>{parts[0]}</span>
                                  {" – "}
                                  {parts.slice(1).join(" – ")}
                                </>
                              ) : (
                                growth
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">תחומים מתאימים לקריירה ולשליחות</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>
                        {interpretation.careers}
                      </p>
                    </div>

                    <div
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">דוגמה יומית לתרגול</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>
                        {interpretation.dailyPractice}
                      </p>
                    </div>

                    <div
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">בשורה התחתונה</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>
                        {interpretation.bottomLine}
                      </p>
                    </div>
                  </div>
                </section>
              </TabsContent>
            );
          })}

          <TabsContent value="daily" className={styles.tabPanel}>
            <section
              className={[
                "neuro-card-main",
                "border-0",
                "rounded-[32px]",
                styles.digitCard,
              ].join(" ")}
            >
              <div className={styles.digitHeader}>
                <h2 className="text-[#5e4934]">{dailyApplication.title}</h2>
              </div>
              <div
                className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
              >
                <p
                  className={["text-center", "whitespace-pre-line", styles.tightLineHeight].join(" ")}
                >
                  {dailyApplication.content}
                </p>
              </div>
            </section>
          </TabsContent>
        </Tabs>

        <section
          className={[
            "neuro-card-main",
            "border-0",
            "rounded-[32px]",
            styles.actionsCard,
          ].join(" ")}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassButton
              onClick={handleDownload}
              className={["w-full", styles.actionButton].join(" ")}
              disabled={isGeneratingPDF}
            >
              <div className="flex items-center justify-center gap-2">
                {isGeneratingPDF ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>יוצר PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>להורדה כ-PDF</span>
                  </>
                )}
              </div>
            </GlassButton>

            <GlassButton
              onClick={handleCalculateAnother}
              className={["w-full", styles.actionButton].join(" ")}
            >
              <div className="flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5" />
                <span>לחישוב קוד נוסף</span>
              </div>
            </GlassButton>

            <GlassButton
              onClick={handleConsultation}
              className={["w-full", styles.actionButton].join(" ")}
            >
              <div className="flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>לתיאום יעוץ אישי</span>
              </div>
            </GlassButton>

            <GlassButton
              onClick={handleShare}
              className={["w-full", styles.actionButton].join(" ")}
            >
              <div className="flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                <span>שתפו עם חברים</span>
              </div>
            </GlassButton>
          </div>
        </section>
      </div>
    </section>
  );
}