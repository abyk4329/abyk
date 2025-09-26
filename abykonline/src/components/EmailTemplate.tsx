export interface EmailTemplateData {
  wealthCode: number;
  customerName?: string;
  viewUrl: string;
  downloadUrl?: string;   // הוספתי את downloadUrl
  codeStructure?: {
    digits: number[];
    allSame: boolean;
    hasRepeats: boolean;
    allDifferent: boolean;
    repeatedDigits: { digit: number; count: number }[];
  };
  logoUrl?: string;       // אופציונלי: כתובת לוגו אם תרצי להציג לוגו בראש
  shareUrl?: string;      // אופציונלי: קישור שיתוף (ברירת מחדל נשאר כפי שביקשת)
}

export function generateEmailHTML(data: EmailTemplateData): string {
  const {
    wealthCode,
    customerName,
    viewUrl,
    downloadUrl,
    codeStructure,
    logoUrl,
    shareUrl,
  } = data;

  // תיאור תבנית הקוד
  let patternDescription = '';
  if (codeStructure?.allSame) {
    patternDescription = 'קוד מאסטר - כל הספרות זהות';
  } else if (codeStructure?.hasRepeats) {
    patternDescription = 'קוד עם ספרות חוזרות - אנרגיות מועצמות';
  } else if (codeStructure?.allDifferent) {
    patternDescription = 'קוד מגוון - כל הספרות שונות';
  }

  // שרשור ספרות ייחודיות לניסוח טקסט טבעי (1, 2 ו-3)
  const uniqueDigits = codeStructure ? [...new Set(codeStructure.digits)] : [];
  const digitsStr = uniqueDigits.length > 0 
    ? uniqueDigits.length === 1
      ? uniqueDigits[0].toString()
      : uniqueDigits.length === 2
        ? `${uniqueDigits[0]} ו-${uniqueDigits[1]}`
        : uniqueDigits.length === 3
          ? `${uniqueDigits[0]}, ${uniqueDigits[1]} ו-${uniqueDigits[2]}`
          : `${uniqueDigits.slice(0, -1).join(', ')} ו-${uniqueDigits[uniqueDigits.length - 1]}`
    : 'הספרות בקוד';

  // צבעים/סגנון עקביים
  const colText = '#473B31';
  const colAccent = '#87674F';
  const colBg = '#faf8f5';
  const colCard = '#ffffff';

  // הערה: רוב ה-CSS הועבר ל-inline בשביל תאימות. שמרתי media query קטן למובייל.
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>קוד העושר האישי שלך - ${wealthCode}</title>
    <!-- ייבוא פונט אסיסטנט (חלק מהלקוחות יחסום; נשאר fallback system-ui) -->
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
      @media screen and (max-width:600px) {
        .container { width: 100% !important; margin: 0 !important; }
        .pad-outer { padding: 0 !important; }
        .header-title { font-size: 24px !important; line-height: 1.2 !important; margin-bottom: 6px !important; }
        .header-sub { font-size: 10px !important; }
        .wc-number { font-size: 36px !important; padding: 10px 20px !important; }
        .content { padding: 20px 15px !important; }
        .footer { margin: 0 15px !important; padding: 20px 15px !important; width: auto !important; }
        .btn { display:block !important; width:100% !important; }
      }
      /* הגדרות גופנים כלליות (למקרה שחלק יישמרו) */
      body, table, td, a, div, p { font-family: 'Assistant', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
    </style>
  </head>
  <body style="margin:0; padding:0; background: linear-gradient(135deg, #f5f3f0 0%, ${colBg} 100%); direction: rtl; text-align: center;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; mso-table-lspace:0; mso-table-rspace:0;">
      <tr>
        <td class="pad-outer" align="center" style="padding: 0;">
          <!-- מיכל מרכזי -->
          <table class="container" role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="width:600px; max-width:600px; background:${colCard}; box-shadow:0 10px 30px rgba(0,0,0,0.1); border-collapse:separate;">
            <!-- Header -->
            <tr>
              <td align="center" style="background:${colCard}; padding:30px 20px; border-bottom:1px solid rgba(135,103,79,0.2);">
                ${
                  logoUrl
                    ? `<img src="${logoUrl}" alt="Awakening by Ksenia" style="max-width:280px; height:auto; opacity:0.95; display:block; margin:0 auto 10px;" />`
                    : ''
                }
                <div class="header-title" style="font-size:32px; font-weight:600; color:${colText}; letter-spacing:2px; opacity:0.95; margin-bottom:8px;">
                  AWAKENING BY KSENIA
                </div>
                <div class="header-sub" style="font-size:11px; font-weight:300; color:${colAccent}; letter-spacing:1px; text-transform:uppercase;">
                  YOUR PERSONAL SPACE FOR GROWTH
                </div>
              </td>
            </tr>

            <!-- Wealth Code Display -->
            <tr>
              <td align="center" style="background:linear-gradient(135deg, #fefefe 0%, #f8f6f3 100%); padding:40px 20px; border-bottom:3px solid ${colAccent};">
                <div style="font-size:20px; font-weight:400; color:${colText}; margin-bottom:10px;">קוד העושר האישי שלך</div>
                <div class="wc-number" style="font-size:48px; font-weight:600; color:${colText}; margin:10px 0; display:inline-block; padding:15px 25px; background:rgba(135,103,79,0.1); border-radius:12px; border:2px solid rgba(135,103,79,0.3);">
                  ${wealthCode}
                </div>
                ${
                  patternDescription
                    ? `<div style="font-size:16px; font-weight:400; color:${colAccent}; margin-top:15px;">${patternDescription}</div>`
                    : ''
                }
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td class="content" align="center" style="padding:30px 20px;">
                <div style="font-size:18px; font-weight:400; color:${colText}; margin-bottom:20px;">
                  שלום${customerName ? ` ${customerName}` : ''}!
                </div>

                <div style="font-size:15px; font-weight:300; color:${colAccent}; line-height:1.7; margin-bottom:30px;">
                  תודה רבה על הרכישה! הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.
                </div>

                <!-- Digits Preview -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:separate; background:rgba(135,103,79,0.08); border-radius:12px; border:1px solid rgba(135,103,79,0.2);">
                  <tr>
                    <td style="padding:20px;">
                      <div style="font-size:16px; font-weight:400; color:${colText}; margin-bottom:15px;">מה כולל הפירוש המלא</div>
                      <div style="font-size:14px; font-weight:300; color:${colAccent}; line-height:1.6;">
                        ניתוח מעמיק של הספרות ${digitsStr} הכולל: מהות כל ספרה, מתנות מרכזיות, חסימות ואתגרים,
                        נורות אזהרה לזיהוי חוסר איזון, מוקדי צמיחה, תחומי קריירה מתאימים ותרגול יומיומי מעשי.
                        בנוסף, תבינו את משמעותן של ספרות החוזרות או השונות בקוד, וכן תקבלו הסבר כיצד לשלב את הקוד בחיי היומיום.
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Buttons -->
                <div style="margin:30px 0;">
                  <!-- primary -->
                  <a href="${viewUrl}" target="_blank" class="btn"
                    style="display:inline-block; padding:15px 25px; text-decoration:none; border-radius:8px; font-weight:400; font-size:16px; text-align:center; border:none; cursor:pointer; background:linear-gradient(135deg, ${colAccent} 0%, #95705D 100%); color:#ffffff; transition:all .3s ease; margin-bottom:15px;">
                    צפייה באתר (מומלץ)
                  </a>

                  <!-- download -->
                  <a href="${downloadUrl}" target="_blank" class="btn"
                    style="display:inline-block; padding:15px 25px; text-decoration:none; border-radius:8px; font-weight:400; font-size:16px; text-align:center; border:none; cursor:pointer; background:linear-gradient(135deg, #6DBE45 0%, #4A9A2A 100%); color:#ffffff; transition:all .3s ease;">
                    הורדה עכשיו
                  </a>
                </div>

                <div style="font-size:13px; color:${colAccent}; margin-top:20px; font-weight:300;">
                  לחוויית צפייה מלאה ומותאמת אישית
                </div>

                <!-- Sharing Section -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:separate; background:rgba(135,103,79,0.08); border-radius:12px; border:1px solid rgba(135,103,79,0.2); margin-top:25px;">
                  <tr>
                    <td style="padding:20px;">
                      <div style="font-size:16px; font-weight:400; color:${colText}; margin-bottom:15px;">שתפו את המתנה</div>
                      <div style="font-size:14px; font-weight:300; color:${colAccent}; line-height:1.6; margin-bottom:15px;">
                        מה שהאיר לכם, יכול להאיר גם לאחרים. שתפו את המחשבון עם מי שחשוב לכם.
                      </div>
                      <a href="${shareUrl || 'https://awakening-by-ksenia.com'}" target="_blank"
                         style="display:inline-block; padding:12px 20px; background:linear-gradient(135deg, ${colAccent} 0%, #95705D 100%); color:#ffffff; text-decoration:none; border-radius:8px; font-weight:400; font-size:14px; transition:all .3s ease;">
                        שיתוף
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" class="footer" style="background:#f8f6f3; color:${colAccent}; padding:25px 30px; font-size:12px; font-weight:300; width:300px; margin:0 auto; border-radius:12px; border:1px solid rgba(135,103,79,0.15);">
                <div style="margin-bottom:15px; display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                  <a href="mailto:awakening.by.ksenia@gmail.com" style="color:${colText}; text-decoration:none; font-weight:400; font-size:13px;">Email</a>
                  <a href="https://wa.me/message/PUSKMULYLLD7F1" target="_blank" style="color:${colText}; text-decoration:none; font-weight:400; font-size:13px;">WhatsApp</a>
                  <a href="https://www.instagram.com/awakening.by.ksenia" target="_blank" style="color:${colText}; text-decoration:none; font-weight:400; font-size:13px;">Instagram</a>
                  <a href="https://www.tiktok.com/@awakening.by.ksenia" target="_blank" style="color:${colText}; text-decoration:none; font-weight:400; font-size:13px;">TikTok</a>
                </div>
                <div style="margin-bottom:4px; font-size:14px; color:${colAccent}; font-weight:400;">2025 © Awakening by Ksenia</div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function generateEmailSubject(wealthCode: number): string {
  // משאירה כפי שביקשת (אם תרצי – אפשר להוסיף גם את המספר לנושא)
  return `הפירוש המלא לקוד העושר האישי שלך`;
}

export function generateEmailText(data: EmailTemplateData): string {
  const { wealthCode, customerName, viewUrl, shareUrl } = data;

  return `
שלום${customerName ? ` ${customerName}` : ''}!

קוד העושר האישי שלך: ${wealthCode}

תודה רבה על הרכישה! הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.

צפייה באתר:
${viewUrl}

מומלץ לצפות באתר לחוויית צפייה אופטימלית.

שתפו את המתנה:
מה שהאיר לכם, יכול להאיר גם לאחרים. שתפו את המחשבון עם מי שחשוב לכם.
שיתוף: ${shareUrl || 'https://awakening-by-ksenia.com'}

---

Email: awakening.by.ksenia@gmail.com
WhatsApp: https://wa.me/message/PUSKMULYLLD7F1
Instagram: @awakening.by.ksenia
TikTok: @awakening.by.ksenia

2025 © Awakening by Ksenia
  `.trim();
}