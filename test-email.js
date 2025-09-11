import nodemailer from "nodemailer";

// הגדרת משתני סביבה ידנית
process.env.EMAIL_USER = "awakening.by.ksenia@gmail.com";
process.env.EMAIL_PASSWORD = "quowltyhgteybtue";

async function testEmail() {
  console.log("Testing email configuration...");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log(
    "EMAIL_PASSWORD length:",
    process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : "undefined"
  );

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // בדיקת החיבור
    console.log("Verifying connection...");
    await transporter.verify();
    console.log("✅ Connection verified successfully!");

    // שליחת מייל בדיקה עם תבנית החדשה
    console.log("Sending test email...");
    const testEmailHtml = `<!DOCTYPE html>
  <html dir="rtl" lang="he">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>הפירוש הנומרולוגי שלכם - Awakening by Ksenia</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap');
      
      * {
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Assistant';
        background: linear-gradient(135deg, #FEFEFE 0%, #F8F5F1 100%);
        color: #1F2024;
        line-height: 1.7;
        margin: 0;
        padding: 20px;
        direction: rtl;
        text-align: right;
      }
      
      .container {
        max-width: 650px;
        margin: 0 auto;
        background: #FFFFFF;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }
      

      
      .content {
        padding: 35px;
      }
      
      .code-display {
        background: linear-gradient(135deg, #F8F6F0 0%, #F0EDE3 100%);
        border-radius: 12px;
        padding: 25px;
        margin: 25px 0;
        text-align: center;
      }
      
      .code-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        max-width: 300px;
        margin: 0 auto;
      }
      
      .code-item {
        background: #3C2A1E;
        color: #FEFDF8;
        padding: 12px 8px;
        border-radius: 8px;
        text-align: center;
      }
      
      .code-label {
        font-size: 11px;
        color: #D4AF37;
        margin-bottom: 3px;
        font-weight: 400;
      }
      
      .code-number {
        font-size: 20px;
        font-weight: 600;
      }
      
      .interpretation-section {
        margin: 30px 0;
        padding: 25px;
        background: #FEFDF8;
        border-radius: 10px;
        border: 1px solid #E8E1D3;
      }
      
      .interpretation-section h2 {
        color: #D4AF37;
        font-size: 20px;
        font-weight: 500;
        margin: 0 0 18px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #E8E1D3;
      }
      
      .interpretation-section h3 {
        color: #3C2A1E;
        font-size: 16px;
        font-weight: 500;
        margin: 20px 0 10px 0;
        text-align: right;
      }
      
      .interpretation-section p {
        color: #5D4E37;
        font-size: 15px;
        margin: 12px 0;
        line-height: 1.7;
        text-align: right;
      }
      
      .interpretation-section ul {
        margin: 12px 0;
        padding-right: 20px;
        text-align: right;
      }
      
      .interpretation-section li {
        color: #5D4E37;
        font-size: 15px;
        margin: 8px 0;
        line-height: 1.6;
        text-align: right;
      }
      
      .footer {
        background: #1F2024;
        color: white;
        padding: 30px;
        text-align: center;
      }
      
      .footer p {
        margin: 8px 0;
        color: #B8B8B8;
        font-size: 14px;
      }
      
      .footer .signature {
        color: #C6A170;
        font-weight: 500;
        font-size: 16px;
      }
      
      .cta-button {
        display: inline-block;
        background: #D4AF37;
        color: #FEFDF8;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 15px;
        margin: 20px 0;
        transition: background 0.3s ease;
      }
      
      .cta-button:hover {
        background: #C6A170;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <div style="text-align: center; margin: 25px 0;">
          <h3 style="color: #C6A170; margin: 0 0 15px 0; font-size: 24px; font-weight: 600; text-align: right;">קוד העושר האישי שלכם הוא</h3>
          <div style="font-size: 36px; font-weight: 700; color: #1F2024; text-align: center; margin: 20px 0; letter-spacing: 8px; padding: 20px; background: linear-gradient(135deg, #f6efe6 0%, #f0e7d8 100%); border-radius: 12px; border: 1px solid #D4B896;">
            3 7 9 1
          </div>
        </div>

        <div style="margin: 30px 0; padding: 25px; background: linear-gradient(135deg, #f6efe6 0%, #f0e7d8 100%); border-radius: 12px; border-left: 4px solid #C6A170; text-align: right;">
          <p style="color: #5A5A5A; font-size: 18px; line-height: 1.8; margin: 0;">כל מספר בקוד העושר שלכם הוא ייחודי ומייצג היבט שונה בזהות ובמסלול החיים שלכם. השילוב הזה יוצר פרופיל אישי מגוון ועשיר.</p>
        </div>

        <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #f6efe6 0%, #f0e7d8 100%); border-radius: 12px; margin: 30px 0; border: 1px solid #D4B896;">
          <h3 style="color: #C6A170; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">הפירוש המלא והמפורט</h3>
          <p style="color: #5A5A5A; font-size: 16px; margin: 0 0 20px 0; text-align: right; line-height: 1.8;">הפירוש המלא שלכם כולל ניתוח של כל מספר, ההשפעה על תחומי חיים שונים והקשרים הייחודיים ביניהם. קבלו תובנות מעמיקות על זהותכם, חוזקות, אתגרים ומסלול החיים הייחודי שלכם.</p>
          <a href="https://awakening-by-ksenia-app.vercel.app/thank-you?bd=3&bm=7&by=9&lp=1" style="display: inline-block; background: linear-gradient(135deg, #C6A170 0%, #B8956A 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 10px 0; box-shadow: 0 4px 15px rgba(198, 161, 112, 0.3);">
            צפו בפירוש המלא
          </a>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://awakening-by-ksenia-app.vercel.app/thank-you?bd=3&bm=7&by=9&lp=1" class="cta-button">
            צפייה בפירוש המלא באתר
          </a>
        </div>
      </div>
      
      <div class="footer">
        <div style="margin-bottom: 20px;">
          <img src="https://awakening-by-ksenia-app.vercel.app/newlogos/logo.png" alt="Awakening by Ksenia" style="width: 80px; height: auto; margin-bottom: 15px;">
        </div>
        <p class="signature">בברכה, קסניה</p>
        <p>אם יש שאלות, ניתן לפנות אליי:</p>
        <p style="margin: 10px 0;">
          📧 <a href="mailto:awakening.by.ksenia@gmail.com" style="color: #C6A170; text-decoration: none; font-weight: 500;">awakening.by.ksenia@gmail.com</a>
        </p>
        <p style="margin: 10px 0;">
          📱 <a href="https://wa.me/972507888379?text=שלום%20קסניה,%20יש%20לי%20שאלה" style="color: #C6A170; text-decoration: none; font-weight: 500;">וואטסאפ - 050-788-8379</a>
        </p>
        <p style="color: #B8B8B8; font-size: 14px; margin-top: 15px;">תודה שבחרתם ב-Awakening by Ksenia<br/>נומרולוגיה אישית מותאמת עבורכם</p>
      </div>
    </div>
  </body>
  </html>`;

    const result = await transporter.sendMail({
      from: `"Awakening by Ksenia" <${process.env.EMAIL_USER}>`,
      to: "kseniachud@gmail.com",
      subject: "הפירוש האישי לקוד העושר שלכם מוכן - Awakening by Ksenia",
      html: testEmailHtml,
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", result.messageId);
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.code === "EAUTH") {
      console.error(
        "Authentication failed. Check your EMAIL_PASSWORD in .env.local"
      );
      console.error(
        "Make sure you are using an App Password, not your regular Gmail password"
      );
    }
  }
}

testEmail();
