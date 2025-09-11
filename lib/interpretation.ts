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
    } catch { /* continue */ }
  }
  console.warn('numbersmeaning*(last).html missing or unreadable; returning placeholder.')
  return '<!-- numbersmeaning placeholder -->'
}

export const getInterpretations = (): Record<string, string> => {
  try {
    const htmlContent = readNumbersMeaningHtml()
    const interpretations: Record<string, string> = {}
    const numbers = ['1','2','3','4','5','6','7','8','9']

    numbers.forEach((num) => {
      const patterns = [
        new RegExp(`<h[2-3][^>]*>\\s*${num}\\s*<\\/h[2-3]>\\s*<div[^>]*>([\\s\\S]*?)<\\/div>`, 'i'),
        new RegExp(`<h[2-3][^>]*>\\s*${num}[^<]*<\\/h[2-3]>\\s*([\\s\\S]*?)(?=<h[2-3][^>]*>|$)`, 'i'),
        new RegExp(`<p[^>]*>\\s*(?:<[^>]+>\\s*)*${num}(?:\\s*<\\/[^>]+>)*\\s*<\\/p>\\s*([\\s\\S]*?)(?=<p[^>]*>\\s*(?:<[^>]+>\\s*)*[1-9](?:\\s*<\\/[^>]+>)*\\s*<\\/p>|<h[2-3][^>]*>|$)`, 'i'),
        new RegExp(`<p[^>]*class="p1"[^>]*>\\s*${num}\\s*[–-]\\s*[^<]*<\\/p>([\\s\\S]*?)(?=<p[^>]*class="p1"[^>]*>\\s*[1-9]\\s*[–-]|$)`, 'i'),
      ]
      for (const rx of patterns) {
        const match = htmlContent.match(rx)
        if (match) { interpretations[num] = match[1].trim(); break }
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

export const buildIntroHtml = () => {
  return `
  <section class="intro" style="margin: 12px 0 20px">
    <h2 style="color:#C6A170; margin-bottom: 8px">מה זה אומר כשיש מספרים חוזרים או שונים בקוד האישי?</h2>
    <p>בכל קוד אישי מופיעים ארבעה מספרים.</p>
    <ul style="margin: 8px 0 0 0; padding-inline-start: 20px; list-style: disc;">
      <li>
        כאשר מספר מסוים חוזר פעמיים או יותר – המשמעות היא שהאנרגיה שלו חזקה במיוחד בחיים שלכם. זהו תחום שבו קיימת יכולת טבעית, עוצמה ותשומת לב מוגברת. לעיתים זה גם מסמן שיעור חוזר או הזדמנות עמוקה להבנה.
      </li>
      <li>
        כאשר כל ארבעת המספרים שונים – המשמעות היא איזון וגיוון. אתם מקבלים חיבור לארבעה תחומים שונים, מה שמאפשר ראייה רחבה יותר אך גם דורש מכם לאחד כוחות מגוונים ולמצוא את הקו האישי שלכם.
      </li>
    </ul>
    <p style="margin-top: 8px;">
      כך, צירוף המספרים הייחודי שלכם מגלה לא רק את הפוטנציאל האישי אלא גם את הדרך לעבוד עם האנרגיות כדי למשוך שפע, הרמוניה והגשמה.
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

  return `
    <h1>הפירוש הנומרולוגי האישי שלכם</h1>
    <div class="code">
      <div class="pill"><div>BD</div><strong>${code.bd}</strong></div>
      <div class="pill"><div>BM</div><strong>${code.bm}</strong></div>
      <div class="pill"><div>BY</div><strong>${code.by}</strong></div>
      <div class="pill"><div>LP</div><strong>${code.lp}</strong></div>
    </div>
  ${buildIntroHtml()}
    ${interpretationsHtml}
  `
}

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

