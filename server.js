require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8000';
const GROQ_MODEL = (process.env.GROQ_MODEL || 'llama3-8b-8192').trim();

if (!GROQ_API_KEY) {
  console.error('GROQ_API_KEY is missing. Add it to the .env file or Vercel/Railway environment variables.');
  if (process.env.VERCEL !== '1') {
    process.exit(1);
  }
}

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.json({ limit: '2mb' }));

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

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'dpm-pov-groq-backend', status: 'running' });
});

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'dpm-pov-groq-backend',
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: FRONTEND_URL
  });
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

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Frontend target: ${FRONTEND_URL}`);
  });
}

module.exports = app;
