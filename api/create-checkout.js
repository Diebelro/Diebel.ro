const stripeLib = require("stripe");

const PRICE_IDS = {
  "men-1": process.env.STRIPE_PRICE_MEN,
  "women-1": process.env.STRIPE_PRICE_WOMEN,
};

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
  const { items, quantity, productType } = body || {};

  let lineItems;

  // Format simplu: { quantity, productType: "men" | "women" }
  if (quantity != null && productType) {
    const id = productType === "men" ? "men-1" : "women-1";
    const priceId = PRICE_IDS[id];
    if (!priceId) {
      return res.status(400).json({ error: "productType trebuie să fie 'men' sau 'women'" });
    }
    const qty = Math.max(1, Math.floor(Number(quantity)) || 1);
    lineItems = [{
      price: priceId,
      quantity: qty,
      adjustable_quantity: { enabled: true, minimum: 1, maximum: 99 },
    }];
  }
  // Format coș: { items: [{ id, quantity }] }
  else if (items && Array.isArray(items) && items.length > 0) {
    const byId = {};
    for (const item of items) {
      const id = item.id;
      if (!PRICE_IDS[id]) continue;
      const qty = Math.max(1, Math.floor(Number(item.quantity)) || 1);
      byId[id] = (byId[id] || 0) + qty;
    }
    lineItems = Object.entries(byId).map(([id, qty]) => ({
      price: PRICE_IDS[id],
      quantity: qty,
      adjustable_quantity: { enabled: true, minimum: 1, maximum: 99 },
    }));
  } else {
    return res.status(400).json({ error: "Trimite items[] sau quantity + productType" });
  }

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
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
