"use client";

import { useState, useRef } from "react";
import { GlassButton } from "@/app/components/shared/GlassButton";
import { neumorphismStyles } from "@/app/components/lib/neomorphism-styles";
import { Calculator, MessageCircle, Download, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { codeStructures } from "../../data/codeStructures";
import { digitInterpretations } from "../../data/digitInterpretations";
import { dailyApplication } from "../../data/dailyApplication";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    if (!contentRef.current || isGeneratingPDF) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // שמירת הטאב הנוכחי
      const currentTab = activeTab;
      
      // יצירת array של כל הטאבים שצריך לצלם
      const tabsToCapture = [
        ...uniqueDigits.map((_, index) => index.toString()),
        "daily"
      ];
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      let isFirstPage = true;
      
      // עבור על כל טאב וצלם אותו
      for (const tabValue of tabsToCapture) {
        // החלף לטאב הנוכחי
        setActiveTab(tabValue);
        
-       // חכה שה-DOM יתעדכן
       // חכה שה-DOM יתעדכן בתיאום עם מסגרת האנימציה
       await new Promise(resolve => requestAnimationFrame(() => {
         setTimeout(resolve, 300);
       }));
        
        const element = contentRef.current;
       if (!element) {
         console.warn('Element unmounted during PDF generation');
         break;
       }
        
       try {
          // הוסף class זמני להסרת backdrop-filter לגוף הדף
          document.body.classList.add('pdf-rendering');
          element.classList.add('pdf-rendering');
          
-         // המתן שה-CSS יתעדכן
         // המתן שה-CSS יתעדכן בתיאום עם מסגרת האנימציה
         await new Promise(resolve => requestAnimationFrame(() => {
           setTimeout(resolve, 200);
         }));
          
          // צלם את האלמנט
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#fdfcfb',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            removeContainer: true,
            imageTimeout: 0,
            foreignObjectRendering: false,
            allowTaint: true
          });
          
-         // הסר את ה-class
-         element.classList.remove('pdf-rendering');
         // ... rest of PDF logic
       } finally {
         // Always cleanup classes even if an error occurs
         element.classList.remove('pdf-rendering');
         document.body.classList.remove('pdf-rendering');
       }
      }
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // אם זה לא העמוד הראשון, הוסף עמוד חדש
        if (!isFirstPage) {
          pdf.addPage();
        }
        isFirstPage = false;
        
        // אם התוכן גבוה מדי, חלק אותו לעמודים
        if (imgHeight > 297) { // A4 height
          let heightLeft = imgHeight;
          let position = 0;
          
          while (heightLeft > 0) {
            if (position > 0) {
              pdf.addPage();
            }
            
            pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
            heightLeft -= 297;
            position += 297;
          }
        } else {
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }
      }
      
      // שמירת ה-PDF
      pdf.save(`קוד-עושר-${code}.pdf`);
      
      // החזר לטאב המקורי
      setActiveTab(currentTab);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('אירעה שגיאה ביצירת ה-PDF. אנא נסה שוב.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleCalculateAnother = () => {
    onCalculateAnother();
  };

  const handleConsultation = () => {
    const whatsappNumber = "972524616121";
    const message = encodeURIComponent("היי, אשמח לתיאום יעוץ אישי");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleShare = () => {
    const shareUrl = "https://abyk.online/";
    const shareText = "גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית";
    const message = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="relative min-h-[calc(100vh-var(--header-height))] pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-5xl">
        
        {/* Main Card */}
        <section 
          ref={contentRef} 
          className="rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 mb-8 border-0 transition-all duration-500"
          style={neumorphismStyles.card.main}
        >
          
          {/* קוד העושר */}
          <h1 className="mb-8 sm:mb-10 text-center">
            קוד העושר שלך
          </h1>
          
          {/* הצגת הקוד */}
          <div className="mb-8 sm:mb-10 text-center">
            <div 
              className="inline-block px-12 py-6 rounded-3xl border-0"
              style={{
                background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240))',
                boxShadow: `
                  20px 20px 60px rgba(159, 133, 114, 0.25),
                  -20px -20px 60px rgba(255, 255, 255, 0.9),
                  inset 2px 2px 6px rgba(255, 255, 255, 0.8),
                  inset -2px -2px 6px rgba(211, 198, 189, 0.1)
                `
              }}
            >
              <div 
                style={{
                  fontSize: 'clamp(4rem, 10vw, 7rem)',
                  fontWeight: '300',
                  color: '#87674F',
                  letterSpacing: '0.15em',
                  textShadow: '0 2px 8px rgba(135, 103, 79, 0.15)',
                  textAlign: 'center'
                }}
              >
                {code}
              </div>
            </div>
          </div>

          {/* מבוא קבוע */}
          <div className="mb-6">
            <p className="text-center" style={{ lineHeight: '1.0' }}>
              {codeStructures.intro}
            </p>
          </div>

          {/* הסבר על מבנה הקוד */}
          <div 
            className="rounded-2xl p-6 mb-6 border-0"
            style={neumorphismStyles.card.secondary}
          >
            <h3 className="mb-4 text-center">
              {codeType === "master" && "קוד מאסטר - כל הספרות זהות"}
              {codeType === "repeating" && "קוד עם ספרות חוזרות - אנרגיות מועצמות"}
              {codeType === "diverse" && "קוד מגוון - כל הספרות שונות"}
            </h3>
            <p className="text-center" style={{ lineHeight: '1.0' }}>
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
                    className="rounded-2xl p-6 sm:p-8 border-0"
                    style={neumorphismStyles.card.secondary}
                  >
                    
                    {/* כותרת הספרה */}
                    <div className="text-center mb-8">
                      <div className="text-[#5e4934] mb-2" style={{ fontSize: '48px', fontWeight: '300', letterSpacing: '0.15em', textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        {digit}
                      </div>
                      <h2 className="text-[#5e4934]">
                        {interpretation.title}
                      </h2>
                    </div>

                    {/* מהות הספרה */}
                    <div 
                      className="rounded-xl p-4 mb-4 border-0"
                      style={{
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(250, 248, 246))',
                        boxShadow: `
                          inset 4px 4px 8px rgba(159, 133, 114, 0.08),
                          inset -4px -4px 8px rgba(255, 255, 255, 0.9)
                        `
                      }}
                    >
                      <h4 className="mb-3 text-center">מהות הספרה</h4>
                      <p className="text-center" style={{ lineHeight: '1.0' }}>{interpretation.essence}</p>
                    </div>

                    {/* מתנות מרכזיות */}
                    <div 
                      className="rounded-xl p-4 mb-4 border-0"
                      style={{
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(250, 248, 246))',
                        boxShadow: `
                          inset 4px 4px 8px rgba(159, 133, 114, 0.08),
                          inset -4px -4px 8px rgba(255, 255, 255, 0.9)
                        `
                      }}
                    >
                      <h4 className="mb-3 text-center">מתנות מרכזיות</h4>
                      <ul className="space-y-2">
                        {interpretation.gifts.map((gift, i) => {
                          const parts = gift.split(' – ');
                          return (
                            <li key={i} className="text-center" style={{ lineHeight: '1.0' }}>
                              {parts.length >= 2 ? (
                                <>
                                  <span style={{ fontWeight: 700 }}>{parts[0]}</span>
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
                      className="rounded-xl p-4 mb-4 border-0"
                      style={{
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(250, 248, 246))',
                        boxShadow: `
                          inset 4px 4px 8px rgba(159, 133, 114, 0.08),
                          inset -4px -4px 8px rgba(255, 255, 255, 0.9)
                        `
                      }}
                    >
                      <h4 className="mb-3 text-center">חסימות ואתגרים עיקריים</h4>
                      <ul className="space-y-2">
                        {interpretation.blocks.map((block, i) => {
                          const parts = block.split(' – ');
                          return (
                            <li key={i} className="text-center" style={{ lineHeight: '1.0' }}>
                              {parts.length >= 2 ? (
                                <>
                                  <span style={{ fontWeight: 700 }}>{parts[0]}</span>
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
                      className="rounded-xl p-4 mb-4 border-0"
                      style={{
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(250, 248, 246))',
                        boxShadow: `
                          inset 4px 4px 8px rgba(159, 133, 114, 0.08),
                          inset -4px -4px 8px rgba(255, 255, 255, 0.9)
                        `
                      }}
                    >
                      <h4 className="mb-3 text-center">נורות אדומות – סימנים לחוסר איזון</h4>
                      <ul className="space-y-2">
                        {interpretation.redFlags.map((flag, i) => {
                          const parts = flag.split(' – ');
                          return (
                            <li key={i} className="text-center" style={{ lineHeight: '1.0' }}>
                              {parts.length >= 2 ? (
                                <>
                                  <span style={{ fontWeight: 700 }}>{parts[0]}</span>
                                  {' – '}
                                  {parts.slice(1).join(' – ')}
                                </>
                              ) : (
                                flag
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* מוקדי צמיחה */}
                    <div 
                      className="rounded-xl p-4 mb-4 border-0"
                      style={{
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(250, 248, 246))',
                        boxShadow: `
                          inset 4px 4px 8px rgba(159, 133, 114, 0.08),
                          inset -4px -4px 8px rgba(255, 255, 255, 0.9)
                        `
                      }}
                    >
                      <h4 className="mb-3 text-center">מוקדי צמיחה והתפתחות</h4>
                      <ul className="space-y-2">
                        {interpretation.growth.map((growth, i) => {
                          const parts = growth.split(' – ');
                          return (
                            <li key={i} className="text-center" style={{ lineHeight: '1.0' }}>
                              {parts.length >= 2 ? (
                                <>
                                  <span style={{ fontWeight: 700 }}>{parts[0]}</span>
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
                      className="rounded-xl p-4 mb-4 border-0"
                      style={{
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(250, 248, 246))',
                        boxShadow: `
                          inset 4px 4px 8px rgba(159, 133, 114, 0.08),
                          inset -4px -4px 8px rgba(255, 255, 255, 0.9)
                        `
                      }}
                    >
                      <h4 className="mb-3 text-center">תחומים מתאימים לקריירה ולשליחות</h4>
                      <ul className="space-y-2">
                        {interpretation.careers.map((career, i) => {
                          const parts = career.split(' – ');
                          return (
                            <li key={i} className="text-center" style={{ lineHeight: '1.0' }}>
                              {parts.length >= 2 ? (
                                <>
                                  <span style={{ fontWeight: 700 }}>{parts[0]}</span>
                                  {' – '}
                                  {parts.slice(1).join(' – ')}
                                </>
                              ) : (
                                career
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* דוגמה יומית */}
                    <div 
                      className="rounded-xl p-4 mb-4 border-0"
                      style={{
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(250, 248, 246))',
                        boxShadow: `
                          inset 4px 4px 8px rgba(159, 133, 114, 0.08),
                          inset -4px -4px 8px rgba(255, 255, 255, 0.9)
                        `
                      }}
                    >
                      <h4 className="mb-3 text-center">דוגמה יומית לתרגול</h4>
                      <p className="text-center" style={{ lineHeight: '1.0' }}>{interpretation.dailyPractice}</p>
                    </div>

                    {/* בשורה התחתונה */}
                    <div 
                      className="rounded-xl p-4 border-0"
                      style={{
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(250, 248, 246))',
                        boxShadow: `
                          inset 4px 4px 8px rgba(159, 133, 114, 0.08),
                          inset -4px -4px 8px rgba(255, 255, 255, 0.9)
                        `
                      }}
                    >
                      <h4 className="mb-3 text-center">בשורה התחתונה</h4>
                      <p className="text-center" style={{ lineHeight: '1.0' }}>{interpretation.bottomLine}</p>
                    </div>
                  </div>
                </TabsContent>
              );
            })}

            {/* יישום יומי */}
            <TabsContent value="daily" className="mt-6">
              <div 
                className="rounded-2xl p-6 sm:p-8 border-0"
                style={neumorphismStyles.card.secondary}
              >
                <h2 className="mb-4 text-center">
                  {dailyApplication.title}
                </h2>
                <p className="text-center whitespace-pre-line" style={{ lineHeight: '1.0' }}>
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