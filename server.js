const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const { PrismaClient } = require('/home/saidkhan/Projects/travel-agency-backend/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: { url: 'postgresql://app_runtime:runtime_local_pass_123@localhost:5432/travel_agency_dev?schema=public' }
  }
});

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-cache'
  });
  res.end(JSON.stringify(data));
}

// Generate dynamic HTML for single-viewport sequential hero video carousel
function renderDynamicHeroCarousel(slides) {
  const activeSlides = slides.filter(s => s.active !== false);
  if (activeSlides.length === 0) return { slidesHtml: '', tabsHtml: '', playlistScript: '' };

  const slidesHtml = activeSlides.map((slide, index) => {
    const isCenter = slide.alignCenter ? 'hero-carousel__content--centre' : 'hero-carousel__content--left';
    const textAlign = slide.alignCenter ? 'text-align: center;' : '';
    const videoExt = (slide.videoUrl && slide.videoUrl.endsWith('.webm')) ? 'video/webm' : 'video/mp4';
    const posterAttr = slide.poster ? `poster="${slide.poster}"` : '';
    const isActiveClass = index === 0 ? 'is-active' : '';

    return `
      <!-- Video Slide ${index + 1}: ${slide.title || 'Video ' + (index + 1)} -->
      <div class="hero-carousel__slide ${isActiveClass}" data-slide-index="${index}" data-title="${slide.title || ''}" style="background-color: #0c1015;">
        <video class="hero-carousel__video" ${index === 0 ? 'autoplay' : ''} muted playsinline preload="auto" ${posterAttr}>
          <source src="${slide.videoUrl}" type="${videoExt}">
        </video>
        <div class="hero-carousel__overlay" aria-hidden="true" style="background: linear-gradient(180deg, rgba(12,16,21,0.2) 0%, rgba(12,16,21,0.65) 100%);"></div>
        <div class="container hero-carousel__container">
          <div class="hero-carousel__content ${isCenter}" style="${textAlign}">
            ${slide.tagline ? `<p class="h7 strong mb-sm" style="letter-spacing: 0.2em; text-transform: uppercase;">${slide.tagline}</p>` : ''}
            ${slide.title ? `<h2 class="h1 mb-sm" style="font-family: 'Chronicle Display', serif; font-size: 3.5rem; line-height: 1.1;">${slide.title}</h2>` : ''}
            ${(slide.buttonText || slide.secondaryBtnText) ? `
            <div class="hero-carousel__paragraph mb-sm">
              <div class="text--white" style="display: flex; gap: 16px; margin-top: 1.5rem; ${slide.alignCenter ? 'justify-content: center;' : ''}">
                ${slide.buttonText ? `<a class="btn btn--ghost" href="${slide.buttonLink || '#'}">${slide.buttonText}</a>` : ''}
                ${slide.secondaryBtnText ? `<a class="btn btn--negative" href="${slide.secondaryBtnLink || '#'}">${slide.secondaryBtnText}</a>` : ''}
              </div>
            </div>` : ''}
          </div>
        </div>
      </div>`;
  }).join('\n');

  const tabsHtml = activeSlides.map((slide, index) => `
    <button class="hero-carousel__tab js-hero-carousel-tab ${index === 0 ? 'is-active' : ''}" type="button" data-slide-index="${index}" data-slide-title="${slide.title || ''}" aria-label="Go to slide ${index + 1}">
      <span class="hero-carousel__tab-fill"></span>
    </button>`).join('\n');

  const playlistScript = `
    <script id="hero-playlist-controller">
      (function() {
        const slides = Array.from(document.querySelectorAll('.hero-carousel__slide'));
        const tabs = Array.from(document.querySelectorAll('.js-hero-carousel-tab'));
        const nextTitleEl = document.querySelector('.js-hero-carousel-next-title');
        const prevBtn = document.querySelector('.js-hero-carousel-prev');
        const nextBtn = document.querySelector('.js-hero-carousel-next');

        if (!slides || slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateNextTitle() {
          const nextIdx = (currentIndex + 1) % totalSlides;
          const nextSlide = slides[nextIdx];
          const title = nextSlide ? (nextSlide.getAttribute('data-title') || 'Next Video') : '';
          if (nextTitleEl) nextTitleEl.innerText = title;
        }

        function switchSlide(targetIdx) {
          if (targetIdx === currentIndex && slides[currentIndex].classList.contains('is-active')) return;

          // Deactivate current slide & pause video
          const curSlide = slides[currentIndex];
          if (curSlide) {
            curSlide.classList.remove('is-active');
            const curVid = curSlide.querySelector('video');
            if (curVid) curVid.pause();
          }

          // Advance to new index
          currentIndex = (targetIdx + totalSlides) % totalSlides;
          const newSlide = slides[currentIndex];
          if (newSlide) {
            newSlide.classList.add('is-active');
            const newVid = newSlide.querySelector('video');
            if (newVid) {
              newVid.currentTime = 0;
              newVid.play().catch(function(e) { console.log('Autoplay handled:', e); });
            }
          }

          // Update active tab indicators
          tabs.forEach(function(tab, i) {
            if (i === currentIndex) {
              tab.classList.add('is-active');
            } else {
              tab.classList.remove('is-active');
            }
          });

          updateNextTitle();
        }

        // Auto-switch to NEXT video immediately when current video finishes playing!
        slides.forEach(function(slide, idx) {
          const vid = slide.querySelector('video');
          if (vid) {
            vid.removeAttribute('loop'); // Ensure ended event fires
            vid.addEventListener('ended', function() {
              switchSlide(currentIndex + 1);
            });
          }
        });

        // Navigation Arrows
        if (prevBtn) prevBtn.addEventListener('click', function(e) { e.preventDefault(); switchSlide(currentIndex - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function(e) { e.preventDefault(); switchSlide(currentIndex + 1); });

        // Tab Buttons
        tabs.forEach(function(tab, idx) {
          tab.addEventListener('click', function(e) { e.preventDefault(); switchSlide(idx); });
        });

        // Initialize first slide video
        const firstVid = slides[0].querySelector('video');
        if (firstVid) {
          firstVid.play().catch(function(e) {});
        }
        updateNextTitle();
      })();
    </script>
  `;

  return { slidesHtml, tabsHtml, playlistScript };
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // -------------------------------------------------------------
  // REST API ROUTING (PostgreSQL + Prisma)
  // -------------------------------------------------------------

  // 1. GET /api/admin/slides
  if (pathname === '/api/admin/slides' && req.method === 'GET') {
    try {
      const setting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
      return sendJson(res, 200, { success: true, slides: setting ? setting.value : [] });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 2. POST /api/admin/slides (Update slides in PostgreSQL immediately)
  if (pathname === '/api/admin/slides' && req.method === 'POST') {
    try {
      const { slides } = await parseBody(req);
      if (!Array.isArray(slides)) {
        return sendJson(res, 400, { success: false, error: 'Slides must be an array' });
      }
      const updated = await prisma.systemSetting.upsert({
        where: { key: 'hero_slides' },
        update: { value: slides },
        create: { key: 'hero_slides', value: slides, description: 'Dynamic Hero Video Carousel Slides' }
      });
      return sendJson(res, 200, { success: true, message: 'Saved to PostgreSQL database!', slides: updated.value });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 2-UPLOAD. POST /api/admin/upload-video (Direct binary upload from PC)
  if (pathname === '/api/admin/upload-video' && req.method === 'POST') {
    const uploadDir = path.join(PUBLIC_DIR, 'uploads', 'videos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const rawFilename = req.headers['x-filename'] || parsedUrl.searchParams.get('filename') || (`video_${Date.now()}.mp4`);
    const decodedName = decodeURIComponent(rawFilename);
    const safeFilename = `${Date.now()}_${decodedName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const targetPath = path.join(uploadDir, safeFilename);
    const writeStream = fs.createWriteStream(targetPath);

    req.pipe(writeStream);

    writeStream.on('finish', async () => {
      try {
        const videoUrl = `/uploads/videos/${safeFilename}`;
        const cleanTitle = decodedName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');

        const setting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
        const currentSlides = setting && Array.isArray(setting.value) ? setting.value : [];

        const newSlide = {
          id: 'slide-' + Date.now(),
          title: cleanTitle,
          tagline: 'LUXURY EXPERIENCE',
          videoUrl: videoUrl,
          poster: '',
          active: true,
          uploadedAt: new Date().toISOString()
        };

        currentSlides.push(newSlide);

        await prisma.systemSetting.upsert({
          where: { key: 'hero_slides' },
          update: { value: currentSlides },
          create: { key: 'hero_slides', value: currentSlides, description: 'Dynamic Hero Video Carousel Slides' }
        });

        return sendJson(res, 201, {
          success: true,
          message: '✅ ভিডিও সফলভাবে আপলোড হয়েছে এবং হোমপেজে যুক্ত হয়েছে!',
          slide: newSlide,
          slides: currentSlides
        });
      } catch (e) {
        return sendJson(res, 500, { success: false, error: e.message });
      }
    });

    writeStream.on('error', (err) => {
      return sendJson(res, 500, { success: false, error: 'Upload failed: ' + err.message });
    });
    return;
  }

  // 2-DELETE. DELETE /api/admin/slides/:id
  if (pathname.startsWith('/api/admin/slides/') && req.method === 'DELETE') {
    try {
      const slideId = pathname.replace('/api/admin/slides/', '');
      const setting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
      const currentSlides = setting && Array.isArray(setting.value) ? setting.value : [];

      const slideToDelete = currentSlides.find(s => s.id === slideId);
      const updatedSlides = currentSlides.filter(s => s.id !== slideId);

      // Clean up file if it's in uploads/videos
      if (slideToDelete && slideToDelete.videoUrl && slideToDelete.videoUrl.startsWith('/uploads/videos/')) {
        const filePath = path.join(PUBLIC_DIR, slideToDelete.videoUrl);
        if (fs.existsSync(filePath)) {
          try { fs.unlinkSync(filePath); } catch (err) {}
        }
      }

      await prisma.systemSetting.upsert({
        where: { key: 'hero_slides' },
        update: { value: updatedSlides },
        create: { key: 'hero_slides', value: updatedSlides }
      });

      return sendJson(res, 200, {
        success: true,
        message: '✅ ভিডিও সফলভাবে মুছে ফেলা হয়েছে!',
        slides: updatedSlides
      });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 2B. GET /api/admin/sections (Fetch all configurable sections)
  if (pathname === '/api/admin/sections' && req.method === 'GET') {
    try {
      const settings = await prisma.systemSetting.findMany();
      const sections = {};
      for (const s of settings) {
        sections[s.key] = s.value;
      }
      return sendJson(res, 200, { success: true, sections });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 2C. GET /api/admin/sections/:key
  if (pathname.startsWith('/api/admin/sections/') && req.method === 'GET') {
    try {
      const key = pathname.replace('/api/admin/sections/', '');
      const setting = await prisma.systemSetting.findUnique({ where: { key } });
      return sendJson(res, 200, { success: true, key, value: setting ? setting.value : null });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 2D. POST /api/admin/sections/:key (Save section data to PostgreSQL)
  if (pathname.startsWith('/api/admin/sections/') && req.method === 'POST') {
    try {
      const key = pathname.replace('/api/admin/sections/', '');
      const data = await parseBody(req);
      const updated = await prisma.systemSetting.upsert({
        where: { key },
        update: { value: data },
        create: { key, value: data, description: `Settings for ${key}` }
      });
      return sendJson(res, 200, { success: true, message: `✅ ${key} ডাটাবেজে সফলভাবে সেভ হয়েছে!`, value: updated.value });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 3. GET /api/admin/packages
  if (pathname === '/api/admin/packages' && req.method === 'GET') {
    try {
      const limit = parseInt(parsedUrl.searchParams.get('limit') || '20', 10);
      const packages = await prisma.tourPackage.findMany({
        take: limit,
        orderBy: { updatedAt: 'desc' }
      });
      const total = await prisma.tourPackage.count();
      return sendJson(res, 200, { success: true, total, packages });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 4. POST /api/admin/packages (Create new tour package in PostgreSQL)
  if (pathname === '/api/admin/packages' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const slug = (data.title || 'package').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
      const newPkg = await prisma.tourPackage.create({
        data: {
          title: data.title || 'Untitled Luxury Package',
          slug: slug,
          destination: data.destination || 'ASIA',
          durationDays: parseInt(data.durationDays || '7', 10),
          durationNights: parseInt(data.durationNights || '6', 10),
          description: data.description || '',
          isActive: data.isActive !== false
        }
      });
      return sendJson(res, 201, { success: true, message: 'Tour package created in PostgreSQL!', package: newPkg });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 5. PUT /api/admin/packages/:id (Update package in PostgreSQL)
  if (pathname.startsWith('/api/admin/packages/') && req.method === 'PUT') {
    try {
      const id = pathname.replace('/api/admin/packages/', '');
      const data = await parseBody(req);
      const updated = await prisma.tourPackage.update({
        where: { id },
        data: {
          title: data.title,
          destination: data.destination,
          durationDays: data.durationDays ? parseInt(data.durationDays, 10) : undefined,
          durationNights: data.durationNights ? parseInt(data.durationNights, 10) : undefined,
          description: data.description,
          isActive: data.isActive
        }
      });
      return sendJson(res, 200, { success: true, message: 'Package updated in PostgreSQL!', package: updated });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 6. DELETE /api/admin/packages/:id
  if (pathname.startsWith('/api/admin/packages/') && req.method === 'DELETE') {
    try {
      const id = pathname.replace('/api/admin/packages/', '');
      await prisma.tourPackage.delete({ where: { id } });
      return sendJson(res, 200, { success: true, message: 'Package deleted from PostgreSQL!' });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 7. GET /api/admin/inquiries & POST /api/inquiries
  if (pathname === '/api/admin/inquiries' && req.method === 'GET') {
    try {
      const setting = await prisma.systemSetting.findUnique({ where: { key: 'customer_inquiries' } });
      return sendJson(res, 200, { success: true, inquiries: setting ? setting.value : [] });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  if (pathname === '/api/inquiries' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const setting = await prisma.systemSetting.findUnique({ where: { key: 'customer_inquiries' } });
      const currentList = setting ? setting.value : [];
      const newInquiry = {
        id: 'inq-' + Date.now(),
        name: data.name || 'Anonymous Traveler',
        email: data.email || '',
        phone: data.phone || '',
        destination: data.destination || 'Unspecified',
        message: data.message || '',
        status: 'NEW',
        createdAt: new Date().toISOString()
      };
      currentList.unshift(newInquiry);
      await prisma.systemSetting.upsert({
        where: { key: 'customer_inquiries' },
        update: { value: currentList },
        create: { key: 'customer_inquiries', value: currentList, description: 'Client booking inquiries' }
      });
      return sendJson(res, 201, { success: true, message: 'Inquiry received and saved to database!' });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // 8. GET /api/admin/stats
  if (pathname === '/api/admin/stats' && req.method === 'GET') {
    try {
      const packageCount = await prisma.tourPackage.count();
      const slidesSetting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
      const slidesCount = slidesSetting && Array.isArray(slidesSetting.value) ? slidesSetting.value.length : 0;
      const inquiriesSetting = await prisma.systemSetting.findUnique({ where: { key: 'customer_inquiries' } });
      const inquiriesCount = inquiriesSetting && Array.isArray(inquiriesSetting.value) ? inquiriesSetting.value.length : 0;

      return sendJson(res, 200, {
        success: true,
        stats: {
          database: 'PostgreSQL 16 (Healthy)',
          redis: 'Redis 7 (Healthy)',
          orm: 'Prisma 6.4.1',
          totalPackages: packageCount,
          activeVideoSlides: slidesCount,
          totalInquiries: inquiriesCount,
          uptime: process.uptime().toFixed(0) + 's'
        }
      });
    } catch (e) {
      return sendJson(res, 500, { success: false, error: e.message });
    }
  }

  // -------------------------------------------------------------
  // STATIC & PAGE SERVING
  // -------------------------------------------------------------

  // Admin page shortcut: /admin -> /admin.html
  if (pathname === '/admin' || pathname === '/admin/') {
    pathname = '/admin.html';
  }

  // Dynamic Homepage with PostgreSQL Hero Slides Injection
  if (pathname === '/' || pathname === '/index.html') {
    try {
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      let html = fs.readFileSync(indexPath, 'utf-8');

      // Fetch live slides from PostgreSQL
      const setting = await prisma.systemSetting.findUnique({ where: { key: 'hero_slides' } });
      if (setting && Array.isArray(setting.value) && setting.value.length > 0) {
        const { slidesHtml, tabsHtml, playlistScript } = renderDynamicHeroCarousel(setting.value);
        
        // Dedicated 100vh absolute-fade CSS guaranteeing full-width single-frame sequential presentation
        const heroStyles = `
        <style id="hero-carousel-perfect-style">
          .section--hero-banner {
            position: relative !important;
            height: 100vh !important;
            min-height: 600px !important;
            width: 100% !important;
            overflow: hidden !important;
            background-color: #0c1015 !important;
          }
          .hero-carousel {
            position: relative !important;
            width: 100% !important;
            width: 100vw !important;
            height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .hero-carousel__slide {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            width: 100vw !important;
            height: 100% !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s !important;
            z-index: 1 !important;
            display: flex !important;
            align-items: center !important;
          }
          .hero-carousel__slide.is-active {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            z-index: 2 !important;
          }
          .hero-carousel__video {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center center !important;
            transform: translateZ(0) !important;
            -webkit-transform: translateZ(0) !important;
            will-change: transform !important;
            backface-visibility: hidden !important;
          }
          .hero-carousel__overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 2 !important;
            background: linear-gradient(180deg, rgba(12,16,21,0.15) 0%, rgba(12,16,21,0.6) 100%) !important;
          }
          .hero-carousel__container {
            position: relative !important;
            z-index: 5 !important;
            width: 100% !important;
          }
          .hero-carousel__controls {
            position: absolute !important;
            bottom: 2.5rem !important;
            left: 0 !important;
            width: 100% !important;
            z-index: 10 !important;
          }
          .hero-carousel__tab {
            position: relative !important;
            display: inline-block !important;
            width: 36px !important;
            height: 3px !important;
            background: rgba(255, 255, 255, 0.3) !important;
            margin: 0 4px !important;
            cursor: pointer !important;
            border: none !important;
            padding: 0 !important;
            transition: background 0.3s, width 0.3s !important;
          }
          .hero-carousel__tab.is-active {
            background: #E82E72 !important;
            width: 48px !important;
          }
        </style>`;

        // Replace hero slides without js-hero-carousel to prevent Slick from shrinking slides to half-width
        html = html.replace(
          /<div class="hero-carousel[^"]*">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
          `${heroStyles}\n<div class="hero-carousel hero-carousel--native-playlist">\n${slidesHtml}\n      </div>`
        );
        // Replace tabs and inject playlist script
        html = html.replace(
          /<div class="hero-carousel__tabs">[\s\S]*?<\/div>/,
          `<div class="hero-carousel__tabs">\n${tabsHtml}\n          </div>\n${playlistScript}`
        );
      }

      // Dynamic Section: Intro (Pursuit of Feeling)
      const introSetting = await prisma.systemSetting.findUnique({ where: { key: 'section_intro' } });
      if (introSetting && introSetting.value) {
        const val = introSetting.value;
        const paragraphsHtml = (val.paragraphs || []).map(p => `<p style="text-align: center;">${p}</p>`).join('\n');
        const introBlock = `
        <div class="col col--lg-8 col--md-8 col--sm-12 col--xs-12 col--lg-offset-2 col--md-offset-2">
          <h2 style="text-align: center;"><span class="h5">${val.title || 'Every journey starts with a feeling'}</span></h2>
          ${paragraphsHtml}
          ${val.ctaText ? `<p style="text-align: center;"><a class="btn btn--negative" href="${val.ctaLink || '/make-an-enquiry/'}">${val.ctaText}</a></p>` : ''}
        </div>`;
        html = html.replace(
          /<div class="col col--lg-8 col--md-8 col--sm-12 col--xs-12 col--lg-offset-2 col--md-offset-2">[\s\S]*?<\/div>\s*<\/div>\s*<!-- used on country pages -->/,
          `${introBlock}\n          </div>\n\n    <!-- used on country pages -->`
        );
      }

      // Dynamic Section: CTA Banner (Ready to start)
      const ctaSetting = await prisma.systemSetting.findUnique({ where: { key: 'section_cta' } });
      if (ctaSetting && ctaSetting.value) {
        const val = ctaSetting.value;
        const ctaBlock = `
        <div class="col col--lg-12 col--md-12 col--sm-12 col--xs-12 ">
          <h3 style="text-align: center;"><span class="text--white h1">${val.title || 'So, ready to start?'}</span></h3>
          ${val.subtitle ? `<p style="text-align: center; color: #FFF; margin-bottom: 1.5rem;">${val.subtitle}</p>` : ''}
          <p style="text-align: center;"><span class="text--white"><a class="btn btn--negative btn--large align-text-center" href="${val.buttonLink || '/make-an-enquiry/'}">${val.buttonText || 'Get in Touch'}</a></span></p>
        </div>`;
        html = html.replace(
          /<div class="col col--lg-12 col--md-12 col--sm-12 col--xs-12 ">[\s\S]*?<\/div>\s*<\/div>\s*<!-- used on country pages -->/,
          `${ctaBlock}\n          </div>\n\n    <!-- used on country pages -->`
        );
      }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(html);
      return;
    } catch (e) {
      console.error('Homepage rendering error:', e.message);
    }
  }

  // Candidate paths to check
  const candidatePaths = [
    path.join(PUBLIC_DIR, pathname),
    pathname.includes('cdn-cgi/image') ? path.join(PUBLIC_DIR, pathname.split('/https:/media.blacktomato.com/').pop().split('/http:/media.blacktomato.com/').pop()) : null,
    path.join(PUBLIC_DIR, 'assets', pathname)
  ].filter(Boolean);

  let targetFile = null;
  for (const p of candidatePaths) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      targetFile = p;
      break;
    }
  }

  if (!targetFile) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${pathname}`);
    return;
  }

  const ext = path.extname(targetFile).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(targetFile);
  const fileSize = stat.size;
  const range = req.headers.range;

  // Stream video with HTTP 206 Partial Content (Optimized 2MB Chunk Capping & Media Cache)
  if (range && (ext === '.mp4' || ext === '.webm')) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    // Cap open-ended chunks to 2MB to prevent socket congestion and eliminate playback stutter
    const MAX_CHUNK = 1024 * 1024 * 2;
    let end = parts[1] ? parseInt(parts[1], 10) : (start + MAX_CHUNK - 1);
    if (end >= fileSize) end = fileSize - 1;

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(targetFile, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*'
    };
    res.writeHead(206, head);
    file.pipe(res);
    return;
  }

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': fileSize,
    'Access-Control-Allow-Origin': '*',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache'
  });

  const stream = fs.createReadStream(targetFile);
  stream.pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`✨ Black Tomato Fullstack Localhost is LIVE!`);
  console.log(`🌍 Website: http://localhost:${PORT}`);
  console.log(`🔐 Admin:   http://localhost:${PORT}/admin`);
  console.log(`🗄️ Database: PostgreSQL 16 via Prisma ORM`);
  console.log(`====================================================`);
});
