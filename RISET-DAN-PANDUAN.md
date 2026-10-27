# Yūgana Bari-kun — pembaruan situs

27 Oktober 2026. Target publikasi: https://bali-nagomi.pages.dev.

## Hasil riset yang diterapkan

Enam situs operator yang melayani pasar Jepang ditinjau. Temuan berikut merupakan observasi terhadap cara mereka menyajikan layanan dan inferensi untuk perbaikan situs ini; bukan survei preferensi seluruh wisatawan Jepang.

| Sumber | Pola informasi yang terlihat | Penerapan pada situs ini |
| --- | --- | --- |
| [Bali Club](https://oji-baliclub.com/car-charter/) | Perbedaan driver dan pemandu, bahasa, durasi, kapasitas, inklusi dan biaya tambahan dijelaskan. | Bahasa situs dipisahkan dari bahasa pemandu. Bahasa dan pendampingan harus dikonfirmasi dalam penawaran. |
| [Dewata](https://dewatacarcharter.com/) | Unit harga per mobil, durasi, cakupan area, pembayaran dan pembatalan mudah ditemukan. | Ringkasan rincian yang perlu dikonfirmasi ditempatkan dekat tombol quote. |
| [Yasui Tour](https://www.yasuitour.com/) | Unit harga dan contoh penghitungan berdasarkan wilayah penjemputan tersedia. | Form inquiry meminta hotel atau area penjemputan. |
| [Ebipibali](https://ebipibali.com/faq) | FAQ mencakup pembayaran, penjemputan, inklusi, pembatalan, anak dan kondisi lalu lintas. | FAQ praktis menjelaskan informasi yang perlu disepakati sebelum booking. |
| [Bali Tabiyo](https://balitabiyotour.com/car-charter/) | Form meminta tanggal, jumlah dewasa/anak, hotel dan tujuan. | Form menyiapkan pesan WhatsApp dengan informasi tersebut. |
| [NAO Bali](https://naobali.com/) | Profil layanan dan langkah reservasi mudah ditemukan. | Brand dan kontak konsisten; alur dari inquiry ke konfirmasi ditampilkan dalam tiga langkah. |

Nomor WhatsApp +62 813 3857 5123 dikonfirmasi oleh pemilik. Tidak ada LINE resmi. Harga, durasi, bahasa pemandu dan inklusi belum dikonfirmasi, sehingga situs menggunakan “Price on request / お見積もり” dan tidak menampilkan nominal atau janji layanan yang belum pasti. Semua itinerary diberi label model course. Rute Nusa Penida diperbaiki agar tidak lagi menampilkan Tegallalang/Ubud.

Tautan persiapan perjalanan mengarah ke [eVisa resmi Indonesia](https://evisa.imigrasi.go.id/), [Love Bali](https://lovebali.baliprov.go.id/), dan [Konsulat Jepang di Denpasar](https://www.denpasar.id.emb-japan.go.jp/). [Informasi levy dari Konsulat Jepang](https://www.denpasar.id.emb-japan.go.jp/itpr_ja/11_000001_00869.html) memperingatkan tentang situs palsu dan perubahan aturan. Situs ini menautkan kanal resmi tanpa mengunci nominal atau persyaratan masuk yang dapat berubah.

Survei JNTO tentang responden dari Asia Tenggara tidak digunakan untuk mengklaim preferensi wisatawan Jepang, karena populasi respondennya berbeda.

## Desain dan perilaku

- Tata letak memakai warna hijau/krem, judul serif, serta foto destinasi yang sudah ada di proyek. Logo besar yang sebelumnya menjadi latar hero diganti dengan wordmark teks dan foto destinasi.
- Header dan menu mobile ringkas, tombol bahasa konsisten di semua halaman, dan kartu quote berpindah ke atas informasi tur pada layar kecil.
- Bahasa awal Inggris. Pilihan Jepang/Inggris diingat bila browser mengizinkan penyimpanan; tautan antarhalaman membawa pilihan bahasa bila storage tidak tersedia.
- Form mempersiapkan pesan WhatsApp. Pengunjung memeriksa dan mengirim pesan sendiri di WhatsApp. Tidak ada penyimpanan form atau database booking dalam situs.
- Harga yang belum pasti diganti quote; inquiry tidak dianggap booking terkonfirmasi. Ketentuan pembayaran, pembatalan dan inklusi harus disepakati sebelum booking.
- Foto lama dipertahankan. Karena sumber/keasliannya belum dikonfirmasi, gambar diberi keterangan sebagai ilustrasi. Ganti dengan dokumentasi milik usaha bila tersedia dan berizin.

## Keamanan dan privasi

Situs ini berupa HTML/CSS/JavaScript statis, tanpa dependency JavaScript dari CDN, widget pembayaran, form backend atau API key. Pergantian bahasa memakai `textContent`, sehingga tidak menafsirkan teks sebagai HTML. Pesan WhatsApp dibentuk dengan encoding URL/form bawaan browser. Input form tidak dimasukkan ke HTML dan tidak disimpan di localStorage.

File `_headers` menambahkan CSP yang membatasi resource ke origin sendiri, memblokir iframe dan objek, membatasi form ke origin sendiri/WhatsApp, serta menambahkan nosniff, referrer policy, permissions policy dan HSTS. Dukungan aturan ini terdokumentasi pada [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/). Header berlaku untuk respons aset statis; jika nanti memakai Functions/Worker yang menghasilkan respons sendiri, header harus diterapkan juga pada kode responsnya.

Halaman privasi menjelaskan preferensi bahasa, pengiriman informasi ke WhatsApp, dan layanan hosting. Kode proyek tidak memasang analytics atau iklan. Bila setting Cloudflare mengaktifkan Web Analytics, Zaraz, Rocket Loader, atau script lain, sesuaikan kebijakan privasi dan CSP setelah meninjau kebutuhan tersebut.

Pengamanan akun Cloudflare (misalnya autentikasi dua faktor dan hak akses akun) tidak dapat diaudit dari source lokal. Tidak ada password, cookie sesi atau API token yang disalin ke paket upload.

## Publikasi

Cloudflare mendukung folder atau ZIP untuk Direct Upload melalui dashboard; ZIP harus berisi `index.html` di akar. Untuk memperbarui proyek lama, buka Workers & Pages → bali-nagomi → Create a new deployment → Production → unggah ZIP → Save and Deploy. [Panduan resmi Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

Jika memilih Wrangler, gunakan folder yang sudah jadi, login dengan akun pemilik, lalu pilih proyek `bali-nagomi` dan branch production yang sudah ada. Jangan membuat proyek baru untuk pembaruan ini. Nama brand di halaman sudah Yūgana Bari-kun; alamat hosting tetap bali-nagomi.pages.dev sesuai target yang dikonfirmasi pemilik.

Setelah deploy, verifikasi URL production, header CSP, tautan WhatsApp, tombol bahasa, dan tampilan mobile. Hasil pengecekan lokal tidak membuktikan pengaturan CDN yang aktif pada production.

## Mengedit selanjutnya

Tidak membutuhkan build command. Edit HTML, CSS dan JavaScript langsung. Teks bilingual ada pada atribut `data-en` / `data-ja`, dengan teks Inggris sebagai fallback HTML. Metadata ada di bagian head. Bila domain diganti, perbarui canonical, Open Graph URL, robots.txt dan sitemap.xml.

Sebelum menampilkan harga tetap, konfirmasikan unit harga (per orang/per mobil), kapasitas, durasi, pickup, bahasa dan peran pemandu, inklusi, pembayaran serta pembatalan. Jangan menambahkan ulasan, sertifikasi, pengalaman atau jaminan yang belum dapat dibuktikan.

## Hasil publikasi — 27 Oktober 2026

Deployment berhasil melalui Wrangler 4.153.0. Proyek Pages bernama `bali-nagomi` dibuat kembali pada akun yang diotorisasi pemilik, karena daftar proyek Pages sebelumnya kosong dan domain lama belum memiliki DNS. Branch production adalah `main`.

- Production: https://bali-nagomi.pages.dev
- Versi deployment ini: https://917e3bce.bali-nagomi.pages.dev
- Source lokal di folder `C:\Users\agusp\OneDrive\Desktop\Yūgana Bari-kun` cocok dengan 17 file pada paket publikasi berdasarkan perbandingan SHA-256. Panduan riset ini tidak dimasukkan ke paket publikasi.
- Cadangan sebelum pembaruan dan ZIP siap upload tersimpan di folder artifact `yugana-refresh` bersama laporan QA.
- Pemeriksaan lokal: 40 kombinasi halaman utama/tiga tur × Inggris/Jepang × lebar 320, 375, 390, 768 dan 1440 px; tidak ada overflow horizontal, asset gagal dimuat atau JavaScript error. Bahasa dengan storage diblokir, navigasi keyboard, serta pesan WhatsApp juga diperiksa. Request WhatsApp pengujian diintersep; tidak ada pesan dikirim.
- Halaman privasi dan 404 diperiksa pada lebar 390 px untuk kedua bahasa.
- Pemeriksaan production menggunakan headless Edge tanpa DNS override: homepage dan tiga rute tur HTTP 200; asset sehat; Inggris menjadi default; redirect `.html?lang=ja` mempertahankan Jepang; URL yang tidak ada memberi HTTP 404 dengan noindex. Keenam header keamanan diterapkan; tidak ada script analytics atau request eksternal tambahan.
- Pengujian memakai emulasi ukuran layar di Edge, belum perangkat fisik iPhone/Android atau Safari. Konfigurasi akun Cloudflare di luar deployment, termasuk 2FA, tidak diubah atau diaudit.

Otorisasi CLI dibatasi ke account:read, user:read dan pages:write, dengan offline_access yang ditambahkan Wrangler untuk pembaruan sesi. Kredensial dikelola oleh Wrangler di profil pengguna; tidak disimpan di source atau ZIP situs.
