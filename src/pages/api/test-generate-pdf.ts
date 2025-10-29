import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  try {
    const code = url.searchParams.get('code');

    console.log('=== TEST PDF GENERATION ===');
    console.log('Code received:', code);

    if (!code) {
      return new Response('Missing code parameter', { status: 400 });
    }

    if (!/^\d{4}$/.test(code)) {
      return new Response('Invalid code format. Must be 4 digits.', {
        status: 400,
      });
    }

    console.log('Starting PDF generation...');

    // Try to import the function
    const { generateWealthReportPdfBase64 } = await import(
      '../../../wealth-code/pdf/generate'
    );
    console.log('Module imported successfully');

    // Generate PDF
    const pdfBase64 = await generateWealthReportPdfBase64({
      code,
      userName: undefined,
    });

    console.log('PDF generated, length:', pdfBase64.length);

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    console.log('Buffer created, size:', pdfBuffer.length);

    // Return PDF with proper headers
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="wealth-code-${code}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('=== PDF GENERATION ERROR ===');
    console.error('Error:', error);
    console.error(
      'Stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    );
    return new Response(
      `Internal server error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      { status: 500 }
    );
  }
};
