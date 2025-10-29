import type { APIRoute } from 'astro';
import {
  buildWealthEmailPreheader,
  buildWealthEmailSubject,
  wealthEmailHtml,
} from '../../../wealth-code/email';

const CODE_PATTERN = /^\d{4}$/;

type AttachmentPayload = {
  filename?: string;
  content: string;
  contentType?: string;
};

type SendEmailPayload = {
  to?: string;
  name?: string;
  code?: string;
  shareUrl?: string;
  replyTo?: string;
  subject?: string;
  test?: boolean;
  attachments?: AttachmentPayload[];
};

function validateEmail(value: string | undefined): asserts value is string {
  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Response(
      JSON.stringify({
        ok: false,
        error: 'Invalid or missing recipient email',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

function validateCode(value: string | undefined): asserts value is string {
  if (!value) {
    throw new Response(
      JSON.stringify({ ok: false, error: 'Missing code parameter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (!CODE_PATTERN.test(value)) {
    throw new Response(
      JSON.stringify({
        ok: false,
        error: 'Invalid code format (must be 4 digits)',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as SendEmailPayload;
    validateEmail(body.to);
    validateCode(body.code);

    const resendApiKey =
      import.meta.env.RESEND_API_KEY ?? import.meta.env.PRIVATE_RESEND_API_KEY;
    const resendFrom =
      import.meta.env.RESEND_FROM_EMAIL ??
      import.meta.env.PRIVATE_RESEND_FROM_EMAIL ??
      'Awakening by Ksenia <reports@abyk.online>';

    if (!resendApiKey) {
      throw new Response(
        JSON.stringify({
          ok: false,
          error: 'Email transport is not configured.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const subject = body.subject?.trim() || buildWealthEmailSubject();
    const html = wealthEmailHtml({
      code: body.code,
      userName: body.name,
      shareUrl: body.shareUrl,
    });

    const resendPayload: Record<string, unknown> = {
      from: resendFrom,
      to: body.to,
      subject,
      html,
      reply_to: body.replyTo ?? resendFrom,
      tags: body.test ? [{ name: 'environment', value: 'test' }] : undefined,
    };

    if (Array.isArray(body.attachments) && body.attachments.length > 0) {
      resendPayload.attachments = body.attachments.map((attachment) => ({
        filename: attachment.filename ?? 'WealthCode.pdf',
        content: attachment.content,
        ...(attachment.contentType
          ? { contentType: attachment.contentType }
          : {}),
      }));
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    });

    const resendJson = await resendResponse.json();

    if (!resendResponse.ok) {
      const message =
        typeof resendJson?.message === 'string'
          ? resendJson.message
          : 'Failed to send email via Resend';
      throw new Response(JSON.stringify({ ok: false, error: message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        transport: 'resend',
        fallbackUsed: false,
        toEffective: body.to,
        wasTest: Boolean(body.test),
        id: resendJson?.id,
        preheader: buildWealthEmailPreheader(body.code),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
