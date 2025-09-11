import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { isValidDigit } from '@/lib/interpretation'

export const runtime = 'nodejs'

// Email transporter (Gmail). Returns null if credentials are missing.
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) return null
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

// Normalize Grow PaymentLinks payloads and legacy schemas into a common shape
/* eslint-disable @typescript-eslint/no-explicit-any */
function extractPayload(pre: any) {
  // Legacy/simple schema
  const legacyEmail = pre?.customerEmail || pre?.customer?.email || pre?.email
  const legacyStatus = (pre?.paymentStatus || pre?.status || '').toString().toLowerCase()
  const legacyCustom = pre?.customData ?? pre?.metadata ?? {}

  // Grow PaymentLinks common fields
  const data = pre?.data ?? pre
  const payerEmail = data?.payerEmail || data?.customerEmail || legacyEmail
  const statusCode = Number.parseInt(String(data?.statusCode ?? data?.status_code ?? 'NaN'))
  const status = (data?.status || legacyStatus || '').toString().toLowerCase()

  // Extract bd/bm/by/lp from dynamicFields (supports various keys/labels including Hebrew)
  type Dyn = { key?: string; name?: string; label?: string; id?: string; value?: string | number }
  const dynamicFields: Dyn[] = Array.isArray(data?.dynamicFields) ? data.dynamicFields : []
  const pickVal = (keys: string[]): number | 0 => {
    for (const f of dynamicFields) {
      const hay = [f.key, f.name, f.label, f.id]
        .filter(Boolean)
        .map((s) => String(s).toLowerCase().trim())
      if (hay.some((h) => keys.includes(h))) {
        const v = Number.parseInt(String(f.value ?? ''))
        if (Number.isFinite(v)) return v as number
      }
    }
    // fallback to legacy customData
    for (const k of keys) {
      const v = Number.parseInt(String(legacyCustom[k as keyof typeof legacyCustom] ?? ''))
      if (Number.isFinite(v)) return v as number
    }
    return 0
  }

  const bd = pickVal(['bd', 'day', 'birth_day', 'יום', 'יום לידה'])
  const bm = pickVal(['bm', 'month', 'birth_month', 'חודש', 'חודש לידה'])
  const by = pickVal(['by', 'year', 'birth_year', 'שנה', 'שנת לידה'])
  const lp = pickVal(['lp', 'life_path', 'lifepath', 'יעוד', 'יעוד הילידי', 'יעוד לידה'])

  // Success if statusCode==2 or status in approved list or legacyStatus==completed
  const successStatuses = new Set(['completed', 'paid', 'success', 'approved'])
  const isSuccess = successStatuses.has(status) || successStatuses.has(legacyStatus) || statusCode === 2

  return { email: payerEmail, isSuccess, code: { bd, bm, by, lp } }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text()
    const url = new URL(req.url)
    // Parse body early for API key fallback and Grow fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pre: any
    try { pre = JSON.parse(raw) } catch { pre = {} }

    const secret = (process.env.WEBHOOK_SECRET || '').trim()
    if (!secret) {
      return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 })
    }

    // Auth: allow any of (valid HMAC) OR (API key in header/query/body)
    const signature = (req.headers.get('x-webhook-signature') || req.headers.get('x-signature') || '').trim()
    const expected = signature
      ? crypto.createHmac('sha256', secret).update(raw, 'utf8').digest('hex')
      : ''
    const headerApiKey = (req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '') || '').trim()
    const queryKey = url.searchParams.get('webhook_key') || url.searchParams.get('key') || ''
    const bodyKey = (pre?.webhook_key || pre?.key || '').toString()
    const apiKeyOk = [headerApiKey, queryKey, bodyKey].some((k) => k && k.trim() === secret)
    const hmacOk = !!signature && signature === expected

    if (!apiKeyOk && !hmacOk) {
      return NextResponse.json({ message: 'Auth failed' }, { status: 401 })
    }

    // Normalize payload
    const { email, isSuccess, code } = extractPayload(pre)

    if (!isSuccess) {
      return NextResponse.json({ message: 'Payment not completed' }, { status: 400 })
    }
    if (!email) {
      return NextResponse.json({ message: 'Missing customerEmail' }, { status: 400 })
    }
    if (!isValidDigit(code.bd) || !isValidDigit(code.bm) || !isValidDigit(code.by) || !isValidDigit(code.lp)) {
      return NextResponse.json({ message: 'Invalid or missing code values' }, { status: 400 })
    }

    // Build interpretation URL and email content
    const numbers = [code.bd, code.bm, code.by, code.lp]
    const hasDuplicates = numbers.length !== Array.from(new Set(numbers)).length
    const baseUrl = (
      process.env.BASE_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      'https://abyk.vercel.app'
    ).replace(/\/$/, '')
    const interpretationUrl = `${baseUrl}/thank-you?bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}`
    const duplicateText = hasDuplicates
      ? 'בקוד העושר שלכם יש מספרים כפולים, מה שמעצים את כוחם ומשפעתם על חייכם. כל מספר מייצג היבט שונה בזהות שלכם ובמסלול החיים שלכם.'
      : 'כל מספר בקוד העושר שלכם הוא ייחודי ומייצג היבט שונה בזהות שלכם ובמסלול החיים שלכם. השילוב הזה יוצר פרופיל אישי מגוון ועשיר.'

    const emailHtml = `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>הפירוש האישי לקוד העושר שלכם מוכן - Awakening by Ksenia</title><style>@import url("https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap");body{font-family:"Assistant",Arial,sans-serif;background:linear-gradient(135deg,#FEFEFE 0%,#F8F5F1 100%);color:#1F2024;line-height:1.7;margin:0;padding:0;direction:rtl}.container{max-width:800px;margin:0 auto;background:#FFFFFF;box-shadow:0 8px 32px rgba(0,0,0,0.1);border-radius:16px;overflow:hidden}.header{background:linear-gradient(135deg,#C6A170 0%,#B8956A 100%);padding:40px 30px;text-align:center;color:white}.logo{width:120px;height:auto;margin-bottom:20px}.header h1{margin:0;font-size:28px;font-weight:600;text-shadow:0 2px 4px rgba(0,0,0,0.2)}.content{padding:40px 30px;text-align:right}.main-title{font-size:24px;font-weight:600;color:#C6A170;margin-bottom:10px;text-align:right}.number-sequence{font-size:36px;font-weight:700;color:#1F2024;text-align:center;margin:20px 0;letter-spacing:8px;padding:20px;background:linear-gradient(135deg,#f6efe6 0%,#f0e7d8 100%);border-radius:12px;border:1px solid #D4B896}.description{font-size:18px;color:#5A5A5A;margin:30px 0;text-align:right;line-height:1.8}.pdf-section{background:linear-gradient(135deg,#f6efe6 0%,#f0e7d8 100%);border-radius:12px;padding:30px;margin:30px 0;border:1px solid #D4B896;text-align:center}.pdf-title{font-size:20px;font-weight:600;color:#C6A170;margin-bottom:15px}.pdf-text{font-size:16px;color:#5A5A5A;margin-bottom:25px;text-align:right}.pdf-button{display:inline-block;background:linear-gradient(135deg,#C6A170 0%,#B8956A 100%);color:white;padding:15px 30px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;box-shadow:0 4px 15px rgba(198,161,112,0.3)}.footer{background:#1F2024;color:white;padding:30px;text-align:center}.footer-logo{width:80px;height:auto;margin-bottom:15px}.footer-text{font-size:14px;color:#B8B8B8}@media(max-width:600px){.container{margin:10px}.header,.content{padding:20px}.number-sequence{font-size:28px;letter-spacing:4px}}</style></head><body><div class="container"><div class="header"><img src="${baseUrl}/newlogos/logo.png" alt="Awakening by Ksenia" class="logo"><h1>הפירוש האישי לקוד העושר שלכם מוכן</h1></div><div class="content"><div class="main-title">קוד העושר האישי שלכם הוא</div><div class="number-sequence">${code.bd} ${code.bm} ${code.by} ${code.lp}</div><div class="description">${duplicateText}</div><div class="pdf-section"><div class="pdf-title">הפירוש המלא והמפורט</div><div class="pdf-text">הפירוש המלא שלכם כולל ניתוח של כל מספר, ההשפעה על תחומי חיים שונים והקשרים הייחודיים ביניהם. קבלו תובנות מעמיקות על זהותכם, חוזקות, אתגרים ומסלול החיים הייחודי שלכם.</div><a href="${interpretationUrl}" class="pdf-button">צפו בפירוש המלא</a></div></div><div class="footer"><img src="${baseUrl}/newlogos/logo.png" alt="Awakening by Ksenia" class="footer-logo"><div class="footer-text">תודה שבחרתם ב-Awakening by Ksenia<br/>נומרולוגיה אישית מותאמת עבורכם</div></div></div></body></html>`

    const transporter = createTransporter()
    const mailOptions = {
      from: `"Awakening by Ksenia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'הפירוש האישי לקוד העושר שלכם מוכן - Awakening by Ksenia',
      html: emailHtml,
    }
    if (!transporter) {
      return NextResponse.json({ message: 'Email disabled (no SMTP credentials)', interpretationUrl })
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Email sent', interpretationUrl })
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const secret = (process.env.WEBHOOK_SECRET || '').trim()
  const hasHeaderKey = !!(req.headers.get('x-api-key') || req.headers.get('authorization'))
  const hasQueryKey = !!(url.searchParams.get('webhook_key') || url.searchParams.get('key'))
  const version = 'grow-v3'
  return NextResponse.json({ ok: true, version, secretSet: !!secret, hasHeaderKey, hasQueryKey })
}
