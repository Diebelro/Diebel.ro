const { Redis } = require("@upstash/redis");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { productId } = req.query || {};
  if (!productId || !["men", "women"].includes(productId)) {
    return res.status(400).json({ error: "productId invalid (men sau women)" });
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    return res.status(200).json([]); // fallback: returnează listă goală
  }

  const redis = new Redis({ url: redisUrl, token: redisToken });
  const raw = await redis.get(`reviews:approved:${productId}`);
  const list = Array.isArray(raw) ? raw : (raw ? JSON.parse(raw) : []);
  return res.status(200).json(list);
};
