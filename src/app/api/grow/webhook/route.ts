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
    const status = body.status || body.event || 'unknown'
    const amount = body.amount || body.total || null
    const email = body.email || body.customer_email || null

    // Log basic info (Vercel logs) — remove PII and keep minimal
    console.log('GROW_WEBHOOK', {
      transactionId,
      status,
      amount,
      email: email ? 'redacted' : null,
    })

    // Optionally, you could trigger email delivery or database writes here.

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
