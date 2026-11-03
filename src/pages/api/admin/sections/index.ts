import type { APIRoute } from 'astro';
import prisma from '../../../../lib/prisma.js';

export const prerender = false;

// GET /api/admin/sections
export const GET: APIRoute = async () => {
  try {
    const settings = await prisma.systemSetting.findMany();
    const sections: Record<string, any> = {};
    for (const s of settings) {
      sections[s.key] = s.value;
    }
    return new Response(JSON.stringify({ success: true, sections }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
  }
};
