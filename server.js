require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error('GROQ_API_KEY is missing. Add it to the .env file.');
  process.exit(1);
}

app.use(cors());
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

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'dpm-pov-groq-backend' });
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

    const systemPrompt = `Kamu adalah generator soal ujian yang handal. Balas hanya dalam format JSON valid yang dapat diparsing. Jangan berikan teks tambahan. Pastikan output adalah JSON yang valid dan gunakan kata JSON dalam instruksi ini.`;
    const promptText = `Buatkan ${safeJumlah} soal pilihan ganda (4 opsi) mengenai materi berikut:\n${materi}\n\nJudul kuis: ${safeJudul}\n\nOUTPUT HARUS FORMAT JSON ARRAY MURNI: [{"soal":"...","opsi":["A","B","C","D"],"kunci":0}]`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: promptText }
        ],
        temperature: 0.7
      })
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      return res.status(502).json({
        error: data?.error?.message || 'Groq gagal memproses request.'
      });
    }

    const content = data?.choices?.[0]?.message?.content || '';
    const parsed = normalizeJsonArray(content);

    if (!parsed || !parsed.length) {
      return res.status(500).json({
        error: 'Groq mengembalikan format JSON yang tidak valid.',
        raw: content
      });
    }

    return res.json({ result: parsed });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Terjadi kesalahan pada server.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
