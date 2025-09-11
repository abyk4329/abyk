// abyk variant of interpretation API route
// This forwards to the main app's interpretation endpoint

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    // Extract all query parameters
    const bd = params.get("bd");
    const bm = params.get("bm");
    const by = params.get("by");
    const lp = params.get("lp");
    const download = params.get("download");
    const inline = params.get("inline");
    const source = params.get("source");

    // Build the main app API URL
  const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  // Warn if using localhost in production
  if (process.env.NODE_ENV === 'production' && baseUrl.includes('localhost')) {
    console.warn('[Interpretation API] Using localhost URL in production environment');
    // Consider throwing an error or returning an error response
    return NextResponse.json(
      { error: "Invalid proxy configuration" },
      { status: 500 }
    );
  }
  const mainApiUrl = new URL("/api/interpretation", baseUrl);

    // Forward all parameters
    if (bd) mainApiUrl.searchParams.set("bd", bd);
    if (bm) mainApiUrl.searchParams.set("bm", bm);
    if (by) mainApiUrl.searchParams.set("by", by);
    if (lp) mainApiUrl.searchParams.set("lp", lp);
    if (download) mainApiUrl.searchParams.set("download", download);
    if (inline) mainApiUrl.searchParams.set("inline", inline);
    if (source) mainApiUrl.searchParams.set("source", source);

    // Forward the request to main app with timeout and minimal header forwarding
    const controller = new AbortController();
    const rawTimeout = String(
      process.env.INTERPRETATION_PROXY_TIMEOUT_MS ?? "10000",
    ).trim();
    let parsed = Number.parseInt(rawTimeout, 10);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
      parsed = 10000;
    }
    const timeoutMs = Math.max(1000, Math.floor(parsed));
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // Minimal, safe set of headers to forward (plus standard X-Forwarded headers)
    const fwdHeaders = new Headers();
    const copyHeader = (name: string) => {
      const val = req.headers.get(name);
      if (val) fwdHeaders.set(name, val);
    };
    copyHeader("authorization");
    copyHeader("accept");
    copyHeader("content-type");
    copyHeader("user-agent");

    // Preserve/append client information for upstream using X-Forwarded-* and Forwarded headers
    try {
      const urlObj = req.nextUrl;
      const existingXff = (req.headers.get("x-forwarded-for") || "").trim();

      // Get IP from headers only (Edge runtime compatible)
      const xRealIp = (req.headers.get("x-real-ip") || "").trim();
      const firstXffIp = existingXff
        ? (existingXff.split(",")[0] || "").trim()
        : "";

      const resolvedIp = xRealIp || firstXffIp || "127.0.0.1";
      const xffCombined = existingXff
        ? `${existingXff}, ${resolvedIp}`
        : resolvedIp;
      fwdHeaders.set("x-forwarded-for", xffCombined);

      const derivedProto = (
        req.headers.get("x-forwarded-proto") ||
        urlObj.protocol ||
        "http:"
      )
        .toString()
        .replace(":", "")
        .trim();
      fwdHeaders.set("x-forwarded-proto", derivedProto);

      const derivedHost =
        (req.headers.get("x-forwarded-host") || "").trim() ||
        (req.headers.get("host") || "").trim() ||
        urlObj.host;
      if (derivedHost) fwdHeaders.set("x-forwarded-host", derivedHost);

      const derivedPort =
        (req.headers.get("x-forwarded-port") || "").trim() ||
        urlObj.port ||
        (derivedProto === "https" ? "443" : "80");
      if (derivedPort) fwdHeaders.set("x-forwarded-port", derivedPort);

      // RFC 7239 Forwarded header; append if one already exists
      const existingForwarded = (req.headers.get("forwarded") || "").trim();
      const newForwarded = `for="${resolvedIp}";proto=${derivedProto};host="${derivedHost || ""}"`;
      const forwardedCombined = existingForwarded
        ? `${existingForwarded}, ${newForwarded}`
        : newForwarded;
      fwdHeaders.set("forwarded", forwardedCombined);
    } catch {
      // best-effort only; ignore errors
    }

    let response: Response;
    try {
      response = await fetch(mainApiUrl.toString(), {
        method: "GET",
        headers: fwdHeaders,
        signal: controller.signal,
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (err as any)?.name === "AbortError";
      console.error(
        "Error fetching main interpretation API:",
        isAbort ? "AbortError (timeout)" : err,
      );
      return NextResponse.json(
        { error: isAbort ? "Upstream timeout" : "Upstream fetch failed" },
        { status: isAbort ? 504 : 502 },
      );
    } finally {
      clearTimeout(timeoutId);
    }
    // Note: do not throw on non-OK; pass through status/body below
    if (!response.ok) {
      console.warn(
        `Main API responded with non-OK status: ${response.status}`,
      );
    }

    // Check if it's a download request
    if (download === "1") {
      const blob = await response.blob();
      const headers = new Headers();
      headers.set("Content-Type", "text/html; charset=utf-8");
      headers.set(
        "Content-Disposition",
        "attachment; filename=interpretation.html",
      );
      return new NextResponse(blob, { headers });
    }

    // Content-type aware handling with safe fallbacks
    const upstreamStatus = response.status;
    const contentType = (response.headers.get("content-type") || "").toLowerCase();

    // Helper: copy a small set of safe headers from upstream
    const buildForwardHeaders = (includeContentType: boolean) => {
      const out = new Headers();
      const forwardList = [
        "cache-control",
        "content-disposition",
        "etag",
        "last-modified",
      ];
      if (includeContentType) {
        const ct = response.headers.get("content-type");
        if (ct) out.set("content-type", ct);
      }
      for (const key of forwardList) {
        const val = response.headers.get(key);
        if (val) out.set(key, val);
      }
      return out;
    };

    // Prefer JSON when content-type says so; otherwise fall back to text
    if (contentType.includes("application/json")) {
      // Clone so we can read text if JSON parsing fails (body streams are one-time)
      const clone = response.clone();
      try {
        const data = await response.json();
        return NextResponse.json(data, {
          status: upstreamStatus,
          headers: buildForwardHeaders(false), // let Next set application/json
        });
      } catch {
        // Malformed JSON despite content-type; fall back to text from the clone
        const text = await clone.text().catch(() => "");
        return new NextResponse(text || "", {
          status: upstreamStatus,
          headers: buildForwardHeaders(true),
        });
      }
    } else {
      // Non-JSON: return raw text while preserving status/headers
      const text = await response.text().catch(() => "");
      return new NextResponse(text || "", {
        status: upstreamStatus,
        headers: buildForwardHeaders(true),
      });
    }
  } catch (error) {
    console.error("Error in abyk interpretation API:", error);
    return NextResponse.json(
      { error: "Failed to generate interpretation" },
      { status: 500 },
    );
  }
}
