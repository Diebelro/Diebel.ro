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

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { items } = req.body || {};

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const lineItems = items
    .map((item) => {
      const priceId = PRICE_IDS[item.id];
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      if (!priceId || qty < 1) return null;
      return {
        price: priceId,
        quantity: qty,
        adjustable_quantity: { enabled: false },
      };
    })
    .filter(Boolean);

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
