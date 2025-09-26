import { NextRequest, NextResponse } from 'next/server'
import { generateEmailHTML, generateEmailSubject, generateEmailText } from "@/components/EmailTemplate"

export const runtime = 'nodejs'

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
  } catch (e: unknown) {
    console.error('TEST_SEND_ERROR', e)
    const errorMessage = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 })
  }
}
