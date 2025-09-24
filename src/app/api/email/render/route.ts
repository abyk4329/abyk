import { NextRequest, NextResponse } from 'next/server'
import { generateEmailHTML, generateEmailText, generateEmailSubject } from '@/components/EmailTemplate'

export const runtime = 'nodejs'

type Payload = {
  to?: string
  wealthCode: number
  name?: string
}

function computeStructure(code: number) {
  const digits = code.toString().split('').map(Number)
  const counts = digits.reduce((acc: Record<number, number>, d) => {
    acc[d] = (acc[d] || 0) + 1
    return acc
  }, {})
  const repeatedDigits = Object.entries(counts)
    .filter(([, c]) => (c as number) > 1)
    .map(([digit, count]) => ({ digit: parseInt(digit, 10), count: count as number }))
  const allSame = new Set(digits).size === 1
  const allDifferent = new Set(digits).size === 4
  const hasRepeats = repeatedDigits.length > 0
  return { digits, repeatedDigits, allSame, allDifferent, hasRepeats }
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const wealthCode = parseInt(searchParams.get('code') || '1234', 10)
  const name = searchParams.get('name') || undefined

  const viewUrl = `${origin}/thank-you?code=${encodeURIComponent(searchParams.get('tx') || 'PREVIEW')}&download=1`
  const downloadUrl = `${origin}/api/download-pdf?code=${encodeURIComponent(searchParams.get('tx') || 'PREVIEW')}`

  const html = generateEmailHTML({
    wealthCode,
    customerName: name,
    viewUrl,
    downloadUrl,
    codeStructure: computeStructure(wealthCode),
  })
  return new NextResponse(html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload
    const { to, wealthCode, name } = body
    if (!wealthCode) return NextResponse.json({ ok: false, error: 'missing code' }, { status: 400 })

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const viewUrl = `${origin}/thank-you?code=${encodeURIComponent('EMAIL-PREVIEW')}&download=1`
    const downloadUrl = `${origin}/api/download-pdf?code=${encodeURIComponent('EMAIL-PREVIEW')}`

    const html = generateEmailHTML({
      wealthCode,
      customerName: name,
      viewUrl,
      downloadUrl,
      codeStructure: computeStructure(wealthCode),
    })
    const text = generateEmailText({
      wealthCode,
      customerName: name,
      viewUrl,
      downloadUrl,
      codeStructure: computeStructure(wealthCode),
    })
    const subject = generateEmailSubject(wealthCode)

    if (!to) {
      return NextResponse.json({ ok: true, preview: true, htmlLength: html.length, subject })
    }

    const resp = await fetch(`${origin}/api/send-email`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ to, subject, html, text, metadata: { preview: true } }),
    })
    const json = await resp.json().catch(() => ({}))
    if (!resp.ok) return NextResponse.json(json, { status: resp.status })
    return NextResponse.json(json)
  } catch (e: any) {
    console.error('EMAIL_RENDER_POST_ERROR', e)
    return NextResponse.json({ ok: false, error: e?.message || 'unexpected' }, { status: 500 })
  }
}
