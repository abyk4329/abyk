// TODO: ודא שהקובץ הועתק ל-public/images/bg.jpg
// TODO: ודא שהקובץ הועתק ל-public/images/logo.png
import backgroundImage from "/images/bg.jpg";
import logoImage from "/images/logo.png";
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import { Footer } from './Footer';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen relative" lang="he">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          imageRendering: 'high-quality',
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
                    תנאי שימוש
                  </h1>
                  <h2 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                    Awakening by Ksenia
                  </h2>
                  <p className="text-[rgba(71,59,49,1)] font-light text-lg leading-relaxed drop-shadow-md tracking-wide text-center">
                    נכנסו לתוקף בתאריך: 22.09.2025
                  </p>
                </div>
              </Card>
            </div>

            {/* Introduction */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                  האתר Awakening by Ksenia (להלן: „האתר") מופעל על ידי צ׳ודנובסקי קסניה אוריה (להלן: „המפעילה"). שימוש באתר, לרבות רכישת מוצרים דיגיטליים, מהווה הסכמה מלאה ומפורשת לתנאי שימוש אלה. אם אינך מסכים/ה לתנאים, מתבקשת/ת להימנע משימוש באתר.
                </p>
              </div>
            </Card>

            {/* Section 1: Service Nature */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  1. אופי השירות
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • האתר מציע מוצרים דיגיטליים ייחודיים, לרבות פירוש אישי לקוד העושר.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • התכנים והשירותים באתר נועדו לספק הכוונה, השראה וכלים להתפתחות אישית ורוחנית.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • התכנים אינם מהווים תחליף לייעוץ רפואי, משפטי או פיננסי מוסמך.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 2: Purchase and Delivery */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  2. רכישה ואספקה
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • לאחר השלמת התשלום, תיפתח למשתמש/ת גישה מיידית להורדה, והעותק יישלח לכתובת הדוא"ל שנמסרה בעת ההזמנה.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • מאחר שמדובר במוצר דיגיטלי הנמסר באופן מיידי, לא ניתן לבטל את העסקה ולא יינתן החזר כספי.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 3: Copyright */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  3. זכויות יוצרים
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • כל הזכויות בתכנים, בקבצים, בעיצוב ובמיתוג – שייכות ל-Awakening by Ksenia.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • השימוש בתכנים הוא אישי בלבד, אינו מסחרי ואינו ניתן להעברה או לשימוש חוזר ללא אישור מראש ובכתב מהמפעילה.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 4: Limited Liability */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  4. אחריות מוגבלת
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • המוצרים נמסרים „כפי שהם" (As Is).
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • האחריות המלאה על אופן היישום והשימוש בתכנים מוטלת על המשתמש/ת בלבד.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • המפעילה לא תישא בכל אחריות לנזק ישיר או עקיף שייגרם עקב שימוש באתר או בתכנים.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 5: Law and Jurisdiction */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  5. דין וסמכות שיפוט
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • תנאי שימוש אלה כפופים לדין הישראלי בלבד.
                  </p>
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    • במקרה של מחלוקת, הסמכות הבלעדית תהיה נתונה לבתי המשפט המוסמכים בישראל.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 6: Contact */}
            <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
              <div className="space-y-4 text-center">
                <h3 className="font-bold drop-shadow-lg tracking-wide text-center font-['Assistant'] text-[24px]" style={{ color: '#473B31' }}>
                  6. יצירת קשר
                </h3>
                <div className="space-y-4 text-center">
                  <p className="text-[rgba(71,59,49,1)] font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]">
                    לשאלות או פניות ניתן ליצור קשר בדוא"ל:
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Mail className="w-5 h-5 text-[rgba(71,59,49,1)]" />
                    <a 
                      href="mailto:awakening.by.ksenia@gmail.com"
                      className="text-[rgba(71,59,49,1)] font-normal hover:text-[rgba(71,59,49,0.8)] transition-colors duration-200 tracking-wide underline decoration-[rgba(71,59,49,0.4)] hover:decoration-[rgba(71,59,49,0.8)]"
                    >
                      awakening.by.ksenia@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>

        {/* Logo */}
        <div className="flex justify-center pb-6">
          <img 
            src={logoImage} 
            alt="AWAKENING"
            className="h-20 sm:h-24 w-auto opacity-90 drop-shadow-lg"
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
