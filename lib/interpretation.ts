import fs from 'fs'
import path from 'path'

export type Code = { bd: number; bm: number; by: number; lp: number }

export const isValidDigit = (n: number) => Number.isInteger(n) && n >= 1 && n <= 9

const readNumbersMeaningHtml = (): string => {
  const candidates = ['numbersmeaninglast.html', 'numbersmeaning.html']
  for (const name of candidates) {
    const filePath = path.join(process.cwd(), 'public', name)
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      if (content && content.trim().length > 0) return content
    } catch {
      // continue to next candidate
    }
  }
  console.warn('numbersmeaning*(last).html missing or unreadable; returning placeholder.')
  return '<!-- numbersmeaning placeholder -->'
}

export const getInterpretations = (): Record<string, string> => {
  try {
    const htmlContent = readNumbersMeaningHtml()
    const interpretations: Record<string, string> = {}
    // Restrict to single-digit 1–9 to match Money Code calculations
    const numbers = ['1','2','3','4','5','6','7','8','9']

    numbers.forEach((num) => {
      // 1) Strict: <h2/h3>NUM</h2/h3> <div> ... </div>
      const patterns = [
        new RegExp(`<h[2-3][^>]*>\\s*${num}\\s*<\\/h[2-3]>\\s*<div[^>]*>([\\s\\S]*?)<\\/div>`, 'i'),
        // 2) Fallback: content until next <h2>/<h3>
        new RegExp(`<h[2-3][^>]*>\\s*${num}[^<]*<\\/h[2-3]>\\s*([\\s\\S]*?)(?=<h[2-3][^>]*>|$)`, 'i'),
        // 3) Word-export style: a paragraph that only contains the number (possibly wrapped in spans/strong)
        new RegExp(`<p[^>]*>\\s*(?:<[^>]+>\\s*)*${num}(?:\\s*<\\/[^>]+>)*\\s*<\\/p>\\s*([\\s\\S]*?)(?=<p[^>]*>\\s*(?:<[^>]+>\\s*)*[1-9](?:\\s*<\\/[^>]+>)*\\s*<\\/p>|<h[2-3][^>]*>|$)`, 'i'),
        // 4) New Word format: <p class="p1">NUM – description</p>
        new RegExp(`<p[^>]*class="p1"[^>]*>\\s*${num}\\s*[–-]\\s*[^<]*<\\/p>([\\s\\S]*?)(?=<p[^>]*class="p1"[^>]*>\\s*[1-9]\\s*[–-]|$)`, 'i'),
      ]
      for (const rx of patterns) {
        const match = htmlContent.match(rx)
        if (match) {
          interpretations[num] = match[1].trim()
          break
        }
      }
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

// Intro section shown before the interpretations list
export const buildIntroHtml = () => {
  return `
  <section class="intro" style="margin: 12px 0 20px">
    <h2 style="color:#C6A170; margin-bottom: 8px">מה זה אומר כשיש מספרים חוזרים או שונים בקוד האישי?</h2>
    <p>בכל קוד אישי מופיעים ארבעה מספרים.</p>
    <ul style="margin: 8px 0 0 0; padding-inline-start: 20px; list-style: disc;">
      <li>
        כאשר מספר מסוים חוזר פעמיים או יותר – המשמעות היא שהאנרגיה שלו חזקה במיוחד בחיים שלך. זהו תחום שבו יש לך יכולת טבעית, עוצמה ותשומת לב מוגברת. לעיתים זה גם מסמן שיעור חוזר או הזדמנות עמוקה להבנה.
      </li>
      <li>
        כאשר כל ארבעת המספרים שונים – המשמעות היא איזון וגיוון. אתה מקבל חיבור לארבעה תחומים שונים, מה שמאפשר ראייה רחבה יותר אך גם דורש ממך לאחד כוחות מגוונים ולמצוא את הקו האישי שלך.
      </li>
    </ul>
    <p style="margin-top: 8px;">
      כך, צירוף המספרים הייחודי שלך מגלה לא רק את הפוטנציאל האישי אלא גם את הדרך לעבוד עם האנרגיות כדי למשוך שפע, הרמוניה והגשמה.
    </p>
  </section>
  `
}

export const buildPersonalHtml = (code: Code) => {
  const interpretations = getInterpretations()
  const uniques = uniqueNumbersFromCode(code)
  const interpretationsHtml = uniques
    .map((n) => {
      const key = String(n)
  const block = interpretations[key] || '<p>פירוש זמני לא זמין. נעדכן בקרוב.</p>'
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
  ${buildIntroHtml()}
    ${interpretationsHtml}
    <footer>
      <div><strong>Awakening by Ksenia</strong> — מרחב לתודעה מתקדמת</div>
      <div>${new Date().toLocaleDateString('he-IL')}</div>
    </footer>
  </body>
  </html>`
}

// Build exact original HTML blocks from numbersmeaning.html, without extra wrappers
export const buildSourceHtml = (code: Code) => {
  const interpretations = getInterpretations()
  const uniques = uniqueNumbersFromCode(code)
  return uniques
    .map((n) => {
      const key = String(n)
  const block = interpretations[key] || '<p>פירוש זמני לא זמין. נעדכן בקרוב.</p>'
      return `
<h2>${key}</h2>
<div>
${block}
</div>`
    })
    .join('\n')
}

