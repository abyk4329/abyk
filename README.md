# abykonline

This is the ABYK website (Next.js App Router + Tailwind).

## Dev quickstart (pnpm)

- Install deps: pnpm install
- Start dev server: pnpm run dev
- Build: pnpm run build
- Start production build locally: pnpm run start

## Payment provider (Grow) setup

1) Success/Return URL (after payment)
- Set the provider’s Success/Return URL to:
  https://abyk.online/thank-you?code={TRANSACTION_ID}
- The thank-you and interpretations pages accept any of these parameter keys, so use whatever your provider supports:
  - code, transaction_id, transactionId, order_id, orderId, payment_id, paymentId, reference, ref, id

2) Webhook URL
- URL: https://abyk.online/api/grow/webhook
- Optional shared secret: send a header x-grow-signature with a fixed secret value. In Vercel set the same value in env var GROW_WEBHOOK_SECRET.
- Content-types supported: application/json or application/x-www-form-urlencoded. Minimal fields used (if present): transaction_id/id/reference/ref, status/event, amount, email (redacted in logs).

3) Environment variables
- Create a GROW_WEBHOOK_SECRET in Vercel (Project Settings → Environment Variables) if you plan to verify an incoming shared secret.
- Local development: copy .env.example to .env.local and fill values (Vercel will auto-load .env.local when running locally).

## PWA / Install to Home Screen
- Manifest and icons are included. The app name shows as “ABYK” on install.

## Notes
- The site routes include: / (home), /thank-you, /interpretations, /terms, /privacy, /terms-privacy, /email-preview.
- The CTA on the sales page opens the Grow payment link directly.

## Email delivery

- Server endpoint: `POST /api/send-email` with JSON `{ to, subject, html?, text?, metadata? }`.
- Uses Resend when `RESEND_API_KEY` is set. Configure in Vercel env vars:
  - `RESEND_API_KEY` — API key from https://resend.com/
  - `EMAIL_FROM` — e.g. `AWAKENING <noreply@abyk.online>`
- If Resend is not configured, the endpoint will no-op and log the email data but still return `{ ok: true }` so your flow keeps working in dev.
- Client helper: `sendWealthCodeEmail()` builds the Hebrew email and calls the API; it can fallback to EmailJS if the API is unavailable and the EmailJS public keys are provided.
