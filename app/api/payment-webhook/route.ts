import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { buildPersonalHtml, isValidDigit, Code } from '@/lib/interpretation'

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



export async function POST(req: NextRequest) {
  try {
    // Read raw text for signature verification
  const raw = await req.text()
  const signature = (req.headers.get('x-webhook-signature') || req.headers.get('x-signature') || '').trim()
  const secret = (process.env.WEBHOOK_SECRET || '').trim()

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
    const code: Code = {
      bd: Number.parseInt(String(customData.bd ?? '')) || 0,
      bm: Number.parseInt(String(customData.bm ?? '')) || 0,
      by: Number.parseInt(String(customData.by ?? '')) || 0,
      lp: Number.parseInt(String(customData.lp ?? '')) || 0,
    }

  if (!isValidDigit(code.bd) || !isValidDigit(code.bm) || !isValidDigit(code.by) || !isValidDigit(code.lp)) {
      return NextResponse.json({ message: 'Invalid or missing code values' }, { status: 400 })
    }

  // יצירת הפירוש האישי
  const personalInterpretation = buildPersonalHtml(code)

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
