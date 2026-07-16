const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 8;

type Entry = { count: number; resetAt: number };

const hits = new Map<string, Entry>();

/**
 * Lightweight per-IP rate limit for the subscribe endpoint. Best-effort on
 * serverless (per instance), but stops casual abuse and automated flooding.
 */
export function checkSubscribeRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now >= entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count += 1;
  return true;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function assertSubscribeRateLimit(req: Request): Response | null {
  if (!checkSubscribeRateLimit(clientIp(req))) {
    return Response.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }
  return null;
}
