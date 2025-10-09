/**
 * Wealth Code Email Content
 * Specific content and styles for wealth calculator emails
 */

import { BRAND, generateBaseEmail } from "@/modules/core";
import { buildUrl, routes } from "@/lib/routes";

/**
 * Normalize the share URL to ensure it's valid
 */
function normalizeShareUrl(shareUrl?: string): string {
  const siteBase = BRAND.siteUrl.replace(/\/+$/, "");
  if (!shareUrl) return `${siteBase}/`;
  if (shareUrl.startsWith("http://") || shareUrl.startsWith("https://")) {
    return shareUrl;
  }
  return `${siteBase}${shareUrl.startsWith("/") ? "" : "/"}${shareUrl}`;
}

export interface WealthEmailData {
  code: string;
  userName?: string;
  name?: string;
  shareUrl?: string;
}

/**
 * Build the fixed subject line for the wealth email
 */
export function buildWealthEmailSubject(): string {
  return "הפירוש המלא לקוד האישי שלך";
}

/**
 * Build email preheader with the specific code
 */
export function buildWealthEmailPreheader(code: string): string {
  return `קוד העושר שלך ${code} מחכה לך לצפייה באתר`;
}

/**
 * Wealth-specific email styles - Modern neumorphic design matching site
 */
const WEALTH_EMAIL_STYLES = `
  .email-body {
    background-color: #f8f6f2;
  }

  .glass-card {
    background: linear-gradient(145deg, #ffffff, #f8f4f0);
    border-radius: 40px;
    padding: 48px 32px;
    box-shadow: 
      18px 18px 36px rgba(159,133,114,0.18),
      -18px -18px 36px rgba(255,255,255,0.95),
      inset 1px 1px 3px rgba(255,255,255,0.5);
    border: 1px solid rgba(255,255,255,0.5);
    max-width: 100%;
  }

  .main-title {
    font-family: 'Assistant', sans-serif;
    font-size: 36px;
    font-weight: 800;
    line-height: 1.15;
    color: #5e4934;
    margin-bottom: 24px;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
    text-align: center;
    direction: rtl;
  }
  
  .code-label {
    font-family: 'Assistant', sans-serif;
    font-size: 19px;
    font-weight: 700;
    color: #87674F;
    margin-bottom: 18px;
    text-align: center;
    direction: rtl;
    letter-spacing: 0.01em;
  }
  
  .code-container {
    display: block;
    width: 100%;
    max-width: 380px;
    padding: 24px 52px;
    border-radius: 28px;
    margin-bottom: 36px;
    margin-left: auto;
    margin-right: auto;
    background: linear-gradient(145deg, #f6f2ee, #ffffff);
    box-shadow:
      inset 10px 10px 20px rgba(159,133,114,0.20),
      inset -10px -10px 20px rgba(255,255,255,0.88),
      2px 2px 4px rgba(159,133,114,0.08);
    border: 1px solid rgba(255,255,255,0.5);
  }
  
  .code-display {
    font-family: 'Assistant', sans-serif;
    font-size: 52px;
    font-weight: 300;
    letter-spacing: 0.14em;
    color: rgb(94, 73, 52);
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.9);
    text-align: center;
    direction: ltr;
  }
  
  .message {
    font-family: 'Assistant', sans-serif;
    font-size: 19px;
    font-weight: 500;
    line-height: 1.65;
    color: rgb(71, 59, 49);
    margin-bottom: 40px;
    padding: 0 20px;
    text-align: center;
    direction: rtl;
  }

  .info-card {
    background: linear-gradient(150deg, rgba(255,255,255,0.75), rgba(248,244,240,0.65));
    border-radius: 24px;
    padding: 20px 24px;
    margin: 0 auto 32px;
    max-width: 520px;
    box-shadow:
      inset 4px 4px 10px rgba(159,133,114,0.12),
      inset -4px -4px 10px rgba(255,255,255,0.85),
      0 0 0 1px rgba(255,255,255,0.4);
    border: 1px solid rgba(255,255,255,0.5);
    text-align: center;
    direction: rtl;
  }

  .info-text {
    font-family: 'Assistant', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.6;
    color: #87674F;
    margin: 0;
  }

  .buttons-container {
    gap: 16px;
    margin-bottom: 36px;
    padding: 0 20px;
    text-align: center;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 600px) {
    .glass-card {
      padding: 32px 20px;
      border-radius: 32px;
      box-shadow: 
        12px 12px 24px rgba(159,133,114,0.16),
        -12px -12px 24px rgba(255,255,255,0.92),
        inset 1px 1px 2px rgba(255,255,255,0.4);
    }

    .main-title {
      font-size: 28px;
      margin-bottom: 20px;
    }

    .code-container {
      padding: 18px 32px;
      max-width: 320px;
      border-radius: 24px;
    }

    .code-display {
      font-size: 38px;
      letter-spacing: 0.10em;
    }

    .message {
      font-size: 16px;
      padding: 0 12px;
      margin-bottom: 32px;
    }

    .info-card {
      padding: 16px 20px;
      margin-bottom: 28px;
    }

    .info-text {
      font-size: 15px;
    }

    .buttons-container {
      padding: 0 8px;
      max-width: 100%;
    }
  }

  @media (max-width: 420px) {
    .main-title {
      font-size: 24px;
      line-height: 1.2;
    }

    .code-container {
      padding: 16px 24px;
      max-width: 280px;
    }

    .code-display {
      font-size: 34px;
      letter-spacing: 0.08em;
    }

    .message {
      font-size: 15px;
      line-height: 1.6;
    }

    .info-text {
      font-size: 14px;
    }
  }
`;

const INLINE_CONTENT_STYLES = {
  mainTitle:
    "font-family:'Assistant', Arial, sans-serif;font-size:36px;font-weight:800;line-height:1.15;color:#5e4934;margin-bottom:24px;text-shadow:0 1px 2px rgba(255,255,255,0.8);text-align:center;direction:rtl;",
  codeLabel:
    "font-family:'Assistant', Arial, sans-serif;font-size:19px;font-weight:700;color:#87674F;margin-bottom:18px;text-align:center;direction:rtl;letter-spacing:0.01em;",
  codeContainerWrap: "text-align:center;",
  codeContainer:
    "display:block;width:100%;max-width:380px;padding:24px 52px;border-radius:28px;margin:0 auto 36px;background:linear-gradient(145deg,#f6f2ee,#ffffff);box-shadow:inset 10px 10px 20px rgba(159,133,114,0.20),inset -10px -10px 20px rgba(255,255,255,0.88),2px 2px 4px rgba(159,133,114,0.08);border:1px solid rgba(255,255,255,0.5);",
  codeDisplay:
    "font-family:'Assistant', Arial, sans-serif;font-size:52px;font-weight:300;letter-spacing:0.14em;color:rgb(94,73,52);text-shadow:1px 1px 2px rgba(255,255,255,0.9);text-align:center;direction:ltr;",
  message:
    "font-family:'Assistant', Arial, sans-serif;font-size:19px;font-weight:500;line-height:1.65;color:rgb(71,59,49);margin-bottom:40px;padding:0 20px;text-align:center;direction:rtl;",
  buttonsContainer:
    "display:block;margin-bottom:36px;padding:0 20px;text-align:center;max-width:500px;margin-left:auto;margin-right:auto;",
};

/**
 * Generates the wealth code email content HTML - Modern neumorphic design
 */
function generateWealthContent(data: WealthEmailData): string {
  const { code } = data;

  const siteBase = BRAND.siteUrl.replace(/\/+$/, "");
  const interpretationsUrl = `${siteBase}${buildUrl(routes.interpretations, { code })}`;
  const calculatorUrl = `${siteBase}${routes.calculator}`;
  const shareButtonUrl = normalizeShareUrl(data.shareUrl);
  const whatsappConsultation =
    "https://wa.me/972524616121?text=היי%20קסניה%2C%20אשמח%20לתיאום%20יעוץ%20אישי";

  const BTN_BASE = "display:block;width:100%;max-width:500px;margin:0 auto 18px;text-decoration:none;border-radius:9999px;font-family:'Assistant', Arial, sans-serif;font-size:18px;line-height:1.4;padding:16px 24px;font-weight:700;text-align:center;letter-spacing:0.01em;border:none;box-sizing:border-box;";
  const PRIMARY_BTN_STYLE = BTN_BASE + "background:linear-gradient(145deg,#ffffff,#f5f1ed);color:#5e4934;box-shadow:8px 8px 18px rgba(159,133,114,0.16),-8px -8px 18px rgba(255,255,255,0.92),inset 1px 1px 2px rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.5);";
  const SECONDARY_BTN_STYLE = BTN_BASE + "background:linear-gradient(145deg,#faf6f2,#f0ece8);color:#5e4934;box-shadow:6px 6px 14px rgba(159,133,114,0.14),-6px -6px 14px rgba(255,255,255,0.88),inset 1px 1px 2px rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.45);";

  return `
    <h1 class="main-title" style="${INLINE_CONTENT_STYLES.mainTitle}">תודה על הרכישה!</h1>

    <div class="code-label" style="${INLINE_CONTENT_STYLES.codeLabel}">קוד העושר שלך</div>
    <div style="${INLINE_CONTENT_STYLES.codeContainerWrap}">
        <div class="code-container" style="${INLINE_CONTENT_STYLES.codeContainer}">
            <div class="code-display" style="${INLINE_CONTENT_STYLES.codeDisplay}">${code}</div>
        </div>
    </div>
    
    <p class="message" style="${INLINE_CONTENT_STYLES.message}">
      הפירוש המלא לקוד האישי שלך ממתין לך לצפייה באתר
    </p>

    <div class="buttons-container" style="${INLINE_CONTENT_STYLES.buttonsContainer}">
        <a href="${interpretationsUrl}" style="${PRIMARY_BTN_STYLE}" target="_blank" rel="noopener noreferrer">צפייה באתר</a>

        <a href="${shareButtonUrl}" style="${SECONDARY_BTN_STYLE}" target="_blank" rel="noopener noreferrer">שתפו עם חברים</a>

        <a href="${calculatorUrl}" style="${SECONDARY_BTN_STYLE}" target="_blank" rel="noopener noreferrer">לחישוב קוד נוסף</a>

        <a href="${whatsappConsultation}" style="${SECONDARY_BTN_STYLE}" target="_blank" rel="noopener noreferrer">לתיאום יעוץ אישי</a>
    </div>
  `;
}

/**
 * Generates wealth code email with custom social share links
 */
function getWealthSocialLinks(shareUrl: string, code: string) {
  const shareText = encodeURIComponent(
    `גלו את קוד העושר הנומרולוגי שלכם! מסע מרתק להכרה עצמית וצמיחה אישית\n${shareUrl}`
  );

  return [
    {
      href: `https://wa.me/?text=${shareText}`,
      title: "שיתוף בווטסאפ",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
    {
      href: "https://www.instagram.com/awakening.by.ksenia/",
      title: "Instagram",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
    {
      href: "https://www.tiktok.com/@awakening.by.ksenia",
      title: "TikTok",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
    {
      href: `mailto:?subject=${encodeURIComponent("גלו את קוד העושר הנומרולוגי שלכם")}&body=${shareText}`,
      title: "שיתוף במייל",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="22,6 12,13 2,6" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
  ];
}

/**
 * Generates complete wealth code email HTML
 */
export function wealthEmailHtml(data: WealthEmailData): string {
  const normalizedShareUrl = normalizeShareUrl(data.shareUrl);

  return generateBaseEmail({
    title: buildWealthEmailSubject(),
    customStyles: WEALTH_EMAIL_STYLES,
    content: generateWealthContent(data),
    socialLinks: getWealthSocialLinks(normalizedShareUrl, data.code),
    preheader: buildWealthEmailPreheader(data.code),
  });
}
