import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import { isRequestAuthorized } from '../../../lib/adminAuth.js';
import { saveMediaFile } from '../../../lib/storageAdapter.js';

export const prerender = false;

const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif', '.mp4', '.webm', '.mov', '.ogg'];
const VIDEO_EXTS = ['.mp4', '.webm', '.mov', '.ogg'];
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 Megabytes

export const POST: APIRoute = async ({ request, url }) => {
  // 1. Enforce Admin Authorization
  if (!isRequestAuthorized(request)) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'অননুমোদিত অ্যাক্সেস: মিডিয়া ফাইল আপলোড করতে অ্যাডমিন লগইন প্রয়োজন।' 
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let buffer: Buffer | null = null;
    let originalName = 'uploaded-file.jpg';

    // 2. Handle multipart/form-data
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = (formData.get('file') || formData.get('image') || formData.get('video')) as File | null;

      if (!file || typeof file === 'string') {
        return new Response(JSON.stringify({ success: false, error: 'কোনো ফাইল পাওয়া যায়নি (No file provided)' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      originalName = file.name || 'file.jpg';
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } 
    // 3. Handle direct binary stream (octet-stream or image/* / video/*)
    else {
      const headerFilename = request.headers.get('x-filename');
      const queryFilename = url.searchParams.get('filename');
      originalName = headerFilename ? decodeURIComponent(headerFilename) : (queryFilename ? decodeURIComponent(queryFilename) : 'file.jpg');

      const arrayBuffer = await request.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        return new Response(JSON.stringify({ success: false, error: 'ফাইলটি খালি (Empty file)' }), {
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
        error: `ফাইল সাইজ সীমা ছাড়িয়ে গেছে! সর্বোচ্চ ১৫ মেগাবাইট (15 MB) পর্যন্ত ফাইল আপলোড করতে পারবেন। (আপনার ফাইলের সাইজ: ${currentMb} MB)`
      }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let ext = path.extname(originalName).toLowerCase();
    if (!ALLOWED_EXTS.includes(ext)) {
      ext = '.jpg';
    }

    const isVideo = VIDEO_EXTS.includes(ext);
    const targetFolder = isVideo ? 'videos' : 'images';

    // 5. Save Media using Hybrid Cloud / Local Storage Adapter
    const uploadResult = await saveMediaFile(buffer, originalName, targetFolder);

    return new Response(JSON.stringify({
      success: true,
      message: `${isVideo ? 'ভিডিও' : 'ছবি'} সফলভাবে আপলোড হয়েছে!`,
      url: uploadResult.url,
      fileUrl: uploadResult.url,
      imageUrl: uploadResult.url,
      videoUrl: uploadResult.url,
      filename: uploadResult.filename,
      size: uploadResult.size,
      isCloud: uploadResult.isCloud,
      isVideo
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Image upload error:', err);
    return new Response(JSON.stringify({ success: false, error: 'ছবি আপলোড ব্যর্থ হয়েছে: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
