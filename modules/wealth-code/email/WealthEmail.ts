/**
 * Wealth Code Email Content
 * Specific content and styles for wealth calculator emails
 */

import { BRAND, generateBaseEmail } from "@/modules/core";

/**
 * Normalize the share URL to ensure it's valid
 */
function normalizeShareUrl(shareUrl?: string): string {
  if (!shareUrl) return BRAND.siteUrl;
  if (shareUrl.startsWith("http://") || shareUrl.startsWith("https://")) {
    return shareUrl;
  }
  return `${BRAND.siteUrl}${shareUrl.startsWith("/") ? "" : "/"}${shareUrl}`;
}

export interface WealthEmailData {
  code: string;
  userName?: string;
  name?: string;
  shareUrl?: string;
}

/**
 * Build email subject with the specific code
 */
export function buildWealthEmailSubject(code: string): string {
  return `הפירוש המלא לקוד ${code} - ${BRAND.appName}`;
}

/**
 * Build email preheader with the specific code
 */
export function buildWealthEmailPreheader(code: string): string {
  return `קוד העושר שלך ${code} - הפירוש המלא ממתין לך`;
}

/**
 * Wealth-specific email styles - Clean centered design
 */
const WEALTH_EMAIL_STYLES = `
  .email-body {
    background-color: #f8f6f2;
  }

  .glass-card {
    background: #f8f6f2;
    border-radius: 32px;
    padding: 40px 24px;
    box-shadow: 10px 10px 20px #d1cfcc, -10px -10px 20px #ffffff;
    max-width: 100%;
  }

  .main-title {
    font-family: 'Assistant', sans-serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
    color: #5e4934;
    margin-bottom: 20px;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
    text-align: center;
    direction: rtl;
  }
  
  .code-label {
    font-family: 'Assistant', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #87674F;
    margin-bottom: 16px;
    text-align: center;
    direction: rtl;
  }
  
  .code-container {
    display: block;
    width: 100%;
    max-width: 360px;
    padding: 20px 48px;
    border-radius: 24px;
    margin-bottom: 32px;
    margin-left: auto;
    margin-right: auto;
    background: #f8f6f2;
    box-shadow: inset 8px 8px 16px #d1cfcc, inset -8px -8px 16px #ffffff;
  }
  
  .code-display {
    font-family: 'Assistant', sans-serif;
    font-size: 48px;
    font-weight: 300;
    letter-spacing: 0.12em;
    color: rgb(94, 73, 52);
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.9);
    text-align: center;
    direction: ltr;
  }
  
  .message {
    font-family: 'Assistant', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.6;
    color: rgb(71, 59, 49);
    margin-bottom: 32px;
    padding: 0 16px;
    text-align: center;
    direction: rtl;
  }

  .buttons-container {
    gap: 16px;
    margin-bottom: 32px;
    padding: 0 16px;
    text-align: center;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 600px) {
    .glass-card {
      padding: 24px 16px;
      box-shadow: 5px 5px 10px #d1cfcc, -5px -5px 10px #ffffff;
    }

    .main-title {
      font-size: 24px;
    }

    .code-container {
      padding: 16px 24px;
      max-width: 300px;
      border-radius: 20px;
    }

    .code-display {
      font-size: 34px;
      letter-spacing: 0.08em;
    }

    .message {
      font-size: 15px;
      padding: 0 6px;
    }

    .buttons-container {
      padding: 0;
      max-width: 100%;
    }
  }

  @media (max-width: 420px) {
    .main-title {
      font-size: 22px;
      line-height: 1.25;
    }

    .code-container {
      padding: 14px 18px;
      max-width: 260px;
    }

    .code-display {
      font-size: 30px;
      letter-spacing: 0.06em;
    }

    .message {
      font-size: 15px;
      line-height: 1.55;
    }
  }

  @media (max-width: 360px) {
    .code-container {
      padding: 12px 16px;
      max-width: 230px;
    }

    .code-display {
      font-size: 28px;
      letter-spacing: 0.04em;
    }

    .buttons-container {
      margin-bottom: 24px;
    }
  }
`;

/**
 * Generates the wealth code email content HTML - Clean centered design
 */
function generateWealthContent(data: WealthEmailData): string {
  const { code, shareUrl } = data;

  const normalizedShareUrl = normalizeShareUrl(shareUrl);
  const interpretationsUrl = `${normalizedShareUrl}/result?code=${code}`;
  const calculatorUrl = normalizedShareUrl;
  const shareButtonUrl = normalizedShareUrl;
  const whatsappConsultation =
    "https://wa.me/972524616121?text=היי%20קסניה%2C%20אשמח%20לתיאום%20יעוץ%20אישי";

  const BTN_BASE = "display:block;width:100%;max-width:480px;margin:0 auto 16px;text-decoration:none;border-radius:9999px;font-family:'Assistant', Arial, sans-serif;font-size:17px;line-height:1.35;padding:15px 20px;font-weight:700;text-align:center;letter-spacing:0.02em;border:none;box-sizing:border-box;transition:all 0.2s ease;";
  const PRIMARY_BTN_STYLE = BTN_BASE + "background:#f8f6f2;color:#5e4934;box-shadow: 5px 5px 10px #d1cfcc, -5px -5px 10px #ffffff;";
  const SECONDARY_BTN_STYLE = BTN_BASE + "background:#f8f6f2;color:#5e4934;box-shadow: 3px 3px 6px #d1cfcc, -3px -3px 6px #ffffff;";

  return `
    <h1 class="main-title">תודה על הרכישה!</h1>
    
    <div class="code-label">קוד העושר שלך</div>
    <div style="text-align: center;">
        <div class="code-container">
            <div class="code-display">${code}</div>
        </div>
    </div>
    
  <p class="message">
    הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה
  </p>
    
    <div class="buttons-container">
        <a href="${interpretationsUrl}" style="${PRIMARY_BTN_STYLE} margin-bottom: 20px;" onmouseover="this.style.boxShadow='inset 5px 5px 10px #d1cfcc, inset -5px -5px 10px #ffffff';" onmouseout="this.style.boxShadow='5px 5px 10px #d1cfcc, -5px -5px 10px #ffffff';">לצפייה באתר</a>
        
        <a href="${shareButtonUrl}" style="${PRIMARY_BTN_STYLE}" onmouseover="this.style.boxShadow='inset 5px 5px 10px #d1cfcc, inset -5px -5px 10px #ffffff';" onmouseout="this.style.boxShadow='5px 5px 10px #d1cfcc, -5px -5px 10px #ffffff';">שתפו עם חברים</a>
        
        <a href="${calculatorUrl}" style="${SECONDARY_BTN_STYLE}" onmouseover="this.style.boxShadow='inset 3px 3px 6px #d1cfcc, inset -3px -3px 6px #ffffff';" onmouseout="this.style.boxShadow='3px 3px 6px #d1cfcc, -3px -3px 6px #ffffff';">לחישוב קוד נוסף</a>
        
        <a href="${whatsappConsultation}" style="${SECONDARY_BTN_STYLE}" onmouseover="this.style.boxShadow='inset 3px 3px 6px #d1cfcc, inset -3px -3px 6px #ffffff';" onmouseout="this.style.boxShadow='3px 3px 6px #d1cfcc, -3px -3px 6px #ffffff';">לתיאום יעוץ אישי</a>
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
      href: "https://www.instagram.com/awakening_byksenia/",
      title: "Instagram",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#87674F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    },
    {
      href: "https://www.tiktok.com/@awakening_byksenia",
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
    title: buildWealthEmailSubject(data.code),
    customStyles: WEALTH_EMAIL_STYLES,
    content: generateWealthContent(data),
    socialLinks: getWealthSocialLinks(normalizedShareUrl, data.code),
    preheader: buildWealthEmailPreheader(data.code),
  });
}
