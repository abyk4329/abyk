// Minimal delivery card email template (HE/RTL, centered)

export type EmailData = {
        wealthCode: number;
        viewUrl: string;      // https://abyk.online/interpretations?code=XXXX
        downloadUrl: string;  // https://abyk.online/api/download-pdf?code=XXXX
};

export function generateEmailSubject(code: string | number): string {
        return `הפירוש המלא לקוד האישי שלך – ${code}`;
}

export function generateEmailHTML(data: EmailData): string {
        const codeStr = String(data.wealthCode);
        return `<!doctype html>
<html lang="he" dir="rtl">
    <body style="margin:0;padding:0;background:#faf6f2;color:#473B31;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f2;">
            <tr><td align="center">
                <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #eadfd6;border-radius:12px;margin:24px; text-align:center;">
                    <tr><td style="padding:28px;">
                        <!-- Brand -->
                        <h1 style="margin:0 0 4px 0;font-size:26px;letter-spacing:1px;">AWAKENING BY KSENIA</h1>
                        <div style="color:#9c8b80;font-size:12px;letter-spacing:.6px;margin-bottom:20px;">YOUR PERSONAL SPACE FOR GROWTH</div>

                        <!-- Code card -->
                        <div style="margin:8px 0 14px 0;font-weight:600;">קוד העושר האישי שלך</div>
                        <div style="display:inline-block;padding:14px 24px;border:2px solid #e0d5cd;border-radius:16px;background:#f5eee9;font-size:36px;font-weight:700;letter-spacing:2px;">${codeStr}</div>

                        <!-- Greeting -->
                        <h2 style="margin:28px 0 8px 0;font-size:18px;">שלום!</h2>
                        <p style="margin:0 0 16px 0;white-space:pre-line;">
                            תודה רבה על הרכישה! הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.
                        </p>

                        <!-- What's included -->
                        <div style="background:#f7f2ee;border:1px solid #eadfd6;border-radius:16px;padding:16px 18px;margin:16px 0 20px 0;">
                            <div style="font-weight:700;margin-bottom:8px;">מה כולל הפירוש המלא</div>
                            <p style="margin:0;white-space:pre-line;">
                                ניתוח קצר של הקוד שלך והסבר לאן להמשיך. לצפייה אופטימלית מומלץ לפתוח באתר.
                            </p>
                        </div>

                        <!-- CTA buttons -->
                        <div style="margin:8px 0 20px 0;">
                            <a href="${data.viewUrl}" target="_blank"
                                 style="display:inline-block;padding:12px 18px;margin:0 4px 8px;background:#87674F;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">
                                 צפייה באתר (מומלץ)
                            </a>
                            <a href="${data.downloadUrl}" target="_blank"
                                 style="display:inline-block;padding:12px 18px;margin:0 4px 8px;background:#EDE3DB;color:#473B31;text-decoration:none;border-radius:10px;font-weight:600;border:1px solid #eadfd6;">
                                 הורדת PDF
                            </a>
                        </div>

                        <!-- Share -->
                        <div style="background:#f7f2ee;border:1px solid #eadfd6;border-radius:16px;padding:16px 18px;margin:4px 0 16px 0;">
                            <div style="font-weight:700;margin-bottom:8px;">שתפו את המתנה</div>
                            <p style="margin:0 0 10px 0;">מה שהאיר לכם יכול להאיר גם לאחרים.</p>
                            <a href="${data.viewUrl}" target="_blank"
                                 style="display:inline-block;padding:10px 16px;background:#a8846e;color:#fff;text-decoration:none;border-radius:10px;">
                                 שיתוף
                            </a>
                        </div>

                        <!-- Footer -->
                        <div style="background:#f5eee9;border-radius:14px;padding:12px 14px;color:#7d6d63;">
                            <div style="font-size:12px;margin-bottom:6px;">TikTok · Instagram · WhatsApp · Email</div>
                            <div style="font-size:12px;">Awakening by Ksenia © 2025</div>
                        </div>
                    </td></tr>
                </table>
            </td></tr>
        </table>
    </body>
</html>`;
}

export function generateEmailText(data: EmailData): string {
        const codeStr = String(data.wealthCode);
        return [
                "שלום,",
                `הנה הפירוש המלא לקוד האישי שלך – ${codeStr}.`,
                "",
                `צפייה באתר: ${data.viewUrl}`,
                `הורדת PDF: ${data.downloadUrl}`,
        ].join("\n");
}