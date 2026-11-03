# 🌍 Bondhu Travels (বন্ধু ট্রাভেলস)
### Luxury Bespoke Travel Platform & Studio

An ultra-luxury, high-performance travel and exploration web platform inspired by Black Tomato. Built with **Astro SSR**, **TypeScript**, **PostgreSQL (Supabase)**, and modern **Glassmorphism UI**.

---

## ✨ Features

- 💎 **Luxury Interactive Frontend**:
  - Full-screen 60fps cinematic video carousel
  - Interactive destination showcases & bespoke itineraries (Cox's Bazar, Bandarban, Sajek, Sunamganj, France, Iceland, Morocco, etc.)
  - Real-time instant booking form with payment options
  - 100% responsive across mobile, tablet, and ultra-wide screens

- 🔒 **Enterprise-Grade Security Shield**:
  - **Admin Studio Gate**: Timing-safe HMAC SHA-256 session token gate (`/admin`)
  - **API Authorization**: All admin endpoints enforce authenticated Bearer tokens and HTTP cookies
  - **Anti-Spam Rate Limiting**: Max 3 bookings per 60s per client IP (HTTP 429 Too Many Requests)
  - **Invisible Honeypot Bot Trap**: Crawlers filling decoy inputs are silently neutralized
  - **Media Size Limit**: Strict 15MB file upload limit (HTTP 413)

- ⚡ **Full-Stack Architecture**:
  - **Astro SSR** with `@astrojs/node` adapter
  - **Supabase Cloud PostgreSQL** with Prisma ORM
  - **Hybrid Storage Adapter**: Automatically switches between Supabase Object Storage and local disk fallback

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/SAIDKHAN777/Bondhu-Travels.git
cd Bondhu-Travels
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env` and fill in your database credentials:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build for Production

```bash
npm run build
npm start
```

---

## 👨‍💻 Author
- **Said Khan (সাইদ খান)** — Lead Architect & Developer
- GitHub: [@SAIDKHAN777](https://github.com/SAIDKHAN777)
