# Pemeriksaan keamanan migrasi Astro

Tanggal: 27 Oktober 2026. Target: source Yūgana Bari-kun dan hasil build statis untuk Cloudflare Pages.

## Hasil lokal

- Astro 7.4.2, @astrojs/check 0.9.12, TypeScript 6.0.3. TypeScript 6 dipilih karena pemeriksa Astro saat migrasi belum mendukung TypeScript 7. Versi paket dan dependency transitif dikunci dalam lockfile; tidak ada ketidakcocokan peer dependency.
- `astro check`: 0 error, 0 warning, 0 hint. Build statis berhasil untuk 12 halaman, ditambah sitemap.
- Audit dependency penuh: info 0, low 0, moderate 0, high 0, critical 0 pada saat pemeriksaan. Sharp pada lockfile adalah 0.35.5. Ini adalah hasil database advisori saat audit, bukan jaminan bahwa semua kelemahan yang belum diketahui tidak ada.
- QA browser lokal: 64 kombinasi halaman utama/tiga tur × Inggris/Jepang × light/dark × lebar 320, 390, 768, 1440 px. Tidak ditemukan overflow horizontal, error JavaScript, pelanggaran CSP, atau request eksternal sebelum tindakan pengunjung.
- Tema perangkat, tombol tema, penyimpanan pilihan lintas halaman, perubahan preferensi OS, storage yang diblokir, navigasi keyboard/Escape, halaman privasi dan 404 diperiksa. Konten Jepang dan tema OS tetap bekerja tanpa JavaScript.
- Rute bahasa, link lama `?lang=ja`, canonical, hreflang, sitemap, 404 dan URL file privat diperiksa.
- Payload menyerupai HTML dan JavaScript pada form/query tidak dieksekusi atau menyebabkan redirect ke origin lain. Pesan WhatsApp diuji sebagai teks yang di-encode dengan request payload diintersep. Secara terpisah, redirect resmi diperiksa dengan membuka halaman draf berisi teks uji umum `Test` tanpa data pribadi; tidak ada tombol kirim ditekan dan tidak ada pesan dikirim.
- Hasil build berisi 24 file publik yang dikenal. Tidak ditemukan inline script/style/event handler, referensi sourcemap, tipe file tak terduga, atau pola secret yang dipindai. Tidak ada file source/dependency/config development dalam paket publikasi.
- Rasio kontras teks utama/tombol yang diukur: light 11.11:1 / 12.08:1; dark 14.49:1 / 10.16:1. Ini bukan audit aksesibilitas menyeluruh terhadap semua elemen.

## Pengamanan yang diterapkan

1. Konten dan atribut dirender dengan ekspresi Astro yang di-escape otomatis; tidak menggunakan `set:html`, `innerHTML`, `eval` atau interpretasi teks pengunjung sebagai kode.
2. Konten tur memakai schema tervalidasi dan slug yang dibatasi. Lookup nama tur memakai Map atau pemeriksaan kepemilikan properti agar nilai seperti `__proto__` tidak mengambil properti turunan.
3. Theme preference dibatasi ke `light` dan `dark`, dengan try/catch untuk storage. Query bahasa dibatasi ke `en`/`ja`, tujuan berasal dari rute statis yang telah dibuat, dan origin diperiksa sebelum navigasi.
4. Form memiliki tujuan WhatsApp tetap, batas panjang input dan validasi browser. Form tidak menyimpan data ke localStorage/database dan tidak mengirim request saat diketik. Tidak ada layanan pembayaran atau kredensial yang ditangani situs.
5. Script tema dan interaksi merupakan file eksternal dari origin sendiri; stylesheet selalu eksternal. CSP tetap membatasi script/style ke `self`, memblokir object dan embedding frame, membatasi pengiriman form ke `wa.me` dan redirect resminya `api.whatsapp.com`, dan mengaktifkan upgrade insecure requests. Respons wa.me diperiksa tanpa mengirim pesan: HTTP 302 ke api.whatsapp.com. Izin tujuan redirect ini ditambahkan agar CSP tidak memblokir alur formulir pada browser yang memeriksa tujuan setelah redirect. Header nosniff, frame DENY, referrer policy, permissions policy dan HSTS dipertahankan.
6. Hanya `dist` dipublikasikan. Source, lockfile, audit report, `.env`, direktori Git, cache dan kredensial CLI tidak dipublikasikan.

## Rujukan teknis

- [Astro: ekspresi teks dan set:html](https://docs.astro.build/en/reference/directives-reference/#sethtml).
- [Astro: konfigurasi CSP](https://docs.astro.build/en/reference/configuration-reference/#securitycsp).
- [Advisori View Transitions, diperbaiki pada 7.3.3](https://github.com/withastro/astro/security/advisories/GHSA-mpr7-6m5w-76rw).
- [Advisori JSX/MDX, diperbaiki pada 7.3.2](https://github.com/withastro/astro/security/advisories/GHSA-98hj-9722-w3j8).
- [Advisori optimasi AVIF](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2).
- [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/).

## Batas pemeriksaan

Pemeriksaan ini meninjau source, dependency, hasil build, perilaku browser dan konfigurasi respons situs. Ini tidak mencakup audit akun Cloudflare, 2FA, sistem operasi pengguna, perangkat fisik iPhone/Android/Safari, layanan WhatsApp, atau jaminan bebas seluruh celah di masa depan. Tidak dilakukan pengujian destruktif, brute force, atau pengiriman pesan kepada pihak lain. Keamanan perlu ditinjau kembali setelah menambah backend, login, pembayaran, widget, analytics atau dependency baru.

## Hasil production

Publikasi berhasil pada 27 Oktober 2026: https://bali-nagomi.pages.dev, dengan URL versi https://c76b6245.bali-nagomi.pages.dev.

- 32 kombinasi render (homepage/tiga tur, en/ja, light/dark, mobile390/desktop1440) dan 49 pemeriksaan fungsional berhasil, tanpa error JavaScript atau request eksternal sebelum tindakan pengunjung.
- Theme OS/manual, penyimpanan preference, storage diblokir, navigasi keyboard, perpindahan bahasa, kompatibilitas query lama dan konten tanpa JavaScript lolos.
- Payload form diintersep pada production; tidak ada pesan dikirim. Query menyerupai tujuan URL eksternal tidak memicu navigasi keluar.
- Halaman privasi/404, canonical, hreflang dan sitemap benar; keenam header keamanan berlaku.
- `/.env`, `/.git/config`, `/package.json`, `/astro.config.mjs`, `/src/data/site.ts`, `/node_modules/astro/package.json`, `/_image`, serta rute tidak dikenal memberi HTTP404 dengan noindex, tanpa source/config privat.
- Paket publikasi diperiksa berisi 24 file. Source lokal, public, konfigurasi build, dan dist cocok dengan source yang diuji. Cadangan sebelum migrasi serta ZIP source dan ZIP dist disimpan di folder artifact migrasi.

Laporan mesin dan screenshot lokal/production disimpan sebagai artifact terpisah, tidak disajikan oleh website.
