import type { APIRoute } from 'astro';
import * as path from 'path';
import PDFDocument from 'pdfkit';

export const GET: APIRoute = async () => {
  try {
    // Create a new PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 40, left: 40, right: 40 },
    });

    // Register Assistant font
    const fontPath = path.join(process.cwd(), 'public', 'fonts');
    doc.registerFont('Assistant', path.join(fontPath, 'Assistant-Regular.ttf'));
    doc.registerFont(
      'Assistant-Bold',
      path.join(fontPath, 'Assistant-Bold.ttf')
    );

    // Collect PDF data
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));

    // Wait for document to finish
    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });

    // Add content
    doc
      .fontSize(24)
      .font('Assistant-Bold')
      .text('AWAKENING BY KSENIA', { align: 'center' });

    doc.moveDown();

    doc
      .fontSize(14)
      .font('Assistant')
      .text('הפירוש המלא לקוד העושר האישי שלך', { align: 'center' });

    doc.moveDown(2);

    doc.fontSize(36).font('Assistant').text('1234', { align: 'center' });

    doc.moveDown();

    doc.fontSize(12).font('Assistant').text('עבור: בדיקה', { align: 'center' });

    doc.moveDown(2);

    doc
      .fontSize(11)
      .font('Assistant')
      .text('זהו מסמך בדיקה עם פונט Assistant בעברית.', { align: 'right' });

    doc.text('הטקסט צריך להיראות נכון ולא בגיבריש.', { align: 'right' });

    // Finalize PDF
    doc.end();

    // Wait for PDF to be generated
    const pdfBuffer = await pdfPromise;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="wealth-report-pdfkit.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
