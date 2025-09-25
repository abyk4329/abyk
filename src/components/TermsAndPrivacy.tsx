import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import Header from "./Header";
import { Footer } from './Footer';
import { useState } from 'react';

interface TermsAndPrivacyProps {
  onBack: () => void;
  initialTab?: 'terms' | 'privacy';
}

export function TermsAndPrivacy({ onBack, initialTab = 'terms' }: TermsAndPrivacyProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="relative min-h-screen" lang="he">
      {/* Overlays over global body background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102 absolute inset-0"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
  <header className="border-b border-white/30 bg-[rgba(254,254,254,0.12)] shadow-xl backdrop-blur-lg sm:border-white/25 sm:backdrop-blur-md">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between">
              {/* Spacer for balance */}
              <div className="w-16">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="border-0 p-2 font-['Assistant'] font-normal tracking-wide text-[rgba(254,254,254,1)] hover:bg-white/15 hover:text-white/90"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Centered tagline */}
              <span
                className="text-center font-['Assistant'] text-xs font-normal tracking-[0.25em] drop-shadow-lg sm:text-sm md:text-lg"
                style={{ color: "#473B31" }}
                dir="ltr"
              >
                YOUR PERSONAL SPACE FOR GROWTH
              </span>
              
              {/* Spacer for balance */}
              <div className="w-16"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-4xl space-y-8 font-['Assistant']" dir="rtl">
            
            {/* Header */}
            <div className="text-center">
              <Card className="bg-white/12 mx-auto max-w-3xl border border-white/20 bg-[rgba(254,254,254,0.1)] p-8 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-12">
                <div className="space-y-6">
                  <h1 className="text-center font-['Assistant'] text-[32px] font-bold tracking-wide text-[rgba(254,254,254,1)] drop-shadow-lg">
                    תנאי שימוש ומדיניות פרטיות
                  </h1>
                  <h2 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                    Awakening by Ksenia
                  </h2>
                  
                  {/* Tab Navigation */}
                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      onClick={() => setActiveTab('terms')}
                      className={`font-normal transition-all duration-300 font-['Assistant'] tracking-wide ${
                        activeTab === 'terms'
                          ? 'bg-[rgba(149,112,82,0.5)] hover:bg-[rgba(149,112,82,0.7)] border-none text-[rgba(254,254,254,1)] shadow-lg'
                          : 'bg-[rgba(149,112,82,0.2)] hover:bg-[rgba(149,112,82,0.4)] border-none text-[rgba(254,254,254,0.8)]'
                      }`}
                    >
                      תנאי שימוש
                    </Button>
                    <Button
                      onClick={() => setActiveTab('privacy')}
                      className={`font-normal transition-all duration-300 font-['Assistant'] tracking-wide ${
                        activeTab === 'privacy'
                          ? 'bg-[rgba(149,112,82,0.5)] hover:bg-[rgba(149,112,82,0.7)] border-none text-[rgba(254,254,254,1)] shadow-lg'
                          : 'bg-[rgba(149,112,82,0.2)] hover:bg-[rgba(149,112,82,0.4)] border-none text-[rgba(254,254,254,0.8)]'
                      }`}
                    >
                      מדיניות פרטיות
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Terms of Service Content */}
            {activeTab === 'terms' && (
              <div className="space-y-8">
                {/* Introduction */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <p className="text-center text-lg font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                      נכנסו לתוקף בתאריך: 22.09.2025
                    </p>
                    <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                      האתר Awakening by Ksenia (להלן: „האתר") מופעל על ידי צ׳ודנובסקי קסניה אוריה (להלן: „המפעילה"). שימוש באתר, לרבות רכישת מוצרים דיגיטליים, מהווה הסכמה מלאה ומפורשת לתנאי שימוש אלה. אם אינך מסכים/ה לתנאים, מתבקשת/ת להימנע משימוש באתר.
                    </p>
                  </div>
                </Card>

                {/* Section 1: Service Nature */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      1. אופי השירות
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • האתר מציע מוצרים דיגיטליים ייחודיים, לרבות פירוש אישי לקוד העושר.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • התכנים והשירותים באתר נועדו לספק הכוונה, השראה וכלים להתפתחות אישית ורוחנית.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • התכנים אינם מהווים תחליף לייעוץ רפואי, משפטי או פיננסי מוסמך.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 2: Purchase and Delivery */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      2. רכישה ואספקה
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • לאחר השלמת התשלום, תיפתח למשתמש/ת גישה מיידית להורדה, והעותק יישלח לכתובת הדוא"ל שנמסרה בעת ההזמנה.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • מאחר שמדובר במוצר דיגיטלי הנמסר באופן מיידי, לא ניתן לבטל את העסקה ולא יינתן החזר כספי.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 3: Copyright */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      3. זכויות יוצרים
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • כל הזכויות בתכנים, בקבצים, בעיצוב ובמיתוג – שייכות ל-Awakening by Ksenia.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • השימוש בתכנים הוא אישי בלבד, אינו מסחרי ואינו ניתן להעברה או לשימוש חוזר ללא אישור מראש ובכתב מהמפעילה.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 4: Limited Liability */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      4. אחריות מוגבלת
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • המוצרים נמסרים „כפי שהם" (As Is).
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • האחריות המלאה על אופן היישום והשימוש בתכנים מוטלת על המשתמש/ת בלבד.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • המפעילה לא תישא בכל אחריות לנזק ישיר או עקיף שייגרם עקב שימוש באתר או בתכנים.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 5: Law and Jurisdiction */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      5. דין וסמכות שיפוט
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • תנאי שימוש אלה כפופים לדין הישראלי בלבד.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • במקרה של מחלוקת, הסמכות הבלעדית תהיה נתונה לבתי המשפט המוסמכים בישראל.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 6: Contact */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
            <Header />
                    <p className="text-center text-lg font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                      נכנסה לתוקף בתאריך: 22.09.2025
                    </p>
                    <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                      המפעילה מכבדת את פרטיות המשתמשים באתר ופועלת בהתאם לדין הישראלי ולסטנדרטים מקובלים לשמירה על מידע אישי.
                    </p>
                  </div>
                </Card>

                {/* Section 1: Identity */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      1. זהות האחראית על המידע
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        המפעילה: צ׳ודנובסקי קסניה אוריה
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <Mail className="h-5 w-5 text-[rgba(71,59,49,1)]" />
                        <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                          דוא"ל לפניות בנושא פרטיות: 
                          <a 
                            href="mailto:awakening.by.ksenia@gmail.com"
                            className="mr-2 font-normal tracking-wide text-[rgba(71,59,49,1)] underline decoration-[rgba(71,59,49,0.4)] transition-colors duration-200 hover:text-[rgba(71,59,49,0.8)] hover:decoration-[rgba(71,59,49,0.8)]"
                          >
                            awakening.by.ksenia@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Section 2: Types of Data */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      2. סוגי המידע הנאסף
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • פרטים שנמסרו על ידי המשתמש/ת: שם, כתובת דוא"ל, פרטי הזמנה ותשלום (המעובדים על ידי ספק הסליקה החיצוני).
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • פרטים טכניים בסיסיים: כתובת IP, סוג דפדפן, ועוגיות חיוניות להפעלת האתר.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 3: Usage Purposes */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      3. מטרות השימוש במידע
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • אספקת המוצרים הדיגיטליים ושירות לקוחות.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • שליחת הקובץ או הפירוש לכתובת הדוא"ל.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • שיפור חוויית השימוש ואבטחת האתר.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • שליחת עדכונים או דיוור – אך ורק בהסכמה מפורשת של המשתמש/ת, עם אפשרות הסרה בכל עת.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 4: Cookies */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      4. שימוש בעוגיות (Cookies)
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • נעשה שימוש בעוגיות חיוניות בלבד לצורך תפעול האתר.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • עוגיות שיווקיות או סטטיסטיות יופעלו רק לאחר קבלת הסכמה מפורשת מהמשתמש/ת.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 5: Third Party Sharing */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      5. שיתוף מידע עם צדדים שלישיים
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        המידע יועבר לצדדים שלישיים אך ורק ככל שנדרש לצורך אספקת השירות (כגון: סליקה, דיוור בדוא"ל, אחסון בענן).
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 6: Data Security */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      6. אבטחת מידע
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        האתר עושה שימוש באמצעי אבטחה סבירים ומקובלים להגנה על המידע האישי מפני גישה בלתי מורשית, שימוש לרעה או חשיפה לא מורשית.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 7: Data Retention */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      7. תקופת שמירת מידע
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        המידע נשמר אך ורק ככל שנדרש לצורך מימוש מטרות המדיניות או בהתאם לחובות שמטיל הדין החל.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Section 8: User Rights */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      8. זכויות המשתמש/ת
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        למשתמש/ת עומדת הזכות:
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • לעיין במידע שנאסף אודותיו/ה.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • לבקש את תיקון המידע.
                      </p>
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        • לדרוש מחיקה או הסרה מרשימות הדיוור בכל עת.
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <Mail className="h-5 w-5 text-[rgba(71,59,49,1)]" />
                        <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                          לפניות בנושא זה ניתן לפנות בדוא"ל: 
                          <a 
                            href="mailto:awakening.by.ksenia@gmail.com"
                            className="mr-2 font-normal tracking-wide text-[rgba(71,59,49,1)] underline decoration-[rgba(71,59,49,0.4)] transition-colors duration-200 hover:text-[rgba(71,59,49,0.8)] hover:decoration-[rgba(71,59,49,0.8)]"
                          >
                            awakening.by.ksenia@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Section 9: Policy Updates */}
                <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
                  <div className="space-y-4 text-center">
                    <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                      9. עדכוני מדיניות
                    </h3>
                    <div className="space-y-3 text-center">
                      <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                        מסמך זה עשוי להתעדכן מעת לעת. תאריך העדכון האחרון יופיע בראש הדף.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>

        {/* Logo */}
        <div className="flex justify-center pb-6">
          <img 
            src={logoImage.src}
            alt="AWAKENING"
            className="h-32 w-auto opacity-90 drop-shadow-lg sm:h-40"
          />
        </div>

        {/* Footer */}
        <Footer
          onShowTerms={() => {}}
          onShowPrivacy={() => {}}
          onShowTermsAndPrivacy={onBack}
        />
      </div>
    </div>
  );
}

export const POLICY_UPDATED_AT = '22.09.2025';

export const TERMS_SECTIONS = [
  {
    title: '1. אופי השירות',
    paragraphs: [
      '• האתר מציע מוצרים דיגיטליים ייחודיים, לרבות פירוש אישי לקוד העושר.',
      '• התכנים נועדו להכוונה והשראה ואינם תחליף לייעוץ מקצועי.',
    ],
  },
  {
    title: '2. רכישה ואספקה',
    paragraphs: [
      '• לאחר התשלום ניתנת גישה מיידית להורדה, ונשלח מייל.',
      '• כמוצר דיגיטלי מיידי – אין ביטול עסקה/החזר.',
    ],
  },
  {
    title: '3. זכויות יוצרים',
    paragraphs: [
      '• כל הזכויות בתכנים/עיצוב/מיתוג שייכות ל-Awakening by Ksenia.',
      '• שימוש אישי בלבד; אסור שימוש מסחרי/העברה ללא אישור בכתב.',
    ],
  },
  {
    title: '4. אחריות מוגבלת',
    paragraphs: [
      '• המוצרים נמסרים "As Is".',
      '• אחריות היישום על המשתמש/ת; אין אחריות לנזקים ישירים/עקיפים.',
    ],
  },
  {
    title: '5. דין וסמכות',
    paragraphs: [
      '• כפוף לדין הישראלי.',
      '• סמכות שיפוט: בתי המשפט בישראל.',
    ],
  },
  {
    title: '6. יצירת קשר',
    paragraphs: [
      'לשאלות: awakening.by.ksenia@gmail.com',
    ],
  },
] satisfies ReadonlyArray<{
  title: string;
  paragraphs: ReadonlyArray<string>;
}>;

export const PRIVACY_SECTIONS = [
  {
    title: '1. זהות האחראית על המידע',
    paragraphs: [
      'המפעילה: צ׳ודנובסקי קסניה אוריה',
      'דוא"ל לפניות פרטיות: awakening.by.ksenia@gmail.com',
    ],
  },
  {
    title: '2. סוגי המידע הנאסף',
    paragraphs: [
      '• פרטים שנמסרו (שם, דוא"ל, פרטי הזמנה/תשלום אצל ספק סליקה).',
      '• נתונים טכניים בסיסיים (IP, דפדפן, עוגיות חיוניות).',
    ],
  },
  {
    title: '3. מטרות השימוש',
    paragraphs: [
      '• אספקת מוצרים דיגיטליים ושירות לקוחות.',
      '• שליחת הפירוש/קובץ בדוא"ל.',
      '• שיפור חוויית שימוש ואבטחת האתר.',
      '• דיוור רק בהסכמה, עם אפשרות הסרה.',
    ],
  },
  {
    title: '4. עוגיות (Cookies)',
    paragraphs: [
      '• עוגיות חיוניות להפעלה.',
      '• עוגיות שיווק/סטטיסטיקה – רק לאחר הסכמה מפורשת.',
    ],
  },
  {
    title: '5. שיתוף לצד ג׳',
    paragraphs: [
      '• שיתוף רק ככל שנדרש לאספקת השירות (סליקה, דיוור, אחסון).',
    ],
  },
  {
    title: '6. אבטחת מידע',
    paragraphs: [
      '• שימוש באמצעי אבטחה סבירים להגנה על מידע אישי.',
    ],
  },
  {
    title: '7. תקופת שמירה',
    paragraphs: [
      '• שמירה רק ככל שנדרש למטרות המדיניות או לפי הדין.',
    ],
  },
  {
    title: '8. זכויות המשתמש/ת',
    paragraphs: [
      '• עיון/תיקון מידע.',
      '• מחיקה/הסרה מדיוור.',
    ],
  },
  {
    title: '9. עדכונים',
    paragraphs: [
      '• המסמך עשוי להתעדכן מעת לעת; התאריך בראש הדף ישקף עדכון אחרון.',
    ],
  },
] satisfies ReadonlyArray<{
  title: string;
  paragraphs: ReadonlyArray<string>;
}>;