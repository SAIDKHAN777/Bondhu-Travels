import type { APIRoute } from 'astro';
import prisma from '../../../lib/prisma.js';
import { isRequestAuthorized } from '../../../lib/adminAuth.js';

export const prerender = false;

// GET /api/admin/slides
export const GET: APIRoute = async () => {
  try {
    const setting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
    return new Response(JSON.stringify({ 
      success: true, 
      slides: setting && Array.isArray(setting.value) ? setting.value : [] 
    }), {
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

// POST /api/admin/slides (Protected)
export const POST: APIRoute = async ({ request }) => {
  if (!isRequestAuthorized(request)) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'অননুমোদিত অ্যাক্সেস: অ্যাডমিন লগইন প্রয়োজন।' 
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const slides = body.slides;
    if (!Array.isArray(slides)) {
      return new Response(JSON.stringify({ success: false, error: 'Slides must be an array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const updated = await prisma.systemSetting.upsert({
      where: { key: 'hero_slides' },
      update: { value: slides },
      create: {
        key: 'hero_slides',
        value: slides,
        description: 'Hero carousel video slides'
      }
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
