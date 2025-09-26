import { NextRequest, NextResponse } from 'next/server'
import { generateEmailHTML, generateEmailSubject, generateEmailText } from '@/components/EmailTemplate'

export const runtime = 'nodejs'

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
  try {
    const { searchParams, origin } = new URL(req.url)
    const to = searchParams.get('to') || 'kseniachud@gmail.com'
    const code = parseInt(searchParams.get('code') || '7777', 10)

  const viewUrl = `${origin}/interpretations?code=${encodeURIComponent(code)}&utm_source=email&utm_campaign=delivery`
    const downloadUrl = `${origin}/api/download-pdf?code=${encodeURIComponent(code)}`
  const subject = generateEmailSubject(code)
  const html = generateEmailHTML({ wealthCode: code, viewUrl, downloadUrl })
  const text = generateEmailText({ wealthCode: code, viewUrl, downloadUrl })

    const resp = await fetch(`${origin}/api/send-email`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ to, subject, html, text, metadata: { test: true, attachPdfCode: code } }),
    })
    const json = await resp.json().catch(() => ({}))
    return NextResponse.json({ ok: resp.ok, transport: json.transport || 'unknown', id: json.messageId || null })
  } catch (e: any) {
    console.error('TEST_SEND_ERROR', e)
    return NextResponse.json({ ok: false, error: e?.message || 'unexpected' }, { status: 500 })
  }
}
