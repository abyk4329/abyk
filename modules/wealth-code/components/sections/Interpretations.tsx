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
    <div className="relative min-h-[calc(100vh-var(--header-height))] pb-6 pt-2 sm:pt-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-5xl">
        
        {/* Main Card */}
        <section 
          ref={contentRef} 
          className="neuro-card-main rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 mb-8 border-0 transition-all duration-500"
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

          {/* Tabs לפירושים */}
          <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl" className="w-full">
            <TabsList 
              className="w-full flex flex-wrap justify-center gap-2 p-3 rounded-2xl mb-6 border-0"
              style={{
                background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240))',
                boxShadow: `
                  12px 12px 24px rgba(159, 133, 114, 0.15),
                  -12px -12px 24px rgba(255, 255, 255, 0.9),
                  inset 1px 1px 2px rgba(255, 255, 255, 0.6)
                `
              }}
            >
              {uniqueDigits.map((digit, index) => (
                <TabsTrigger
                  key={digit}
                  value={index.toString()}
                  className="
                    border-0
                    data-[state=active]:text-[#473B31]
                    text-[#87674F]
                    active:scale-95
                    rounded-lg px-4 py-2
                    transition-all duration-300
                    touch-manipulation
                  "
                  style={{
                    background: 'transparent'
                  }}
                  data-state={activeTab === index.toString() ? 'active' : 'inactive'}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    if (activeTab !== index.toString()) {
                      e.currentTarget.style.background = 'linear-gradient(145deg, rgb(253, 252, 251), rgb(245, 241, 237))';
                      e.currentTarget.style.boxShadow = `
                        inset 3px 3px 6px rgba(159, 133, 114, 0.08),
                        inset -3px -3px 6px rgba(255, 255, 255, 0.8)
                      `;
                    }
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    if (activeTab !== index.toString()) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {digit}
                </TabsTrigger>
              ))}
              <TabsTrigger
                value="daily"
                className="
                  border-0
                  data-[state=active]:text-[#473B31]
                  text-[#87674F]
                  active:scale-95
                  rounded-lg px-4 py-2
                  transition-all duration-300
                  touch-manipulation
                "
                style={{
                  background: 'transparent'
                }}
                data-state={activeTab === 'daily' ? 'active' : 'inactive'}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (activeTab !== 'daily') {
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgb(253, 252, 251), rgb(245, 241, 237))';
                    e.currentTarget.style.boxShadow = `
                      inset 3px 3px 6px rgba(159, 133, 114, 0.08),
                      inset -3px -3px 6px rgba(255, 255, 255, 0.8)
                    `;
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  if (activeTab !== 'daily') {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                יישום יומי
              </TabsTrigger>
            </TabsList>

            {/* תוכן כל ספרה */}
            {uniqueDigits.map((digit, index) => {
              const interpretation = digitInterpretations[digit];
              return (
                <TabsContent key={digit} value={index.toString()} className="mt-6">
                  <div 
                    className="neuro-card-secondary rounded-2xl p-6 sm:p-8 border-0"
                  >
                    
                    {/* כותרת הספרה */}
                    <div className="text-center mb-8">
                      <div className={["text-[#5e4934]", "mb-2", styles.digitNumber].join(" ")}>
                        {digit}
                      </div>
                      <h2 className="text-[#5e4934]">
                        {interpretation.title}
                      </h2>
                    </div>

                    {/* מהות הספרה */}
                    <div 
                      className={["rounded-xl", "p-4", "mb-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">מהות הספרה</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>{interpretation.essence}</p>
                    </div>

                    {/* מתנות מרכזיות */}
                    <div 
                      className={["rounded-xl", "p-4", "mb-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">מתנות מרכזיות</h4>
                      <ul className="space-y-2">
                        {interpretation.gifts.map((gift, i) => {
                          const parts = gift.split(' – ');
                          return (
                            <li key={i} className={["text-center", styles.tightLineHeight].join(" ")}>
                              {parts.length >= 2 ? (
                                <>
                                  <span className={styles.boldText}>{parts[0]}</span>
                                  {' – '}
                                  {parts.slice(1).join(' – ')}
                                </>
                              ) : (
                                gift
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* חסימות ואתגרים */}
                    <div 
                      className={["rounded-xl", "p-4", "mb-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">חסימות ואתגרים עיקריים</h4>
                      <ul className="space-y-2">
                        {interpretation.blocks.map((block, i) => {
                          const parts = block.split(' – ');
                          return (
                            <li key={i} className={["text-center", styles.tightLineHeight].join(" ")}>
                              {parts.length >= 2 ? (
                                <>
                                  <span className={styles.boldText}>{parts[0]}</span>
                                  {' – '}
                                  {parts.slice(1).join(' – ')}
                                </>
                              ) : (
                                block
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* נורות אדומות */}
                    <div 
                      className={["rounded-xl", "p-4", "mb-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">נורות אדומות – סימנים לחוסר איזון</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>
                        {interpretation.redFlags}
                      </p>
                    </div>

                    {/* מוקדי צמיחה */}
                    <div 
                      className={["rounded-xl", "p-4", "mb-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">מוקדי צמיחה והתפתחות</h4>
                      <ul className="space-y-2">
                        {interpretation.growth.map((growth, i) => {
                          const parts = growth.split(' – ');
                          return (
                            <li key={i} className={["text-center", styles.tightLineHeight].join(" ")}>
                              {parts.length >= 2 ? (
                                <>
                                  <span className={styles.boldText}>{parts[0]}</span>
                                  {' – '}
                                  {parts.slice(1).join(' – ')}
                                </>
                              ) : (
                                growth
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* תחומי קריירה */}
                    <div 
                      className={["rounded-xl", "p-4", "mb-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">תחומים מתאימים לקריירה ולשליחות</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>
                        {interpretation.careers}
                      </p>
                    </div>

                    {/* דוגמה יומית */}
                    <div 
                      className={["rounded-xl", "p-4", "mb-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">דוגמה יומית לתרגול</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>{interpretation.dailyPractice}</p>
                    </div>

                    {/* בשורה התחתונה */}
                    <div 
                      className={["rounded-xl", "p-4", "border-0", styles.sectionCard].join(" ")}
                    >
                      <h4 className="mb-3 text-center">בשורה התחתונה</h4>
                      <p className={["text-center", styles.tightLineHeight].join(" ")}>{interpretation.bottomLine}</p>
                    </div>
                  </div>
                </TabsContent>
              );
            })}

            {/* יישום יומי */}
            <TabsContent value="daily" className="mt-6">
              <div 
                className="neuro-card-secondary rounded-2xl p-6 sm:p-8 border-0"
              >
                <h2 className="mb-4 text-center">
                  {dailyApplication.title}
                </h2>
                <p className={["text-center", "whitespace-pre-line", styles.tightLineHeight].join(" ")}>
                  {dailyApplication.content}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* כפתורים */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <GlassButton 
              onClick={handleDownload} 
              className="w-full"
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

            <GlassButton onClick={handleCalculateAnother} className="w-full">
              <div className="flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5" />
                <span>לחישוב קוד נוסף</span>
              </div>
            </GlassButton>

            <GlassButton onClick={handleConsultation} className="w-full">
              <div className="flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>לתיאום יעוץ אישי</span>
              </div>
            </GlassButton>

            <GlassButton onClick={handleShare} className="w-full">
              <div className="flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                <span>שתפו עם חברים</span>
              </div>
            </GlassButton>
          </div>
        </section>
      </div>
    </div>
  );
}