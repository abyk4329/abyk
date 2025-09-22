import backgroundImage from "@/assets/9a42d447acea050bf24d319ab01daa6b6ac13c0c.png";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import { Footer } from './Footer';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen relative" lang="he">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ 
          backgroundImage: `url(${backgroundImage.src})`,
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          willChange: 'transform',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="backdrop-blur-lg bg-white/15 border-b border-white/30 shadow-xl sm:backdrop-blur-md sm:bg-white/12 sm:border-white/25 bg-[rgba(254,254,254,0.12)]">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between">
              {/* Spacer for balance */}
              <div className="w-16">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-[rgba(254,254,254,1)] font-normal hover:text-white/90 hover:bg-white/15 border-0 font-['Assistant'] tracking-wide p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Centered tagline */}
              <span
                className="font-normal text-xs sm:text-sm md:text-lg tracking-[0.25em] drop-shadow-lg font-['Assistant'] text-center"
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
          <div className="max-w-4xl mx-auto space-y-8 font-['Assistant']" dir="rtl">
            
            {/* Header */}
            <div className="text-center">
              <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-8 sm:p-12 shadow-2xl shadow-orange-200/40 max-w-3xl mx-auto bg-[rgba(254,254,254,0.1)]">
                <div className="space-y-4">
                  <h1 className="font-bold drop-shadow-lg tracking-wide text-center text-[rgba(254,254,254,1)] font-['Assistant'] text-[32px]">
                    מדיניות פרטיות
                  </h1>
                  <h2 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                    Awakening by Ksenia
                  </h2>
                  <p className="text-[rgba(71,59,49,1)] font-light text-lg leading-relaxed drop-shadow-md tracking-wide text-center">
                    נכנסה לתוקף בתאריך: 22.09.2025
                  </p>
                </div>
              </Card>
            </div>

            {/* Introduction */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                  המפעילה מכבדת את פרטיות המשתמשים באתר ופועלת בהתאם לדין הישראלי ולסטנדרטים מקובלים לשמירה על מידע אישי.
                </p>
              </div>
            </Card>

            {/* Section 1: Identity */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  1. זהות האחראית על המידע
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    המפעילה: צ׳ודנובסקי קסניה אוריה
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Mail className="w-5 h-5 text-[rgba(71,59,49,1)]" />
                    <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                      דוא"ל לפניות בנושא פרטיות: 
                      <a 
                        href="mailto:awakening.by.ksenia@gmail.com"
                        className="text-[rgba(71,59,49,1)] font-normal hover:text-[rgba(71,59,49,0.8)] transition-colors duration-200 tracking-wide underline decoration-[rgba(71,59,49,0.4)] hover:decoration-[rgba(71,59,49,0.8)] mr-2"
                      >
                        awakening.by.ksenia@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section 2: Types of Data */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  2. סוגי המידע הנאסף
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • פרטים שנמסרו על ידי המשתמש/ת: שם, כתובת דוא"ל, פרטי הזמנה ותשלום (המעובדים על ידי ספק הסליקה החיצוני).
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • פרטים טכניים בסיסיים: כתובת IP, סוג דפדפן, ועוגיות חיוניות להפעלת האתר.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 3: Usage Purposes */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  3. מטרות השימוש במידע
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • אספקת המוצרים הדיגיטליים ושירות לקוחות.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • שליחת הקובץ או הפירוש לכתובת הדוא"ל.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • שיפור חוויית השימוש ואבטחת האתר.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • שליחת עדכונים או דיוור – אך ורק בהסכמה מפורשת של המשתמש/ת, עם אפשרות הסרה בכל עת.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 4: Cookies */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  4. שימוש בעוגיות (Cookies)
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • נעשה שימוש בעוגיות חיוניות בלבד לצורך תפעול האתר.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • עוגיות שיווקיות או סטטיסטיות יופעלו רק לאחר קבלת הסכמה מפורשת מהמשתמש/ת.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 5: Third Party Sharing */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  5. שיתוף מידע עם צדדים שלישיים
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    המידע יועבר לצדדים שלישיים אך ורק ככל שנדרש לצורך אספקת השירות (כגון: סליקה, דיוור בדוא"ל, אחסון בענן).
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 6: Data Security */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  6. אבטחת מידע
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    האתר עושה שימוש באמצעי אבטחה סבירים ומקובלים להגנה על המידע האישי מפני גישה בלתי מורשית, שימוש לרעה או חשיפה לא מורשית.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 7: Data Retention */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  7. תקופת שמירת מידע
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    המידע נשמר אך ורק ככל שנדרש לצורך מימוש מטרות המדיניות או בהתאם לחובות שמטיל הדין החל.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 8: User Rights */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  8. זכויות המשתמש/ת
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    למשתמש/ת עומדת הזכות:
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • לעיין במידע שנאסף אודותיו/ה.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • לבקש את תיקון המידע.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • לדרוש מחיקה או הסרה מרשימות הדיוור בכל עת.
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <Mail className="w-5 h-5 text-[rgba(71,59,49,1)]" />
                    <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                      לפניות בנושא זה ניתן לפנות בדוא"ל: 
                      <a 
                        href="mailto:awakening.by.ksenia@gmail.com"
                        className="text-[rgba(71,59,49,1)] font-normal hover:text-[rgba(71,59,49,0.8)] transition-colors duration-200 tracking-wide underline decoration-[rgba(71,59,49,0.4)] hover:decoration-[rgba(71,59,49,0.8)] mr-2"
                      >
                        awakening.by.ksenia@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section 9: Policy Updates */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  9. עדכוני מדיניות
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
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
            className="h-32 sm:h-40 w-auto opacity-90 drop-shadow-lg"
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