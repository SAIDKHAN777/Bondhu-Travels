import type { APIRoute } from 'astro';
import prisma from '../../../lib/prisma.js';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const packageCount = await prisma.tourPackage.count();
    const slidesSetting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
    const slidesCount = slidesSetting && Array.isArray(slidesSetting.value) ? slidesSetting.value.length : 0;

    return new Response(JSON.stringify({
      success: true,
      stats: {
        totalPackages: packageCount,
        activeSlides: slidesCount,
        totalInquiries: 0,
        activeDestinations: 100
      }
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
