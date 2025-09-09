import { NextRequest, NextResponse } from 'next/server'
import { buildPersonalHtml, isValidDigit, uniqueNumbersFromCode, Code, buildSourceHtml, buildIntroHtml } from '@/lib/interpretation'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const bd = Number(searchParams.get('bd') || '0')
  const bm = Number(searchParams.get('bm') || '0')
  const by = Number(searchParams.get('by') || '0')
  const lp = Number(searchParams.get('lp') || '0')
  const download = searchParams.get('download') === '1'
  const source = searchParams.get('source') === '1'
  const inline = searchParams.get('inline') === '1'

  if (!isValidDigit(bd) || !isValidDigit(bm) || !isValidDigit(by) || !isValidDigit(lp)) {
    return NextResponse.json({ message: 'Invalid code numbers. Only 1–9 are allowed.' }, { status: 400 })
  }

  const code: Code = { bd, bm, by, lp }
  const html = source 
    ? `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8"/></head><body>${buildIntroHtml()}${buildSourceHtml(code)}</body></html>` 
    : buildPersonalHtml(code)
  if (inline && !download) {
    const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    const inner = m ? m[1] : html
    return NextResponse.json({ html: inner, code, uniqueNumbers: uniqueNumbersFromCode(code) })
  }
  if (download) {
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="personal-interpretation-${new Date().toISOString().slice(0,10)}.html"`
      }
    })
  }

  return NextResponse.json({ html, code, uniqueNumbers: uniqueNumbersFromCode(code) })
}
