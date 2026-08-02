/* ===================================================================
   DATA CENTER — DPM KM FMIPA UNAND "Parlemen of Vision"
   -------------------------------------------------------------------
   Edit file ini kalau ada perubahan data pengurus, UU, atau donatur.
   Tidak perlu sentuh file HTML/CSS lain untuk update data.
   =================================================================== */

// ============ 1. DATA PENGURUS AKTIF PERIODE 2025/2026 ============
const PENGURUS_AKTIF = [
  // --- PIMPINAN INTI (PRESIDIUM) ---
  { nama: "Agid Al Syah Putra", jabatan: "Ketua Umum", kategori: "inti", jurusan: "Fisika", angkatan: 2023, foto: "assets/images/agid.png", instagram: "https://www.instagram.com/agidal_?igsh=azNsdTI4N3hwdjJm" },
  { nama: "Muhammad Habibullah Al Kamal", jabatan: "Wakil Ketua 1", kategori: "inti", jurusan: "Fisika", angkatan: 2023, foto: "assets/images/alka.png", instagram: "https://www.instagram.com/habibullahalkamall?igsh=MTV5dWg3cjQwenI1Mw==" },
  { nama: "Rizka Nurhidayah", jabatan: "Wakil Ketua 2", kategori: "inti", jurusan: "Kimia", angkatan: 2024, foto: "assets/images/rizka.png", instagram: "https://www.instagram.com/y.rzkaa?igsh=cDJub25kamduajcw" },

  // --- KOMISI I: Legislasi & Pencerdasan ---
  { nama: "Syahira Alya Fitra", jabatan: "Ketua Komisi I", kategori: "komisi1", jurusan: "Fisika", angkatan: 2023, foto: "assets/images/syahira.png", instagram: "https://www.instagram.com/syahiraalya13?igsh=MXhwcW14N3A1amhzbw==" },
  { nama: "Sherly Rahmadia Putri", jabatan: "Sekretaris Komisi I", kategori: "komisi1", jurusan: "Kimia", angkatan: 2025, foto: "assets/images/sherly.png", instagram: "https://www.instagram.com/lysera.x?igsh=ZTlmYnFnYWIzN200" },
  { nama: "Muhamad Yudha Anugrah", jabatan: "Anggota Komisi I", kategori: "komisi1", jurusan: "Kimia", angkatan: 2025, foto: "assets/images/yudha.png", instagram: "https://www.instagram.com/profyd_?igsh=aTU4dTVjOTgwcGt1" },

  // --- KOMISI II: Aspirasi & Kaderisasi ---
  { nama: "Viola Shalsabila", jabatan: "Ketua Komisi II", kategori: "komisi2", jurusan: "Biologi", angkatan: 2023, foto: "assets/images/viola.png", instagram: "https://www.instagram.com/_vsha196?igsh=NDJtbjhpanozYmVu" },
  { nama: "Asra Ozali", jabatan: "Sekretaris Komisi II", kategori: "komisi2", jurusan: "Biologi", angkatan: 2023, foto: "assets/images/oja.png", instagram: "https://www.instagram.com/dearscoups.hush?igsh=MTBhYmNoZHQ2NGdwaA==" },
  { nama: "Safniarti Indrayani", jabatan: "Anggota Komisi II", kategori: "komisi2", jurusan: "Kimia", angkatan: 2025, foto: "assets/images/safniar.png", instagram: "https://www.instagram.com/sfnrtiindryni_?igsh=MXNhMm00OTBtZXV2OA==" },
  { nama: "Sarah Asyifa Rahma", jabatan: "Anggota Komisi II", kategori: "komisi2", jurusan: "Matematika", angkatan: 2024, foto: "assets/images/sarah.png", instagram: "https://www.instagram.com/srh_asyfrhma?igsh=M2ZrdTdqZTgzMmNn" },

  // --- KOMISI III: Pengawasan Eksekutif ---
  { nama: "Lupita Dwicahyani S.", jabatan: "Ketua Komisi III", kategori: "komisi3", jurusan: "Biologi", angkatan: 2023, foto: "assets/images/luvita.png", instagram: "https://www.instagram.com/luvitadcs?igsh=MWJ4bjhyemFncThudA==" },
  { nama: "Fitrah Qolbina", jabatan: "Sekretaris Komisi III", kategori: "komisi3", jurusan: "Kimia", angkatan: 2025, foto: "assets/images/fitrah.png", instagram: "https://www.instagram.com/fq_fina?igsh=MXN2dmNlNDVzaHRn" },
  { nama: "Nailah Chandra Yulita", jabatan: "Anggota Komisi III", kategori: "komisi3", jurusan: "Biologi", angkatan: 2025, foto: "assets/images/nailah.png", instagram: "https://www.instagram.com/ncy.04_?igsh=ZXd3bXNvcWtvOTNw" },
  { nama: "Bayu Anugrah", jabatan: "Anggota Komisi III", kategori: "komisi3", jurusan: "Matematika", angkatan: 2023, foto: "assets/images/bayu.png", instagram: "https://www.instagram.com/panggil_aku_bayyy?igsh=Ymt1a2l6OHo3ZzVt" },

  // --- BIRO INFOKOM ---
  { nama: "Tiara Faisal Kesuma", jabatan: "Kepala Biro Infokom", kategori: "infokom", jurusan: "Fisika", angkatan: 2023, foto: "assets/images/tiara.png", instagram: "https://www.instagram.com/araa.nyx_?igsh=bWNzcDVsbWgwa3Jh" },
  { nama: "Zahwa Zafira Azzahra", jabatan: "Sekretaris Biro Infokom", kategori: "infokom", jurusan: "Kimia", angkatan: 2025, foto: "assets/images/zahwa.png", instagram: "https://www.instagram.com/zhwazf?igsh=eW1wczRkYWF5NGRj" },
  { nama: "Citra Mentari Carista", jabatan: "Anggota Biro Infokom", kategori: "infokom", jurusan: "Kimia", angkatan: 2025, foto: "assets/images/citra.png", instagram: "https://www.instagram.com/citramentaric?igsh=MTN3NGFocHIxNzVtNw==" },

  // --- BIRO ADMINISTRASI ---
  { nama: "Firman Harianto", jabatan: "Kepala Biro Administrasi", kategori: "adm", jurusan: "Fisika", angkatan: 2024, foto: "assets/images/firman.png", instagram: "https://www.instagram.com/rchaxna?igsh=MWxxM3V3ZW44YThmNQ==" },
  { nama: "Khairatul Husni", jabatan: "Sekretaris Biro Administrasi", kategori: "adm", jurusan: "Kimia", angkatan: 2025, foto: "assets/images/khaira.png", instagram: "https://www.instagram.com/khairatulhusni_?igsh=M2w4eWk2b2UybmQ3" },
  { nama: "Afraa Devrian", jabatan: "Anggota Biro Administrasi", kategori: "adm", jurusan: "Biologi", angkatan: 2024, foto: "assets/images/afraaa.png", instagram: "https://www.instagram.com/akunafraa?igsh=Mzdyc2djODZiYWE=" },

  // --- BIRO MITRA USAHA ---
  { nama: "Syifa Ul Qalbi", jabatan: "Kepala Biro Mitra Usaha", kategori: "mitu", jurusan: "Fisika", angkatan: 2023, foto: "assets/images/syifa.png", instagram: "https://www.instagram.com/syiii_qlb?igsh=MWppMGQ0NGMzMzR4OQ==" },
  { nama: "Fadillah Madris", jabatan: "Sekretaris Biro Mitra Usaha", kategori: "mitu", jurusan: "Fisika", angkatan: 2023, foto: "assets/images/dila.png", instagram: "https://www.instagram.com/fadillahmdrs_24?igsh=b3U0NWVmdDZiejF0" },
  { nama: "Muhammad Akbar Aswan", jabatan: "Anggota Biro Mitra Usaha", kategori: "mitu", jurusan: "Kimia", angkatan: 2025, foto: "assets/images/akbar.png", instagram: "https://www.instagram.com/aswanm.akbar?igsh=dXJ1cnN1ODYyY3d6&wa_status_inline=true" },
];

// Label & warna kategori (dipakai filter chip + badge)
const KATEGORI_INFO = {
  inti:    { label: "Pimpinan Inti",  badge: "badge-inti" },
  komisi1: { label: "Komisi I",       badge: "badge-komisi1" },
  komisi2: { label: "Komisi II",      badge: "badge-komisi2" },
  komisi3: { label: "Komisi III",     badge: "badge-komisi3" },
  infokom: { label: "Biro Infokom",   badge: "badge-infokom" },
  adm:     { label: "Biro Administrasi", badge: "badge-adm" },
  mitu:    { label: "Biro Mitra Usaha", badge: "badge-mitu" },
};

// ============ 2. Galeri Demisioner — DEMISIONER PERIODE SEBELUMNYA ============
const DEMISIONER = [
  {
    periode: "2024/2025",
    namaParlemen: "Parlemen Dharma Suara",
    pengurusInti: [
      { nama: "M. Jordan Rifandani", jabatan: "Ketua Umum" },
      { nama: "Annisa Usnul Khatimah", jabatan: "Wakil Ketua 1" },
      { nama: "Anggun Shalsabilla", jabatan: "Wakil Ketua 2" },
      { nama: "Amanda Febriani Faustine", jabatan: "Ketua Komisi I" },
      { nama: "-----", jabatan: "Ketua Komisi II" },
      { nama: "Joi Shiva Dwi Rahma", jabatan: "Ketua Komisi III" },
      { nama: "Fadillah Zahwa Sahara", jabatan: "Kepala Biro Administrasi" },
      { nama: "Anisa Putri", jabatan: "Kepala Biro Informasi dan Komunikasi" },
    ],
  },
  {
    periode: "2023/2024",
    namaParlemen: "Parlemen Sebelumnya",
    pengurusInti: [
      { nama: "(Nama)", jabatan: "Ketua Umum" },
      { nama: "(Nama)", jabatan: "Wakil Ketua" },
      { nama: "(Nama)", jabatan: "Sekretaris" },
      { nama: "(Nama)", jabatan: "Bendahara" },
      { nama: "(Nama)", jabatan: "Ketua Komisi I" },
      { nama: "(Nama)", jabatan: "Ketua Komisi II" },
    ],
  },
];

// ============ 3. Buku Undang-Undang — DATA UU / PASAL ============
const DATA_UU = [
  {
    kode: "UUD Pasal 25",
    judul: "Status Warga Negara & KWM",
    kategori: "UUD KM FMIPA",
    isi: "Menetapkan bahwa Warga Negara KM FMIPA UNAND adalah mahasiswa S1 yang disahkan undang-undang, serta mewajibkan kepemilikan Kartu Warga Mipa (KWM) sebagai identitas resmi.",
  },
  {
    kode: "UU No. 1 Tahun 2021 Pasal 7",
    judul: "Syarat Perolehan Kewarganegaraan",
    kategori: "UU Kewarganegaraan",
    isi: "Merincikan lima syarat sah menjadi warga negara: Terdaftar sebagai mahasiswa aktif, lulus BAKTI FMIPA, lulus LKMM-TD, lulus pembinaan HIMA, dan lulus magang di UKMF.",
  },
  {
    kode: "UU No. 1 Tahun 2021 Pasal 15",
    judul: "Fungsi Kartu Warga Mipa",
    kategori: "UU Kewarganegaraan",
    isi: "Menetapkan KWM sebagai syarat mutlak untuk mengikuti pendaftaran organisasi (Open Recruitment) dan menggunakan hak suara dalam Pemilihan Raya (PEMIRA) KM FMIPA.",
  },
  {
    kode: "UU No. 3 Tahun 2015",
    judul: "Susduk HIMA & UKMF",
    kategori: "UU Kelembagaan",
    isi: "Mengatur susunan, kedudukan, serta fungsi Himpunan Mahasiswa Jurusan dan Unit Kegiatan Mahasiswa Fakultas sebagai wadah pengembangan mahasiswa di tingkat fakultas.",
  },
  {
    kode: "UU No. 1 Tahun 2022",
    judul: "Pengawasan & Penilaian BEM",
    kategori: "UU Kelembagaan",
    isi: "Mengatur fungsi pengawasan DPM terhadap kinerja, kebijakan, dan keuangan BEM, termasuk mekanisme penilaian awal, tengah, akhir, serta sanksi berupa memorandum.",
  },
  {
    kode: "UU No. 2 Tahun 2021",
    judul: "Penyelenggaraan PEMIRA",
    kategori: "UU Kepemiluan",
    isi: "Mengatur asas, tahapan, dan mekanisme Pemilihan Umum Raya untuk memilih anggota DPM serta Gubernur dan Wakil Gubernur Mahasiswa KM FMIPA UNAND.",
  },
];

// ============ 4. Papan Apresiasi & Donasi — DATA DONASI ============
const DONASI_TARGET = 10000000; // Target Dana Abadi Alumni (Rp)

const DONASI_LIST = [
  { nama: "Anita", jumlah: 50000, pesan: "Semangat untuk PoV! Jaga terus independensi DPM." },
  { nama: "Hamba Allah (Alumni 2019)", jumlah: 200000, pesan: "Selamat bertugas, jaga integritas ya!" },
  { nama: "Kak Rizky", jumlah: 100000, pesan: "Semoga makin solid PoV, majukan FMIPA!" },
];

// ============ 5. KATALOG JASA DIGITAL — BIRO MITRA USAHA ============
const JASA_DIGITAL = [
  {
    nama: "AbsenBot",
    tagline: "Sistem absensi otomatis berbasis WhatsApp API + Google Sheets",
    deskripsi: "Cocok untuk kepanitiaan atau acara HIMA/UKMF yang butuh rekap kehadiran otomatis tanpa ribet input manual.",
    icon: "clipboard-check",
  },
  {
    nama: "Jasa Website & Landing Page",
    tagline: "Pembuatan website atau landing page organisasi/kegiatan kampus",
    deskripsi: "Dari profil organisasi, company profile UKM, sampai landing page event — dikerjakan tim digital DPM.",
    icon: "layout-template",
  },
  {
    nama: "Undangan Wisuda Digital",
    tagline: "Undangan wisuda online berbasis website, interaktif & mudah disebar",
    deskripsi: "Solusi undangan modern untuk calon wisudawan FMIPA, tinggal share link ke keluarga & teman.",
    icon: "graduation-cap",
  },
];

// ============ 6. KONFIGURASI LINK EKSTERNAL ============
const CONFIG = {
  instagram: "https://instagram.com/dpmkmfmipaua",
  senyapFormUrl: "https://forms.cloud.microsoft/r/1Ti6kEQmKF",
  uudPdfPath: "docs/UUD-KM-FMIPA-UNAND.pdf",
  email: "dpm@sci.unand.id",
  telepon: "0823 8933 8148",
  alamat: "Gedung PKM FMIPA Kampus Limau Manis, Padang 25163",

  // Koordinat Sekretariat DPM (dipakai oleh absensi-harian.html untuk validasi GPS)
  sekreLat: -0.9101815659507473,
  sekreLng: 100.46044578717425,

  // Link donasi
  donasiLink: "SEGERA_HADIR",

  // Path file logo
  logoDpm: "assets/images/logos/logo-dpm.png",     // Logo resmi DPM
  logoPov: "assets/images/logos/logo-pov.png",     // Logo Parlemen of Vision
  logoUnand: "assets/images/logos/logo-unand.png", // Logo Universitas Andalas

  // Halaman internal fungsionaris
  absensiHarianUrl: "absensi-harian.html",
};

// Helper Link Google Maps, WhatsApp & Mailto
CONFIG.mapsUrl = `https://www.google.com/maps/search/?api=1&query=${CONFIG.sekreLat},${CONFIG.sekreLng}`;

// Link WhatsApp dengan Pesan Otomatis
const pesanWA = encodeURIComponent("Halo DPM KM FMIPA UNAND, saya... ingin bertanya mengenai...");
CONFIG.teleponTelUrl = "https://wa.me/62" + CONFIG.telepon.replace(/\D/g, "").replace(/^0/, "") + "?text=" + pesanWA;

CONFIG.emailMailtoUrl = "mailto:" + CONFIG.email;