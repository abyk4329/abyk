import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.GROW_WEBHOOK_SECRET
    const provided = req.headers.get('x-grow-signature') || req.headers.get('x-webhook-signature') || ''

    if (secret && provided && provided !== secret) {
      return NextResponse.json({ ok: false, error: 'invalid signature' }, { status: 401 })
    }

    const contentType = req.headers.get('content-type') || ''
    let body: any = {}
    if (contentType.includes('application/json')) {
      body = await req.json()
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const form = await req.formData()
      body = Object.fromEntries(form.entries())
    } else {
      const text = await req.text()
      body = { raw: text }
    }

    // Extract common fields if present
  const transactionId = body.transaction_id || body.transactionId || body.id || body.reference || body.ref || null
  const status = (body.status || body.event || 'unknown').toString().toLowerCase()
  const amount = body.amount || body.total || null
  const email = body.email || body.customer_email || null

    // Log basic info (Vercel logs) — remove PII and keep minimal
    console.log('GROW_WEBHOOK', {
      transactionId,
      status,
      amount,
      email: email ? 'redacted' : null,
    })

    // If we have a successful payment and an email, trigger the confirmation email via our API
    const successStatuses = ['paid', 'succeeded', 'success', 'completed']
    if (email && successStatuses.includes(status)) {
      try {
        const baseUrl = req.nextUrl.origin
        const subject = 'הפירוש המלא לקוד העושר האישי שלך'
        const viewUrl = `${baseUrl}/thank-you${transactionId ? `?code=${encodeURIComponent(transactionId)}` : ''}`
        const downloadUrl = `${baseUrl}/api/download-pdf${transactionId ? `?code=${encodeURIComponent(transactionId)}` : ''}`
        const html = `<!doctype html><html dir="rtl" lang="he"><body style="font-family:Assistant,system-ui,sans-serif;color:#473B31;">
          <div style="max-width:640px;margin:0 auto;background:#fff;padding:24px;border:1px solid rgba(135,103,79,.2);border-radius:12px;">
            <h1 style="font-size:22px;margin:0 0 12px;">תודה על הרכישה!</h1>
            <p style="font-size:15px;line-height:1.7;margin:0 0 16px;">הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.</p>
            <p style="margin:0 0 10px;"><a href="${viewUrl}" style="display:inline-block;padding:12px 18px;background:#87674F;color:#fff;text-decoration:none;border-radius:8px;">צפייה באתר (מומלץ)</a></p>
            <p style="margin:8px 0 0;"><a href="${downloadUrl}" style="display:inline-block;padding:10px 16px;background:rgba(135,103,79,.1);color:#473B31;text-decoration:none;border-radius:8px;border:1px solid rgba(135,103,79,.3);">הורדת PDF</a></p>
          </div>
        </body></html>`
        await fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ to: email, subject, html, metadata: { transactionId, amount, status } }),
        })
      } catch (e) {
        console.error('GROW_WEBHOOK_EMAIL_TRIGGER_ERROR', e)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('GROW_WEBHOOK_ERROR', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export async function GET() {
  // Simple health-check endpoint
  return NextResponse.json({ ok: true })
}
