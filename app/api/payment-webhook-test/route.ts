import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const url = new URL(req.url)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pre: any
  try { pre = JSON.parse(raw) } catch {}
  const headerApiKey = (req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '') || '').trim()
  const urlKey = url.searchParams.get('webhook_key') || url.searchParams.get('key') || ''
  const bodyKey = (pre?.webhook_key || pre?.key || '').toString()
  const secret = (process.env.WEBHOOK_SECRET || '').trim()
  return NextResponse.json({ ok: true, secretSet: !!secret, headerApiKey, urlKey, bodyKey })
}
