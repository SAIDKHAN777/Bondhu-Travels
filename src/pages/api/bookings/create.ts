import type { APIRoute } from 'astro';
import prisma from '../../../lib/prisma.js';
import { getClientIp, checkRateLimit } from '../../../lib/rateLimiter.js';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Anti-Spam Rate Limiter (Max 3 booking submissions per 60 seconds per IP)
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`booking:${clientIp}`, 3, 60000);

    if (!rateCheck.allowed) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `আপনি খুব দ্রুত বুকিং রিকোয়েস্ট পাঠাচ্ছেন। স্প্যাম রোধে অনুগ্রহ করে ${rateCheck.resetSeconds} সেকেন্ড পর আবার চেষ্টা করুন।` 
      }), {
        status: 429,
        headers: { 
          'Content-Type': 'application/json',
          'Retry-After': String(rateCheck.resetSeconds)
        }
      });
    }

    const body = await request.json().catch(() => ({}));

    // 2. Invisible Honeypot Bot Trap (Bots automatically fill all input fields)
    if (body._hp_website || body._bot_check || body.fax_only) {
      console.warn(`[Anti-Spam] Honeypot bot caught from IP ${clientIp}. Dropped silently.`);
      return new Response(JSON.stringify({
        success: true,
        message: 'আপনার বুকিং রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const {
      customerName,
      email,
      phone,
      tourTitle,
      country,
      travelDate,
      travelers = 2,
      travelerType = 'কাপল (২ জন)',
      bookingMoneyPaid = 25000,
      totalPrice,
      paymentMethod = 'bKash Instant Gateway',
      transactionId,
      notes = ''
    } = body;

    if (!customerName || !phone) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'নাম এবং ফোন নাম্বার অবশ্যই দিতে হবে।' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch existing booking overview data from PostgreSQL
    const existingSetting = await prisma.systemSetting.findUnique({
      where: { key: 'section_booking_overview' }
    });

    let overviewData: any = existingSetting?.value || {
      summary: {
        totalRevenue: 0,
        totalBookings: 0,
        totalTravelers: 0,
        topTourTitle: tourTitle || 'General Tour',
        currency: '৳'
      },
      tourStats: [],
      bookings: []
    };

    if (!Array.isArray(overviewData.bookings)) {
      overviewData.bookings = [];
    }
    if (!Array.isArray(overviewData.tourStats)) {
      overviewData.tourStats = [];
    }
    if (!overviewData.summary) {
      overviewData.summary = {
        totalRevenue: 0,
        totalBookings: 0,
        totalTravelers: 0,
        topTourTitle: tourTitle || 'General Tour',
        currency: '৳'
      };
    }

    // Generate unique Booking ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBookingId = `BK-${randomCode}`;
    const todayStr = new Date().toISOString().split('T')[0];

    const parsedTravelers = Number(travelers) || 1;
    const parsedBookingMoney = Number(bookingMoneyPaid) || 25000;
    const estimatedTotal = Number(totalPrice) || (parsedTravelers * 95000);
    const resolvedTxnId = transactionId || `TXN${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const newBooking = {
      id: newBookingId,
      customerName: customerName.trim(),
      email: (email || '').trim(),
      phone: phone.trim(),
      tourTitle: tourTitle || 'THE LOST GENERATION',
      country: country || 'FRANCE',
      travelDate: travelDate || '২০২৬-১১-২০',
      travelers: parsedTravelers,
      travelerType: travelerType || 'কাপল (২ জন)',
      bookingMoneyPaid: parsedBookingMoney,
      totalPrice: estimatedTotal,
      status: 'CONFIRMED',
      paymentMethod: paymentMethod || 'bKash Instant Gateway',
      transactionId: resolvedTxnId,
      notes: notes || '',
      createdAt: todayStr
    };

    // Prepend to bookings array
    overviewData.bookings.unshift(newBooking);

    // Recalculate summary metrics
    const totalBookings = overviewData.bookings.length;
    let totalTravelers = 0;
    let totalRevenue = 0;

    overviewData.bookings.forEach((b: any) => {
      totalTravelers += Number(b.travelers) || 0;
      totalRevenue += Number(b.bookingMoneyPaid) || 0;
    });

    // Update tourStats
    const currentTourTitle = (tourTitle || 'THE LOST GENERATION').trim().toUpperCase();
    let tourFound = false;

    overviewData.tourStats.forEach((t: any) => {
      if (t.tourTitle && t.tourTitle.trim().toUpperCase() === currentTourTitle) {
        tourFound = true;
        t.bookingCount = (Number(t.bookingCount) || 0) + 1;
        t.travelersCount = (Number(t.travelersCount) || 0) + parsedTravelers;
        t.bookingMoneyPaid = (Number(t.bookingMoneyPaid) || 0) + parsedBookingMoney;
        t.totalPackageValue = (Number(t.totalPackageValue) || 0) + estimatedTotal;
        t.capacityPercent = Math.min(100, Math.round(((t.travelersCount || 1) / 50) * 100));
      }
    });

    if (!tourFound) {
      overviewData.tourStats.push({
        tourId: currentTourTitle.toLowerCase().replace(/\s+/g, '-'),
        tourTitle: tourTitle || 'THE LOST GENERATION',
        country: country || 'FRANCE',
        bookingCount: 1,
        travelersCount: parsedTravelers,
        bookingMoneyPaid: parsedBookingMoney,
        totalPackageValue: estimatedTotal,
        capacityPercent: Math.min(100, Math.round((parsedTravelers / 50) * 100)),
        img: '/2026/04/Lost-Generation-header-mob.jpg',
        price: 'From £7,500 per person',
        nights: '12 NIGHTS'
      });
    }

    // Determine Top Tour
    let maxBookings = -1;
    let topTitle = tourTitle || 'THE LOST GENERATION';
    overviewData.tourStats.forEach((t: any) => {
      if ((t.bookingCount || 0) > maxBookings) {
        maxBookings = t.bookingCount;
        topTitle = `${t.tourTitle} (${t.country || ''})`;
      }
    });

    overviewData.summary = {
      totalRevenue,
      totalBookings,
      totalTravelers,
      topTourTitle: topTitle,
      currency: '৳'
    };

    // Save to PostgreSQL via Prisma
    await prisma.systemSetting.upsert({
      where: { key: 'section_booking_overview' },
      update: { value: overviewData },
      create: { key: 'section_booking_overview', value: overviewData }
    });

    return new Response(JSON.stringify({
      success: true,
      bookingId: newBookingId,
      booking: newBooking,
      summary: overviewData.summary,
      message: 'আপনার বুকিং রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'বুকিং প্রসেস করতে সমস্যা হয়েছে।'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
