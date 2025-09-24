import { NextRequest, NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'

// Runtime: Node.js (not edge) so we can use jsPDF reliably
export const runtime = 'nodejs'

function buildCodeStructure(code: number) {
  const digits = code.toString().split('').map(Number)
  const digitCounts = digits.reduce((acc, d) => {
    acc[d] = (acc[d] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const repeatedDigits = Object.entries(digitCounts)
    .filter(([, count]) => (count as number) > 1)
    .map(([digit, count]) => ({ digit: parseInt(digit, 10), count: count as number }))

  const allSame = new Set(digits).size === 1
  const allDifferent = new Set(digits).size === 4
  const hasRepeats = repeatedDigits.length > 0

  return { digits, digitCounts, repeatedDigits, allSame, allDifferent, hasRepeats }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams, origin } = new URL(req.url)
    const raw = searchParams.get('code')

    const code = raw ? parseInt(raw, 10) : NaN
    if (!code || Number.isNaN(code) || code < 1111 || code > 9999) {
      return NextResponse.json({ ok: false, error: 'invalid or missing code' }, { status: 400 })
    }

    // Generate a minimal but valid PDF (simple header + code + link text)
    const doc = new jsPDF('p', 'mm', 'a4')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(20)
  doc.text('ABYK - Wealth Code', 105, 20, { align: 'center' })

    let y = 40
    const margin = 20
  doc.setFontSize(16)
  doc.text(`Code: ${code}`, margin, y)
    y += 10

    // Basic pattern summary (no splitTextToSize to avoid plugin issues)
    const structure = buildCodeStructure(code)
    let pattern = ''
  if (structure.allSame) pattern = 'Pattern: all digits are the same.'
  else if (structure.hasRepeats) pattern = 'Pattern: repeated digits present.'
  else if (structure.allDifferent) pattern = 'Pattern: all digits are different.'

    if (pattern) {
      doc.setFontSize(12)
      doc.text(pattern, margin, y)
      y += 8
    }

    const fullUrl = `${origin}/interpretations?code=${encodeURIComponent(code)}`
  doc.setFontSize(12)
  doc.text('For full details:', margin, y)
    y += 6
    doc.text(fullUrl, margin, y)

    const pdfBytes = doc.output('arraybuffer') as ArrayBuffer
    const pdfUint8 = new Uint8Array(pdfBytes)

  return new NextResponse(pdfUint8, {
      headers: {
        'content-type': 'application/pdf',
    'content-disposition': `attachment; filename="wealth-code-${code}.pdf"`,
        'cache-control': 'no-store',
      },
    })
  } catch (err) {
  // Log the error server-side for debugging
  // eslint-disable-next-line no-console
  console.error('download-pdf error:', err)
  return NextResponse.json({ ok: false, error: 'failed to generate pdf' }, { status: 500 })
  }
}
