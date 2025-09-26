import { NextRequest, NextResponse } from 'next/server'
import { generateEmailHTML, generateEmailText, generateEmailSubject } from '@/components/EmailTemplate'

export const runtime = 'nodejs'

type Payload = {
  to?: string
  wealthCode: number
  name?: string
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const wealthCode = parseInt(searchParams.get('code') || '1234', 10)
  const name = searchParams.get('name') || undefined

  const viewUrl = `${origin}/interpretations?code=${encodeURIComponent(searchParams.get('tx') || 'PREVIEW')}&utm_source=email&utm_campaign=delivery`
  const downloadUrl = `${origin}/api/download-pdf?code=${encodeURIComponent(searchParams.get('tx') || 'PREVIEW')}`

  const html = generateEmailHTML({
    wealthCode,
    viewUrl,
    downloadUrl,
  })
  return new NextResponse(html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload
    const { to, wealthCode, name } = body
    if (!wealthCode) return NextResponse.json({ ok: false, error: 'missing code' }, { status: 400 })

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  const viewUrl = `${origin}/interpretations?code=${encodeURIComponent('EMAIL-PREVIEW')}&utm_source=email&utm_campaign=delivery`
    const downloadUrl = `${origin}/api/download-pdf?code=${encodeURIComponent('EMAIL-PREVIEW')}`

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
