# MokioGeki Portfolio (Wolf Night)
## Menjalankan
`npm run install:all` -> salin `.env.example` ke `server/.env` (isi SMTP) -> `npm run dev`.
Client http://localhost:5173, server http://localhost:4000. Lint: `npm run lint`, format: `npm run format`.
## Deploy
Client: Vercel/Netlify (build `npm --prefix client run build`, output `client/dist`). Server: Render/Railway (start `npm --prefix server start`, isi env dari `.env.example`).
## Aset (client/public/images)
profile.webp (400x400), sertifikat & foto prestasi (WebP, lebar maks 1600px). favicon.svg sudah ada.
## TODO pemilik
Isi: nomor WhatsApp (`profile.js`), `socials.js`, `skills.js` (level), `achievements.js`, `snippet.js`, `fallbackRepos.js`, domain di `robots.txt` & `sitemap.xml`.
## Asumsi
Tailwind dipasang dengan preflight dimatikan (agar CSS lama aman) dan warna mengacu ke CSS variables; sebagian komponen masih memakai CSS biasa. Teks Sambutan selalu Inggris. Tech stack per proyek dibaca dari file mentah repo (tanpa kuota API GitHub).
## Checklist verifikasi
- [x] Section: Hero, Tentang, Pendidikan, Skill, Proyek, Tech Stack (+kode), Prestasi (2 mode), Sosial, Sambutan, FAQ, Kontak, Footer
- [x] Endpoint: /api/health, /api/contact, /api/github/profile|repos|languages (cache + fallback)
- [x] Animasi: loader, ketik, bintang, kabut, mata serigala, kunang-kunang, cursor, tilt, magnetik, transisi halaman, Lenis, progress scroll, GSAP (glow bulan + parallax kursor + counter), reduced-motion
- [x] i18n ID/EN (navbar, CTA, judul, tentang, pendidikan, FAQ, proyek, form); SEO; ESLint + Prettier; server terpisah
- [ ] Menunggu aset/data pemilik: foto, sertifikat, WhatsApp, sosial, level skill, snippet, domain sitemap
## Catatan tambahan
- "View Website" muncul otomatis untuk repo yang kolom Website (About di GitHub) atau GitHub Pages-nya bisa diakses. Isi kolom Website repo dengan URL Vercel; bisa juga lewat `projectsOverride.js`.
- Cuplikan kode di Tech Stack tersembunyi sampai `src/data/snippet.js` diisi (repo + path file).
- Atur level di animasi serigala berlari lewat `src/data/journey.js` (progress 0-100).
