import fs from 'fs'
import path from 'path'

export type Code = { bd: number; bm: number; by: number; lp: number }

export const isValidDigit = (n: number) => Number.isInteger(n) && n >= 1 && n <= 9

const readNumbersMeaningHtml = (): string => {
  const filePath = path.join(process.cwd(), 'public', 'numbersmeaning.html')
  return fs.readFileSync(filePath, 'utf8')
}

export const getInterpretations = (): Record<string, string> => {
  try {
    const htmlContent = readNumbersMeaningHtml()
    const interpretations: Record<string, string> = {}
    // Restrict to single-digit 1–9 to match Money Code calculations
    const numbers = ['1','2','3','4','5','6','7','8','9']

    numbers.forEach((num) => {
      const regex = new RegExp(
        `<h2>${num}</h2>\\s*<div>([\\s\\S]*?)</div>`,
        'i'
      )
      const match = htmlContent.match(regex)
      if (match) interpretations[num] = match[1].trim()
    })
    return interpretations
  } catch (e) {
    console.error('interpretations read error:', e)
    return {}
  }
}

export const uniqueNumbersFromCode = (code: Code): number[] => {
  const all = [code.bd, code.bm, code.by, code.lp].filter(Boolean)
  return Array.from(new Set(all))
}

export const buildPersonalHtml = (code: Code) => {
  const interpretations = getInterpretations()
  const uniques = uniqueNumbersFromCode(code)
  const interpretationsHtml = uniques
    .map((n) => {
      const key = String(n)
      const block = interpretations[key] || '<p>פירוש לא נמצא.</p>'
      return `
      <section class="interpretation">
        <h2>פירוש למספר ${key}</h2>
        ${block}
      </section>
    `
    })
    .join('\n')

  return `<!DOCTYPE html>
  <html dir="rtl" lang="he">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>הפירוש האישי שלך</title>
    <style>
      body { font-family: Assistant, Arial, sans-serif; background:#FEFEFE; color:#1F2024; line-height:1.7; max-width:900px; margin:0 auto; padding:24px }
      h1, h2 { color:#C6A170 }
      .code { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:12px; margin:16px 0 }
      .pill { background:#f6efe6; border:1px solid #D4B896; border-radius:12px; padding:12px; text-align:center }
      .interpretation { background:#f9f9f9; border-right:4px solid #D4B896; padding:16px; border-radius:10px; margin:16px 0 }
      footer { margin-top:32px; border-top:1px solid #e8e2d7; padding-top:16px; color:#6B6F76; text-align:center }
    </style>
  </head>
  <body>
    <h1>הפירוש הנומרולוגי האישי שלך</h1>
    <div class="code">
      <div class="pill"><div>BD</div><strong>${code.bd}</strong></div>
      <div class="pill"><div>BM</div><strong>${code.bm}</strong></div>
      <div class="pill"><div>BY</div><strong>${code.by}</strong></div>
      <div class="pill"><div>LP</div><strong>${code.lp}</strong></div>
    </div>
    ${interpretationsHtml}
    <footer>
      <div><strong>Awakening by Ksenia</strong> — מרחב לתודעה מתקדמת</div>
      <div>${new Date().toLocaleDateString('he-IL')}</div>
    </footer>
  </body>
  </html>`
}

