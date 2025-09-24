import jsPDF from 'jspdf';

export type CodeStructure = {
  digits: number[];
  digitCounts: Record<number, number>;
  repeatedDigits: { digit: number; count: number }[];
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  type: "master" | "diverse" | "focused" | "balanced";
};

export type WealthCodeData = {
  title: string;
  essence: string;
  gifts: string[];
  challenges: string[];
  imbalanceSigns: string[];
  growthAreas: string[];
  careerPaths: string[];
  dailyPractice: string;
  bottomLine: string;
}

export class WealthCodePDFGenerator {
  private doc: jsPDF;
  private currentY: number = 0;
  private pageHeight: number = 297; // A4 height in mm
  private margin: number = 20;
  private maxWidth: number = 170; // A4 width minus margins

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.currentY = this.margin;
    this.setupFonts();
  }

  private setupFonts() {
    // Using built-in fonts since Hebrew fonts require special handling
    this.doc.setFont('helvetica');
  }

  private checkPageBreak(neededHeight: number): boolean {
    if (this.currentY + neededHeight > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
      this.addHeader();
      return true;
    }
    return false;
  }

  private addHeader() {
    // Header background
    this.doc.setFillColor(71, 59, 49); // #473B31
    this.doc.rect(0, 0, 210, 30, 'F');
    
    // Logo text
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.text('AWAKENING', 105, 15, { align: 'center' });
    
    this.doc.setFontSize(12);
    this.doc.text('YOUR PERSONAL SPACE FOR GROWTH', 105, 22, { align: 'center' });
    
    this.currentY = 40;
  }

  private addTitle(text: string, fontSize: number = 18) {
    this.checkPageBreak(15);
    this.doc.setTextColor(71, 59, 49); // #473B31
    this.doc.setFontSize(fontSize);
    
    const lines = this.doc.splitTextToSize(text, this.maxWidth);
    lines.forEach((line: string) => {
      this.doc.text(line, 105, this.currentY, { align: 'center' });
      this.currentY += 8;
    });
    this.currentY += 5;
  }

  private addSubtitle(text: string, fontSize: number = 14) {
    this.checkPageBreak(10);
    this.doc.setTextColor(149, 112, 82); // #95705D
    this.doc.setFontSize(fontSize);
    
    const lines = this.doc.splitTextToSize(text, this.maxWidth);
    lines.forEach((line: string) => {
      this.doc.text(line, 105, this.currentY, { align: 'center' });
      this.currentY += 6;
    });
    this.currentY += 3;
  }

  private addBodyText(text: string, fontSize: number = 11) {
    this.checkPageBreak(10);
    this.doc.setTextColor(71, 59, 49); // #473B31
    this.doc.setFontSize(fontSize);
    
    const lines = this.doc.splitTextToSize(text, this.maxWidth);
    lines.forEach((line: string) => {
      this.checkPageBreak(5);
      this.doc.text(line, this.margin, this.currentY);
      this.currentY += 5;
    });
    this.currentY += 3;
  }

  private addBulletList(items: string[], fontSize: number = 10) {
    items.forEach(item => {
      this.checkPageBreak(8);
      this.doc.setTextColor(71, 59, 49);
      this.doc.setFontSize(fontSize);
      
      const lines = this.doc.splitTextToSize(`• ${item}`, this.maxWidth - 5);
      lines.forEach((line: string, index: number) => {
        this.checkPageBreak(4);
        this.doc.text(line, this.margin + (index > 0 ? 5 : 0), this.currentY);
        this.currentY += 4;
      });
    });
    this.currentY += 3;
  }

  private addSection(title: string, content: string | string[]) {
    this.checkPageBreak(20);
    
    // Section background
    this.doc.setFillColor(254, 254, 254, 0.1);
    this.doc.rect(this.margin - 5, this.currentY - 3, this.maxWidth + 10, 15, 'F');
    
    // Section title
    this.doc.setTextColor(71, 59, 49);
    this.doc.setFontSize(13);
    this.doc.text(title, 105, this.currentY + 5, { align: 'center' });
    this.currentY += 12;
    
    if (Array.isArray(content)) {
      this.addBulletList(content);
    } else {
      this.addBodyText(content);
    }
  }

  private addWealthCodeDisplay(wealthCode: number) {
    this.checkPageBreak(40);
    
    // Code box background
    this.doc.setFillColor(149, 112, 82, 0.2);
    this.doc.rect(75, this.currentY, 60, 30, 'F');
    
    // Code border
    this.doc.setDrawColor(135, 103, 79);
    this.doc.setLineWidth(1);
    this.doc.rect(75, this.currentY, 60, 30, 'S');
    
    // Code number
    this.doc.setTextColor(71, 59, 49);
    this.doc.setFontSize(28);
    this.doc.text(wealthCode.toString(), 105, this.currentY + 20, { align: 'center' });
    
    this.currentY += 40;
  }

  generatePDF(wealthCode: number, codeStructure: CodeStructure, digitData: WealthCodeData[]): Uint8Array {
    // Add header
    this.addHeader();
    
    // Main title
    this.addTitle('פירוש מלא לקוד העושר האישי', 20);
    
    // Wealth code display
    this.addWealthCodeDisplay(wealthCode);

    // Opening text about digit meaning
    this.addSection('משמעות הספרות בקוד האישי', 
      'כל ספרה בקוד האישי שלך מייצגת אנרגיה ייחודית ואספקט שונה באישיותך. הקוד שלך הוא מפתח לחשיפת הכוחות הפנימיים שלך, המאפיינים המיוחדים שלך והדרך היעילה ביותר לממש את הפוטנציאל הטמון בך.');
    
    // Pattern explanation
    let patternText = '';
    if (codeStructure.allSame) {
      patternText = 'קוד מאסטר - כל הספרות זהות. זהו קוד מיוחד המעיד על פוטנציאל רוחני גבוה ואתגרים מיוחדים בחיים.';
    } else if (codeStructure.hasRepeats) {
      patternText = 'ספרות חוזרות בקוד. הספרות החוזרות מעידות על אנרגיות מועצמות שדורשות תשומת לב מיוחדת.';
    } else if (codeStructure.allDifferent) {
      patternText = 'קוד מגוון - כל הספרות שונות. מעיד על אישיות רב-ממדית עם כישרונות מגוונים.';
    }
    
    if (patternText) {
      this.addSection('מבנה הקוד', patternText);
    }

    // Add each digit interpretation
    digitData.forEach((data, index) => {
      const digit = [...new Set(codeStructure.digits)][index];
      const count = codeStructure.digitCounts[digit];
      
      // New page for each digit (except first)
      if (index > 0) {
        this.doc.addPage();
        this.currentY = this.margin;
        this.addHeader();
      }
      
      // Digit title
      const digitTitle = `ספרה ${digit}: ${data.title}`;
      if (count > 1) {
        this.addTitle(`${digitTitle} (מופיעה ${count} פעמים)`, 16);
      } else {
        this.addTitle(digitTitle, 16);
      }
      
      // Essence
      this.addSection('מהות הספרה', data.essence);
      
      // Gifts
      this.addSection('מתנות מרכזיות', data.gifts);
      
      // Challenges
      this.addSection('חסימות ואתגרים עיקריים', data.challenges);
      
      // Imbalance signs
      this.addSection('נורות אדומות - סימנים לחוסר איזון', data.imbalanceSigns);
      
      // Growth areas
      this.addSection('מוקדי צמיחה והתפתחות', data.growthAreas);
      
      // Career paths
      this.addSection('תחומים מתאימים לקריירה ולשליחות', data.careerPaths);
      
      // Daily practice
      this.addSection('דוגמה יומית לתרגול', data.dailyPractice);
      
      // Bottom line
      if (data.bottomLine) {
        this.addSection('בשורה התחתונה', data.bottomLine);
      }
    });

    // Add final page with integration guide
    this.doc.addPage();
    this.currentY = this.margin;
    this.addHeader();
    
    this.addTitle('יישום הקוד בחיי היומיום', 16);
    
    this.addSection('למה זה חשוב?', 
      'הקוד האישי שלך אינו רק מידע תיאורטי - הוא כלי מעשי שיכול להדריך אותך בהחלטות יומיומיות. הפירוש כולל הנחיות ספציפיות כיצד לשלב את האנרגיות שלך בעבודה, ביחסים ובפיתוח אישי. כאשר תזהו את הדפוסים הטבעיים שלכם ותפעלו בהתאם אליהם, תHAVי זרימה וקלות רבה יותר בחיים.');

    this.addSection('בוקר', 'התחל את היום בהזכרה של המתנות הטבעיות שלך וכיצד תוכל להשתמש בהן היום.');
    this.addSection('במהלך היום', 'שים לב לאתגרים המופיעים ובחן אותם דרך עדשת הקוד שלך.');
    this.addSection('ערב', 'רפלקטציה על היום - איפה הצלחת להשתמש בכוחות שלך ואיפה נתקלת באתגרים.');
    this.addSection('שבועית', 'בחר תחום צמיחה אחד לעבודה עליו השבוע.');

    // Add sharing section
    this.addSection('שתפו את המתנה', 
      'מה שהאיר לכם, יכול להאיר גם לאחרים. שתפו את המחשבון עם מי שחשוב לכם. ניתן למצוא את המחשבון באתר שלנו.');

    // Add footer with contact info
    this.addFooter();

    return new Uint8Array(this.doc.output('arraybuffer') as ArrayBuffer);
  }

  private addFooter() {
    // Move to bottom of page
    this.currentY = this.pageHeight - 40;
    
    // Footer background
    this.doc.setFillColor(71, 59, 49);
    this.doc.rect(0, this.currentY - 5, 210, 30, 'F');
    
    // Contact info
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(10);
    this.doc.text('Awakening by Ksenia', 105, this.currentY + 5, { align: 'center' });
    this.doc.text('awakening.by.ksenia@gmail.com', 105, this.currentY + 12, { align: 'center' });
    this.doc.text('Instagram: @awakening.by.ksenia', 105, this.currentY + 19, { align: 'center' });
  }
}