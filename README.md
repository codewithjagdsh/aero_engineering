# Aero Engineering Website

Premium marketing website for **Aero Engineering** (`aeroeng.in`) — manufacturers of Goods Lifts, Dumbwaiters, and custom material-handling elevators.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Lucide icons
- next-themes (dark mode)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Configure your company details

Edit **[`src/lib/site-config.ts`](src/lib/site-config.ts)** — phone, email, WhatsApp, address, social links, and map embed.

## Add your assets

Drop files into:

| Path | Purpose |
|------|---------|
| `public/assets/logo/` | Logo SVGs |
| `public/assets/hero/` | Hero / OG image |
| `public/assets/products/` | One image per product slug |
| `public/assets/gallery/` | Gallery images |
| `public/assets/projects/` | Project thumbnails |

Product image paths are defined in [`src/lib/data/products.ts`](src/lib/data/products.ts).

## Pages

- `/` — Home
- `/about` — About Us
- `/products` — Product listing
- `/products/[slug]` — Product detail (6 products)
- `/projects` — Projects (filterable)
- `/industries` — Industries
- `/why-choose-us` — Why Choose Us
- `/gallery` — Gallery with lightbox
- `/contact` — Contact form (UI-only; ready for API wiring)

## Contact form

The form validates client-side and shows a success state. Wire a backend later where marked `TODO` in [`src/components/sections/contact-form.tsx`](src/components/sections/contact-form.tsx).
