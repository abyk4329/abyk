/*
  Webhook test script
  Enhancements:
  - Uses Node 18 global fetch when available (falls back to node-fetch@2)
  - Supports passing WEBHOOK_SECRET via env or --secret= argument
  - Generates HMAC SHA256 signature (x-webhook-signature) matching server logic
  - Tests both API key auth (?webhook_key=...) and HMAC header auth
  - Clear, colorized console output
*/
// Lazy dependency loader (avoids top-level await in CommonJS envs)
let createHmacRef;
let fetchRef;
async function initDeps() {
  if (!createHmacRef) {
    const mod = await import("crypto");
    createHmacRef = mod.createHmac;
  }
  if (!fetchRef) {
    let impl = global.fetch;
    if (!impl) {
      const nodeFetch = await import("node-fetch");
      impl = nodeFetch.default || nodeFetch;
    }
    fetchRef = (...args) => impl(...args);
  }
}

function color(c, s) {
  const map = {
    green: "\u001b[32m",
    red: "\u001b[31m",
    yellow: "\u001b[33m",
    cyan: "\u001b[36m",
    reset: "\u001b[0m",
  };
  return (map[c] || "") + s + map.reset;
}

function parseArgs() {
  const out = {};
  for (const a of process.argv.slice(2)) {
    const [k, v] = a.split("=");
    if (k.startsWith("--")) out[k.slice(2)] = v === undefined ? true : v;
  }
  return out;
}

async function testWebhookAPI() {
  await initDeps();
  const args = parseArgs();
  const secret = (process.env.WEBHOOK_SECRET || args.secret || "").trim();
  if (!secret) {
    console.error(color("red", "Missing WEBHOOK_SECRET (env or --secret=)."));
    process.exitCode = 1;
    return;
  }

  const base = args.url || "http://localhost:3000";
  const webhookUrl = `${base.replace(/\/$/, "")}/api/payment-webhook`;
  console.log(color("cyan", `Testing webhook endpoint: ${webhookUrl}`));

  const testPayload = {
    customerEmail: "test@example.com",
    paymentStatus: "completed",
    customData: { bd: 3, bm: 7, by: 9, lp: 1 },
  };

  // 1. Health check (GET)
  try {
    process.stdout.write(color("yellow", "1) GET health check... "));
    const r = await fetchRef(
      webhookUrl + "?webhook_key=" + encodeURIComponent(secret)
    );
    const j = await r.json().catch(() => ({}));
    console.log(color(r.ok ? "green" : "red", r.ok ? "OK" : "FAIL"), j);
  } catch (e) {
    console.log(color("red", "ERROR"), e.message);
  }

  // 2. POST with API key query
  try {
    process.stdout.write(color("yellow", "2) POST with query api key... "));
    const url = webhookUrl + "?webhook_key=" + encodeURIComponent(secret);
    const body = JSON.stringify(testPayload);
    const r = await fetchRef(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const j = await r.json().catch(() => ({}));
    console.log(
      color(r.ok ? "green" : "red", r.ok ? "OK" : "FAIL"),
      r.status,
      j
    );
  } catch (e) {
    console.log(color("red", "ERROR"), e.message);
  }

  // 3. POST with HMAC signature header only
  try {
    process.stdout.write(color("yellow", "3) POST with HMAC signature... "));
    const body = JSON.stringify(testPayload);
    const sig = createHmacRef("sha256", secret)
      .update(body, "utf8")
      .digest("hex");
    const r = await fetchRef(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-signature": sig,
      },
      body,
    });
    const j = await r.json().catch(() => ({}));
    console.log(
      color(r.ok ? "green" : "red", r.ok ? "OK" : "FAIL"),
      r.status,
      j
    );
  } catch (e) {
    console.log(color("red", "ERROR"), e.message);
  }

  // 4. Negative test (bad signature)
  try {
    process.stdout.write(
      color("yellow", "4) POST with bad signature (expect 401)... ")
    );
    const body = JSON.stringify(testPayload);
    const badSig = "deadbeef";
    const r = await fetchRef(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-signature": badSig,
      },
      body,
    });
    console.log(
      color(
        r.status === 401 ? "green" : "red",
        r.status === 401 ? "EXPECTED 401" : "UNEXPECTED " + r.status
      )
    );
  } catch (e) {
    console.log(color("red", "ERROR"), e.message);
  }
}

testWebhookAPI();
