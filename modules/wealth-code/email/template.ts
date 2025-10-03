export function wealthEmailHtml(opts: { name?: string; shareUrl?: string }) {
  const name = opts.name ?? "";
  const shareUrl = opts.shareUrl ?? "https://abyk.online/";
  return `
  <div dir="rtl" style="font-family: Assistant, Arial, sans-serif; background:#fdfcfb; padding:24px">
    <div style="max-width:640px;margin:auto;background:linear-gradient(145deg,#fff,#f2eeea);border-radius:24px;padding:24px;text-align:center">
      <h1 style="margin:0 0 8px;color:#5e4934;font-weight:700;letter-spacing:.08em">AWAKENING BY KSENIA</h1>
      <div style="color:#9f8572;letter-spacing:.15em;margin-bottom:24px">YOUR PERSONAL SPACE FOR GROWTH</div>
      <h2 style="color:#5e4934;margin:0 0 8px">קוד העושר שלך</h2>
      <p style="color:#87674f;margin:0 0 16px">${name ? `${name}, ` : ""}תודה על הרכישה!</p>
      <p style="color:#5e4934;margin:0 0 24px">הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.</p>
      <a href="${shareUrl}" style="display:inline-block;padding:12px 24px;border-radius:16px;text-decoration:none;background:linear-gradient(145deg,#fff,#f8f4f0);color:#87674f;font-weight:700;letter-spacing:.08em;">לצפייה באתר</a>
      <p style="color:#9f8572;margin:24px 0 0;font-size:13px">ה-PDF מצורף למייל גם כקובץ.</p>
      <hr style="border:none;height:1px;background:rgba(135,103,79,.2);margin:24px 0" />
      <div style="color:#9f8572;font-size:12px">Awakening by Ksenia © 2025 • <a href="https://abyk.online/" style="color:#87674f">abyk.online</a></div>
    </div>
  </div>
  `;
}
