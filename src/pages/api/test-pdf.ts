import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'This test endpoint is disabled. Use /api/test-pdf-simple or /api/test-pdf-pdfkit instead.',
    }),
    { status: 501, headers: { 'Content-Type': 'application/json' } }
  );
};
