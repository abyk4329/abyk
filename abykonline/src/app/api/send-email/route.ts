import { NextRequest, NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'

export const runtime = 'nodejs'

type SendEmailPayload = {
  to: string
  subject: string
  html?: string
  text?: string
  metadata?: Record<string, any>
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SendEmailPayload
  const { to, subject, html, text, metadata } = body || {}

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { ok: false, error: 'missing-fields', details: 'to, subject and html/text are required' },
        { status: 400 }
      )
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@abyk.online'
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
    const EMAIL_HOST = process.env.EMAIL_HOST || (EMAIL_USER?.includes('@gmail.com') ? 'smtp.gmail.com' : '')
    const EMAIL_PORT = Number(process.env.EMAIL_PORT || (EMAIL_HOST === 'smtp.gmail.com' ? 465 : 587))
    const EMAIL_SECURE = (process.env.EMAIL_SECURE ?? (EMAIL_PORT === 465 ? 'true' : 'false')).toString().toLowerCase() === 'true'

    // 1) Try SMTP via Nodemailer when credentials provided
    if (EMAIL_USER && EMAIL_PASSWORD) {
      try {
        const nodemailer = await import('nodemailer')
        const transporter = nodemailer.createTransport({
          host: EMAIL_HOST || undefined,
          port: EMAIL_PORT,
          secure: EMAIL_SECURE,
          auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
        })

        // Optionally attach a generated PDF if requested
        let attachments: any[] | undefined
        const attachCode = Number((metadata?.attachPdfCode as any) || 0)
        if (attachCode && attachCode >= 1111 && attachCode <= 9999) {
          try {
            const doc = new jsPDF('p', 'mm', 'a4')
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(20)
            doc.text('ABYK - Wealth Code', 105, 20, { align: 'center' })
            let y = 40
            const margin = 20
            doc.setFontSize(16)
            doc.text(`Code: ${attachCode}`, margin, y)
            y += 10
            // minimal hint with link
            doc.setFontSize(12)
            doc.text('For full details visit:', margin, y)
            y += 6
            doc.text(`https://abyk.online/interpretations?code=${attachCode}`, margin, y)
            const pdfBytes = doc.output('arraybuffer') as ArrayBuffer
            attachments = [{
              filename: `wealth-code-${attachCode}.pdf`,
              content: Buffer.from(new Uint8Array(pdfBytes)),
              contentType: 'application/pdf',
            }]
          } catch (genErr) {
            console.error('EMAIL_PDF_ATTACH_ERROR', genErr)
          }
        }

        const info = await transporter.sendMail({
          from: EMAIL_FROM,
          to,
          subject,
          html,
          text,
          attachments,
        })

        return NextResponse.json({ ok: true, messageId: info.messageId, transport: 'smtp' })
      } catch (smtpErr) {
        console.error('EMAIL_SMTP_ERROR_FALLBACK_TO_RESEND', smtpErr)
        // Continue to try Resend below
      }
    }

    // 2) Fallback to Resend if API key is configured
    if (RESEND_API_KEY) {
      // Use Resend HTTP API to avoid SDK typing constraints
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from: EMAIL_FROM, to, subject, html, text }),
      })

      const json = await resp.json().catch(() => ({}))
      if (!resp.ok) {
        console.error('EMAIL_SEND_ERROR', json)
        return NextResponse.json({ ok: false, error: json?.message || 'send-failed' }, { status: resp.status })
      }

      return NextResponse.json({ ok: true, messageId: json?.id || null, transport: 'resend' })
    }

    // 3) Final fallback: log only
    {
      // Log-only fallback so the app flow continues in development or if not configured
      console.log('EMAIL_SEND_FALLBACK', {
        to,
        subject,
        hasHtml: Boolean(html),
        hasText: Boolean(text),
        metadata,
      })
      return NextResponse.json({ ok: true, messageId: 'dev-fallback', transport: 'log' })
    }
  } catch (err: any) {
    console.error('EMAIL_SEND_UNEXPECTED', err)
    return NextResponse.json({ ok: false, error: err?.message || 'unexpected' }, { status: 500 })
  }
}

export async function GET() {
  // Health check
  return NextResponse.json({ ok: true })
}
