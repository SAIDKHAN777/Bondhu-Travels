// =====================================================================
// Hybrid Cloud Media Storage Adapter (Supabase Storage Readiness)
// Seamlessly uploads to Supabase Object Storage if configured,
// with resilient fallback to local disk storage for local/VPS dev.
// =====================================================================

import fs from 'fs';
import path from 'path';

export interface UploadResult {
  url: string;
  filename: string;
  isCloud: boolean;
  size: number;
}

export async function saveMediaFile(
  buffer: Buffer,
  originalName: string,
  targetFolder: 'images' | 'videos'
): Promise<UploadResult> {
  const ext = path.extname(originalName).toLowerCase() || (targetFolder === 'videos' ? '.mp4' : '.jpg');
  const cleanBase = path.basename(originalName, ext)
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 50) || (targetFolder === 'videos' ? 'video' : 'image');
  
  const safeFilename = `${cleanBase}-${Date.now().toString(36)}${ext}`;

  // 1. Check if Supabase Cloud Storage is configured in environment
  const supabaseProjectRef = process.env.SUPABASE_PROJECT_REF || 'tzwoufloqfcjtnarbrtl';
  const supabaseStorageKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_STORAGE_KEY;
  const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'travel-media';

  if (supabaseStorageKey && supabaseProjectRef) {
    try {
      const uploadUrl = `https://${supabaseProjectRef}.supabase.co/storage/v1/object/${bucketName}/${targetFolder}/${safeFilename}`;
      const mimeType = targetFolder === 'videos' 
        ? (ext === '.webm' ? 'video/webm' : 'video/mp4') 
        : (ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : ext === '.svg' ? 'image/svg+xml' : 'image/jpeg');

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseStorageKey}`,
          'Content-Type': mimeType,
          'x-upsert': 'true'
        },
        body: buffer
      });

      if (response.ok) {
        const publicCdnUrl = `https://${supabaseProjectRef}.supabase.co/storage/v1/object/public/${bucketName}/${targetFolder}/${safeFilename}`;
        return {
          url: publicCdnUrl,
          filename: safeFilename,
          isCloud: true,
          size: buffer.length
        };
      } else {
        console.warn('[StorageAdapter] Cloud storage returned status', response.status, '- Falling back to local storage.');
      }
    } catch (cloudErr: any) {
      console.warn('[StorageAdapter] Cloud upload attempt failed, using local disk fallback:', cloudErr.message);
    }
  }

  // 2. Resilient Fallback to Local Disk Storage
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', targetFolder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, safeFilename);
  fs.writeFileSync(filePath, buffer);

  const localUrl = `/uploads/${targetFolder}/${safeFilename}`;
  return {
    url: localUrl,
    filename: safeFilename,
    isCloud: false,
    size: buffer.length
  };
}
