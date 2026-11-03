import type { APIRoute } from 'astro';
import prisma from '../../../../lib/prisma.js';
import { isRequestAuthorized } from '../../../../lib/adminAuth.js';

export const prerender = false;

// DELETE /api/admin/slides/:id (Protected)
export const DELETE: APIRoute = async ({ params, request }) => {
  if (!isRequestAuthorized(request)) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'অননুমোদিত অ্যাক্সেস: অ্যাডমিন লগইন প্রয়োজন।' 
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { id } = params;
  try {
    const setting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
    if (!setting || !Array.isArray(setting.value)) {
      return new Response(JSON.stringify({ success: true, slides: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const filtered = (setting.value as any[]).filter((s, idx) => {
      const slideId = s.id || `slide-${idx + 1}`;
      return slideId !== id && s.id !== id && String(idx) !== id && String(idx + 1) !== id && `slide-${idx}` !== id;
    });

    const updated = await prisma.systemSetting.update({
      where: { key: 'hero_slides' },
      data: { value: filtered }
    });

    return new Response(JSON.stringify({ success: true, slides: updated.value }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
