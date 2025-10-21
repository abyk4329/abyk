'use client';

import {
  Calculator,
  Eye,
  Instagram,
  Mail,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

import { PageShell } from '@/app/components/layout';
import { TikTokIcon, WhatsAppIcon } from '@/app/components/layout/SocialIcons';
import { Stack } from '@/app/components/shared';
import { Button, Card } from '@/components/neu';
import { SOCIAL } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ThankYouProps {
  onViewInterpretations: () => void;
  onCalculateAnother: () => void;
}

const SHARE_URL = 'https://abyk.online/';
const SHARE_TEXT =
  'גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית';
const SHARE_TITLE = 'Awakening by Ksenia';

const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    icon: WhatsAppIcon,
    href: () => SOCIAL.whatsapp.getUrl(),
  },
  {
    label: 'Instagram',
    icon: Instagram,
    href: () => 'https://www.instagram.com/awakening.by.ksenia/',
  },
  {
    label: 'TikTok',
    icon: TikTokIcon,
    href: () => 'https://www.tiktok.com/@awakening.by.ksenia',
  },
  {
    label: 'Email',
    icon: Mail,
    href: () => 'mailto:awakening.by.ksenia@gmail.com',
  },
];

export function ThankYou({
  onViewInterpretations,
  onCalculateAnother,
}: ThankYouProps) {
  useEffect(() => {
    window?.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const openExternal = useCallback((target: string) => {
    if (typeof window === 'undefined') {
      return;
    }
    window.open(target, '_blank', 'noopener,noreferrer');
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

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error('Error sharing', error);
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
      <Stack className="wealthThankYouStack">
        <Card className="wealthThankYouPanel">
          <Stack tight className="wealthThankYouPanelStack">
            <h2 className="wealthThankYouPanelTitle">הפירוש מחכה לך במייל</h2>
            <p className="wealthThankYouPanelText">
              שלחנו אליך את הפירוש המלא הרשמי של קוד העושר האישי שלך. הוא כולל
              את כל ההסברים, המסרים והדגשים שיסייעו לך להמשיך את המסע מתוך
              מודעות והכוונה.
            </p>
            <p className="wealthThankYouPanelText">
              ההודעה נשלחה אל כתובת המייל שהזנת ברכישה. אם היא לא מופיעה בתיבה
              הראשית, כדאי לבדוק גם בספאם או בתקייה החברתית.
            </p>
          </Stack>
        </Card>

        <Card className="wealthThankYouPanel">
          <Stack tight className="wealthThankYouPanelStack">
            <h2 className="wealthThankYouPanelTitle">מה תרצו לעשות עכשיו?</h2>
            <Stack tight className="wealthThankYouActionStack">
              <Button
                onClick={handleViewInterpretation}
                className="wealthThankYouActionButton"
              >
                <Eye className="wealthThankYouActionIcon" aria-hidden="true" />
                <span>לצפייה באתר</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleCalculateAnother}
                className="wealthThankYouActionButton"
              >
                <Calculator
                  className="wealthThankYouActionIcon"
                  aria-hidden="true"
                />
                <span>לחישוב קוד נוסף</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleConsultation}
                className="wealthThankYouActionButton"
              >
                <MessageCircle
                  className="wealthThankYouActionIcon"
                  aria-hidden="true"
                />
                <span>לתיאום יעוץ אישי</span>
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Card className={cn('wealthThankYouPanel', 'wealthThankYouSharePanel')}>
          <Stack tight className="wealthThankYouPanelStack">
            <h2 className="wealthThankYouPanelTitle">
              שתפו את הגילוי עם חברים
            </h2>
            <p className="wealthThankYouPanelText">
              הפירוש שלכם יכול להאיר גם אחרים. שתפו את החוויה כדי עוד אנשים יגלו
              את הכוח החבוי במספרים שלהם.
            </p>
            <Button
              onClick={handleShare}
              className={cn(
                'wealthThankYouActionButton',
                'wealthThankYouShareButton'
              )}
            >
              <Share2 className="wealthThankYouActionIcon" aria-hidden="true" />
              <span>שתפו עם חברים</span>
            </Button>
            <div className="wealthThankYouShareDivider" aria-hidden="true" />
            <div className="wealthThankYouSocialGrid">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => openExternal(href())}
                  className="wealthThankYouSocialButton"
                  aria-label={label}
                >
                  <Icon
                    className="wealthThankYouSocialIcon"
                    aria-hidden="true"
                  />
                  <span className="wealthThankYouSocialLabel">{label}</span>
                </button>
              ))}
            </div>
          </Stack>
        </Card>
      </Stack>
    </PageShell>
  );
}
