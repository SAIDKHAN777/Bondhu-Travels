import type { APIRoute } from 'astro';
import prisma from '../../../../lib/prisma.js';
import { isRequestAuthorized } from '../../../../lib/adminAuth.js';

export const prerender = false;

// GET /api/admin/sections/:key
export const GET: APIRoute = async ({ params }) => {
  const { key } = params;
  if (!key) {
    return new Response(JSON.stringify({ success: false, error: 'Key required' }), { status: 400 });
  }

  try {
    const setting = await prisma.systemSetting.findUnique({ where: { key } });
    return new Response(JSON.stringify({ 
      success: true, 
      key, 
      value: setting ? setting.value : null 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
  }
};

// POST /api/admin/sections/:key (Protected with Admin Authorization)
export const POST: APIRoute = async ({ params, request }) => {
  if (!isRequestAuthorized(request)) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'অননুমোদিত অ্যাক্সেস: অ্যাডমিন লগইন প্রয়োজন (Unauthorized: Admin login required)' 
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { key } = params;
  if (!key) {
    return new Response(JSON.stringify({ success: false, error: 'Key required' }), { status: 400 });
  }

  try {
    const data = await request.json();
    const updated = await prisma.systemSetting.upsert({
      where: { key },
      update: { value: data },
      create: { 
        key, 
        value: data, 
        description: `Settings for ${key}` 
      }
    });

    // Auto-sync: If Explore Our Trips was updated, automatically synchronize Most Popular in Tour Sessions
    if (key === 'section_explore_trips' && data && Array.isArray(data.trips)) {
      try {
        const tourSetting = await prisma.systemSetting.findUnique({ where: { key: 'section_tour_sessions' } });
        if (tourSetting && tourSetting.value && Array.isArray(tourSetting.value.popularCards)) {
          const exploreTrips = data.trips;
          const updatedPopular = tourSetting.value.popularCards.map((popCard: any) => {
            const popTitle = (popCard.title || '').toLowerCase().trim();
            const cleanKeyword = popTitle.split(' ')[0];
            const match = exploreTrips.find((t: any) => {
              const tTitle = (t.title || '').toLowerCase().trim();
              const tLink = (t.link || '').toLowerCase().trim();
              return tTitle.includes(cleanKeyword) || (tLink && tLink.includes(cleanKeyword));
            });
            if (match) {
              return {
                ...popCard,
                img: match.img || match.heroImage || match.image || popCard.img,
                link: match.link || popCard.link
              };
            }
            return popCard;
          });

          tourSetting.value.popularCards = updatedPopular;
          await prisma.systemSetting.update({
            where: { key: 'section_tour_sessions' },
            data: { value: tourSetting.value }
          });
        }
      } catch (syncErr: any) {
        console.warn('[Auto-Sync] Tour sessions sync warning:', syncErr.message);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `${key} updated successfully in PostgreSQL!`,
      data: updated.value 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
  }
};
