# SEO Yūgana Bari-kun

Diperiksa 27 Oktober 2026. Alamat utama: https://yugana-bari-kun.pages.dev/

Tujuan awal adalah membantu Google menemukan halaman, memahami layanan, dan menampilkan halaman yang sesuai untuk calon tamu Jepang. Tidak ada perubahan kode yang menjamin peringkat pertama.

## Hasil pemeriksaan dan perubahan

- Homepage Inggris, Jepang, dan contoh halaman Ubud merespons HTTP 200 saat diperiksa online.
- `robots.txt` mengizinkan crawling dan menunjuk ke sitemap di domain utama.
- `sitemap.xml` memuat 10 URL Inggris/Jepang dengan pasangan `hreflang`.
- Canonical dan pasangan bahasa pada halaman yang diperiksa mengarah ke domain baru yang benar.
- URL yang tidak ada memberi HTTP 404 dan `noindex`, bukan homepage berstatus 200.
- Judul dan deskripsi homepage serta tur diperjelas sesuai isi dan bahasa halaman.
- Homepage diberi structured data `WebSite` melalui microdata untuk nama situs, tanpa menambah script atau melonggarkan CSP.
- Gambar Open Graph halaman tur memakai foto destinasi masing-masing. Ini terutama memperbaiki pratinjau saat tautan dibagikan.
- Alt foto homepage mengikuti bahasa halaman.

Ini bukan konfirmasi bahwa Google telah mengindeks semua halaman. Status indeks dan performa pencarian harus diperiksa di Search Console. Pengukuran Core Web Vitals dan audit PageSpeed belum dilakukan dalam pemeriksaan ini.

## 1. Daftarkan Google Search Console

1. Buka [Google Search Console](https://search.google.com/search-console/welcome) dengan akun Google pemilik bisnis.
2. Pilih **URL prefix**, lalu masukkan `https://yugana-bari-kun.pages.dev/` termasuk HTTPS dan garis miring terakhir.
3. Pilih metode **HTML tag**, lalu salin meta tag yang diberikan Google. Tag ini dapat dipasang di `src/layouts/BaseLayout.astro`. Jangan menebak token verifikasi atau menghapus tag setelah verifikasi berhasil.
4. Setelah perubahan terdeploy, kembali ke Search Console dan pilih **Verify**.
5. Di bagian **Sitemaps**, kirim `sitemap.xml`.
6. Gunakan **URL Inspection** untuk homepage `/`, homepage `/ja`, dan tiga halaman tur Jepang. Jalankan pemeriksaan URL aktif lalu minta pengindeksan jika tersedia.
7. Pantau laporan **Page indexing** untuk masalah pengindeksan. Jangan menganggap hasil pencarian `site:` sebagai laporan indeks yang lengkap.

Tidak perlu memasang Google Analytics atau script pihak ketiga untuk verifikasi HTML tag. Jangan mengirim password, kode OTP, atau token akses akun kepada pengembang; yang diperlukan hanya meta tag verifikasi situs.

## 2. Lengkapi informasi layanan yang nyata

Prioritas konten berikutnya:

- Profil pengelola, nama usaha, cara menghubungi, dan area layanan yang benar.
- Foto kegiatan, kendaraan, destinasi, serta tim yang dimiliki atau diizinkan pemakaiannya; beri keterangan yang jujur pada gambar ilustrasi.
- Untuk setiap tur: durasi, lokasi penjemputan, bahasa pemandu, hal yang termasuk/tidak termasuk, dan ketentuan pembatalan yang sudah dikonfirmasi.
- Harga aktual beserta satuannya jika sudah pasti. Sampai saat itu tetap gunakan permintaan penawaran.
- Ulasan dari tamu nyata dengan izin. Jangan menambahkan rating, jumlah tamu, sertifikasi, atau harga yang belum terbukti, termasuk di structured data.

## 3. Konten untuk calon tamu Jepang

Berikut hipotesis topik/kata pencarian berdasarkan layanan yang ditawarkan, bukan hasil pengukuran volume atau tingkat persaingan:

| Halaman | Topik pencarian |
| --- | --- |
| `/ja` | バリ島 観光ツアー — tur wisata Bali |
| `/ja/pages/ubud` | ウブド 観光 — wisata Ubud |
| `/ja/pages/uluwatu` | ウルワツ寺院 ツアー — tur Pura Uluwatu |
| `/ja/pages/nusa-penida` | ヌサペニダ ツアー — tur Nusa Penida |

Topik panduan yang bisa dikembangkan setelah informasi operasional tersedia: contoh perjalanan Ubud, persiapan kunjungan Uluwatu, persiapan perjalanan Nusa Penida, dan cara meminta penawaran melalui LINE. Tulis jawaban yang berguna dan spesifik; jangan membuat banyak halaman yang hanya mengganti nama destinasi. Hindari klaim “日本語ガイド付き” sampai layanan pemandu berbahasa Jepang benar-benar dikonfirmasi.

## 4. Reputasi dan Google Maps

Jika usaha benar-benar melayani tamu secara langsung, periksa kelayakan [Google Business Profile](https://support.google.com/business/answer/3038177). Gunakan nama, kontak, dan area layanan yang konsisten. Bisnis online saja atau layanan pengumpul prospek tidak otomatis memenuhi syarat. Jangan membuat alamat kantor fiktif.

Cantumkan alamat situs utama di akun bisnis dan profil sosial yang sah. Bangun rujukan dari mitra yang relevan melalui kerja sama nyata; hindari membeli tautan spam atau ulasan palsu.

Jika alamat lama kembali/masih aktif, alihkan permanen URL lama ke halaman yang sesuai pada alamat utama. Jangan membuat redirect di situs baru yang mengarahkan kembali ke alamat lama. Alamat lama tidak dapat di-resolve dari lingkungan pemeriksaan pada 27 Oktober 2026; pengaturannya belum diubah dalam tugas ini.

## 5. Ukur hasil, lalu perbaiki

Setelah Search Console mengumpulkan data, periksa laporan **Performance**: kata pencarian, halaman tujuan, impressions, clicks, CTR, dan posisi rata-rata. Filter negara Jepang untuk melihat audiens yang dituju. Bandingkan periode yang cukup panjang; perubahan dapat membutuhkan beberapa minggu atau lebih dan hasil tidak dijamin.

Periksa [PageSpeed Insights](https://pagespeed.web.dev/) untuk homepage dan halaman tur. Gunakan laporan mobile untuk menemukan masalah nyata pada kecepatan dan pengalaman pengguna, lalu perbaiki berdasarkan hasil pengukuran. Jangan menyebut skor performa sebelum pengukuran dilakukan.

## Sumber resmi

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Judul hasil pencarian](https://developers.google.com/search/docs/appearance/title-link)
- [Nama situs dan structured data WebSite](https://developers.google.com/search/docs/appearance/site-names)
- [Memverifikasi kepemilikan situs](https://support.google.com/webmasters/answer/9008080)
- [Membuat dan mengirim sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Kelayakan dan representasi Google Business Profile](https://support.google.com/business/answer/3038177)
