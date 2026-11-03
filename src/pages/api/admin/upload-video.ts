import type { APIRoute } from 'astro';
import path from 'path';
import prisma from '../../../lib/prisma.js';
import { isRequestAuthorized } from '../../../lib/adminAuth.js';
import { saveMediaFile } from '../../../lib/storageAdapter.js';

export const prerender = false;

const VIDEO_EXTS = ['.mp4', '.webm', '.mov', '.ogg', '.mkv'];
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 Megabytes

export const POST: APIRoute = async ({ request, url }) => {
  // 1. Enforce Admin Authorization
  if (!isRequestAuthorized(request)) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'অননুমোদিত অ্যাক্সেস: ভিডিও আপলোড করতে অ্যাডমিন লগইন প্রয়োজন।' 
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let buffer: Buffer | null = null;
    let originalName = 'video.mp4';

    // 2. Handle multipart/form-data
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = (formData.get('video') || formData.get('file')) as File | null;

      if (!file || typeof file === 'string') {
        return new Response(JSON.stringify({ success: false, error: 'কোনো ভিডিও ফাইল পাওয়া যায়নি (No video file provided)' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      originalName = file.name || 'video.mp4';
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } 
    // 3. Handle direct binary stream (octet-stream or video/*)
    else {
      const headerFilename = request.headers.get('x-filename');
      const queryFilename = url.searchParams.get('filename');
      originalName = headerFilename 
        ? decodeURIComponent(headerFilename) 
        : (queryFilename ? decodeURIComponent(queryFilename) : 'video.mp4');

      const arrayBuffer = await request.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        return new Response(JSON.stringify({ success: false, error: 'ভিডিও ফাইলটি খালি (Empty video file)' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      buffer = Buffer.from(arrayBuffer);
    }

    // 4. Enforce 15MB File Size Limit
    if (buffer.length > MAX_FILE_SIZE_BYTES) {
      const currentMb = (buffer.length / (1024 * 1024)).toFixed(2);
      return new Response(JSON.stringify({
        success: false,
        error: `ভিডিও ফাইল সাইজ সীমা ছাড়িয়ে গেছে! সর্বোচ্চ ১৫ মেগাবাইট (15 MB) পর্যন্ত আপলোড করা যাবে। (বর্তমান ফাইলের সাইজ: ${currentMb} MB)`
      }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let ext = path.extname(originalName).toLowerCase();
    if (!VIDEO_EXTS.includes(ext)) {
      ext = '.mp4';
    }

    const cleanBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50) || 'video';

    // 5. Save Video using Hybrid Cloud / Local Storage Adapter
    const uploadResult = await saveMediaFile(buffer, originalName, 'videos');
    const videoUrl = uploadResult.url;

    // Read current hero_slides from PostgreSQL
    const setting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
    const currentSlides = setting && Array.isArray(setting.value) ? (setting.value as any[]) : [];

    const newSlide = {
      id: `slide-${Date.now()}`,
      title: cleanBase.replace(/_/g, ' '),
      tagline: '',
      videoUrl: videoUrl,
      poster: '',
      btnText: '',
      btnLink: '',
      active: true,
      createdAt: new Date().toISOString()
    };

    const shouldSave = url.searchParams.get('save') !== 'false';
    let updatedSlides = currentSlides;

    if (shouldSave) {
      updatedSlides = [...currentSlides, newSlide];
      await prisma.systemSetting.upsert({
        where: { key: 'hero_slides' },
        update: { value: updatedSlides },
        create: {
          key: 'hero_slides',
          value: updatedSlides,
          description: 'Hero carousel video slides'
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: shouldSave 
        ? 'ভিডিও সফলভাবে আপলোড হয়েছে এবং সক্রিয় করা হয়েছে!' 
        : 'ভিডিও সফলভাবে আপলোড হয়েছে, এখন সেভ বাটনে ক্লিক করুন।',
      videoUrl,
      isCloud: uploadResult.isCloud,
      slide: newSlide,
      slides: updatedSlides
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Video upload error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Upload failed: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
