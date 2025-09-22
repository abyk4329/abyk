// Simple PDF generator using browser APIs
export class SimplePDFGenerator {
  static async generateHTML(wealthCode: number, codeStructure: any, digitData: any[]): Promise<string> {
    const uniqueDigits = [...new Set(codeStructure.digits)];
    
    let html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>קוד העושר האישי - ${wealthCode}</title>
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
            background: #faf8f5;
            direction: rtl;
            text-align: right;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #87674F 0%, #95705D 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            margin-bottom: 30px;
            border-radius: 10px;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 400;
            margin-bottom: 8px;
            letter-spacing: 0.05em;
        }
        
        .header .tagline {
            font-size: 14px;
            font-weight: 300;
            opacity: 0.9;
            letter-spacing: 0.1em;
        }
        
        .wealth-code-display {
            background: linear-gradient(135deg, #fefefe 0%, #f8f6f3 100%);
            padding: 40px 20px;
            text-align: center;
            border: 3px solid #87674F;
            border-radius: 12px;
            margin-bottom: 30px;
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
        
        .section {
            background: rgba(135, 103, 79, 0.08);
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border-right: 4px solid #87674F;
            page-break-inside: avoid;
        }
        
        .section h2 {
            font-size: 18px;
            font-weight: 500;
            color: #473B31;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .section h3 {
            font-size: 16px;
            font-weight: 500;
            color: #473B31;
            margin: 15px 0 10px 0;
        }
        
        .section p, .section li {
            font-size: 14px;
            font-weight: 300;
            color: #87674F;
            line-height: 1.6;
            margin-bottom: 8px;
        }
        
        .section ul {
            list-style: none;
            padding-right: 0;
        }
        
        .section li:before {
            content: "• ";
            color: #87674F;
            font-weight: bold;
            margin-left: 5px;
        }
        
        .digit-section {
            background: white;
            border: 2px solid #87674F;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            page-break-before: always;
        }
        
        .digit-title {
            text-align: center;
            font-size: 24px;
            font-weight: 500;
            color: #473B31;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #87674F;
        }
        
        .footer {
            background: #473B31;
            color: white;
            padding: 20px;
            text-align: center;
            margin-top: 40px;
            border-radius: 10px;
        }
        
        .footer p {
            margin: 5px 0;
            font-size: 12px;
        }
        
        @media print {
            body { 
                max-width: none; 
                padding: 10px; 
                background: white;
            }
            .section { 
                break-inside: avoid; 
            }
            .digit-section { 
                break-before: always; 
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>AWAKENING</h1>
        <div class="tagline">YOUR PERSONAL SPACE FOR GROWTH</div>
    </div>
    
    <div class="wealth-code-display">
        <h2>קוד העושר האישי שלך</h2>
        <div class="wealth-code-number">${wealthCode}</div>
    </div>
    
    ${codeStructure.allSame ? `
    <div class="section">
        <h2>קוד מאסטר - כל הספרות זהות</h2>
        <p>זהו קוד מיוחד המעיד על פוטנציאל רוחני גבוה ואתגרים מיוחדים בחיים.</p>
    </div>
    ` : codeStructure.hasRepeats ? `
    <div class="section">
        <h2>ספרות חוזרות בקוד</h2>
        <p>הספרות החוזרות מעידות על אנרגיות מועצמות שדורשות תשומת לב מיוחדת.</p>
    </div>
    ` : codeStructure.allDifferent ? `
    <div class="section">
        <h2>קוד מגוון - כל הספרות שונות</h2>
        <p>מעיד על אישיות רב-ממדית עם כישרונות מגוונים.</p>
    </div>
    ` : ''}
    
    ${uniqueDigits.map((digit, index) => `
    <div class="digit-section">
        <div class="digit-title">ספרה ${digit}: ${digitData[index]?.title || `ספרה ${digit}`}</div>
        
        <div class="section">
            <h3>מהות הספרה</h3>
            <p>${digitData[index]?.essence || `מהות הספרה ${digit}`}</p>
        </div>
        
        <div class="section">
            <h3>מתנות מרכזיות</h3>
            <ul>
                ${(digitData[index]?.gifts || [`מתנה של ספרה ${digit}`]).map(gift => `<li>${gift}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section">
            <h3>חסימות ואתגרים עיקריים</h3>
            <ul>
                ${(digitData[index]?.challenges || [`אתגר של ספרה ${digit}`]).map(challenge => `<li>${challenge}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section">
            <h3>נורות אדומות - סימנים לחוסר איזון</h3>
            <ul>
                ${(digitData[index]?.imbalanceSigns || [`סימן חוסר איזון של ספרה ${digit}`]).map(sign => `<li>${sign}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section">
            <h3>מוקדי צמיחה והתפתחות</h3>
            <ul>
                ${(digitData[index]?.growthAreas || [`תחום צמיחה של ספרה ${digit}`]).map(area => `<li>${area}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section">
            <h3>תחומים מתאימים לקריירה ולשליחות</h3>
            <ul>
                ${(digitData[index]?.careerPaths || [`נתיב קריירה של ספרה ${digit}`]).map(path => `<li>${path}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section">
            <h3>דוגמה יומית לתרגול</h3>
            <p>${digitData[index]?.dailyPractice || `תרגול יומי לספרה ${digit}`}</p>
        </div>
        
        ${digitData[index]?.bottomLine ? `
        <div class="section">
            <h3>בשורה התחתונה</h3>
            <p>${digitData[index].bottomLine}</p>
        </div>
        ` : ''}
    </div>
    `).join('')}
    
    <div class="section">
        <h2>שילוב הקוד בחיי היומיום</h2>
        <h3>בוקר</h3>
        <p>התחל את היום בהזכרה של המתנות הטבעיות שלך וכיצד תוכל להשתמש בהן היום.</p>
        
        <h3>במהלך היום</h3>
        <p>שים לב לאתגרים המופיעים ובחן אותם דרך עדשת הקוד שלך.</p>
        
        <h3>ערב</h3>
        <p>רפלקטציה על היום - איפה הצלחת להשתמש בכוחות שלך ואיפה נתקלת באתגרים.</p>
        
        <h3>שבועית</h3>
        <p>בחר תחום צמיחה אחד לעבודה עליו השבוע.</p>
    </div>
    
    <div class="footer">
        <p><strong>Awakening by Ksenia</strong></p>
        <p>awakening.by.ksenia@gmail.com</p>
        <p>Instagram: @awakening.by.ksenia</p>
        <p>TikTok: @awakening.by.ksenia</p>
        <p>צ׳ודנובסקי קסניה אוריה - מומחית לנומרולוגיה ופיתוח אישי</p>
    </div>
</body>
</html>
    `;
    
    return html;
  }
  
  static async downloadHTML(wealthCode: number, codeStructure: any, digitData: any[]) {
    const html = await this.generateHTML(wealthCode, codeStructure, digitData);
    
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `קוד-עושר-${wealthCode}-פירוש-מלא.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  static async printToPDF(wealthCode: number, codeStructure: any, digitData: any[]) {
    const html = await this.generateHTML(wealthCode, codeStructure, digitData);
    
    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      
      // Wait for content to load, then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    }
  }
}