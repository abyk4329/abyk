import { NextRequest, NextResponse } from 'next/server'
import { generateEmailHTML, generateEmailSubject, generateEmailText } from '@/components/EmailTemplate'

type WebhookPayload = Record<string, unknown>

const isValidWealthCode = (value: number) => Number.isInteger(value) && value >= 1111 && value <= 9999

const extractCodeFromCandidate = (candidate: unknown): number | undefined => {
  if (typeof candidate === 'number') {
    const intVal = Math.trunc(candidate)
    return isValidWealthCode(intVal) ? intVal : undefined
  }

  if (typeof candidate === 'string') {
    const trimmed = candidate.trim()
    if (/^\d{4}$/.test(trimmed)) {
      const direct = Number(trimmed)
      return isValidWealthCode(direct) ? direct : undefined
    }

    const hintMatch = /code|קוד|wealth/i.test(trimmed)
    const matches = trimmed.match(/\d{4}/g) || []
    for (const match of matches) {
      const parsed = Number(match)
      if (isValidWealthCode(parsed) && (hintMatch || match === trimmed)) {
        return parsed
      }
    }

    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        return extractWealthCode(JSON.parse(trimmed))
      } catch {
        // ignore JSON parse issues
      }
    }
  }

  return undefined
}

const extractWealthCode = (payload: unknown): number | undefined => {
  if (!payload || typeof payload !== 'object') {
    return extractCodeFromCandidate(payload)
  }

  const source = payload as Record<string, unknown>
  const visited = new WeakSet<object>()
  const queue: unknown[] = []
  const enqueue = (value: unknown) => {
    if (value === null || value === undefined) return
    queue.push(value)
  }

  const preferredRoots: unknown[] = [
    source['wealth_code'],
    source['wealthCode'],
    source['code'],
    source['metadata'],
    source['meta'],
    source['data'],
    source['payload'],
    source['order'],
    source['purchase'],
    source['custom_fields'],
    source['customFields'],
    source['fields'],
    source['items'],
    source['line_items'],
    source['notes'],
    source['note'],
    source['message'],
    source['raw'],
  ]

  for (const root of preferredRoots) {
    enqueue(root)
  }

  enqueue(source)

  while (queue.length > 0) {
    const candidate = queue.shift()
    const parsed = extractCodeFromCandidate(candidate)
    if (parsed) {
      return parsed
    }

    if (Array.isArray(candidate)) {
      for (const item of candidate) enqueue(item)
      continue
    }

    if (candidate && typeof candidate === 'object') {
      if (visited.has(candidate as object)) continue
      visited.add(candidate as object)
      for (const value of Object.values(candidate as Record<string, unknown>)) {
        enqueue(value)
      }
    }
  }

  return undefined
}

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.GROW_WEBHOOK_SECRET
    const provided = req.headers.get('x-grow-signature') || req.headers.get('x-webhook-signature') || ''

    if (secret && provided && provided !== secret) {
      return NextResponse.json({ ok: false, error: 'invalid signature' }, { status: 401 })
    }

    const contentType = req.headers.get('content-type') || ''
    let body: WebhookPayload = {}
    if (contentType.includes('application/json')) {
      const data = await req.json().catch(() => null)
      if (data && typeof data === 'object') {
        body = data as WebhookPayload
      } else {
        body = { raw: data }
      }
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const form = await req.formData()
      body = Object.fromEntries(form.entries())
    } else {
      const text = await req.text()
      body = { raw: text }
    }

    // Extract common fields if present
    const transactionId = (body['transaction_id'] || body['transactionId'] || body['id'] || body['reference'] || body['ref'] || null) as string | null
    const status = String(body['status'] || body['event'] || 'unknown').toLowerCase()
    const amount = body['amount'] || body['total'] || null
    const email = (body['email'] || body['customer_email'] || null) as string | null
    const wealthCode = extractWealthCode(body)

    // Log basic info (Vercel logs) — remove PII and keep minimal
    console.log('GROW_WEBHOOK', {
      transactionId,
      status,
      amount,
      email: email ? 'redacted' : null,
      wealthCode,
    })

    // If we have a successful payment and an email, trigger the confirmation email via our API
    const successStatuses = ['paid', 'succeeded', 'success', 'completed']
    if (email && successStatuses.includes(status) && wealthCode) {
      try {
        const baseUrl = req.nextUrl.origin
        const viewUrl = `${baseUrl}/interpretations?code=${encodeURIComponent(wealthCode)}&utm_source=email&utm_campaign=delivery`
        const downloadUrl = `${baseUrl}/api/download-pdf?code=${encodeURIComponent(wealthCode)}`

        const subject = generateEmailSubject(wealthCode)
        const html = generateEmailHTML({
          wealthCode,
          viewUrl,
          downloadUrl,
        })
        const text = generateEmailText({
          wealthCode,
          viewUrl,
          downloadUrl,
        })
        await fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ to: email, subject, html, text, metadata: { transactionId, amount, status, wealthCode } }),
        })
      } catch (e) {
        console.error('GROW_WEBHOOK_EMAIL_TRIGGER_ERROR', e)
      }
    } else if (email && successStatuses.includes(status) && !wealthCode) {
      console.warn('GROW_WEBHOOK_NO_CODE_FOUND', { transactionId, status })
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
