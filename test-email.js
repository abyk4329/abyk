const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 'undefined');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // בדיקת החיבור
    console.log('Verifying connection...');
    await transporter.verify();
    console.log('✅ Connection verified successfully!');

    // שליחת מייל בדיקה עם תבנית החדשה
    console.log('Sending test email...');
    const testEmailHtml = `<!DOCTYPE html>
  <html dir="rtl" lang="he">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>בדיקת מייל - Awakening by Ksenia</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap');
      body {
        font-family: 'Assistant', Arial, sans-serif;
        background: linear-gradient(135deg, #FEFEFE 0%, #F8F5F1 100%);
        color: #1F2024;
        line-height: 1.7;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #FFFFFF;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        border-radius: 16px;
        overflow: hidden;
      }
      .header {
        background: linear-gradient(135deg, #C6A170 0%, #B8956A 100%);
        padding: 40px 30px;
        text-align: center;
        color: white;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
      }
      .content {
        padding: 40px 30px;
        text-align: center;
      }
      .success-icon {
        font-size: 48px;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>בדיקת מערכת מיילים</h1>
      </div>
      <div class="content">
        <div class="success-icon">✅</div>
        <h2>המערכת עובדת בהצלחה!</h2>
        <p>זה מייל בדיקה לוודא שהעיצוב החדש של המיילים נראה טוב.</p>
        <p>אם קיבלת את המייל הזה עם העיצוב היפה, הכל מוכן לפעולה! 🎉</p>
      </div>
    </div>
  </body>
  </html>`;

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'ksenia.test@gmail.com', // שנה לכתובת אמיתית שלך
      subject: 'בדיקת עיצוב מייל חדש - Awakening by Ksenia',
      html: testEmailHtml,
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check your EMAIL_PASSWORD in .env.local');
      console.error('Make sure you are using an App Password, not your regular Gmail password');
    }
  }
}

testEmail();
