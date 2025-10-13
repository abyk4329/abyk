import { normalizeAttachments, sendEmail } from "@/lib/email/transport";
import {
  wealthEmailHtml,
  buildWealthEmailSubject,
} from "@/features/wealth-code/email/template";

const DEFAULT_SUBJECT = buildWealthEmailSubject();
const DEFAULT_SHARE_URL = "https://abyk.online/";
const TEST_EMAIL = process.env.TEST_EMAIL?.trim() || "kseniachud@gmail.com";
const FORCE_TEST_MODE = process.env.MAIL_TEST_MODE === "1";

type Attachment = { filename?: string; content?: string; contentType?: string };

export type WealthEmailRequest = {
  to?: string;
  name?: string;
  code: string;
  shareUrl?: string;
  subject?: string;
  replyTo?: string;
  attachments?: Attachment[];
  pdfBase64?: string;
  test?: boolean;
};

export type WealthEmailResponse = {
  ok: true;
  transport: "resend" | "smtp";
  fallbackUsed: boolean;
  toEffective: string;
  wasTest: boolean;
  id?: string;
  error?: string;
  originalRecipient: string | null;
};

export class WealthEmailError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "WealthEmailError";
    this.status = status;
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateWealthEmailRequest(body: WealthEmailRequest) {
  const intendedRecipient = body.to?.trim() ?? "";
  const code = body.code?.trim();

  if (!code || !/^\d{4}$/.test(code)) {
    throw new WealthEmailError(
      'Invalid or missing "code" - must be exactly 4 digits'
    );
  }

  return { intendedRecipient, code };
}

export async function dispatchWealthEmail(
  body: WealthEmailRequest,
  request: Request | null = null
): Promise<WealthEmailResponse> {
  const { intendedRecipient, code } = validateWealthEmailRequest(body);
  const isProd = process.env.NODE_ENV === "production";
  const isHeaderTest = request?.headers.get("x-mail-test") === "1";
  const url = request ? new URL(request.url) : null;
  const isQueryTest = url?.searchParams.get("test") === "1";
  const isTest =
    FORCE_TEST_MODE ||
    body.test === true ||
    !isProd ||
    isHeaderTest ||
    isQueryTest;

  const toEffective = isTest ? TEST_EMAIL : intendedRecipient;

  if (!toEffective || !isValidEmail(toEffective)) {
    throw new WealthEmailError("Invalid recipient address");
  }

  const subject = body.subject?.trim() || DEFAULT_SUBJECT;
  const shareUrl =
    (body.shareUrl ?? DEFAULT_SHARE_URL).trim() || DEFAULT_SHARE_URL;

  const html = wealthEmailHtml({
    name: body.name ?? "",
    code,
    shareUrl,
  });

  const attachments = normalizeAttachments({
    attachments: body.attachments,
    pdfBase64: body.pdfBase64,
  });

  const result = await sendEmail({
    to: toEffective,
    subject,
    html,
    replyTo: body.replyTo?.trim() || undefined,
    attachments,
  });

  return {
    ok: true,
    transport: result.transport,
    fallbackUsed: result.fallbackUsed,
    toEffective,
    wasTest: isTest,
    id: result.id,
    error: result.error,
    originalRecipient: intendedRecipient || null,
  };
}
