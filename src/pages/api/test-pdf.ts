import type { APIRoute } from 'astro';
import * as path from 'path';

export const GET: APIRoute = async () => {
  try {
    const testCode = '1234';
    const testUserName = 'בדיקה';

    // Import from the new pdfkit generator
    const generatePath = path.join(
      process.cwd(),
      'wealth-code',
      'pdf',
      'generate-pdfkit.js'
    );
    const generateModule = await import(generatePath);
    const { generateWealthReportPdfBuffer } = generateModule;

    const pdfBuffer = await generateWealthReportPdfBuffer({
      code: testCode,
      userName: testUserName,
    });

    if (!pdfBuffer) {
      return new Response(
        JSON.stringify({ ok: false, error: 'PDF generation returned empty' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return the PDF as a downloadable file
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="wealth-report-test.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
