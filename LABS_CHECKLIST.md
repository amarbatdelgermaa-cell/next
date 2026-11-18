# Лаборатори №1–13: кодын зураглал

- 1: `app`, `app/lib`, `app/ui`, `public`, README.
- 2: `app/ui/global.css`, `home.module.css`, `invoices/status.tsx`, `clsx`.
- 3: `app/ui/fonts.ts`, `app/layout.tsx`, `next/image`, хоёр hero зураг.
- 4: `app/dashboard/layout.tsx`, dashboard/customers/invoices routes.
- 5: `app/ui/dashboard/nav-links.tsx` (Link/usePathname/clsx).
- 6: `scripts/seed.mjs`, `.env.example`, PostgreSQL. **Өөрийн database, GitHub, Vercel тохируулах шаардлагатай**.
- 7: `app/lib/data.ts` (fetchRevenue, fetchLatestInvoices, fetchCardData), dashboard components.
- 8: `fetchRevenue()` дотор 3 секундийн саатал түр турших; production кодод оруулаагүй.
- 9: `app/dashboard/(overview)/loading.tsx`, `app/ui/skeletons.tsx`, Suspense.
- 10: `app/dashboard/invoices/page.tsx` query/page URL-тай. **Хайлтын submit ашигласан; debounce UI хараахан нэмээгүй**.
- 11: `app/lib/actions.ts`, create/edit/delete invoices.
- 12: `app/dashboard/invoices/error.tsx`, `not-found.tsx`, `notFound()`.
- 13: `app/ui/invoices/invoice-form.tsx` useActionState, safeParse, aria-live.
- Нэмэлт: `auth.ts`, `auth.config.ts`, `proxy.ts` — нэвтрэлт.

Энэ бол лабораторийн ажиллагааг нэгтгэсэн сургалтын хувилбар. Багшид үзүүлэх screenshots, туршилт, асуултын хариулт болон cloud тохиргоог тусад нь хийх ёстой. Бүх шалгуурыг 100% биелүүлсэн гэсэн баталгаа биш.
