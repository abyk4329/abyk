"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import { Calculator, MessageCircle, Instagram, Mail, Music, Eye } from "lucide-react";
import styles from "./ThankYou.module.css";
import { SOCIAL } from "@/lib/constants";

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
    window.open(SOCIAL.whatsapp.getUrl(), '_blank');
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
    window.open(SOCIAL.whatsapp.getUrl(), '_blank');
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
    <div className="relative min-h-screen pb-8 pt-4 sm:pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-3xl">
        
        {/* Main Thank You Card */}
        <section 
          className="neuro-card-main rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 mb-8 border-0 transition-all duration-500"
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
                <Eye className="w-5 h-5" />
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
              <div className={["w-full", styles.dividerLine].join(" ")}></div>
            </div>
            <div className="relative flex justify-center">
              <button
                onClick={handleShare}
                className={[
                  "px-4 py-1.5",
                  "rounded-full",
                  "caption",
                  "border-0",
                  "transition-all duration-300",
                  "hover:scale-105",
                  "active:scale-95",
                  "cursor-pointer",
                  "touch-manipulation",
                  styles.shareButton
                ].join(" ")}
              >
                שתפו עם חברים
              </button>
            </div>
          </div>

          {/* Social Links Buttons - קישורים לעמודים שלי */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handleGoToWhatsApp}
              className="neuro-card-secondary rounded-xl p-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              aria-label="צור קשר ב-WhatsApp"
            >
              <div className="flex flex-col items-center gap-2">
                <MessageCircle className={["w-6 h-6", styles.socialIcon].join(" ")} />
                <span className={["caption", styles.socialCaption].join(" ")}>
                  WhatsApp
                </span>
              </div>
            </button>

            <button
              onClick={handleGoToInstagram}
              className="neuro-card-secondary rounded-xl p-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              aria-label="עקבו אחרי ב-Instagram"
            >
              <div className="flex flex-col items-center gap-2">
                <Instagram className={["w-6 h-6", styles.socialIcon].join(" ")} />
                <span className={["caption", styles.socialCaption].join(" ")}>
                  Instagram
                </span>
              </div>
            </button>

            <button
              onClick={handleGoToTikTok}
              className="neuro-card-secondary rounded-xl p-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              aria-label="עקבו אחרי ב-TikTok"
            >
              <div className="flex flex-col items-center gap-2">
                <Music className={["w-6 h-6", styles.socialIcon].join(" ")} />
                <span className={["caption", styles.socialCaption].join(" ")}>
                  TikTok
                </span>
              </div>
            </button>

            <button
              onClick={handleGoToEmail}
              className="neuro-card-secondary rounded-xl p-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              aria-label="שלחו מייל"
            >
              <div className="flex flex-col items-center gap-2">
                <Mail className={["w-7 h-7", styles.socialIcon].join(" ")} />
                <span className={["caption", styles.socialCaption].join(" ")}>
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