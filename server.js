require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Ditambahkan untuk menangani path file dengan aman

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8000';
const GROQ_MODEL = (process.env.GROQ_MODEL || 'openai/gpt-oss-20b').trim();

if (!GROQ_API_KEY) {
  console.error('GROQ_API_KEY is missing. Add it to the .env file or Vercel/Railway environment variables.');
  if (process.env.VERCEL !== '1') {
    process.exit(1);
  }
}

// ==========================================
// 1. MIDDLEWARE DASAR
// ==========================================
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.json({ limit: '2mb' }));

// ==========================================
// 2. SEO: SITEMAP & ROBOTS (BARU)
// ==========================================
// Ditaruh SEBELUM express.static dan route lain supaya selalu terbaca.
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

// ==========================================
// 3. SERVE FILE STATIS
// ==========================================
// Blokir file internal supaya kode server & konfigurasi tidak bisa diunduh publik
// (karena express.static(__dirname) menyajikan SEMUA file di root folder).
const BLOCKED_FILES = [
  '/server.js',
  '/package.json',
  '/package-lock.json',
  '/dockerfile',
  '/docker-compose.yml',
  '/vercel.json',
  '/.dockerignore',
  '/.gitignore',
  '/.env',
  '/.env.example',
  '/.env.example%20'
];
app.use((req, res, next) => {
  const requested = decodeURIComponent(req.path).toLowerCase();
  if (BLOCKED_FILES.includes(requested)) {
    return res.status(404).send('Not found');
  }
  next();
});

// Melayani folder assets (CSS, JS, gambar, dll)
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// Melayani file HTML di root folder
app.use(express.static(__dirname));

// ==========================================
// 4. ROUTING HALAMAN WEBSITE (FRONTEND)
// ==========================================
// Saat akses root (/), tampilkan index.html (bukan JSON)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint (PENTING untuk Docker)
app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'dpm-pov-groq-backend',
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: FRONTEND_URL
  });
});

// ==========================================
// 5. FUNGSI BANTU (HELPER)
// ==========================================
function normalizeJsonArray(rawText) {
  if (!rawText) return null;

  const cleaned = rawText
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed?.data)) return parsed.data;
    if (Array.isArray(parsed?.result)) return parsed.result;
    if (Array.isArray(parsed?.soal)) return parsed.soal;
    if (Array.isArray(parsed?.items)) return parsed.items;
    if (Array.isArray(parsed?.questions)) return parsed.questions;
    if (parsed && typeof parsed === 'object') {
      const values = Object.values(parsed);
      const arrayValue = values.find(Array.isArray);
      if (arrayValue) return arrayValue;
    }
    return null;
  } catch (error) {
    return null;
  }
}

function buildQuizPrompt(materi, judul, safeJumlah) {
  return `Buatkan TEPAT ${safeJumlah} soal pilihan ganda (4 opsi) mengenai materi berikut.\n\nPENTING:\n- Wajib menghasilkan tepat ${safeJumlah} soal, tidak kurang dan tidak lebih.\n- Tiap soal harus valid dan lengkap dengan field: soal, opsi (array 4 elemen), kunci (angka 0-3).\n- Kembalikan hanya JSON valid, tanpa teks tambahan, tanpa markdown, tanpa penjelasan.\n- Format yang harus dipakai: [{"soal":"...","opsi":["A","B","C","D"],"kunci":0}]\n\nJudul kuis: ${judul || 'SERTA DPM'}\n\nMateri:\n${materi}`;
}

// ==========================================
// 6. ROUTING API (BACKEND)
// ==========================================
// --- Notifikasi Telegram untuk pembayaran kas (BARU) ---
// Mendukung dua nama variabel: TELEGRAM_BOT_TOKEN atau TELEGRAM_TOKEN (yang sudah ada di Vercel)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Pembatas sederhana: maksimal 10 permintaan per menit per IP (disimpan di memori)
const notifHits = new Map();
function notifRateLimited(ip) {
  const now = Date.now();
  const recent = (notifHits.get(ip) || []).filter((t) => now - t < 60 * 1000);
  recent.push(now);
  notifHits.set(ip, recent);
  return recent.length > 10;
}

const clip = (value, max) => String(value ?? '-').slice(0, max);

app.post('/api/notify-kas', async (req, res) => {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('TELEGRAM_TOKEN (atau TELEGRAM_BOT_TOKEN) / TELEGRAM_CHAT_ID belum diisi.');
      return res.status(503).json({ error: 'Notifikasi Telegram belum dikonfigurasi.' });
    }

    const ip = req.headers['x-forwarded-for'] || req.ip || 'unknown';
    if (notifRateLimited(ip)) {
      return res.status(429).json({ error: 'Terlalu banyak permintaan.' });
    }

    const { nama, periode, nominal, buktiUrl, email } = req.body || {};
    if (!nama || !periode || !nominal || !buktiUrl) {
      return res.status(400).json({ error: 'Data notifikasi tidak lengkap.' });
    }

    // Teks biasa (tanpa parse_mode) supaya karakter khusus tidak merusak pesan
    const text =
      `💰 Pembayaran Kas Baru\n\n` +
      `Nama: ${clip(nama, 100)}\n` +
      `Email: ${clip(email, 100)}\n` +
      `Periode: ${clip(periode, 300)}\n` +
      `Nominal: Rp${Number(nominal).toLocaleString('id-ID')}\n` +
      `Bukti: ${clip(buktiUrl, 500)}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
    });

    if (!tgRes.ok) {
      const detail = await tgRes.text();
      console.error('Telegram menolak pesan:', detail);
      return res.status(502).json({ error: 'Gagal mengirim ke Telegram.' });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('notify-kas error:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { materi, jumlahSoal, judul } = req.body || {};

    if (!materi || !jumlahSoal) {
      return res.status(400).json({
        error: 'Body harus berisi materi dan jumlahSoal.'
      });
    }

    const safeJudul = (judul || 'SERTA DPM').trim();
    const safeJumlah = Number(jumlahSoal);

    if (!Number.isFinite(safeJumlah) || safeJumlah <= 0) {
      return res.status(400).json({
        error: 'jumlahSoal harus berupa angka yang valid.'
      });
    }

    let lastError = null;
    let lastParsed = null;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const systemPrompt = `Kamu adalah generator soal ujian yang handal. Pastikan output valid, konsisten, dan sesuai jumlah soal yang diminta. Jangan akhiri output dengan teks lain.`;
      const promptText = buildQuizPrompt(materi, safeJudul, safeJumlah);

      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          response_format: { type: 'json_object' },
          max_tokens: 3000,
          temperature: 0.6,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: promptText }
          ]
        })
      });

      const data = await groqRes.json();

      if (!groqRes.ok) {
        lastError = data?.error?.message || 'Groq gagal memproses request.';
        continue;
      }

      const content = data?.choices?.[0]?.message?.content || '';
      const parsed = normalizeJsonArray(content);

      if (!parsed || !parsed.length) {
        lastError = 'Groq mengembalikan format JSON yang tidak valid.';
        continue;
      }

      lastParsed = parsed;

      if (parsed.length >= safeJumlah) {
        return res.json({ result: parsed.slice(0, safeJumlah) });
      }

      lastError = `AI menghasilkan ${parsed.length} soal, tetapi diminta ${safeJumlah}.`;
    }

    if (lastParsed && lastParsed.length) {
      return res.json({ result: lastParsed.slice(0, safeJumlah) });
    }

    return res.status(500).json({
      error: lastError || 'Groq tidak dapat menghasilkan soal yang sesuai dengan jumlah yang diminta.',
      expected: safeJumlah
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Terjadi kesalahan pada server.'
    });
  }
});

// ==========================================
// 7. START SERVER
// ==========================================
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Frontend target: ${FRONTEND_URL}`);
  });
}

module.exports = app;