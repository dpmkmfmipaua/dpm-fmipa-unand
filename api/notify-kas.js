export default async function handler(req, res) {
  // Hanya izinkan method POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { nama, periode, nominal, buktiUrl, email } = req.body;

    // Ambil token dari Environment Variables Vercel
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({ error: "Server Configuration Error: Missing Environment Variables" });
    }

    const nominalFormat = new Intl.NumberFormat('id-ID').format(nominal || 0);
    const pesan = `📩 *BUKTI KAS BARU MASUK*\n\n👤 *Nama:* ${nama || '-'}\n📧 *Email:* ${email || '-'}\n📅 *Periode:* ${periode || '-'}\n💰 *Nominal:* Rp${nominalFormat}\n📎 *Bukti:* ${buktiUrl || '-'}`;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: pesan,
        parse_mode: "Markdown"
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Telegram API Error:", errText);
      return res.status(500).json({ error: "Gagal mengirim notifikasi ke Telegram" });
    }

    return res.status(200).json({ success: true, message: "Notifikasi terkirim" });
  } catch (err) {
    console.error("Handler Error:", err);
    return res.status(500).json({ error: err.message });
  }
}