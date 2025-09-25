import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import { Footer } from './Footer';
import Header from './Header';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
  <Header />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-4xl space-y-8 font-['Assistant']" dir="rtl">
            
            {/* Header */}
            <div className="text-center">
              <Card className="bg-white/12 mx-auto max-w-3xl border border-white/20 bg-[rgba(254,254,254,0.1)] p-8 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-12">
                <div className="space-y-4">
                  <h1 className="text-center font-['Assistant'] text-[32px] font-bold tracking-wide text-[rgba(254,254,254,1)] drop-shadow-lg">
                    מדיניות פרטיות
                  </h1>
                  <h2 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                    Awakening by Ksenia
                  </h2>
                  <p className="text-center text-lg font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                    נכנסה לתוקף בתאריך: 22.09.2025
                  </p>
                </div>
              </Card>
            </div>

            {/* Introduction */}
            <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
              <div className="space-y-4 text-center">
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