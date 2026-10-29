# Optimasi situs — 29 Oktober 2026

Skills yang dipakai: `design-taste-frontend` dan `playwright-cli`.

## Arah dan batas perubahan

Arah hasil draw: **The page is the object**, seed **641720008**. Penerapan berupa restyle situs yang sudah ada: alur memilih tiga destinasi lalu menyusun pertanyaan perjalanan menjadi prinsip pengelompokan konten. Warna merek, serif/system font, Astro, URL, data tur, mode gelap, serta tujuan WhatsApp/LINE dipertahankan. Tidak ada redraw.

Inventaris yang mendasari keputusan: nama Yūgana Bari-kun, audiens Jepang, konten Inggris/Jepang, Ubud, Uluwatu, Nusa Penida, konsultasi sebelum harga ditentukan, kontak WhatsApp terkonfirmasi, LINE silawati123, dan empat gambar ilustrasi yang telah ada.

Argumen halaman: pilihan rute ditunjukkan melalui foto destinasi; cara menyusun perjalanan diterangkan lewat urutan konsultasi; pendekatan usaha dijelaskan pada About; persiapan perjalanan ditautkan ke sumber resmi; pertanyaan booking dijawab sebelum formulir. Tidak ditambahkan testimoni, harga, durasi, atau klaim layanan yang belum dikonfirmasi.

Idea: Pada situs ini, pilihan Ubud–Uluwatu–Nusa Penida dan konsultasi dwibahasa menjadi lembar rencana perjalanan yang mudah dibaca.

Live thing: pengunjung memilih tur, tanggal, jumlah tamu dan preferensi, kemudian meninjau pesan yang disiapkan untuk WhatsApp. Tidak ada pesan yang dikirim otomatis.

## Perubahan

- Empat foto kini memiliki varian WebP dan `srcset`/`sizes`. JPEG asli dipertahankan untuk URL yang sudah ada dan gambar pratinjau media sosial.
- Dimensi intrinsik setiap foto dipasang sesuai sumber; loading lazy dipertahankan di bawah area utama, sementara foto utama tetap diberi prioritas.
- Teks utama ditingkatkan menjadi 16px dan catatan/label kecil menjadi minimal 14px. Judul dipersingkat agar lebih mudah dipindai pada layar kecil.
- Label dekoratif, nomor indeks, garis pemisah dan variasi italic pada judul disederhanakan. Foto tur disusun bertingkat pada desktop dan kembali satu kolom pada mobile.
- Formulir mobile menggunakan satu kolom dan memiliki hubungan deskripsi aksesibel.
- Animasi masuk bersifat tambahan: konten tetap terlihat tanpa JavaScript dan reduced motion mematikan animasi. Efek hover foto dan tombol dipertahankan.
- Tidak menambah dependency, font eksternal, analytics, widget atau izin CSP.

## Ukuran gambar

Angka berikut membandingkan setiap JPEG dengan varian WebP terbesar, bukan klaim peningkatan waktu loading atau skor Lighthouse.

| Foto | JPEG | WebP |
| --- | ---: | ---: |
| Ubud | 110.844 byte | 77.112 byte |
| Uluwatu | 91.680 byte | 59.624 byte |
| Nusa Penida | 95.641 byte | 64.272 byte |
| About Bali | 953.289 byte | 250.210 byte |
| Total | 1.251.454 byte | 451.218 byte |

Total empat varian terbesar berkurang **63,9%**. Foto About berkurang **73,8%**. Pada layar kecil browser dapat memilih varian yang lebih kecil dari `srcset`.

## Verifikasi

- Astro check: 0 errors, 0 warnings, 0 hints; build statis 12 halaman berhasil.
- Lint skill desain: dari 43 FAIL/11 WARN menjadi 0 FAIL/0 WARN. Pengecualian source dijelaskan di baris terkait: scrim netral di atas foto, bayangan kontrol yang benar-benar mengambang, serta feedback hover/fokus yang sebelumnya diminta pengguna.
- Inspector browser pada homepage Inggris: dari 12 FAIL/5 WARN menjadi **0 FAIL/3 WARN**, pada lebar 1440, 768 dan 390px. Warna terracotta merek dipertahankan melalui allowance eksplisit.
- Ukuran teks utama yang terukur meningkat dari 13px menjadi 16px; judul homepage maksimal dua baris pada tiga ukuran inspector.
- Playwright CLI: 32 kombinasi halaman, lebar 320/390/768/1440px, dan tema terang/gelap lolos pemeriksaan overflow, h1, dimensi gambar, serta ketiadaan script/style inline.
- Menu mobile dan Escape, dark mode, perpindahan bahasa, link detail tur dan navigasi tanpa JavaScript diperiksa.
- Pengiriman formulir dicegat secara lokal. Pilihan Uluwatu dan input menyerupai HTML tetap menjadi teks di pesan yang di-encode; tidak ada pesan dikirim dan tidak ada error JavaScript halaman.
- Metadata SEO: 10 URL sitemap, judul/deskripsi unik, canonical, pasangan hreflang timbal balik, serta WebSite microdata tetap lolos pemeriksaan.
- Semua screenshot final inspector dibuka dan ditinjau. Tema terang pada mobile juga diperiksa terpisah.

Tiga peringatan inspector yang dipertahankan: warna krem adalah warna merek yang sudah digunakan; skala teks mencakup judul destinasi, kontrol dan breakpoint dwibahasa; tidak ada video karena belum ada rekaman asli dan prioritas tugas ini adalah situs statis yang ringan.

## Kritik visual

Penilaian berikut merupakan evaluasi desain sendiri, bukan nilai Lighthouse atau penilaian independen.

ROUND 1 — sebelum
Seen in one second: Situs wisata dengan foto sawah, tetapi teks informasi kecil dan banyak ornamen kecil.
Idea: Tiga rute Bali yang dikonsultasikan sebelum booking.
Live thing: Formulir penyusun pesan WhatsApp.
Layout words by section: hero=split / tours=uniform grid / planning=split list / about=split / preparation=columns / faq=split / contact=form.
Scores: design 6.5 · usability 6.5 · creativity 6 · content 7 → overall 6.0 setelah cap temuan inspector.
Caps applied: FAIL inspector; ornamen dan teks kecil.
Top three problems: teks kecil pada mobile-fold dan mobile-page; judul FAQ terlalu panjang pada tablet; label dan nomor kecil bersaing dengan isi pada desktop-page. Diperbaiki dengan skala teks, judul ringkas dan pengurangan ornamen.

ROUND 2 — final
Seen in one second: Pilih rute Bali lalu mulai merencanakan perjalanan.
Idea: Pilihan tiga destinasi dan formulir konsultasi sebagai lembar rencana perjalanan.
Live thing: Formulir WhatsApp tetap bekerja dan memiliki fallback native.
Layout words by section: hero=split photograph / tours=staggered destinations / planning=itinerary list / about=photograph and letter / preparation=official resources / faq=filled questions / contact=planning sheet.
Scores: design 7.4 · usability 8 · creativity 6.8 · content 7.2 → overall 7.4.
Caps applied: Identitas visual tetap dekat dengan kategori wisata; gambar masih ilustrasi yang telah ada.
Top three remaining limits: belum ada foto tim/kegiatan asli; beberapa foto destinasi hanya sekitar 430px lebar; informasi operasional seperti harga/durasi/pemandu tetap perlu dikonfirmasi pemilik.

## Batas pemeriksaan

Tidak ada aset foto atau video baru yang diambil dari pihak ketiga; seluruh foto berasal dari proyek sebelumnya dan tetap disebut ilustratif di footer. Tidak ada konten contoh berupa harga atau testimoni baru. Google Search Console, Core Web Vitals dari pengguna nyata, Safari/perangkat fisik, serta audit akun hosting belum termasuk pemeriksaan ini. Hal tersebut tidak menghalangi build atau push perubahan yang diminta.
