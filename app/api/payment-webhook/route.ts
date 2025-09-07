import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

// Ensure Node.js runtime for access to fs/path
export const runtime = 'nodejs'

// יצירת transporter למייל
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // או שירות מייל אחר
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

// פונקציה לקריאת קובץ הפירושים
const getInterpretations = (): { [key: string]: string } => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'numbersmeaning.html')
    const htmlContent = fs.readFileSync(filePath, 'utf8')
    
    // פרסור הHTML לחילוץ פירושי המספרים
    const interpretations: { [key: string]: string } = {}
    
    // דוגמה לפרסור - יש להתאים למבנה הקובץ האמיתי
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33']
    
    numbers.forEach(num => {
      const regex = new RegExp(`<h[2-3].*?>${num}.*?</h[2-3]>(.*?)(?=<h[2-3]|$)`, 'si')
      const match = htmlContent.match(regex)
      if (match) {
        interpretations[num] = match[1].trim()
      }
    })
    
    return interpretations
  } catch (error) {
    console.error('Error reading interpretations file:', error)
    return {}
  }
}

// יצירת HTML לפירוש אישי
type MoneyCode = { bd: number; bm: number; by: number; lp: number }

const createPersonalInterpretation = (code: MoneyCode): string => {
  const interpretations = getInterpretations()
  const uniques = Array.from(new Set([code.bd, code.bm, code.by, code.lp].filter(Boolean)))
  const blocks = uniques.map((n) => {
    const key = String(n)
    const html = interpretations[key] || 'פירוש לא נמצא'
    return `
      <div class="interpretation">
        <h2>פירוש למספר ${key}</h2>
        ${html}
      </div>
    `
  }).join('\n')
  
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>הפירוש האישי שלך - Awakening by Ksenia</title>
    <style>
        body {
            font-family: 'Assistant', Arial, sans-serif;
            line-height: 1.6;
            color: #1F2024;
            background-color: #FEFEFE;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            direction: rtl;
        }
        h1, h2 {
            color: #C6A170;
            text-align: center;
        }
        .code-display {
            background: linear-gradient(135deg, #D4B896 0%, #C6A170 100%);
            color: #1F2024;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            margin: 30px 0;
            box-shadow: 0 8px 25px rgba(196, 161, 112, 0.3);
        }
        .code-numbers {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        .code-item {
            background: rgba(255, 255, 255, 0.2);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
        }
        .code-item .label {
            font-size: 0.9em;
            margin-bottom: 5px;
            font-weight: 600;
        }
        .code-item .number {
            font-size: 2em;
            font-weight: bold;
        }
        .interpretation {
            background: #f9f9f9;
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            border-right: 4px solid #D4B896;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #D4B896;
            color: #6B6F76;
        }
        strong {
            color: #1F2024;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <h1>הפירוש הנומרולוגי האישי שלך</h1>
    
    <div class="code-display">
        <h2>הקוד שלך</h2>
        <div class="code-numbers">
            <div class="code-item">
                <div class="label">BD (יום לידה)</div>
                <div class="number">${code.bd}</div>
            </div>
            <div class="code-item">
                <div class="label">BM (חודש לידה)</div>
                <div class="number">${code.bm}</div>
            </div>
            <div class="code-item">
                <div class="label">BY (שנת לידה)</div>
                <div class="number">${code.by}</div>
            </div>
            <div class="code-item">
                <div class="label">LP (נתיב החיים)</div>
                <div class="number">${code.lp}</div>
            </div>
        </div>
    </div>

  ${blocks}

    <div class="footer">
        <p><strong>Awakening by Ksenia</strong></p>
        <p>מרחב לתודעה מתקדמת</p>
        <p>תאריך יצירה: ${new Date().toLocaleDateString('he-IL')}</p>
    </div>
</body>
</html>
  `
}

export async function POST(req: NextRequest) {
  try {
    // Read raw text for signature verification
    const raw = await req.text()
    const signature = req.headers.get('x-webhook-signature') || req.headers.get('x-signature') || ''
    const secret = process.env.WEBHOOK_SECRET || ''

    if (!secret) {
      console.error('WEBHOOK_SECRET is not set')
      return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 })
    }

    // HMAC-SHA256 verification
    const expected = crypto.createHmac('sha256', secret).update(raw, 'utf8').digest('hex')
    if (!signature || signature !== expected) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    const body = JSON.parse(raw)

    // כאן תצטרכי להתאים לפורמט של מערכת התשלומים שלך
    const customerEmail: string | undefined = body?.customerEmail
    const paymentStatus: string | undefined = body?.paymentStatus
    const customData = body?.customData ?? body?.metadata ?? {}
    
    if (paymentStatus !== 'completed') {
      return NextResponse.json({ message: 'Payment not completed' }, { status: 400 })
    }

    if (!customerEmail) {
      return NextResponse.json({ message: 'Missing customerEmail' }, { status: 400 })
    }

    // חילוץ נתוני הקוד מהפרמטרים
    const code = {
      bd: Number.parseInt(String(customData.bd ?? '')) || 0,
      bm: Number.parseInt(String(customData.bm ?? '')) || 0,
      by: Number.parseInt(String(customData.by ?? '')) || 0,
      lp: Number.parseInt(String(customData.lp ?? '')) || 0,
    }

  const isValidDigit = (n: number) => Number.isInteger(n) && n >= 1 && n <= 9
  if (!isValidDigit(code.bd) || !isValidDigit(code.bm) || !isValidDigit(code.by) || !isValidDigit(code.lp)) {
      return NextResponse.json({ message: 'Invalid or missing code values' }, { status: 400 })
    }

  // יצירת הפירוש האישי
  const personalInterpretation = createPersonalInterpretation(code)

    // שליחת המייל
  const transporter = createTransporter()
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'הפירוש הנומרולוגי האישי שלך - Awakening by Ksenia',
      html: personalInterpretation
    })

    return NextResponse.json({ message: 'Email sent successfully' })
    
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
