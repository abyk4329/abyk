import type { APIRoute } from 'astro';
import { generateWealthReportPdfBase64 } from '../../../wealth-code/pdf/generate';

export const prerender = false;
export const runtime = 'node';

const CODE_PATTERN = /^\d{4}$/;

function validateCode(code: string | null): asserts code is string {
  if (!code) {
    throw new Response('Missing code parameter', { status: 400 });
  }

  if (!CODE_PATTERN.test(code)) {
    throw new Response('Invalid code format. Must be 4 digits.', {
      status: 400,
    });
  }
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    console.log('Request URL:', request.url);
    console.log('URL object:', url);
    console.log('Search params:', url.searchParams);
    const code = url.searchParams.get('code');
    console.log('Code from params:', code);
    const userName = url.searchParams.get('name') || undefined;

    validateCode(code);

    const pdfBase64 = await generateWealthReportPdfBase64({
      code,
      userName,
    });

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="wealth-code-${code}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    console.error('Error generating PDF (GET):', error);
    return new Response('Internal server error', { status: 500 });
  }
};

type GeneratePdfRequest = {
  code?: string;
  name?: string;
  userName?: string;
  title?: string;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as GeneratePdfRequest;
    const code = body.code ?? null;
    const userName = body.userName ?? body.name ?? undefined;

    validateCode(code);

    const pdfBase64 = await generateWealthReportPdfBase64({
      code,
      userName,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        filename: `wealth-code-${code}.pdf`,
        pdfBase64,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    console.error('Error generating PDF (POST):', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
