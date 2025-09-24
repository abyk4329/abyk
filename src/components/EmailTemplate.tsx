import { codeStructures } from "@/data/codeStructures";
import { wealthCodeTexts } from "@/data/wealthCodeTexts";
import { detectCodeStructure, countDigits } from "@/lib/detectCodeStructure";

interface EmailTemplateData {
    wealthCode: number;
    customerName?: string;
    viewUrl: string;
    downloadUrl: string;
    // codeStructure may be passed by old callers, but we resolve from detectCodeStructure internally now
    codeStructure?: {
        digits: number[];
        allSame: boolean;
        hasRepeats: boolean;
        allDifferent: boolean;
        repeatedDigits: { digit: number; count: number }[];
    };
}

export function generateEmailHTML(data: EmailTemplateData): string {
    const { wealthCode, customerName, viewUrl, downloadUrl } = data;
    const code = wealthCode.toString();
    const structureKey = detectCodeStructure(code);
    const structure = codeStructures[structureKey];
    const digits = code.split("").map(Number);
    const counts = countDigits(code);
    const repeatedDigits = Object.entries(counts)
        .filter(([, c]) => (c as number) > 1)
        .map(([digit, count]) => ({ digit: parseInt(digit, 10), count: count as number }));
    const allSame = new Set(digits).size === 1;
    const allDifferent = new Set(digits).size === 4;
    const hasRepeats = repeatedDigits.length > 0;

    const uniqueDigits = [...new Set(digits)];
  const digitalStr = uniqueDigits.length === 1 ? uniqueDigits[0].toString() :
    uniqueDigits.length === 2 ? `${uniqueDigits[0]} ו-${uniqueDigits[1]}` :
    uniqueDigits.length === 3 ? `${uniqueDigits[0]}, ${uniqueDigits[1]} ו-${uniqueDigits[2]}` :
    `${uniqueDigits.slice(0, -1).join(", ")} ו-${uniqueDigits[uniqueDigits.length - 1]}`;

  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>קוד העושר האישי שלך - ${wealthCode}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Assistant', system-ui, sans-serif;
            line-height: 1.6;
            color: #473B31;
            background: linear-gradient(135deg, #f5f3f0 0%, #faf8f5 100%);
            direction: rtl;
            text-align: right;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .header {
            background: white;
            padding: 30px 20px;
            text-align: right;
            border-bottom: 1px solid rgba(135, 103, 79, 0.2);
        }
        
        .logo {
            max-width: 280px;
            height: auto;
            opacity: 0.95;
        }
        
        .wealth-code-display {
            background: linear-gradient(135deg, #fefefe 0%, #f8f6f3 100%);
            padding: 40px 20px;
            text-align: right;
            border-bottom: 3px solid #87674F;
            direction: rtl;
        }
        
        .wealth-code-title {
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 10px;
            color: #473B31;
        }
        
        .wealth-code-number {
            font-size: 48px;
            font-weight: 600;
            color: #473B31;
            margin: 10px 0;
            display: inline-block;
            padding: 15px 25px;
            background: rgba(135, 103, 79, 0.1);
            border-radius: 12px;
            border: 2px solid rgba(135, 103, 79, 0.3);
        }
        
    .structure-title { font-size: 18px; font-weight: 500; color: #473B31; margin-top: 10px; }
    .structure-desc { font-size: 14px; font-weight: 300; color: #87674F; margin-top: 8px; white-space: pre-line; }
        
        .content {
            padding: 30px 20px;
            direction: rtl;
            text-align: right;
        }
        
        .greeting {
            font-size: 18px;
            font-weight: 400;
            color: #473B31;
            margin-bottom: 20px;
        }
        
        .description {
            font-size: 15px;
            font-weight: 300;
            color: #87674F;
            line-height: 1.7;
            margin-bottom: 30px;
        }
        
        .digits-preview {
            background: rgba(135, 103, 79, 0.08);
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            border: 1px solid rgba(135, 103, 79, 0.2);
        }
        
        .digits-preview h3 {
            font-size: 16px;
            font-weight: 400;
            color: #473B31;
            margin-bottom: 15px;
        }
        
        .digits-preview p {
            font-size: 14px;
            font-weight: 300;
            color: #87674F;
            line-height: 1.6;
        }
        
        .buttons {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 30px 0;
        }
        
        .btn {
            display: inline-block;
            padding: 15px 25px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 400;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #87674F 0%, #95705D 100%);
            color: white;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(135, 103, 79, 0.3);
        }
        
        .btn-secondary {
            background: rgba(135, 103, 79, 0.1);
            color: #473B31;
            border: 2px solid rgba(135, 103, 79, 0.3);
        }
        
        .btn-secondary:hover {
            background: rgba(135, 103, 79, 0.2);
            border-color: #87674F;
        }
        
        .footer {
            background: #f8f6f3;
            color: #87674F;
            padding: 25px 30px;
            text-align: center;
            font-size: 12px;
            font-weight: 300;
            direction: rtl;
            max-width: 300px;
            margin: 0 auto;
            border-radius: 12px;
            border: 1px solid rgba(135, 103, 79, 0.15);
        }
        
        .social-links {
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .social-links a {
            color: #473B31;
            text-decoration: none;
            font-weight: 400;
            font-size: 13px;
            transition: color 0.2s ease;
        }
        
        .social-links a:hover {
            color: #87674F;
        }
        
        .copyright {
            margin-bottom: 4px;
            font-size: 14px;
            color: #87674F;
            font-weight: 400;
        }

        @media (max-width: 600px) {
            .container {
                margin: 0;
            }
            
            .header {
                padding: 20px 15px;
            }
            
            .header div:first-child {
                font-size: 24px !important;
                line-height: 1.2 !important;
                margin-bottom: 6px !important;
            }
            
            .header div:last-child {
                font-size: 10px !important;
            }
            
            .wealth-code-number {
                font-size: 36px;
                padding: 10px 20px;
            }
            
            .buttons {
                flex-direction: column;
            }
            
            .content {
                padding: 20px 15px;
            }
            
            .digits-preview {
                margin: 20px 0;
                padding: 15px;
            }
            
            .footer {
                max-width: none;
                margin: 0 15px;
                padding: 20px 15px;
            }
            
            .social-links {
                gap: 12px;
                margin-bottom: 12px;
            }
            
            .social-links a {
                font-size: 11px;
            }
            
            .copyright {
                font-size: 12px;
                margin-bottom: 3px;
                line-height: 1.3;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header with Logo -->
        <div class="header">
            <div style="font-family: 'Assistant', system-ui, sans-serif; font-size: 32px; font-weight: 600; color: #473B31; letter-spacing: 2px; opacity: 0.95; margin-bottom: 8px;">
                AWAKENING BY KSENIA
            </div>
            <div style="font-family: 'Assistant', system-ui, sans-serif; font-size: 11px; font-weight: 300; color: #87674F; letter-spacing: 1px; text-transform: uppercase;">
                YOUR PERSONAL SPACE FOR GROWTH
            </div>
        </div>
        
        <!-- Wealth Code Display -->
        <div class="wealth-code-display">
            <div class="wealth-code-title">קוד העושר האישי שלך</div>
            <div class="wealth-code-number">${wealthCode}</div>
            <div class="structure-title">${structure.title}</div>
            <div class="structure-desc">${structure.description}</div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <div class="greeting">
                שלום${customerName ? ` ${customerName}` : ''}!
            </div>
            
            <div class="description">
                תודה רבה על הרכישה! הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.
            </div>
            
                        <!-- Digits Preview -->
            <div class="digits-preview">
                <h3>מה כולל הפירוש המלא</h3>
                <p>
                    ניתוח מעמיק של הספרות ${digitalStr} הכולל: מהות כל ספרה, מתנות מרכזיות, חסימות ואתגרים, 
                    נורות אזהרה לזיהוי חוסר איזון, מוקדי צמיחה, תחומי קריירה מתאימים ותרגול יומיומי מעשי.
                    בנוסף, תבינו את משמעותן של ספרות החוזרות או השונות בקוד, וכן תקבלו הסבר כיצד לשלב את הקוד בחיי היומיום.
                </p>
                                <div style="margin-top:14px;">
                                    ${digits
                                        .map((d) => {
                                            const block = (wealthCodeTexts as any)[d];
                                            if (!block) return '';
                                            return `
                                                <div style="margin-bottom:10px;">
                                                    <div style="font-weight:500;color:#473B31;">${d} — ${block.title}</div>
                                                    <div style="font-size:13px;color:#87674F;white-space:pre-line;">${block.essence || ''}</div>
                                                </div>`;
                                        })
                                        .join("")}
                                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="buttons">
                <a href="${viewUrl}" class="btn btn-primary" target="_blank">
                    צפייה באתר (מומלץ)
                </a>
                <a href="${downloadUrl}" class="btn btn-secondary" target="_blank">
                    הורדת PDF
                </a>
            </div>
            
            <div style="font-size: 13px; color: #87674F; margin-top: 20px; font-weight: 300;">
                מומלץ לצפות באתר תחילה לחוויית צפייה אופטימלית, ולהוריד את ה-PDF לשמירה אישית
            </div>

            <!-- Sharing Section -->
            <div style="background: rgba(135, 103, 79, 0.08); border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid rgba(135, 103, 79, 0.2); direction: rtl; text-align: right;">
                <h3 style="font-size: 16px; font-weight: 400; color: #473B31; margin-bottom: 15px;">שתפו את המתנה</h3>
                <p style="font-size: 14px; font-weight: 300; color: #87674F; line-height: 1.6; margin-bottom: 15px;">
                    מה שהאיר לכם, יכול להאיר גם לאחרים. שתפו את המחשבון עם מי שחשוב לכם.
                </p>
                <a href="https://awakening-by-ksenia.com" 
                   style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #87674F 0%, #95705D 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 400; font-size: 14px; transition: all 0.3s ease;" 
                   target="_blank">
                    שיתוף
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="social-links">
                <a href="mailto:awakening.by.ksenia@gmail.com">Email</a>
                <a href="https://wa.me/message/PUSKMULYLLD7F1" target="_blank">WhatsApp</a>
                <a href="https://www.instagram.com/awakening.by.ksenia" target="_blank">Instagram</a>
                <a href="https://www.tiktok.com/@awakening.by.ksenia" target="_blank">TikTok</a>
            </div>
            <div class="copyright">2025 © Awakening by Ksenia</div>
        </div>
    </div>
</body>
</html>
  `;
}

// Function to generate email subject
export function generateEmailSubject(wealthCode: number): string {
    return `הפירוש המלא לקוד האישי שלך – ${wealthCode}`;
}

// Function to generate plain text version of email
export function generateEmailText(data: EmailTemplateData): string {
    const { wealthCode, customerName, viewUrl, downloadUrl } = data;
    const code = wealthCode.toString();
    const structureKey = detectCodeStructure(code);
    const structure = codeStructures[structureKey];
  
  return `
שלום${customerName ? ` ${customerName}` : ''}!

קוד העושר האישי שלך: ${wealthCode}

תודה רבה על הרכישה! הפירוש המלא לקוד האישי שלך ממתין לך לצפייה ולהורדה.

מבנה הקוד: ${structure.title}
${structure.description}

צפייה באתר (מומלץ):
${viewUrl}

הורדת PDF:
${downloadUrl}

מומלץ לצפות באתר תחילה לחוויית צפייה אופטימלית, ולהוריד את ה-PDF לשמירה אישית.

שתפו את המתנה:
מה שהאיר לכם, יכול להאיר גם לאחרים. שתפו את המחשבון עם מי שחשוב לכם.
שיתוף: https://awakening-by-ksenia.com

---

Email: awakening.by.ksenia@gmail.com
WhatsApp: https://wa.me/message/PUSKMULYLLD7F1
Instagram: @awakening.by.ksenia
TikTok: @awakening.by.ksenia

2025 © Awakening by Ksenia
  `.trim();
}