import { NextRequest, NextResponse } from 'next/server'
import { generateEmailHTML, generateEmailSubject, generateEmailText } from '@/components/EmailTemplate'

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
  const viewUrl = `${baseUrl}/interpretations${transactionId ? `?code=${encodeURIComponent(transactionId)}` : ''}${transactionId ? '&' : '?'}utm_source=email&utm_campaign=delivery`
        const downloadUrl = `${baseUrl}/api/download-pdf${transactionId ? `?code=${encodeURIComponent(transactionId)}` : ''}`
        const wealthCode = Number((body.wealth_code || body.code || '').toString().replace(/\D/g, '')) || undefined
        const name = body.name || body.customer_name || body.customerName || undefined

        const subject = generateEmailSubject(wealthCode || 0)
        const html = generateEmailHTML({
          wealthCode: wealthCode || 0,
          viewUrl,
          downloadUrl,
        })
        const text = generateEmailText({
          wealthCode: wealthCode || 0,
          viewUrl,
          downloadUrl,
        })
        await fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ to: email, subject, html, text, metadata: { transactionId, amount, status, name, wealthCode } }),
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
