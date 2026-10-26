/**
 * Best-effort in-memory limiter for the marketing site. This is not a
 * distributed control — serverless instances do not share the map. It exists
 * so the login and contact actions can refuse bursts and surface "Too many
 * attempts" without pretending to be production auth infrastructure.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function hitRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { limited: boolean; remaining: number } {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: limit - 1 };
  }

  current.count += 1;
  const limited = current.count > limit;
  return { limited, remaining: Math.max(0, limit - current.count) };
}

export async function requestKey(scope: string): Promise<string> {
  const { headers } = await import("next/headers");
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "unknown";
  return `${scope}:${ip}`;
}
