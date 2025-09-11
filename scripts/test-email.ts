import nodemailer from "nodemailer";

// Use .env.local when running via Next dev/build, but for standalone script we allow direct envs.
const EMAIL_USER = process.env.EMAIL_USER || "awakening.by.ksenia@gmail.com";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "quowltyhgteybtue";
const TO = process.env.TEST_TO || "kseniachud@gmail.com";
const DRY_RUN = process.env.DRY_RUN === "1";

async function main() {
  console.log("Testing email configuration...");
  console.log("EMAIL_USER:", EMAIL_USER);
  console.log(
    "EMAIL_PASSWORD length:",
    EMAIL_PASSWORD ? EMAIL_PASSWORD.length : "undefined",
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  console.log("Verifying connection...");
  await transporter.verify();
  console.log("✅ Connection verified successfully!");

  const emailHtml = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>הפירוש הנומרולוגי שלכם - Awakening by Ksenia</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap');
  body { font-family: 'Assistant'; background: #FEFEFE; color: #1F2024; line-height: 1.7; margin: 0; padding: 20px; direction: rtl; text-align: right; }
    .container { max-width: 650px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .content { padding: 35px; }
    .cta-button { display: inline-block; background: #D4AF37; color: #FEFDF8; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500; font-size: 15px; margin: 20px 0; transition: background 0.3s ease; }
    .cta-button:hover { background: #C6A170; }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
  <h3 style="color:#C6A170;margin:0 0 15px 0;font-size:24px;font-weight:600;text-align:right;">קוד העושר האישי שלכם הוא</h3>
      <div style="font-size:36px;font-weight:700;color:#1F2024;text-align:center;margin:20px 0;letter-spacing:8px;padding:20px;background:linear-gradient(135deg,#f6efe6 0%,#f0e7d8 100%);border-radius:12px;border:1px solid #D4B896;">3 7 9 1</div>
      <div style="text-align:center;margin:30px 0;">
        <a href="https://awakening-by-ksenia-app.vercel.app/thank-you?bd=3&bm=7&by=9&lp=1" class="cta-button">צפייה בפירוש המלא באתר</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  const mailOptions = {
    from: `"Awakening by Ksenia" <${EMAIL_USER}>`,
    to: TO,
    subject: "הפירוש האישי לקוד העושר שלכם מוכן - Awakening by Ksenia",
    html: emailHtml,
  };

  console.log("Prepared email options:", {
    to: TO,
    subject: mailOptions.subject,
    htmlLength: emailHtml.length,
  });

  if (DRY_RUN) {
    console.log("DRY_RUN=1 -> Skipping actual send.");
    return;
  }

  const result = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully!");
  console.log("Message ID:", result.messageId);
}

type EmailError = Error & { code?: string };

main().catch((error: EmailError) => {
  console.error("❌ Error:", error?.message || error);
  if (error?.code === "EAUTH") {
    console.error(
      "Authentication failed. Check your EMAIL_PASSWORD in .env.local",
    );
    console.error(
      "Make sure you are using an App Password, not your regular Gmail password",
    );
  }
  process.exitCode = 1;
});

//# sourceMappingURL=index.js.map
