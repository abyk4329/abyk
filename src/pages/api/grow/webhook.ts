import type { APIRoute } from 'astro';
import { generateWealthReportPdfBase64 } from '../../../../wealth-code/pdf/generate';

export const prerender = false;
export const runtime = 'node';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_REGEX = /^\d{4}$/;

const makeTimingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

type JSONObject = Record<string, unknown>;

type GrowPayload = JSONObject;

const findFirstMatch = (
  value: unknown,
  predicate: (candidate: string) => boolean,
  visited = new WeakSet<object>()
): string | undefined => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (predicate(trimmed)) {
      return trimmed;
    }
    return undefined;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findFirstMatch(item, predicate, visited);
      if (match) {
        return match;
      }
    }
    return undefined;
  }

  if (value && typeof value === 'object') {
    if (visited.has(value)) {
      return undefined;
    }
    visited.add(value as object);

    for (const item of Object.values(value as JSONObject)) {
      const match = findFirstMatch(item, predicate, visited);
      if (match) {
        return match;
      }
    }
  }

  return undefined;
};

const buildEmailHtml = (name: string | undefined, code: string | undefined) => `
  <div dir="rtl" style="font-family: Assistant, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f8f8fb;">
    <div style="background: #ffffff; border-radius: 20px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); text-align: center;">
      <h1 style="font-size: 26px; color: #3F4F4F; margin-bottom: 24px; font-weight: 600;">AWAKENING BY KSENIA</h1>
      <p style="font-size: 18px; color: #555; line-height: 1.7; margin-bottom: 24px;">
        ${name ? `${name} היקרה/היקר,` : 'תודה רבה,'}<br/><br/>
        הרכישה שלכם הושלמה בהצלחה. מצורף הפירוש המלא לקוד${
          code ? ` ${code}` : ''
        }.
      </p>
      <p style="font-size: 16px; color: #777; line-height: 1.6;">
        מומלץ לשמור את הקובץ ולחזור אליו בכל עת שתרצו להעמיק במסע.
      </p>
      <div style="margin-top: 32px;">
        <a href="https://abyk.online/tools/wealth-code/thank-you${
          code ? `?code=${code}` : ''
        }" style="display: inline-block; padding: 14px 32px; background: #3F4F4F; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 600;">המשך לעמוד תודה</a>
      </div>
    </div>
  </div>
`;

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.GROW_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[grow:webhook] Missing GROW_WEBHOOK_SECRET');
    return new Response(
      JSON.stringify({ ok: false, error: 'Webhook secret not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Log all headers for debugging
  console.log(
    '[grow:webhook] All headers:',
    Object.fromEntries(request.headers.entries())
  );

  const signatureHeader = request.headers.get('x-grow-signature');
  const rawBody = await request.text();

  console.log('[grow:webhook] Signature header value:', signatureHeader);
  console.log(
    '[grow:webhook] Raw body (first 200 chars):',
    rawBody.substring(0, 200)
  );

  if (!signatureHeader) {
    console.warn('[grow:webhook] ⚠️ Missing signature header - proceeding anyway (TEMPORARY)');
    // return new Response(
    //   JSON.stringify({ ok: false, error: 'Signature header missing' }),
    //   {
    //     status: 401,
    //     headers: { 'Content-Type': 'application/json' },
    //   }
    // );
  } else if (!makeTimingSafeEqual(signatureHeader.trim(), secret.trim())) {
    console.warn('[grow:webhook] Invalid signature');
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid signature' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  let payload: GrowPayload;
  try {
    payload = JSON.parse(rawBody) as GrowPayload;
  } catch (error) {
    console.error('[grow:webhook] Failed to parse payload', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid JSON payload' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const buyerEmail = findFirstMatch(payload, (candidate) =>
    EMAIL_REGEX.test(candidate)
  );
  const buyerName = findFirstMatch(
    payload,
    (candidate) =>
      candidate.length > 2 &&
      candidate.length < 120 &&
      !EMAIL_REGEX.test(candidate) &&
      !CODE_REGEX.test(candidate)
  );
  const code = findFirstMatch(payload, (candidate) =>
    CODE_REGEX.test(candidate)
  );

  if (!buyerEmail) {
    console.error('[grow:webhook] Could not find buyer email in payload');
    return new Response(
      JSON.stringify({ ok: false, error: 'Buyer email not found' }),
      {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const resendKey =
    import.meta.env.RESEND_API_KEY ?? import.meta.env.PRIVATE_RESEND_API_KEY;
  const resendFrom =
    import.meta.env.RESEND_FROM_EMAIL ??
    import.meta.env.PRIVATE_RESEND_FROM_EMAIL ??
    'AWAKENING BY KSENIA <no-reply@abyk.online>';

  if (!resendKey || !resendFrom) {
    console.error('[grow:webhook] Resend configuration missing');
    return new Response(
      JSON.stringify({ ok: false, error: 'Email service not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  let pdfBase64: string | undefined;

  if (code) {
    try {
      pdfBase64 = await generateWealthReportPdfBase64({
        code,
        userName: buyerName,
      });
    } catch (error) {
      console.error('[grow:webhook] Failed to generate PDF', error);
    }
  }

  try {
    const resendPayload: Record<string, unknown> = {
      from: resendFrom,
      to: buyerEmail,
      subject: code ? `הפירוש המלא לקוד ${code}` : 'הפירוש המלא של קוד העושר',
      html: buildEmailHtml(buyerName, code),
    };

    if (pdfBase64) {
      resendPayload.attachments = [
        {
          filename: 'WealthCode.pdf',
          content: pdfBase64,
          contentType: 'application/pdf',
        },
      ];
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify(resendPayload),
    });

    if (!resendResponse.ok) {
      const errorPayload = await resendResponse.json().catch(() => undefined);
      console.error('[grow:webhook] Resend API error', errorPayload);
      return new Response(
        JSON.stringify({ ok: false, error: 'Email send failed' }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('[grow:webhook] Failed to send email', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Email send failed' }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
