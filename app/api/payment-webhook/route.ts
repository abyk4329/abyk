import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { isValidDigit, Code } from '@/lib/interpretation'

export const runtime = 'nodejs'

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return null
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text()
    const signature = (req.headers.get('x-webhook-signature') || req.headers.get('x-signature') || '').trim()
    const secret = (process.env.WEBHOOK_SECRET || '').trim()

    if (!secret) {
      return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 })
    }

    const expected = crypto.createHmac('sha256', secret).update(raw, 'utf8').digest('hex')
    
    if (!signature || signature !== expected) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any
    try {
      body = JSON.parse(raw)
    } catch {
      return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
    }

    const customerEmail: string | undefined = body?.customerEmail || body?.customer?.email || body?.email
    const paymentStatus: string | undefined = body?.paymentStatus || body?.status
    const customData = body?.customData ?? body?.metadata ?? {}
    
    if (paymentStatus !== 'completed') {
      return NextResponse.json({ message: 'Payment not completed' }, { status: 400 })
    }

    if (!customerEmail) {
      return NextResponse.json({ message: 'Missing customerEmail' }, { status: 400 })
    }

    const code: Code = {
      bd: Number.parseInt(String(customData.bd ?? '')) || 0,
      bm: Number.parseInt(String(customData.bm ?? '')) || 0,
      by: Number.parseInt(String(customData.by ?? '')) || 0,
      lp: Number.parseInt(String(customData.lp ?? '')) || 0,
    }

    if (!isValidDigit(code.bd) || !isValidDigit(code.bm) || !isValidDigit(code.by) || !isValidDigit(code.lp)) {
      return NextResponse.json({ message: 'Invalid or missing code values' }, { status: 400 })
    }

    const numbers = [code.bd, code.bm, code.by, code.lp];
    const uniqueNumbers = Array.from(new Set(numbers));
    const hasDuplicates = numbers.length !== uniqueNumbers.length;
    
    const baseUrl = 'https://awakening-by-ksenia-app.vercel.app';
    const interpretationUrl = baseUrl + '/thank-you?bd=' + code.bd + '&bm=' + code.bm + '&by=' + code.by + '&lp=' + code.lp;
    
    const duplicateText = hasDuplicates 
      ? 'בקוד העושר שלך יש מספרים כפולים, מה שמעצים את כוחם ומשפעתם על חייך. כל מספר מייצג היבט שונה באישיותך ובמסלול החיים שלך.'
      : 'כל מספר בקוד העושר שלך הוא ייחודי ומייצג היבט שונה באישיותך ובמסלול החיים שלך. השילוב הזה יוצר פרופיל אישיותי מורכב ועשיר.'
    
    const emailHtml = '<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>הפירוש האישי לקוד העושר שלך מוכן - Awakening by Ksenia</title><style>@import url("https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap");body{font-family:"Assistant",Arial,sans-serif;background:linear-gradient(135deg,#FEFEFE 0%,#F8F5F1 100%);color:#1F2024;line-height:1.7;margin:0;padding:0;direction:rtl}.container{max-width:800px;margin:0 auto;background:#FFFFFF;box-shadow:0 8px 32px rgba(0,0,0,0.1);border-radius:16px;overflow:hidden}.header{background:linear-gradient(135deg,#C6A170 0%,#B8956A 100%);padding:40px 30px;text-align:center;color:white}.logo{width:120px;height:auto;margin-bottom:20px}.header h1{margin:0;font-size:28px;font-weight:600;text-shadow:0 2px 4px rgba(0,0,0,0.2)}.content{padding:40px 30px;text-align:right}.main-title{font-size:24px;font-weight:600;color:#C6A170;margin-bottom:10px;text-align:right}.number-sequence{font-size:36px;font-weight:700;color:#1F2024;text-align:center;margin:20px 0;letter-spacing:8px;padding:20px;background:linear-gradient(135deg,#f6efe6 0%,#f0e7d8 100%);border-radius:12px;border:1px solid #D4B896}.description{font-size:18px;color:#5A5A5A;margin:30px 0;text-align:right;line-height:1.8}.pdf-section{background:linear-gradient(135deg,#f6efe6 0%,#f0e7d8 100%);border-radius:12px;padding:30px;margin:30px 0;border:1px solid #D4B896;text-align:center}.pdf-title{font-size:20px;font-weight:600;color:#C6A170;margin-bottom:15px}.pdf-text{font-size:16px;color:#5A5A5A;margin-bottom:25px;text-align:right}.pdf-button{display:inline-block;background:linear-gradient(135deg,#C6A170 0%,#B8956A 100%);color:white;padding:15px 30px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;box-shadow:0 4px 15px rgba(198,161,112,0.3)}.footer{background:#1F2024;color:white;padding:30px;text-align:center}.footer-logo{width:80px;height:auto;margin-bottom:15px}.footer-text{font-size:14px;color:#B8B8B8}@media(max-width:600px){.container{margin:10px}.header,.content{padding:20px}.number-sequence{font-size:28px;letter-spacing:4px}}</style></head><body><div class="container"><div class="header"><img src="https://awakening-by-ksenia-app.vercel.app/logo.svg" alt="Awakening by Ksenia" class="logo"><h1>הפירוש האישי לקוד העושר שלך מוכן</h1></div><div class="content"><div class="main-title">הקוד העושר האישי שלך הוא</div><div class="number-sequence">' + code.bd + ' ' + code.bm + ' ' + code.by + ' ' + code.lp + '</div><div class="description">' + duplicateText + '</div><div class="pdf-section"><div class="pdf-title">הפירוש המלא והמפורט</div><div class="pdf-text">הפירוש המלא שלך כולל ניתוח עמוק של כל מספר, השפעתו על תחומי חיים שונים, והקשרים הייחודיים בין המספרים בקוד שלך. קבלי תובנות מעמיקות על האישיות שלך, כשרונותיך, אתגריך ומסלול החיים המיועד לך.</div><a href="' + interpretationUrl + '" class="pdf-button">צפי בפירוש המלא</a></div></div><div class="footer"><img src="https://awakening-by-ksenia-app.vercel.app/logo.svg" alt="Awakening by Ksenia" class="footer-logo"><div class="footer-text">תודה שבחרת ב-Awakening by Ksenia<br/>נומרולוגיה אישית ומותאמת במיוחד עבורך</div></div></div></body></html>'

    const transporter = createTransporter()
    const mailOptions = {
      from: '"Awakening by Ksenia" <' + process.env.EMAIL_USER + '>',
      to: customerEmail,
      subject: 'הפירוש האישי לקוד העושר שלך מוכן - Awakening by Ksenia',
      html: emailHtml,
    }

    if (!transporter) {
      return NextResponse.json({ message: 'Email disabled' })
    }
    
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Email sent' })
    
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
