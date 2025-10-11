export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { dispatchWealthEmail, WealthEmailError } from "@/lib/email/wealth";
import { generateWealthReportPdfBase64 } from "@/modules/wealth-code/pdf/generate";

const SUCCESS_STATUS = new Set(["paid", "succeeded", "success", "completed", "active"]);
const SUCCESS_EVENTS = new Set(["order.paid", "order.completed", "payment.paid", "payment.completed"]);
const SECRET_HEADERS = ["x-grow-signature", "x-grow-secret", "x-webhook-secret", "authorization"] as const;

function sanitizeCode(value: unknown): string | null {
    if (typeof value === "string") {
        const trimmed = value.trim();
        if (/^\d{4}$/.test(trimmed)) {
            return trimmed;
        }
        if (/^\d{4}$/.test(trimmed.replace(/^#/, ""))) {
            return trimmed.replace(/^#/, "");
        }
    }
    if (typeof value === "number") {
        const asString = value.toString().padStart(4, "0");
        if (/^\d{4}$/.test(asString)) {
            return asString;
        }
    }
    return null;
}

function sanitizeEmail(value: unknown): string | null {
    if (typeof value !== "string") {
        return null;
    }
    const trimmed = value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : null;
}

function getSecretFromHeaders(req: Request): string | null {
    for (const header of SECRET_HEADERS) {
        const raw = req.headers.get(header);
        if (!raw) {
            continue;
        }
        if (header === "authorization" && raw.startsWith("Bearer ")) {
            return raw.slice(7).trim();
        }
        return raw.trim();
    }
    return null;
}

function extractFromCustomFields(fields: unknown): string | null {
    if (!Array.isArray(fields)) {
        return null;
    }
    for (const field of fields) {
        if (field && typeof field === "object") {
            const value = (field as Record<string, unknown>).value ?? (field as Record<string, unknown>).answer;
            const key = (field as Record<string, unknown>).key ?? (field as Record<string, unknown>).name;
            if (key && typeof key === "string" && key.toLowerCase().includes("code")) {
                const sanitized = sanitizeCode(value);
                if (sanitized) {
                    return sanitized;
                }
            }
            const sanitizedValue = sanitizeCode(value);
            if (sanitizedValue) {
                return sanitizedValue;
            }
        }
    }
    return null;
}

function extractCode(payload: any): string | null {
    const candidates: Array<unknown> = [
        payload?.code,
        payload?.data?.code,
        payload?.data?.metadata?.code,
        payload?.metadata?.code,
        payload?.order?.code,
        payload?.order?.metadata?.code,
        payload?.order?.custom?.code,
        payload?.custom?.code,
    ];

    for (const candidate of candidates) {
        const sanitized = sanitizeCode(candidate);
        if (sanitized) {
            return sanitized;
        }
    }

    const customCollections = [
        payload?.data?.customFields,
        payload?.data?.custom_fields,
        payload?.customFields,
        payload?.custom_fields,
        payload?.order?.customFields,
        payload?.order?.custom_fields,
    ];

    for (const collection of customCollections) {
        const sanitized = extractFromCustomFields(collection);
        if (sanitized) {
            return sanitized;
        }
    }

    return null;
}

function extractEmail(payload: any): string | null {
    const candidates: Array<unknown> = [
        payload?.email,
        payload?.buyer_email,
        payload?.customer?.email,
        payload?.customer_email,
        payload?.data?.email,
        payload?.data?.buyer_email,
        payload?.data?.customer?.email,
        payload?.order?.customer?.email,
        payload?.order?.email,
        payload?.order?.buyer_email,
    ];

    for (const candidate of candidates) {
        const email = sanitizeEmail(candidate);
        if (email) {
            return email;
        }
    }

    return null;
}

function extractName(payload: any): string | undefined {
    const candidates: Array<unknown> = [
        payload?.customer?.name,
        payload?.customer_name,
        payload?.buyer_name,
        payload?.data?.customer?.name,
        payload?.order?.customer?.name,
        payload?.order?.buyer_name,
    ];

    for (const candidate of candidates) {
        if (typeof candidate === "string" && candidate.trim()) {
            return candidate.trim();
        }
    }

    return undefined;
}

function shouldProcessEvent(payload: any): { proceed: boolean; reason?: string } {
    const eventType = typeof payload?.event === "string" ? payload.event.toLowerCase() : undefined;
    const statusValueRaw = payload?.data?.status ?? payload?.status ?? payload?.order?.status;
    const statusValue = typeof statusValueRaw === "string" ? statusValueRaw.toLowerCase() : undefined;

    if (statusValue && SUCCESS_STATUS.has(statusValue)) {
        return { proceed: true };
    }

    if (eventType && SUCCESS_EVENTS.has(eventType)) {
        return { proceed: true };
    }

    if (statusValue && !SUCCESS_STATUS.has(statusValue)) {
        return { proceed: false, reason: `Ignored status ${statusValue}` };
    }

    if (eventType && !SUCCESS_EVENTS.has(eventType)) {
        return { proceed: false, reason: `Unhandled event ${eventType}` };
    }

    return { proceed: true };
}

export async function POST(req: Request) {
    try {
        if (req.method !== "POST") {
            return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
        }

        const secret = process.env.GROW_WEBHOOK_SECRET?.trim();
        if (secret) {
            const provided = getSecretFromHeaders(req);
            if (!provided || provided !== secret) {
                return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
            }
        }

        let payload: any;
        try {
            payload = await req.json();
        } catch {
            return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const { proceed, reason } = shouldProcessEvent(payload);
        if (!proceed) {
            return NextResponse.json({ ok: true, skipped: true, reason }, { status: 202 });
        }

        const code = extractCode(payload);
        if (!code) {
            return NextResponse.json({ ok: false, error: "Missing wealth code in webhook payload" }, { status: 400 });
        }

        const email = extractEmail(payload);
        if (!email) {
            return NextResponse.json({ ok: false, error: "Missing customer email in webhook payload" }, { status: 400 });
        }

        let pdfBase64: string | undefined;
        try {
            pdfBase64 = await generateWealthReportPdfBase64({ code, userName: extractName(payload) });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to generate PDF";
            console.error("Grow webhook PDF generation failed:", error);
            return NextResponse.json({ ok: false, error: message }, { status: 500 });
        }

        const emailResponse = await dispatchWealthEmail(
            {
                to: email,
                name: extractName(payload),
                code,
                pdfBase64,
                shareUrl: payload?.share_url ?? payload?.data?.share_url,
            },
            null
        );

        return NextResponse.json({
            ok: true,
            code,
            to: emailResponse.toEffective,
            transport: emailResponse.transport,
            fallbackUsed: emailResponse.fallbackUsed,
            wasTest: emailResponse.wasTest,
            emailId: emailResponse.id,
            orderId: payload?.data?.id ?? payload?.order?.id ?? payload?.id ?? null,
        });
    } catch (error) {
        if (error instanceof WealthEmailError) {
            return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
        }

        console.error("Grow webhook handler failed:", error);
        const message = error instanceof Error ? error.message : "Unexpected webhook failure";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
