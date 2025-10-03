"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import { neumorphismStyles } from "@/app/components/lib/neomorphism-styles";
import { Calculator, MessageCircle, Instagram, Mail, Music } from "lucide-react";

const BACKGROUND_IMAGE = "/og/share-square.png";

interface ThankYouProps {
  onViewInterpretations: () => void;
  onCalculateAnother: () => void;
}

export function ThankYou({ onViewInterpretations, onCalculateAnother }: ThankYouProps) {
  const shareUrl = "https://abyk.online/";
  const shareText = "גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית";

  const handleViewInterpretation = () => {
    onViewInterpretations();
  };

  const handleCalculateAnother = () => {
    onCalculateAnother();
  };

  const handleConsultation = () => {
    const whatsappNumber = "972524616121";
    const message = encodeURIComponent("היי, אשמח לתיאום יעוץ אישי");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  // Social Links - קישורים לעמודים שלי
  const handleGoToInstagram = () => {
    window.open('https://www.instagram.com/awakening.by.ksenia/', '_blank');
  };

  const handleGoToTikTok = () => {
    window.open('https://www.tiktok.com/@awakening.by.ksenia', '_blank');
  };

  const handleGoToEmail = () => {
    window.open('mailto:awakening.by.ksenia@gmail.com', '_blank');
  };

  const handleGoToWhatsApp = () => {
    const whatsappNumber = "972524616121";
    const message = encodeURIComponent("היי, אשמח לתיאום יעוץ אישי");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  // Share function - כפתור השיתוף היחיד שמשתף את האתר
  const handleShare = async () => {
    // Web Share API - אם נתמך (רוב הדפדפנים במובייל)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Awakening by Ksenia',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        // אם המשתמש ביטל את השיתוף, לא נעשה כלום
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error sharing:', err);
          // Fallback ל-WhatsApp אם יש שגיאה
          const message = encodeURIComponent(`${shareText}\n${shareUrl}`);
          window.open(`https://wa.me/?text=${message}`, '_blank');
        }
      }
    } else {
      // Fallback ל-WhatsApp אם Web Share API לא נתמך
      const message = encodeURIComponent(`${shareText}\n${shareUrl}`);
      window.open(`https://wa.me/?text=${message}`, '_blank');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-var(--header-height))] pt-20 sm:pt-24 lg:pt-28 pb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "min(1200px, 90vw)",
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
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, rgba(253,252,251,0.82) 0%, rgba(248,244,240,0.76) 45%, rgba(253,252,251,0.88) 100%)",
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-3xl">
        
        {/* Main Thank You Card */}
        <section 
          className="rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 mb-8 border-0 transition-all duration-500"
          style={neumorphismStyles.card.main}
        >
          <h1 className="mb-6 text-center">
            תודה על הרכישה!
          </h1>
          <p className="text-center mb-8">
            הפירוש המלא לקוד האישי שלך נשלח במייל וממתין לך לצפייה ולהורדה.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <GlassButton onClick={handleViewInterpretation} className="w-full">
              <div className="flex items-center justify-center gap-2">
                <span>לצפייה באתר</span>
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
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div 
                className="w-full"
                style={{
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(159, 133, 114, 0.2) 50%, transparent)'
                }}
              ></div>
            </div>
            <div className="relative flex justify-center">
              <button
                onClick={handleShare}
                className="
                  px-4 py-1.5
                  rounded-full
                  caption
                  border-0
                  transition-all duration-300
                  hover:scale-105
                  active:scale-95
                  cursor-pointer
                  touch-manipulation
                "
                style={{
                  fontSize: '14px',
                  background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240))',
                  boxShadow: `
                    8px 8px 16px rgba(159, 133, 114, 0.15),
                    -8px -8px 16px rgba(255, 255, 255, 0.9),
                    inset 1px 1px 2px rgba(255, 255, 255, 0.6)
                  `
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    10px 10px 20px rgba(159, 133, 114, 0.18),
                    -10px -10px 20px rgba(255, 255, 255, 1),
                    inset 1px 1px 2px rgba(255, 255, 255, 0.7)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `
                    8px 8px 16px rgba(159, 133, 114, 0.15),
                    -8px -8px 16px rgba(255, 255, 255, 0.9),
                    inset 1px 1px 2px rgba(255, 255, 255, 0.6)
                  `;
                }}
              >
                שתפו עם חברים
              </button>
            </div>
          </div>

          {/* Social Links Buttons - קישורים לעמודים שלי */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handleGoToWhatsApp}
              className="rounded-xl p-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              style={neumorphismStyles.card.secondary}
              aria-label="צור קשר ב-WhatsApp"
            >
              <div className="flex flex-col items-center gap-2">
                <MessageCircle className="w-6 h-6" style={{ color: '#87674F' }} />
                <span className="caption" style={{ fontSize: '12px', color: '#87674F' }}>
                  WhatsApp
                </span>
              </div>
            </button>

            <button
              onClick={handleGoToInstagram}
              className="rounded-xl p-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              style={neumorphismStyles.card.secondary}
              aria-label="עקבו אחרי ב-Instagram"
            >
              <div className="flex flex-col items-center gap-2">
                <Instagram className="w-6 h-6" style={{ color: '#87674F' }} />
                <span className="caption" style={{ fontSize: '12px', color: '#87674F' }}>
                  Instagram
                </span>
              </div>
            </button>

            <button
              onClick={handleGoToTikTok}
              className="rounded-xl p-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              style={neumorphismStyles.card.secondary}
              aria-label="עקבו אחרי ב-TikTok"
            >
              <div className="flex flex-col items-center gap-2">
                <Music className="w-6 h-6" style={{ color: '#87674F' }} />
                <span className="caption" style={{ fontSize: '12px', color: '#87674F' }}>
                  TikTok
                </span>
              </div>
            </button>

            <button
              onClick={handleGoToEmail}
              className="rounded-xl p-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              style={neumorphismStyles.card.secondary}
              aria-label="שלחו מייל"
            >
              <div className="flex flex-col items-center gap-2">
                <Mail className="w-7 h-7" style={{ color: '#87674F' }} />
                <span className="caption" style={{ fontSize: '12px', color: '#87674F' }}>
                  Email
                </span>
              </div>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}