// Simple in-memory rate limiter.
// Note: resets on cold starts in serverless — good enough for a waitlist page.
// For high-traffic production use, swap with @upstash/ratelimit + Redis.

const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60_000
): { allowed: boolean } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) return { allowed: false };

  entry.count++;
  return { allowed: true };
}

// Prune expired entries every hour to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (now > val.resetAt) store.delete(key);
  }
}, 3_600_000);
