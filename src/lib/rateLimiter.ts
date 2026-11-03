// =====================================================================
// Enterprise In-Memory Sliding Window Rate Limiter
// Zero-dependency, lightweight, anti-spam bot defense
// =====================================================================

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic garbage collection to maintain minimal memory footprint (Google RAIL standard)
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 120000);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  // Do not block Node.js process shutdown
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

export interface RateLimitResult {
  allowed: boolean;
  currentCount: number;
  limit: number;
  resetSeconds: number;
}

export function checkRateLimit(
  key: string,
  limit: number = 3,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now();
  let record = rateLimitStore.get(key);

  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(key, record);
  }

  // Filter timestamps within the current sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    const resetSeconds = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    return {
      allowed: false,
      currentCount: record.timestamps.length,
      limit,
      resetSeconds,
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    currentCount: record.timestamps.length,
    limit,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}
