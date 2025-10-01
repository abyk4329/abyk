"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassButton } from "../shared/GlassButton";
import { Calculator, MessageCircle, Instagram, Mail, Music } from "lucide-react";
const backgroundImage = "/images/61a287a191cbe6aa8bcb3bd084132926dd86fada.png";
const logo = "/images/bdac5cb81d27fdfd2e671bace0444b5b16c8c60c.png";

export function ThankYou() {
  const shareUrl = "https://abyk.online/";
  const shareText = "גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית";
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeParam = searchParams.get("code");
  const emailParam = searchParams.get("email");
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCode = localStorage.getItem("wealthCode") || "";
    const storedEmail = localStorage.getItem("customerEmail") || "";

    const nextCode = codeParam && codeParam.trim().length > 0 ? codeParam : storedCode;
    const nextEmail = emailParam && emailParam.trim().length > 0 ? emailParam : storedEmail;

    if (nextCode) {
      setCode(nextCode);
      localStorage.setItem("wealthCode", nextCode);
    } else {
      router.push("/calculator");
    }

    if (nextEmail) {
      setEmail(nextEmail);
      localStorage.setItem("customerEmail", nextEmail);
    }
  }, [codeParam, emailParam, router]);

  const ticketKey = useMemo(() => {
    if (!code) return "";
    return `purchaseEmailSent:${code}`;
  }, [code]);

  const sendPurchaseEmail = useCallback(
    async (force = false) => {
      if (!code || !email) return;

      if (!force && typeof window !== "undefined") {
        const ticketValue = localStorage.getItem(ticketKey);
        if (ticketValue && ticketValue === email) {
          setEmailStatus("sent");
          return;
        }
      }

      setEmailStatus("sending");
      setErrorMessage("");

      try {
        const response = await fetch("/api/send-purchase-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ code, email })
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.message || "שליחת המייל נכשלה. אנא נסו שוב.");
        }

        setEmailStatus("sent");
        if (typeof window !== "undefined") {
          localStorage.setItem(ticketKey, email);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("אירעה שגיאה בלתי צפויה בשליחת המייל.");
        }
        setEmailStatus("error");
      }
    },
    [code, email, ticketKey]
  );

  useEffect(() => {
    if (!code || !email) return;
    void sendPurchaseEmail();
  }, [code, email, sendPurchaseEmail]);

  const pdfDownloadUrl = useMemo(() => {
    if (!code) return "";
    return `/api/generate-pdf?code=${code}`;
  }, [code]);

  const handleViewInterpretation = () => {
    if (!code) {
      router.push('/interpretations');
      return;
    }
    router.push(`/interpretations?code=${code}`);
  };

  const handleCalculateAnother = () => {
    router.push('/calculator');
  };

  const handleConsultation = () => {
    const whatsappNumber = "972525606008";
    const message = encodeURIComponent("היי, אשמח לתיאום יעוץ אישי");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleDownloadPdf = () => {
    if (!pdfDownloadUrl) return;
    window.open(pdfDownloadUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleShareInstagram = () => {
    window.open('https://www.instagram.com/awakening_byksenia/', '_blank');
  };

  const handleShareTikTok = () => {
    window.open('https://www.tiktok.com/@awakening_byksenia', '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("גלו את קוד העושר הנומרולוגי שלכם");
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleShareWithFriends = () => {
    const message = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const statusLabel = useMemo(() => {
    if (!email) return null;
    switch (emailStatus) {
      case "sending":
        return "שולחים אליך את הפירוש למייל...";
      case "sent":
        return `הפירוש נשלח ל-${email}.`;
      case "error":
        return errorMessage || "שליחת המייל נכשלה. ניתן לנסות שוב.";
      default:
        return "";
    }
  }, [email, emailStatus, errorMessage]);

  if (!code) {
    return null;
  }

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
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-3xl">
        
        {/* Main Thank You Card */}
        <section className="glass-card-main rounded-3xl p-8 sm:p-12 mb-8 transition-all duration-500 hover:shadow-[0_12px_40px_0_rgba(94,73,52,0.25)]">
          <h1 className="mb-6 text-center">
            תודה על הרכישה!
          </h1>
          <p className="text-center mb-8">
            הפירוש המלא לקוד האישי שלך נשלח במייל וממתין לך לצפייה ולהורדה.
          </p>

          {statusLabel && (
            <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl p-4 mb-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.4)]">
              <p className="text-center text-sm" style={{ color: emailStatus === "error" ? '#b91c1c' : '#5e4934' }}>
                {emailStatus === "sending" && (
                  <span className="inline-flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    {statusLabel}
                  </span>
                )}
                {emailStatus !== "sending" && statusLabel}
              </p>
              {emailStatus === "error" && (
                <div className="mt-3 flex justify-center">
                  <GlassButton
                    onClick={() => sendPurchaseEmail(true)}
                    className="px-6"
                  >
                    שליחה מחדש למייל
                  </GlassButton>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <GlassButton onClick={handleViewInterpretation} className="w-full">
              <div className="flex items-center justify-center gap-2">
                <span>לצפייה באתר</span>
              </div>
            </GlassButton>

            <GlassButton
              onClick={handleDownloadPdf}
              className="w-full"
              disabled={!pdfDownloadUrl}
            >
              <div className="flex items-center justify-center gap-2">
                <span>להורדה כ-PDF</span>
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
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center">
              <button
                onClick={handleShareWithFriends}
                className="
                  px-4 py-1.5
                  backdrop-blur-xl
                  bg-white/30
                  border border-white/40
                  rounded-full
                  caption
                  transition-all duration-300
                  shadow-[0_2px_12px_0_rgba(94,73,52,0.1),inset_0_1px_3px_0_rgba(255,255,255,0.2)]
                  hover:bg-white/20
                  hover:border-white/50
                  hover:shadow-[0_4px_16px_0_rgba(94,73,52,0.15),inset_0_1px_4px_0_rgba(255,255,255,0.25)]
                  hover:scale-105
                  active:scale-95
                  cursor-pointer
                  touch-manipulation
                "
                style={{ fontSize: '14px' }}
              >
                שתפו עם חברים
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="glass-card-secondary rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.2)] group active:scale-95 touch-manipulation"
              aria-label="שיתוף ב-WhatsApp"
            >
              <div className="flex flex-col items-center gap-2">
                <MessageCircle className="w-6 h-6" style={{ color: '#87674F' }} />
                <span className="caption" style={{ fontSize: '12px', color: '#87674F' }}>
                  WhatsApp
                </span>
              </div>
            </button>

            <button
              onClick={handleShareInstagram}
              className="glass-card-secondary rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.2)] group active:scale-95 touch-manipulation"
              aria-label="שיתוף ב-Instagram"
            >
              <div className="flex flex-col items-center gap-2">
                <Instagram className="w-6 h-6" style={{ color: '#87674F' }} />
                <span className="caption" style={{ fontSize: '12px', color: '#87674F' }}>
                  Instagram
                </span>
              </div>
            </button>

            <button
              onClick={handleShareTikTok}
              className="glass-card-secondary rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.2)] group active:scale-95 touch-manipulation"
              aria-label="מעבר ל-TikTok"
            >
              <div className="flex flex-col items-center gap-2">
                <Music className="w-6 h-6" style={{ color: '#87674F' }} />
                <span className="caption" style={{ fontSize: '12px', color: '#87674F' }}>
                  TikTok
                </span>
              </div>
            </button>

            <button
              onClick={handleShareEmail}
              className="glass-card-secondary rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.2)] group active:scale-95 touch-manipulation"
              aria-label="שליחה באימייל"
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

        {/* Logo - Below Card */}
        <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(94,73,52,0.2),inset_0_1px_2px_0_rgba(255,255,255,0.3)] mb-[-30px]">
            <Image
              src={logo}
              alt="Awakening by Ksenia"
              width={320}
              height={320}
              className="h-20 sm:h-28 lg:h-36 w-auto max-w-full object-contain drop-shadow-2xl"
              sizes="(max-width: 640px) 8rem, (max-width: 1024px) 11rem, 14rem"
            />
          </div>
        </div>

      </div>
    </div>
  );
}