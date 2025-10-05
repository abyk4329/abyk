const DEFAULT_SHARE_URL = "https://abyk.online/";

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function normalizeShareUrl(url?: string) {
    const trimmed = (url ?? "").trim();
    return trimmed ? trimmed : DEFAULT_SHARE_URL;
}

export function wealthEmailHtml({
    name,
    shareUrl,
}: {
    name?: string;
    shareUrl?: string;
}): string {
    const safeName = escapeHtml((name ?? "").trim());
    const safeShareUrl = escapeHtml(normalizeShareUrl(shareUrl));
    const preheader = "הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.";

    return `<!DOCTYPE html>
<html dir="rtl" lang="he">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>הפירוש המלא לקוד האישי שלך</title>
    <style>
      .btn{ background:linear-gradient(145deg,#fff,#f8f4f0); color:#87674f; text-decoration:none; border-radius:16px; padding:12px 24px; display:inline-block; font-weight:700; letter-spacing:.08em; }
      @media (prefers-color-scheme: dark) {
        .card { background:#1f1b18 !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#fdfcfb; font-family:Assistant,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${preheader}</div>
    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background:#fdfcfb; padding:24px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:640px; background:#ffffff; background:linear-gradient(145deg,#ffffff,#f2eeea); border-radius:24px;">
            <tr>
              <td style="padding:24px; text-align:center;">
                <h1 style="margin:0 0 8px; color:#5e4934; font-weight:700; letter-spacing:.08em;">AWAKENING BY KSENIA</h1>
                <div style="color:#9f8572; letter-spacing:.15em; margin-bottom:24px;">YOUR PERSONAL SPACE FOR GROWTH</div>
                <h2 style="color:#5e4934; margin:0 0 8px;">קוד העושר שלך</h2>
                <p style="color:#87674f; margin:0 0 16px;">${safeName ? `${safeName}, ` : ""}תודה על הרכישה!</p>
                <p style="color:#5e4934; margin:0 0 24px;">הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.</p>
                <div style="margin-bottom:12px;">
                  <a href="${safeShareUrl}" class="btn">לצפייה באתר</a>
                </div>
                <p style="color:#9f8572; margin:24px 0 0; font-size:13px;">ה‑PDF מצורף למייל גם כקובץ.</p>
                <hr style="border:none; height:1px; background:rgba(135,103,79,.2); margin:24px 0;" />
                <div style="color:#9f8572; font-size:12px;">
                  Awakening by Ksenia © 2025 • <a href="https://abyk.online/" style="color:#87674f; text-decoration:none;">abyk.online</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
