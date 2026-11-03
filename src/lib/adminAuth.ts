import crypto from 'crypto';

// Default secure admin passcode (Can be overridden via .env ADMIN_PASSWORD)
const ADMIN_SECRET = process.env.ADMIN_PASSWORD || 'BondhuAdmin2026!#';
const SESSION_SECRET = process.env.SESSION_SECRET || 'bt-luxury-admin-session-secret-salt-2026-v1';

export function getAdminPassword(): string {
  return ADMIN_SECRET;
}

export function verifyAdminPassword(inputPassword?: string | null): boolean {
  if (!inputPassword) return false;
  // Timing-safe password comparison
  const a = Buffer.from(inputPassword);
  const b = Buffer.from(ADMIN_SECRET);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function generateAdminToken(): string {
  const timestamp = Date.now();
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(`${ADMIN_SECRET}:${timestamp}`)
    .digest('hex');
  return Buffer.from(`${timestamp}:${signature}`).toString('base64');
}

export function validateAdminToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    // If the token matches the secret directly
    if (token === ADMIN_SECRET) return true;

    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestampStr, signature] = decoded.split(':');
    if (!timestampStr || !signature) return false;

    const timestamp = parseInt(timestampStr, 10);
    // Token validity: 7 days
    if (Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(`${ADMIN_SECRET}:${timestamp}`)
      .digest('hex');

    const sigA = Buffer.from(signature);
    const sigB = Buffer.from(expectedSignature);
    if (sigA.length !== sigB.length) return false;

    return crypto.timingSafeEqual(sigA, sigB);
  } catch {
    return false;
  }
}

export function isRequestAuthorized(request: Request): boolean {
  // 1. Check custom header (x-admin-token or Authorization Bearer)
  const headerToken = request.headers.get('x-admin-token') || 
                      request.headers.get('authorization')?.replace(/bearer\s+/i, '');
  if (headerToken && validateAdminToken(headerToken)) {
    return true;
  }

  // 2. Check Cookie (bt_admin_session)
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/bt_admin_session=([^;]+)/);
  if (match && match[1]) {
    const cookieToken = decodeURIComponent(match[1]);
    if (validateAdminToken(cookieToken)) {
      return true;
    }
  }

  return false;
}
