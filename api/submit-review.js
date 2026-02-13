const { Redis } = require("@upstash/redis");
const { Resend } = require("resend");
const crypto = require("crypto");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { productId, name, comment, stars } = req.body || {};
  if (!productId || !name || !comment || stars < 1 || stars > 5) {
    return res.status(400).json({ error: "Date invalide: nume, comentariu și stele (1–5) obligatorii" });
  }

  const origin = req.headers.origin || "https://diebel.ro";
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "Diebel Parfum <onboarding@resend.dev>";

  if (!redisUrl || !redisToken) {
    return res.status(500).json({ error: "Configurează Upstash Redis în Vercel (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)" });
  }
  if (!resendKey || !ownerEmail) {
    return res.status(500).json({ error: "Configurează Resend: RESEND_API_KEY și OWNER_EMAIL în Vercel" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const review = {
    productId,
    name: String(name).trim(),
    comment: String(comment).trim(),
    stars: Math.min(5, Math.max(1, Number(stars) || 1)),
    date: new Date().toISOString(),
    status: "pending",
  };

  const redis = new Redis({ url: redisUrl, token: redisToken });
  await redis.set(`review:${token}`, JSON.stringify(review), { ex: 60 * 60 * 24 * 30 }); // 30 zile

  const approveUrl = `${origin}/api/review-action?token=${token}&action=approve`;
  const rejectUrl = `${origin}/api/review-action?token=${token}&action=reject`;
  const productName = productId === "women" ? "Parfum Femei" : "Parfum Bărbați";

  const html = `
    <h2>Recenzie nouă – ${productName}</h2>
    <p><strong>Nume:</strong> ${review.name}</p>
    <p><strong>Stele:</strong> ${"★".repeat(review.stars)}</p>
    <p><strong>Comentariu:</strong></p>
    <p>${review.comment}</p>
    <hr>
    <p>Acceptă sau respinge recenzia:</p>
    <p>
      <a href="${approveUrl}" style="display:inline-block;padding:10px 20px;background:#c9a962;color:#0a0a0a;text-decoration:none;border-radius:6px;margin-right:10px;">✓ Acceptă</a>
      <a href="${rejectUrl}" style="display:inline-block;padding:10px 20px;background:#333;color:#fff;text-decoration:none;border-radius:6px;">✕ Respinge</a>
    </p>
    <p style="font-size:12px;color:#888;">Linkurile expiră în 30 de zile.</p>
  `;

  try {
    const resend = new Resend(resendKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      replyTo: ownerEmail,
      subject: `[Diebel] Recenzie nouă – ${productName} – ${review.name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Eroare la trimiterea emailului: " + (error.message || "unknown") });
    }

    return res.status(200).json({ success: true, message: "Recenzia a fost trimisă. O vei primi pe email pentru aprobare." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Eroare la trimitere" });
  }
};
