import nodemailer from "nodemailer";

// הגדרת משתני סביבה ידנית
process.env.EMAIL_USER = "awakening.by.ksenia@gmail.com";
process.env.EMAIL_PASSWORD = "quowltyhgteybtue";

async function testWebhookEmail() {
  console.log("Testing final webhook email template...");

  const testCode = { bd: 3, bm: 7, by: 9, lp: 1 };

  // Check for duplicate numbers
  const numbers = [testCode.bd, testCode.bm, testCode.by, testCode.lp];
  const uniqueNumbers = Array.from(new Set(numbers));
  const hasDuplicates = numbers.length !== uniqueNumbers.length;

  // Generate URL for full interpretation
  const baseUrl = "https://awakening-by-ksenia-app.vercel.app";
  const interpretationUrl = `${baseUrl}/thank-you?bd=${testCode.bd}&bm=${testCode.bm}&by=${testCode.by}&lp=${testCode.lp}`;

  const emailHtml = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>הפירוש האישי לקוד העושר שלכם מוכן - Awakening by Ksenia</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap');
        body { font-family:'Assistant'; background:linear-gradient(135deg,#FEFEFE 0%,#F8F5F1 100%); color:#1F2024; line-height:1.7; margin:0; padding:0; direction:rtl; }
        .container { max-width:800px; margin:0 auto; background:#FFFFFF; box-shadow:0 8px 32px rgba(0,0,0,0.1); border-radius:16px; overflow:hidden; }
        .header { background:linear-gradient(135deg,#C6A170 0%,#B8956A 100%); padding:40px 30px; text-align:center; color:white; }
        .logo { width:120px; height:auto; margin-bottom:20px; }
        .header h1 { margin:0; font-size:28px; font-weight:600; text-shadow:0 2px 4px rgba(0,0,0,0.2); }
        .content { padding:40px 30px; text-align:right; }
        .main-title { font-size:24px; font-weight:600; color:#C6A170; margin-bottom:10px; text-align:right; }
        .number-sequence { font-size:36px; font-weight:700; color:#1F2024; text-align:center; margin:20px 0; letter-spacing:8px; padding:20px; background:linear-gradient(135deg,#f6efe6 0%,#f0e7d8 100%); border-radius:12px; border:1px solid #D4B896; }
        .description { font-size:18px; color:#5A5A5A; margin:30px 0; text-align:right; line-height:1.8; }
        .pdf-section { background:linear-gradient(135deg,#f6efe6 0%,#f0e7d8 100%); border-radius:12px; padding:30px; margin:30px 0; border:1px solid #D4B896; text-align:center; }
        .pdf-title { font-size:20px; font-weight:600; color:#C6A170; margin-bottom:15px; }
        .pdf-text { font-size:16px; color:#5A5A5A; margin-bottom:25px; text-align:right; }
        .pdf-button { display:inline-block; background:linear-gradient(135deg,#C6A170 0%,#B8956A 100%); color:white; padding:15px 30px; border-radius:8px; text-decoration:none; font-weight:600; font-size:16px; box-shadow:0 4px 15px rgba(198,161,112,0.3); transition:all .3s ease; }
        .pdf-button:hover { background:linear-gradient(135deg,#B8956A 0%,#A68659 100%); box-shadow:0 6px 20px rgba(198,161,112,0.4); }
        .footer { background:#1F2024; color:white; padding:30px; text-align:center; }
        .footer-logo { width:80px; height:auto; margin-bottom:15px; }
        .footer-text { font-size:14px; color:#B8B8B8; }
        @media (max-width:600px){ .container{margin:10px} .header,.content{padding:20px} .number-sequence{font-size:28px; letter-spacing:4px} }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${baseUrl}/newlogos/ikon.png" alt="Awakening by Ksenia" class="logo">
            <h1>הפירוש האישי לקוד העושר שלכם מוכן</h1>
        </div>
        <div class="content">
            <div class="main-title">קוד העושר האישי שלכם הוא</div>
            <div class="number-sequence">${testCode.bd} ${testCode.bm} ${testCode.by} ${testCode.lp}</div>
            <div class="description">
                ${
                  hasDuplicates
                    ? "בקוד העושר שלכם יש מספרים כפולים, מה שמעצים את כוחם ומשפעתם על חייכם. כל מספר מייצג היבט שונה בזהות ובמסלול החיים שלכם."
                    : "כל מספר בקוד העושר שלכם הוא ייחודי ומייצג היבט שונה בזהות ובמסלול החיים שלכם. השילוב הזה יוצר פרופיל אישי מגוון ועשיר."
                }
            </div>
            <div class="pdf-section">
                <div class="pdf-title">הפירוש המלא והמפורט</div>
                <div class="pdf-text">הפירוש המלא שלכם כולל ניתוח של כל מספר, ההשפעה על תחומי חיים שונים והקשרים הייחודיים ביניהם. קבלו תובנות מעמיקות על זהותכם, חוזקות, אתגרים ומסלול החיים הייחודי שלכם.</div>
                <a href="${interpretationUrl}" class="pdf-button">צפו בפירוש המלא</a>
            </div>
        </div>
        <div class="footer">
            <img src="${baseUrl}/newlogos/ikon.png" alt="Awakening by Ksenia" class="footer-logo">
            <div class="footer-text">תודה שבחרתם ב-Awakening by Ksenia<br/>נומרולוגיה אישית מותאמת עבורכם</div>
        </div>
    </div>
</body>
</html>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    });

    const mailOptions = {
      from: `"Awakening by Ksenia" <${process.env.EMAIL_USER}>`,
      to: "kseniachud@gmail.com",
      subject:
        "בדיקה סופית - הפירוש האישי לקוד העושר שלכם מוכן - Awakening by Ksenia",
      html: emailHtml,
    };

    console.log("Sending webhook test email...");
    console.log("Email subject:", mailOptions.subject);
    console.log("Has duplicate numbers:", hasDuplicates);
    console.log("Interpretation URL:", interpretationUrl);

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log(
      "Preview URL (if available):",
      nodemailer.getTestMessageUrl(info),
    );
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

testWebhookEmail()
  .then(() => console.log("Test completed"))
  .catch((err) => console.error("Test failed:", err));
