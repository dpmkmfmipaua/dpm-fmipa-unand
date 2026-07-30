# Website DPM KM FMIPA UNAND — Parlemen of Vision (PoV)

Panduan lengkap dari nol sampai website ini siap online.

## 📁 Struktur Folder
```
dpm-pov/
├── index.html                 ← Landing page
├── pengurus.html               ← Struktur pengurus + filter
├── hall-of-fame.html           ← Rekam jejak demisioner
├── smart-law-center.html       ← Pencarian UU
├── wall-of-appreciation.html   ← Wall donasi alumni
├── katalog-jasa.html           ← Jasa digital + SADAR MIPA
├── assets/
│   ├── css/style.css           ← Semua styling & warna (ubah di sini kalau mau ganti tema)
│   ├── js/data.js              ← SEMUA DATA (pengurus, UU, donasi) — paling sering diedit
│   ├── js/main.js               ← Fungsi navigasi & animasi
│   └── images/                  ← Taruh foto-foto pengurus di sini
├── docs/
│   └── (taruh file PDF UUD/Konstitusi di sini)
└── README.md                    ← File ini
```

---

## TAHAP 1 — Coba di Laptop Kamu Dulu (MacBook Air 2017)

Karena ini HTML/CSS/JS murni, kamu **tidak butuh install apa pun** untuk sekadar melihat hasilnya:

1. Download/copy semua file di atas ke folder `dpm-pov` di laptopmu.
2. Klik dua kali `index.html` → otomatis kebuka di browser (Chrome/Safari).
3. Klik-klik semua menu untuk mengecek tampilan.

**Supaya lebih mirip production** (URL antar halaman jalan sempurna, bukan `file://`), pakai local server ringan:

Kalau kamu sudah punya VS Code + ekstensi **Live Server** (gratis, cari di Extensions):
1. Buka folder `dpm-pov` di VS Code.
2. Klik kanan `index.html` → "Open with Live Server".
3. Browser otomatis terbuka di `http://127.0.0.1:5500`.

Alternatif tanpa ekstensi (pakai terminal Mac bawaan):
```bash
cd path/ke/folder/dpm-pov
python3 -m http.server 8000
```
Lalu buka `http://localhost:8000` di browser.

---

## TAHAP 2 — Isi Data Asli & Aset

Ini bagian yang **paling penting kamu kerjakan sendiri** sebelum kirim ke hosting:

### A0. Logo (DPM, PoV, UNAND)
Logo DPM (hijau, resmi/permanen) dan logo PoV (oranye, khusus kepengurusanmu) **sudah otomatis
terpasang** di navbar, hero halaman depan, dan footer — saya ambil langsung dari file
`Logo_Parlemen.pdf` yang kamu kirim, filenya ada di:
```
assets/images/logos/logo-dpm.png
assets/images/logos/logo-pov.png
```
**Logo UNAND** belum saya pasang sebagai gambar asli — karena saya tidak punya akses internet
untuk mengambil file resminya, dan supaya tidak salah/ketinggalan versi, sebaiknya kamu ambil
sendiri dari sumber resmi (situs unand.ac.id atau surat resmi kampus yang sudah ada). Saat ini,
di posisi logo UNAND cuma ada **placeholder bertuliskan "UNAND"** (kotak putus-putus). Cara ganti:

1. Simpan file logo UNAND (format `.png`, idealnya latar transparan) ke:
   `assets/images/logos/logo-unand.png`
2. Di **setiap file HTML** (`index.html`, `pengurus.html`, dll — ada di bagian navbar/hero/footer),
   cari baris ini:
   ```html
   <img src="assets/images/logos/logo-unand.png" alt="Logo Universitas Andalas" />
   ```
   Ganti jadi:
   ```html
   <img src="assets/images/logos/logo-unand.png" alt="Logo Universitas Andalas" />
   ```
   (ada beberapa titik yang perlu diganti — pakai fitur "Find & Replace" / Cmd+Shift+H di VS Code
   supaya sekali jalan ganti semua sekaligus di semua file).

### A. Foto Pengurus
1. Kumpulkan foto formal 23 fungsionaris (rasio 1:1/persegi lebih bagus).
2. Simpan di `assets/images/`, kasih nama file jelas, misalnya `agid-al-syah-putra.jpg`.
3. Buka `assets/js/data.js`, cari nama orangnya, ubah `foto: null` jadi:
   ```js
   foto: "assets/images/agid-al-syah-putra.jpg"
   ```
4. Di `pengurus.html`, cari baris ini di bagian `<script>`:
   ```js
   <div class="avatar-fallback w-16 h-16 rounded-full text-lg shrink-0">${initials(p.nama)}</div>
   ```
   Ganti jadi (biar otomatis pakai foto asli kalau ada, fallback ke inisial kalau belum ada foto):
   ```js
   ${p.foto
     ? `<img src="${p.foto}" class="w-16 h-16 rounded-full object-cover shrink-0" alt="${p.nama}">`
     : `<div class="avatar-fallback w-16 h-16 rounded-full text-lg shrink-0">${initials(p.nama)}</div>`}
   ```

### A1. Link Buku UU (Google Drive)
Karena file & link buku UU-nya sudah kamu pegang sendiri di VS Code, kamu tinggal ganti value
`uudPdfPath` di `CONFIG` (file `assets/js/data.js`) dengan **link Google Drive** kamu langsung
(pastikan setting share-nya "Anyone with the link can view"), contoh:
```js
uudPdfPath: "https://drive.google.com/file/d/xxxxxxxxxxxx/view",
```
Tidak masalah kalau itu link Google Drive, bukan file lokal — tombol download di Buku Undang-Undang
otomatis akan mengarah ke link itu.

### B. Data Galeri Demisioner (Demisioner)
Buka `assets/js/data.js`, cari `DEMISIONER`, isi data periode-periode sebelumnya sesuai format yang sudah ada contohnya.

### C. Data Buku Undang-Undang (UU KM FMIPA)
Buka `assets/js/data.js`, cari `DATA_UU`, isi pasal-pasal sungguhan dari kitab UU KM FMIPA kalian.
Taruh file PDF resminya di folder `docs/`, misalnya `docs/UUD-KM-FMIPA-UNAND.pdf`, lalu pastikan
`CONFIG.uudPdfPath` di `data.js` cocok dengan nama filenya.

### C1. Link Instagram Pribadi Tiap Pengurus
Setiap kartu di halaman **Struktur Pengurus** sudah ada ikon Instagram kecil di pojok kanan atas.
Kalau belum diisi link, ikonnya otomatis abu-abu (non-aktif). Untuk mengaktifkan:

Buka `assets/js/data.js`, cari nama orangnya, isi field `instagram`, contoh:
```js
{ nama: "Agid Al Syah Putra", ..., instagram: "https://instagram.com/agidalsyah" },
```
Kalau belum ada link, biarkan `instagram: null` — ikon otomatis tetap muncul tapi non-aktif
(tidak error, tidak bisa diklik).

### C2. Link Donasi (Papan Apresiasi & Donasi)
Ada 2 tombol "Klik untuk Berdonasi" di halaman Papan Apresiasi & Donasi — sudah dibuat terbuka untuk
**alumni maupun publik**. Kamu tinggal isi tujuan link donasinya. Bisa berupa:
- Link Saweria/Trakteer (paling gampang untuk QRIS & e-wallet)
- Link Google Form pendataan donatur + info rekening di dalamnya
- Link halaman khusus donasi kalau nanti dibuatkan

Buka `assets/js/data.js`, bagian `CONFIG`, ganti:
```js
donasiLink: "PASTE_LINK_DONASI_DI_SINI",
```

### D. Link Formulir SENYAP
Di `assets/js/data.js`, bagian `CONFIG`, ganti:
```js
senyapFormUrl: "PASTE_LINK_MICROSOFT_FORM_SENYAP_DI_SINI",
```
dengan link Microsoft Form SENYAP kalian yang asli.

### E. Widget Instagram Asli
Section Instagram di `index.html` saat ini masih **placeholder ikon**. Untuk feed asli:
1. Daftar gratis di [SnapWidget.com](https://snapwidget.com) → hubungkan akun @dpmkmfmipaua.
2. Copy kode `<iframe>` yang mereka kasih.
3. Di `index.html`, cari komentar `<!-- ============ INSTAGRAM FEED ============ -->`,
   ganti grid placeholder dengan `<iframe>` tersebut.

### F. Data Donasi (Papan Apresiasi & Donasi)
Untuk tahap awal, cukup edit manual `DONASI_LIST` di `data.js` tiap ada donasi baru.
Untuk versi yang bisa diisi tanpa edit kode (lebih scalable), lihat "Tahap Lanjutan" di bawah.

---

## Sudah Responsif di HP? Cara Ceknya di MacBook

Website ini sudah dibuat mobile-friendly dari awal (dites layout-nya untuk lebar layar HP), tapi
karena kamu cuma ngecek di MacBook, ini cara cepat lihat tampilan HP tanpa perlu HP fisik:

1. Buka website-nya di **Chrome**.
2. Klik kanan di halaman → **Inspect** (atau tekan `Cmd + Option + I`).
3. Klik ikon kecil bergambar HP/tablet di pojok kiri atas panel yang muncul
   (atau tekan `Cmd + Shift + M`).
4. Di bagian atas akan muncul dropdown pilihan perangkat — pilih "iPhone 14 Pro" atau semacamnya.
5. Sekarang kamu bisa lihat & coba klik-klik persis seperti tampilan di HP asli.

Kalau ada bagian yang keliatan aneh/kepotong di ukuran tertentu, kasih tau saya bagian mana &
di device apa — saya bisa perbaiki cepat.

---

## TAHAP 3 — Surat Permohonan Domain/Hosting ke LPTIK

Sebelum kirim surat, siapkan dulu:
1. **Nama domain yang diinginkan**, misalnya `dpm.fmipa.unand.ac.id` atau `dpmkmfmipa.unand.ac.id`
   (sesuaikan pola subdomain organisasi kemahasiswaan lain di UNAND kalau ada contohnya).
2. **Draft/preview website ini** sebagai lampiran bukti kesiapan (screenshot atau link sementara —
   lihat opsi hosting gratis sementara di Tahap 4 di bawah, supaya LPTIK bisa lihat dulu produknya).
3. Surat resmi dari Sekretaris/Ketua Umum DPM (pakai kop surat DPM KM FMIPA yang sudah ada),
   isi permohonan:
   - Nama organisasi & tujuan (transparansi & digitalisasi lembaga legislatif mahasiswa).
   - Permintaan subdomain di bawah `unand.ac.id` (lebih mudah disetujui vs domain baru).
   - Permintaan ruang hosting (space & bandwidth) atau akses ke server kampus.
   - Kontak teknis penanggung jawab (kamu / Biro Infokom).

> 💡 Saran: sambil menunggu surat diproses (bisa berminggu-minggu), **deploy dulu ke hosting
> gratis** (Tahap 4) supaya website sudah bisa diakses publik dan dipakai sebagai lampiran bukti
> kesiapan teknis di suratmu.

---

## TAHAP 4 — Deploy Sementara (Gratis, Sambil Menunggu Domain Kampus)

### Opsi termudah: Netlify Drop (tanpa akun, tanpa command line)
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop seluruh folder `dpm-pov` ke halaman itu.
3. Dalam beberapa detik, dapat link publik seperti `https://random-name-123.netlify.app`.
4. (Opsional) Buat akun gratis untuk custom nama & auto-update tiap ada perubahan file.

### Opsi kedua: GitHub Pages (bagus untuk portofolio & versioning)
1. Buat akun di [github.com](https://github.com) (gratis, bisa pakai email kampus).
2. Buat repository baru, nama bebas misal `dpm-pov-website`.
3. Upload semua file (`index.html`, folder `assets`, dll) lewat tombol "Add file → Upload files" di web GitHub (tidak perlu command line).
4. Masuk ke **Settings → Pages** di repo tersebut → pilih branch `main` → Save.
5. Tunggu 1-2 menit, dapat link `https://username.github.io/dpm-pov-website`.

Kedua opsi ini **gratis selamanya** dan bisa dipakai sebagai domain "cadangan" meskipun nanti
sudah dapat subdomain resmi dari kampus — tinggal redirect.

---

## TAHAP 5 — Setelah Dapat Hosting/Domain dari LPTIK

Biasanya kampus kasih akses **cPanel** dengan **File Manager** atau akses **FTP**. Langkahnya:

1. Kompres seluruh isi folder `dpm-pov` (bukan foldernya, tapi **isi di dalamnya**) jadi satu `.zip`.
2. Login ke cPanel yang dikasih LPTIK.
3. Buka **File Manager** → masuk ke folder `public_html` (atau folder subdomain yang ditentukan).
4. Upload file `.zip` tadi → klik kanan → **Extract**.
5. Pastikan `index.html` ada tepat di dalam `public_html` (bukan di dalam subfolder lagi).
6. Akses domainmu di browser — selesai, website live! 🎉

Kalau LPTIK kasih akses **FTP** saja (bukan cPanel), kamu butuh aplikasi FTP client gratis seperti
**FileZilla** — install di Mac, masukkan host/username/password yang dikasih LPTIK, lalu drag semua
file dari laptop ke folder server.

---

## TAHAP LANJUTAN (Opsional) — Kalau Nanti Mau Upgrade

Semua fitur di bawah ini **tidak wajib** untuk versi pertama, tapi bisa jadi proker Biro Infokom
ke depan kalau mau website makin canggih:

1. **Papan Apresiasi & Donasi & SADAR MIPA otomatis** — sambungkan ke Google Sheets:
   - Buat Google Sheet sebagai "database" donasi/data mahasiswa.
   - Publish sheet itu sebagai API pakai [SheetDB.io](https://sheetdb.io) (gratis untuk pemakaian kecil).
   - Ganti data statis di `data.js` dengan `fetch()` ke URL API SheetDB itu.

2. **Form SENYAP custom** (kalau nanti ingin lepas dari Microsoft Form) — bisa pakai Google Form
   yang di-embed, atau bikin form sendiri yang kirim ke Google Sheets via SheetDB.

3. **Genjot foto profil** jadi carousel/detail modal per pengurus kalau mau lebih interaktif.

4. **Custom domain gratis (.my.id / .web.id)** kalau ternyata LPTIK lama merespons — daftar di
   PANDI (khusus mahasiswa, ada program domain `.web.id` murah/gratis untuk organisasi kampus).

---

## Cara Cepat Ubah Warna/Font Kalau Nanti Ganti Parlemen

Semua warna terpusat di satu tempat: `assets/css/style.css`, bagian paling atas (`:root { ... }`).
Tinggal ganti kode hex-nya, otomatis berubah di semua halaman. Tidak perlu edit satu-satu.

---

Selamat mengerjakan, Parlemen of Vision! 🏛️💜
