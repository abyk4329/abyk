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
- Delivery order (first match wins):
  1. SMTP (Nodemailer) — when `EMAIL_USER` and `EMAIL_PASSWORD` are set
  2. Resend HTTP API — when `RESEND_API_KEY` is set
  3. Log-only fallback — prints payload to logs and returns `{ ok: true }`

### SMTP (recommended if you have Gmail or your own mailbox)
- Required env vars:
  - `EMAIL_USER` — full mailbox, e.g. `awakening.by.ksenia@gmail.com` or `noreply@abyk.online`
  - `EMAIL_PASSWORD` — the mailbox password or an App Password (for Gmail)
- Optional:
  - `EMAIL_HOST` — SMTP host (defaults to `smtp.gmail.com` if email ends with `@gmail.com`)
  - `EMAIL_PORT` — 465 for SSL or 587 for STARTTLS (default chosen by host)
  - `EMAIL_SECURE` — `true` for port 465, `false` for 587
  - `EMAIL_FROM` — display name and address, e.g. `AWAKENING <awakening.by.ksenia@gmail.com>` (defaults to `EMAIL_USER`)

Gmail note: you must create an App Password (Google Account → Security → App passwords) and use that as `EMAIL_PASSWORD`.

### Resend (fallback)
- `RESEND_API_KEY` — API key from https://resend.com/
- `EMAIL_FROM` — e.g. `AWAKENING <noreply@abyk.online>`

### Quick test
You can test delivery by posting to the local or deployed API:

Body:
`{ "to": "you@example.com", "subject": "Test", "text": "Hello" }`

On success you'll get `{ ok: true, transport: "smtp" | "resend" }`.
- Client helper: `sendWealthCodeEmail()` builds the Hebrew email and calls the API; it can fallback to EmailJS if the API is unavailable and the EmailJS public keys are provided.
