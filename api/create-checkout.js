const Stripe = require("stripe");

// Adaugă în Vercel: Project Settings > Environment Variables:
// STRIPE_SECRET_KEY, STRIPE_PRICE_MEN, STRIPE_PRICE_WOMEN
const PRICE_IDS = {
  "men-1": process.env.STRIPE_PRICE_MEN,
  "women-1": process.env.STRIPE_PRICE_WOMEN,
};

module.exports = async (req, res) => {
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
  const { items } = body || {};

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  // Consolidează produsele duplicate și parsează cantitatea corect
  const byId = {};
  for (const item of items) {
    const id = item.id;
    if (!PRICE_IDS[id]) continue;
    const qty = Math.max(1, Math.floor(Number(item.quantity)) || 1);
    byId[id] = (byId[id] || 0) + qty;
  }

  const lineItems = Object.entries(byId).map(([id, qty]) => ({
    price: PRICE_IDS[id],
    quantity: qty,
    adjustable_quantity: {
      enabled: true,
      minimum: 1,
      maximum: 99,
    },
  }));

  if (lineItems.length === 0) {
    return res.status(400).json({
      error: "Configure STRIPE_PRICE_MEN și STRIPE_PRICE_WOMEN în Vercel Environment Variables",
    });
  }

  try {
    const origin = req.headers.origin
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
      || "https://diebel.ro";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/?success=1`,
      cancel_url: `${origin}/cos?canceled=1`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
