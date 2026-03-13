# BirClick — Landing Page

A modern waitlist landing page for **BirClick**, a service marketplace for Azerbaijan.

Built with **Next.js 14**, **TypeScript**, **TailwindCSS**, and **Supabase**.

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the **SQL Editor**, run the contents of `supabase/schema.sql`
3. Copy your credentials from **Project Settings → API**

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> ⚠️ Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` to the client.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add the three environment variables in Vercel project settings
4. Deploy

---

## Project Structure

```
webbirclick/
├── app/
│   ├── layout.tsx           # Root layout + metadata
│   ├── page.tsx             # Home page (composes all sections)
│   ├── globals.css          # Tailwind base styles
│   └── api/
│       └── waitlist/
│           └── route.ts     # POST /api/waitlist — saves email to Supabase
├── components/
│   ├── Navbar.tsx           # Sticky navbar with scroll effect
│   ├── Footer.tsx           # Minimal dark footer
│   └── sections/
│       ├── HeroSection.tsx       # Hero + email form
│       ├── HowItWorksSection.tsx # 3-step cards
│       ├── ServicesSection.tsx   # Service category grid
│       └── WaitlistSection.tsx   # CTA section (dark)
├── lib/
│   └── supabase.ts          # Supabase client (browser)
├── supabase/
│   └── schema.sql           # Table creation SQL
├── .env.local.example
├── tailwind.config.ts
└── tsconfig.json
```

---

## Waitlist API

**POST** `/api/waitlist`

Request body:
```json
{ "email": "user@example.com" }
```

Responses:
| Status | Meaning |
|--------|---------|
| 200 | Successfully joined |
| 400 | Invalid email |
| 409 | Email already registered |
| 500 | Server error |
