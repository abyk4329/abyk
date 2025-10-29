import * as path from 'path';
import PDFDocument from 'pdfkit';
import { codeStructures } from '../data/codeStructures';
import { dailyApplication } from '../data/dailyApplication';
import { digitInterpretations } from '../data/digitInterpretations';

export type GenerateWealthReportOptions = {
  code: string;
  userName?: string;
};

type CodeType = 'master' | 'repeating' | 'diverse';

function getCodeType(code: string): CodeType {
  const uniqueDigits = new Set(code.split(''));
  if (uniqueDigits.size === 1) return 'master';
  if (uniqueDigits.size < code.length) return 'repeating';
  return 'diverse';
}

// Helper function to reverse Hebrew text for proper RTL display in PDF
function reverseHebrewText(text: string): string {
  // Split by lines first
  return text
    .split('\n')
    .map((line) => {
      // Reverse each line for RTL display
      return line.split('').reverse().join('');
    })
    .join('\n');
}

export async function generateWealthReportPdfBuffer({
  code,
  userName,
}: GenerateWealthReportOptions): Promise<Buffer> {
  const trimmedCode = code?.trim();

  if (!trimmedCode || !/^\d{4}$/.test(trimmedCode)) {
    throw new Error('Invalid code provided for PDF generation');
  }

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 40, bottom: 40, left: 40, right: 40 },
      });

      const fontPath = path.join(process.cwd(), 'public', 'fonts');
      doc.registerFont(
        'Assistant',
        path.join(fontPath, 'Assistant-Regular.ttf')
      );
      doc.registerFont(
        'Assistant-Bold',
        path.join(fontPath, 'Assistant-Bold.ttf')
      );
      doc.registerFont(
        'Assistant-SemiBold',
        path.join(fontPath, 'Assistant-SemiBold.ttf')
      );
      doc.registerFont(
        'Assistant-Light',
        path.join(fontPath, 'Assistant-Light.ttf')
      );

      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const uniqueDigits = Array.from(new Set(trimmedCode.split(''))).map(
        (value) => Number(value)
      );
      const codeType = getCodeType(trimmedCode);
      const codeTypeLabel =
        codeType === 'master'
          ? 'קוד מאסטר'
          : codeType === 'repeating'
          ? 'קוד עם ספרות חוזרות'
          : 'קוד מגוון';

      // Cover page
      doc
        .fontSize(24)
        .font('Assistant-Bold')
        .text('AWAKENING BY KSENIA', { align: 'center' });
      doc.moveDown(0.5);
      doc
        .fontSize(14)
        .font('Assistant')
        .text(reverseHebrewText('הפירוש המלא לקוד העושר האישי שלך'), {
          align: 'center',
          width: 500,
        });
      doc.moveDown(2);

      // Code display
      doc
        .fontSize(48)
        .font('Assistant-Light')
        .text(trimmedCode, { align: 'center' });

      if (userName) {
        doc.moveDown();
        doc
          .fontSize(12)
          .font('Assistant')
          .text(reverseHebrewText(`עבור: ${userName}`), {
            align: 'center',
            width: 500,
          });
      }

      doc.moveDown(3);
      doc
        .fontSize(10)
        .font('Assistant')
        .text('© 2025 Awakening by Ksenia', { align: 'center' });
      doc.text(reverseHebrewText('לשימוש אישי בלבד'), {
        align: 'center',
        width: 500,
      });
      doc.text(
        reverseHebrewText('אין להפיץ או למכור מחדש את התוכן ללא אישור מפורש'),
        {
          align: 'center',
          width: 500,
        }
      );

      // Page 2: Introduction
      doc.addPage();
      doc
        .fontSize(18)
        .font('Assistant-Bold')
        .text(reverseHebrewText('משמעות הספרות בקוד האישי'), {
          align: 'right',
          width: 500,
        });
      doc.moveDown();
      doc
        .fontSize(11)
        .font('Assistant')
        .text(reverseHebrewText(codeStructures.intro), {
          align: 'right',
          lineGap: 4,
          width: 500,
        });

      doc.moveDown();
      doc
        .fontSize(14)
        .font('Assistant-SemiBold')
        .text(reverseHebrewText(codeTypeLabel), {
          align: 'right',
          width: 500,
        });
      doc.moveDown(0.5);
      doc
        .fontSize(11)
        .font('Assistant')
        .text(reverseHebrewText(codeStructures[codeType]), {
          align: 'right',
          lineGap: 4,
          width: 500,
        });

      doc.moveDown(2);
      doc
        .fontSize(18)
        .font('Assistant-Bold')
        .text(reverseHebrewText(dailyApplication.title), {
          align: 'right',
          width: 500,
        });
      doc.moveDown();

      const paragraphs = dailyApplication.content.split('\n\n');
      paragraphs.forEach((para) => {
        doc
          .fontSize(11)
          .font('Assistant')
          .text(reverseHebrewText(para.trim()), {
            align: 'right',
            lineGap: 4,
            width: 500,
          });
        doc.moveDown(0.5);
      });

      // Digit interpretations
      uniqueDigits.forEach((digit) => {
        const interp = (digitInterpretations as any)[digit];
        if (!interp) return;

        doc.addPage();
        doc
          .fontSize(18)
          .font('Assistant-Bold')
          .text(`${interp.number}. ${interp.title}`, { align: 'right' });
        doc.moveDown();

        doc.text(' ');
        for (let digitStr of code) {
          const digit = parseInt(digitStr, 10);
          const interp = (digitInterpretations as any)[digit];
          if (!interp) continue;

          doc.addPage();

          // Digit header
          doc
            .fontSize(24)
            .font('Assistant-Bold')
            .text(reverseHebrewText(`ספרה ${digit}`), {
              align: 'right',
              width: 500,
            });
          doc.moveDown();

          // Essence
          doc
            .fontSize(14)
            .font('Assistant-SemiBold')
            .text(reverseHebrewText('המהות המרכזית'), {
              align: 'right',
              width: 500,
            });
          doc.moveDown(0.3);
          doc
            .fontSize(11)
            .font('Assistant')
            .text(reverseHebrewText(interp.essence), {
              align: 'right',
              lineGap: 4,
              width: 500,
            });
          doc.moveDown();

          // Gifts
          doc
            .fontSize(14)
            .font('Assistant-SemiBold')
            .text(reverseHebrewText('המתנות והיתרונות'), {
              align: 'right',
              width: 500,
            });
          doc.moveDown(0.3);
          interp.gifts.forEach((gift: string) => {
            doc
              .fontSize(11)
              .font('Assistant')
              .text(reverseHebrewText(`• ${gift}`), {
                align: 'right',
                width: 500,
              });
          });
          doc.moveDown();

          // Blocks
          doc
            .fontSize(14)
            .font('Assistant-SemiBold')
            .text(reverseHebrewText('החסמים והאתגרים'), {
              align: 'right',
              width: 500,
            });
          doc.moveDown(0.3);
          interp.blocks.forEach((block: string) => {
            doc
              .fontSize(11)
              .font('Assistant')
              .text(reverseHebrewText(`• ${block}`), {
                align: 'right',
                width: 500,
              });
          });
          doc.moveDown();

          // Red flags
          if (interp.redFlags) {
            doc
              .fontSize(14)
              .font('Assistant-SemiBold')
              .text(reverseHebrewText('דגלים אדומים'), {
                align: 'right',
                width: 500,
              });
            doc.moveDown(0.3);
            doc
              .fontSize(11)
              .font('Assistant')
              .text(reverseHebrewText(interp.redFlags), {
                align: 'right',
                lineGap: 4,
                width: 500,
              });
            doc.moveDown();
          }

          // Growth
          doc
            .fontSize(14)
            .font('Assistant-SemiBold')
            .text(reverseHebrewText('צמיחה והתפתחות'), {
              align: 'right',
              width: 500,
            });
          doc.moveDown(0.3);
          interp.growth.forEach((item: string) => {
            doc
              .fontSize(11)
              .font('Assistant')
              .text(reverseHebrewText(`• ${item}`), {
                align: 'right',
                width: 500,
              });
          });
          doc.moveDown();

          // Careers
          if (interp.careers) {
            doc
              .fontSize(14)
              .font('Assistant-SemiBold')
              .text(reverseHebrewText('תחומי מקצוע מומלצים'), {
                align: 'right',
                width: 500,
              });
            doc.moveDown(0.3);
            doc
              .fontSize(11)
              .font('Assistant')
              .text(reverseHebrewText(interp.careers), {
                align: 'right',
                lineGap: 4,
                width: 500,
              });
            doc.moveDown();
          }

          // Daily practice
          if (interp.dailyPractice) {
            doc
              .fontSize(14)
              .font('Assistant-SemiBold')
              .text(reverseHebrewText('תרגול יומי'), {
                align: 'right',
                width: 500,
              });
            doc.moveDown(0.3);
            doc
              .fontSize(11)
              .font('Assistant')
              .text(reverseHebrewText(interp.dailyPractice), {
                align: 'right',
                lineGap: 4,
                width: 500,
              });
            doc.moveDown();
          }

          // Bottom line
          if (interp.bottomLine) {
            doc
              .fontSize(14)
              .font('Assistant-SemiBold')
              .text(reverseHebrewText('השורה התחתונה'), {
                align: 'right',
                width: 500,
              });
            doc.moveDown(0.3);
            doc
              .fontSize(11)
              .font('Assistant')
              .text(reverseHebrewText(interp.bottomLine), {
                align: 'right',
                lineGap: 4,
                width: 500,
              });
          }
        } // Page 2 for this digit
        doc.addPage();
        doc
          .fontSize(18)
          .font('Assistant-Bold')
          .text(`${interp.number}. ${interp.title} (המשך)`, { align: 'right' });
        doc.moveDown();

        doc
          .fontSize(14)
          .font('Assistant-SemiBold')
          .text('תחומים מתאימים לקריירה ולשליחות', { align: 'right' });
        doc.moveDown(0.5);
        doc
          .fontSize(11)
          .font('Assistant')
          .text(interp.careers, { align: 'right', lineGap: 4 });
        doc.moveDown();

        doc
          .fontSize(14)
          .font('Assistant-SemiBold')
          .text('דוגמה יומית לתרגול', { align: 'right' });
        doc.moveDown(0.5);
        doc
          .fontSize(11)
          .font('Assistant')
          .text(interp.dailyPractice, { align: 'right', lineGap: 4 });
        doc.moveDown();

        doc
          .fontSize(14)
          .font('Assistant-SemiBold')
          .text('שורה תחתונה', { align: 'right' });
        doc.moveDown(0.5);
        doc
          .fontSize(11)
          .font('Assistant')
          .text(interp.bottomLine, { align: 'right', lineGap: 4 });
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export async function generateWealthReportPdfBase64(
  options: GenerateWealthReportOptions
): Promise<string> {
  const buffer = await generateWealthReportPdfBuffer(options);
  return buffer.toString('base64');
}
