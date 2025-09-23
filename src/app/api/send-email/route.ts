import { NextRequest, NextResponse } from 'next/server'

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
    const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@abyk.online'

    if (!RESEND_API_KEY) {
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

    // Lazy import to avoid bundling if not used
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

    return NextResponse.json({ ok: true, messageId: json?.id || null })
  } catch (err: any) {
    console.error('EMAIL_SEND_UNEXPECTED', err)
    return NextResponse.json({ ok: false, error: err?.message || 'unexpected' }, { status: 500 })
  }
}

export async function GET() {
  // Health check
  return NextResponse.json({ ok: true })
}
