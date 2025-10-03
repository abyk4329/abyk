type EmailVars = {
  fullName?: string;
  wealthCode?: string;
  appUrl: string;               // https://abyk.online
  interpretationsUrl: string;   // https://abyk.online/#/interpretations?code=...
  downloadUrl: string;          // https://abyk.online/api/pdf?... (GET)
  shareUrl: string;             // https://abyk.online
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
  price?: string;
  appName?: string;             // Awakening by Ksenia
};

// גרסת טקסט פשוט (fallback)
export function wealthEmailText(v: EmailVars) {
  return [
    "AWAKENING BY KSENIA",
    "YOUR PERSONAL SPACE FOR GROWTH",
    "",
    `קוד העושר שלך: ${v.wealthCode || "-"}`,
    "תודה על הרכישה!",
    "",
    "הפירוש המלא לקוד האישי שלך ממתין לצפייה ולהורדה.",
    `צפייה באתר: ${v.interpretationsUrl}`,
    `הורדה ישירה (PDF): ${v.downloadUrl}`,
    `שיתוף עם חברים: ${v.shareUrl}`,
    "",
    `— ${v.appName || "Awakening by Ksenia"}`,
    v.appUrl
  ].join("\n");
}

// HTML עם inline CSS (מותאם לקליינטים של מייל)
export function wealthEmailHtml(v: EmailVars) {
  const btn = (href: string, label: string, bg = "#5e4934") => `
    <a href="${href}" target="_blank" rel="noopener"
       style="display:inline-block; text-decoration:none; background:${bg};
              color:#FDFCFB; padding:14px 22px; border-radius:14px; font-weight:700;">
      ${label}
    </a>`;

  return `<!doctype html>
<html dir="rtl" lang="he">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>הפירוש המלא לקוד האישי שלך</title>
  </head>
  <body style="margin:0; padding:0; background:#F5F1ED; color:#473B31; font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5F1ED;">
      <tr><td align="center" style="padding:24px;">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px; background:#FDFCFB; border-radius:20px; overflow:hidden; border:1px solid rgba(71,59,49,0.08);">
          <!-- Header -->
          <tr><td style="padding:28px 28px 16px 28px; text-align:center;">
            <div style="font-size:18px; font-weight:800; letter-spacing:.06em; color:#5e4934;">AWAKENING BY KSENIA</div>
            <div style="font-size:12px; color:#87674F; margin-top:6px; letter-spacing:.08em;">YOUR PERSONAL SPACE FOR GROWTH</div>
          </td></tr>

          <!-- Title -->
          <tr><td style="padding:8px 28px 0 28px; text-align:center;">
            <div style="font-size:16px; color:#87674F; margin-bottom:2px;">קוד העושר שלך</div>
            <div style="font-size:28px; font-weight:800; color:#5e4934;">${v.wealthCode || "—"}</div>
            <div style="height:12px;"></div>
            <div style="font-size:16px; font-weight:700; color:#5e4934;">תודה על הרכישה!</div>
          </td></tr>

          <!-- Body -->
          <tr><td style="padding:18px 28px 8px 28px; text-align:center;">
            <div style="font-size:14px; line-height:1.6; color:#473B31;">
              הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.
            </div>
            <div style="height:16px;"></div>

            <!-- Buttons -->
            <div style="display:inline-flex; gap:12px; flex-wrap:wrap; justify-content:center;">
              ${btn(v.interpretationsUrl, "צפייה באתר")}
              ${btn(v.downloadUrl, "הורדה (PDF)", "#87674F")}
            </div>

            <div style="height:18px;"></div>
            <div style="font-size:12px; color:#9f8572;">
              הקובץ מצורף למייל גם כ-PDF.
            </div>
          </td></tr>

          <!-- Share -->
          <tr><td style="padding:16px 28px 0 28px; text-align:center;">
            <div style="font-size:13px; color:#473B31; margin-bottom:10px;">שתפו עם החברים:</div>
            ${btn(v.shareUrl, "שיתוף עם החברים", "#D3C6BD")}
            <div style="height:10px;"></div>
          </td></tr>

          <!-- Footer Links (כמו עמוד תודה) -->
          <tr><td style="padding:18px 28px 6px 28px; text-align:center;">
            <div style="font-size:12px; color:#87674F; line-height:1.7;">
              מחיר המוצר: ${v.price || ""} ·
              <a href="${v.appUrl}" target="_blank" style="color:#5e4934; text-decoration:none;">אתר</a> ·
              <a href="https://instagram.com/${(v.instagram||'').replace('@','')}" target="_blank" style="color:#5e4934; text-decoration:none;">Instagram</a> ·
              <a href="https://t.me/${(v.whatsapp||'').replace(/^\+?/, '')}" target="_blank" style="color:#5e4934; text-decoration:none;">WhatsApp</a> ·
              <a href="https://www.tiktok.com/${(v.tiktok||'')}" target="_blank" style="color:#5e4934; text-decoration:none;">TikTok</a>
            </div>
            <div style="height:6px;"></div>
          </td></tr>

          <!-- Footer -->
          <tr><td style="padding:8px 28px 28px 28px; text-align:center;">
            <div style="font-size:10px; color:#9f8572;">
              © ${new Date().getFullYear()} ${v.appName || "Awakening by Ksenia"} · כל הזכויות שמורות
            </div>
          </td></tr>
        </table>
        <div style="height:20px;"></div>
      </td></tr>
    </table>
  </body>
</html>`;
}
