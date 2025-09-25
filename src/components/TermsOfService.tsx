import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import Header from "./Header";
import { Footer } from './Footer';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
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
                    תנאי שימוש
                  </h1>
                  <h2 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                    Awakening by Ksenia
                  </h2>
                  <p className="text-center text-lg font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                    נכנסו לתוקף בתאריך: 22.09.2025
                  </p>
                </div>
              </Card>
            </div>

            {/* Introduction */}
            <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 shadow-2xl shadow-orange-200/40 backdrop-blur-xl sm:p-8">
              <div className="space-y-4 text-center">
                <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                  1. הקדמה
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                    תנאי שימוש אלה מסדירים את השימוש באתר ובמוצרים הדיגיטליים הניתנים במסגרתו.
                  </p>
                  <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                    השימוש באתר מהווה הסכמה לתנאים המפורטים להלן.
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
                <h3 className="text-center font-['Assistant'] text-[24px] font-bold tracking-wide drop-shadow-lg" style={{ color: '#473B31' }}>
                  6. יצירת קשר
                </h3>
                <div className="space-y-4 text-center">
                  <p className="text-[16px] font-light leading-relaxed tracking-wide text-[rgba(71,59,49,1)] drop-shadow-md">
                    לשאלות או פניות ניתן ליצור קשר בדוא"ל:
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Mail className="h-5 w-5 text-[rgba(71,59,49,1)]" />
                    <a 
                      href="mailto:awakening.by.ksenia@gmail.com"
                      className="font-normal tracking-wide text-[rgba(71,59,49,1)] underline decoration-[rgba(71,59,49,0.4)] transition-colors duration-200 hover:text-[rgba(71,59,49,0.8)] hover:decoration-[rgba(71,59,49,0.8)]"
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