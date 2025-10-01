"use client";

import { useState, useRef } from "react";
import { GlassButton } from "../shared/GlassButton";
import { Calculator, MessageCircle, Download, Share2 } from "lucide-react";
const backgroundImage = "/images/61a287a191cbe6aa8bcb3bd084132926dd86fada.png";
const logo = "/images/bdac5cb81d27fdfd2e671bace0444b5b16c8c60c.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { codeStructures } from "../../data/codeStructures";
import { digitInterpretations } from "../../data/digitInterpretations";
import { dailyApplication } from "../../data/dailyApplication";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InterpretationsProps {
  code: string;
}

export function Interpretations({ code }: InterpretationsProps) {
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
        
        // חכה שה-DOM יתעדכן
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const element = contentRef.current;
        if (!element) continue;
        
        // הוסף class זמני להסרת backdrop-filter לגוף הדף
        document.body.classList.add('pdf-rendering');
        element.classList.add('pdf-rendering');
        
        // המתן שה-CSS יתעדכן
        await new Promise(resolve => setTimeout(resolve, 200));
        
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
        
        // הסר את ה-class
        element.classList.remove('pdf-rendering');
        document.body.classList.remove('pdf-rendering');
        
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
    window.location.hash = '#/calculator';
  };

  const handleConsultation = () => {
    const whatsappNumber = "972525606008";
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
    <div className="relative min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-8 fullscreen-bg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50 -z-10"
        style={{
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-5xl">
        
        {/* Main Card */}
        <section ref={contentRef} className="glass-card-main rounded-3xl p-6 sm:p-10 mb-8 transition-all duration-500 hover:shadow-[0_12px_40px_0_rgba(94,73,52,0.25)]">
          
          {/* קוד העושר */}
          <h1 className="mb-4 text-center">
            קוד העושר שלך
          </h1>
          
          {/* הצגת הקוד */}
          <div className="mb-6 sm:mb-8 text-center">
            <div 
              className="inline-block px-12 py-6 backdrop-blur-xl bg-white/20 rounded-3xl shadow-[0_6px_24px_0_rgba(94,73,52,0.15),inset_0_2px_4px_0_rgba(255,255,255,0.4)]"
            >
              <div 
                style={{
                  fontSize: 'clamp(4rem, 10vw, 7rem)',
                  fontWeight: '300',
                  color: '#5e4934',
                  letterSpacing: '0.15em',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
          <div className="backdrop-blur-md bg-white/15 rounded-xl p-6 mb-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3)]">
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
            <TabsList className="w-full flex flex-wrap justify-center gap-2 backdrop-blur-xl bg-[#FDFCFB]/95 p-3 rounded-xl mb-6 shadow-[0_4px_16px_0_rgba(94,73,52,0.08)]">
              {uniqueDigits.map((digit, index) => (
                <TabsTrigger
                  key={digit}
                  value={index.toString()}
                  className="
                    backdrop-blur-sm
                    bg-white/50
                    data-[state=active]:bg-[#FDFCFB]
                    data-[state=active]:text-[#473B31]
                    data-[state=active]:shadow-[0_2px_8px_0_rgba(94,73,52,0.12),inset_0_1px_2px_0_rgba(255,255,255,0.8)]
                    text-[#87674F]
                    hover:bg-[#FDFCFB]/80
                    active:scale-95
                    rounded-lg px-4 py-2
                    transition-all duration-300
                    touch-manipulation
                  "
                >
                  {digit}
                </TabsTrigger>
              ))}
              <TabsTrigger
                value="daily"
                className="
                  backdrop-blur-sm
                  bg-white/50
                  data-[state=active]:bg-[#FDFCFB]
                  data-[state=active]:text-[#473B31]
                  data-[state=active]:shadow-[0_2px_8px_0_rgba(94,73,52,0.12),inset_0_1px_2px_0_rgba(255,255,255,0.8)]
                  text-[#87674F]
                  hover:bg-[#FDFCFB]/80
                  active:scale-95
                  rounded-lg px-4 py-2
                  transition-all duration-300
                  touch-manipulation
                "
              >
                יישום יומי
              </TabsTrigger>
            </TabsList>

            {/* תוכן כל ספרה */}
            {uniqueDigits.map((digit, index) => {
              const interpretation = digitInterpretations[digit];
              return (
                <TabsContent key={digit} value={index.toString()} className="mt-6">
                  <div className="glass-card-secondary rounded-xl p-6 sm:p-8 shadow-[0_6px_24px_0_rgba(94,73,52,0.15)]">
                    
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
                    <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)] mb-4">
                      <h4 className="mb-3 text-center">מהות הספרה</h4>
                      <p className="text-center" style={{ lineHeight: '1.0' }}>{interpretation.essence}</p>
                    </div>

                    {/* מתנות מרכזיות */}
                    <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)] mb-4">
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
                    <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)] mb-4">
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
                    <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)] mb-4">
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
                    <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)] mb-4">
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
                    <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)] mb-4">
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
                    <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)] mb-4">
                      <h4 className="mb-3 text-center">דוגמה יומית לתרגול</h4>
                      <p className="text-center" style={{ lineHeight: '1.0' }}>{interpretation.dailyPractice}</p>
                    </div>

                    {/* בשורה התחתונה */}
                    <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
                      <h4 className="mb-3 text-center">בשורה התחתונה</h4>
                      <p className="text-center" style={{ lineHeight: '1.0' }}>{interpretation.bottomLine}</p>
                    </div>
                  </div>
                </TabsContent>
              );
            })}

            {/* יישום יומי */}
            <TabsContent value="daily" className="mt-6">
              <div className="glass-card-secondary rounded-xl p-6 sm:p-8 shadow-[0_6px_24px_0_rgba(94,73,52,0.15)]">
                <h2 className="mb-4 text-center text-[#87674F]">
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

        {/* Logo - Below Card */}
        <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(94,73,52,0.2),inset_0_1px_2px_0_rgba(255,255,255,0.3)] mb-[-30px]">
            <img 
              src={logo} 
              alt="Awakening by Ksenia" 
              className="h-20 sm:h-28 lg:h-36 w-auto max-w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}