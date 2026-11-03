import type { APIRoute } from 'astro';
import { verifyAdminPassword, generateAdminToken } from '../../../lib/adminAuth.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const password = body.password || body.passcode;

    if (!password) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'পাসওয়ার্ড প্রদান করা আবশ্যক (Password required)' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!verifyAdminPassword(password)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'ভুল অ্যাডমিন পাসওয়ার্ড! আবার চেষ্টা করুন।' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = generateAdminToken();

    // 7 days cookie expiration
    const maxAge = 7 * 24 * 60 * 60;
    const cookieHeader = `bt_admin_session=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax`;

    return new Response(JSON.stringify({
      success: true,
      message: 'অ্যাডমিন স্টুডিওতে সফলভাবে লগইন হয়েছে!',
      token
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
