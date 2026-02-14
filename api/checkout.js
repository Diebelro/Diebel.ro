const stripeLib = require("stripe");

module.exports = async (req, res) => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "STRIPE_SECRET_KEY nu este setat în Vercel" });
  }
  const stripe = new stripeLib(secretKey);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const { quantity, productType } = body || {};

  if (!quantity || !productType) {
    return res.status(400).json({ error: "Missing quantity or productType" });
  }

  const priceId =
    productType === "men"
      ? process.env.STRIPE_PRICE_MEN
      : process.env.STRIPE_PRICE_WOMEN;

  if (!priceId) {
    return res.status(400).json({
      error: "Configure STRIPE_PRICE_MEN și STRIPE_PRICE_WOMEN în Vercel",
    });
  }

  try {
    const origin = req.headers.origin
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
      || "https://diebel.ro";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: Math.max(1, Math.floor(Number(quantity)) || 1),
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 99 },
        },
      ],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err.message });
  }
};
