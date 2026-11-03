import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async () => {
  // Clear the cookie by setting Max-Age=0
  const clearCookieHeader = `bt_admin_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;

  return new Response(JSON.stringify({
    success: true,
    message: 'অ্যাডমিন স্টুডিও থেকে সফলভাবে লগআউট হয়েছেন।'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': clearCookieHeader
    }
  });
};
