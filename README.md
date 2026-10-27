# Yūgana Bari-kun

Website tur Bali untuk wisatawan Jepang, dibangun dengan **Astro**, **TypeScript**, dan **CSS**. Tersedia dalam bahasa Inggris dan Jepang, dengan tampilan responsif, dark mode, serta konsultasi perjalanan melalui WhatsApp.

[Lihat website](https://yugana-bari-kun.pages.dev) · [Versi Jepang](https://yugana-bari-kun.pages.dev/ja) · [Laporan keamanan](SECURITY-REVIEW.md)

## Fitur

- Halaman utama serta informasi tur Ubud, Uluwatu, dan Nusa Penida.
- Halaman Inggris dan Jepang dengan URL tersendiri.
- Mode terang/gelap yang mengikuti perangkat dan mengingat pilihan pengguna.
- Menu dan tata letak responsif untuk mobile serta desktop.
- Formulir yang menyiapkan pesan konsultasi WhatsApp.
- Metadata SEO, canonical, hreflang, sitemap, dan halaman 404.
- CSP dan header keamanan untuk Cloudflare Pages.

Situs menghasilkan file statis saat build. Tidak ada database booking, login pengunjung, atau pemrosesan pembayaran. Harga dan rincian layanan dikonfirmasi melalui permintaan penawaran.

## Menjalankan secara lokal

Siapkan **Node.js ≥ 22.23.4** dan **pnpm**, lalu jalankan dari folder proyek:

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Buka alamat lokal yang ditampilkan terminal.

## Perintah proyek

| Perintah | Kegunaan |
| --- | --- |
| `pnpm run dev` | Menjalankan server pengembangan lokal. |
| `pnpm run check` | Memeriksa tipe dan komponen Astro. |
| `pnpm run build` | Membuat situs statis dalam folder `dist/`. |
| `pnpm run preview` | Melihat hasil build secara lokal. |
| `pnpm audit` | Memeriksa advisori keamanan dependency. |

Versi dependency dikunci dalam `pnpm-lock.yaml`. Proyek memakai pnpm 11.25.0 dan file `.node-version` memilih Node.js 24.22.1 yang dipakai saat pemeriksaan lokal.

## Struktur proyek

```text
public/
├── images/                # Foto dan ilustrasi
├── _headers               # Header keamanan Cloudflare
├── main.js                # Menu, tema, dan formulir
└── theme-init.js          # Tema awal sebelum halaman tampil

src/
├── components/            # Komponen antarmuka bersama
├── content/tours/         # Data tur Inggris dan Jepang
├── data/site.ts           # Brand, kontak, dan alamat situs
├── i18n/                  # Teks antarmuka kedua bahasa
├── layouts/               # Struktur halaman dan metadata
├── pages/                 # Rute halaman Inggris dan Jepang
└── styles/global.css      # Desain, responsive layout, dan tema

astro.config.mjs           # Konfigurasi Astro
package.json               # Dependency dan perintah proyek
pnpm-lock.yaml             # Versi dependency terkunci
```

## Mengubah konten

| Bagian | Lokasi |
| --- | --- |
| Informasi dan itinerary tur | `src/content/tours/*.json` |
| Teks halaman utama | `src/i18n/home.ts` |
| Teks privasi dan halaman 404 | `src/i18n/privacy.ts`, `src/i18n/error.ts` |
| Header, footer, kartu tur, dan formulir | `src/components/` |
| Warna, dark mode, dan tata letak | `src/styles/global.css` |
| Foto dan ilustrasi | `public/images/` |
| Nama brand, WhatsApp, dan URL situs | `src/data/site.ts` |

Pada data tur, field tanpa akhiran `_ja` menggunakan bahasa Inggris, sedangkan field dengan `_ja` menggunakan bahasa Jepang. Setiap item `steps` berisi pasangan teks Inggris dan Jepang. Data divalidasi melalui `src/content.config.ts` saat build.

## Bahasa dan tema

| Bahasa | Halaman utama | Contoh halaman tur |
| --- | --- | --- |
| Inggris — default | `/` | `/pages/ubud` |
| Jepang | `/ja` | `/ja/pages/ubud` |

Navigasi bahasa dan konten tetap berfungsi tanpa JavaScript. Link lama dengan `?lang=ja` atau `?lang=en` diarahkan ke halaman bahasa yang sesuai melalui script kompatibilitas.

Tema awal mengikuti pengaturan perangkat. Tombol matahari/bulan mengganti light/dark mode dan menyimpan pilihan dengan key `yuganaTheme` jika localStorage tersedia. Saat penyimpanan diblokir, tombol tetap bekerja pada halaman aktif. Hapus data browser situs untuk kembali mengikuti tema perangkat setelah pernah memilih secara manual.

## Publikasi ke Cloudflare Pages

Proyek menggunakan nama **`yugana-bari-kun`** dengan branch production **`main`**.

Periksa dan build proyek terlebih dahulu:

```sh
pnpm run check
pnpm run build
```

Setelah login ke akun Cloudflare melalui Wrangler, publikasikan hasil build:

```sh
pnpm dlx wrangler@4.153.0 pages deploy dist --project-name yugana-bari-kun --branch main
```

Untuk upload melalui dashboard, unggah **isi folder `dist/`** dengan `index.html` berada di akar paket. Folder source, `node_modules/`, cache, dan konfigurasi pengembangan tidak perlu diunggah.

Untuk proyek Pages yang sudah terhubung ke GitHub, push ke branch `main` memicu build dan deployment otomatis. Saat membuat proyek, gunakan preset **Astro**, build command **`pnpm run build`**, dan output directory **`dist`**. Atur environment variable **`PNPM_VERSION=11.25.0`** agar Cloudflare memakai versi pnpm yang sama. Versi Node.js diambil dari file `.node-version` pada repository.

## Menggunakan domain sendiri

Setelah custom domain aktif di Cloudflare, perbarui:

1. Nilai `site` di `astro.config.mjs`.
2. Nilai `SITE_URL` di `src/data/site.ts`.
3. URL sitemap di `public/robots.txt`.

Canonical, hreflang, Open Graph, dan sitemap akan mengikuti konfigurasi tersebut pada build berikutnya.

## Keamanan dan privasi

- Kredensial, API token, dan password tidak disimpan dalam source atau aset publik.
- `.gitignore` mengecualikan `.env`, cache, `node_modules/`, dan hasil build.
- Formulir menyiapkan pesan WhatsApp; pengunjung meninjau dan mengirimkannya sendiri.
- Data formulir tidak disimpan dalam localStorage atau database situs.
- Publikasi hanya memakai hasil build statis dalam `dist/`.

Lihat [laporan pemeriksaan keamanan](SECURITY-REVIEW.md) untuk hasil, cakupan, dan batas pemeriksaan. Jalankan kembali pemeriksaan kode, build, serta audit setelah memperbarui dependency.

## Dokumentasi tambahan

- [Pemeriksaan keamanan migrasi Astro](SECURITY-REVIEW.md).
- [Riset dan catatan versi sebelumnya](RISET-DAN-PANDUAN.md).

Source sebelum migrasi disimpan dalam cadangan terpisah. File aktif sekarang berada di `src/` dan `public/`.
