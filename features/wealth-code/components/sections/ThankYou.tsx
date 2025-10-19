"use client";

import { useCallback, useEffect } from "react";
import {
  Calculator,
  Eye,
  Instagram,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";

import { PageShell } from "@/app/components/layout";
import { Stack } from "@/app/components/shared";
import { Button, Card } from "@/components/neu";
import { SOCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TikTokIcon, WhatsAppIcon } from "@/app/components/layout/SocialIcons";
import styles from "./ThankYou.module.css";

interface ThankYouProps {
  onViewInterpretations: () => void;
  onCalculateAnother: () => void;
}

const SHARE_URL = "https://abyk.online/";
const SHARE_TEXT =
  "גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית";
const SHARE_TITLE = "Awakening by Ksenia";

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    icon: WhatsAppIcon,
    href: () => SOCIAL.whatsapp.getUrl(),
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: () => "https://www.instagram.com/awakening.by.ksenia/",
  },
  {
    label: "TikTok",
    icon: TikTokIcon,
    href: () => "https://www.tiktok.com/@awakening.by.ksenia",
  },
  {
    label: "Email",
    icon: Mail,
    href: () => "mailto:awakening.by.ksenia@gmail.com",
  },
];

export function ThankYou({
  onViewInterpretations,
  onCalculateAnother,
}: ThankYouProps) {
  useEffect(() => {
    window?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const openExternal = useCallback((target: string) => {
    if (typeof window === "undefined") {
      return;
    }
    window.open(target, "_blank", "noopener,noreferrer");
  }, []);

  const handleViewInterpretation = useCallback(() => {
    onViewInterpretations();
  }, [onViewInterpretations]);

  const handleCalculateAnother = useCallback(() => {
    onCalculateAnother();
  }, [onCalculateAnother]);

  const handleConsultation = useCallback(() => {
    openExternal(SOCIAL.whatsapp.getUrl());
  }, [openExternal]);

  const handleShare = useCallback(async () => {
    const shareFallback = () => {
      const message = encodeURIComponent(`${SHARE_TEXT}\n${SHARE_URL}`);
      openExternal(`https://wa.me/?text=${message}`);
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Error sharing", error);
      }
    }

    shareFallback();
  }, [openExternal]);

  return (
    <PageShell
      heading="תודה"
      accent="על הרכישה"
      subtitle="הפירוש המלא כבר בדרך אליך"
      maxWidth="lg"
      contentSpacing="tight"
    >
      <Stack className={styles.stack}>
        <Card className={styles.panel}>
          <Stack tight className={styles.panelStack}>
            <h2 className={styles.panelTitle}>הפירוש מחכה לך במייל</h2>
            <p className={styles.panelText}>
              שלחנו אליך את הפירוש המלא הרשמי של קוד העושר האישי שלך. הוא כולל
              את כל ההסברים, המסרים והדגשים שיסייעו לך להמשיך את המסע מתוך
              מודעות והכוונה.
            </p>
            <p className={styles.panelText}>
              ההודעה נשלחה אל כתובת המייל שהזנת ברכישה. אם היא לא מופיעה בתיבה
              הראשית, כדאי לבדוק גם בספאם או בתקייה החברתית.
            </p>
          </Stack>
        </Card>

        <Card className={styles.panel}>
          <Stack tight className={styles.panelStack}>
            <h2 className={styles.panelTitle}>מה תרצו לעשות עכשיו?</h2>
            <Stack tight className={styles.actionStack}>
              <Button
                onClick={handleViewInterpretation}
                className={styles.actionButton}
              >
                <Eye className={styles.actionIcon} aria-hidden="true" />
                <span>לצפייה באתר</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleCalculateAnother}
                className={styles.actionButton}
              >
                <Calculator className={styles.actionIcon} aria-hidden="true" />
                <span>לחישוב קוד נוסף</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleConsultation}
                className={styles.actionButton}
              >
                <MessageCircle
                  className={styles.actionIcon}
                  aria-hidden="true"
                />
                <span>לתיאום יעוץ אישי</span>
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Card className={cn(styles.panel, styles.sharePanel)}>
          <Stack tight className={styles.panelStack}>
            <h2 className={styles.panelTitle}>שתפו את הגילוי עם חברים</h2>
            <p className={styles.panelText}>
              הפירוש שלכם יכול להאיר גם אחרים. שתפו את החוויה כדי עוד אנשים יגלו
              את הכוח החבוי במספרים שלהם.
            </p>
            <Button
              onClick={handleShare}
              className={cn(styles.actionButton, styles.shareButton)}
            >
              <Share2 className={styles.actionIcon} aria-hidden="true" />
              <span>שתפו עם חברים</span>
            </Button>
            <div className={styles.shareDivider} aria-hidden="true" />
            <div className={styles.socialGrid}>
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => openExternal(href())}
                  className={styles.socialButton}
                  aria-label={label}
                >
                  <Icon className={styles.socialIcon} aria-hidden="true" />
                  <span className={styles.socialLabel}>{label}</span>
                </button>
              ))}
            </div>
          </Stack>
        </Card>
      </Stack>
    </PageShell>
  );
}
