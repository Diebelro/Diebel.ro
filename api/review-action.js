const { Redis } = require("@upstash/redis");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed");
  }

  const { token, action } = req.query || {};
  const origin = req.headers.origin || req.headers.referer || "https://diebel.ro";

  if (!token || !action || !["approve", "reject"].includes(action)) {
    return res.redirect(`${origin}/cos?review=error`);
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    return res.redirect(`${origin}/cos?review=config`);
  }

  const redis = new Redis({ url: redisUrl, token: redisToken });
  const raw = await redis.get(`review:${token}`);
  if (!raw) {
    return res.redirect(`${origin}/cos?review=expired`);
  }

  const review = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (review.status !== "pending") {
    return res.redirect(`${origin}/cos?review=already`);
  }

  if (action === "approve") {
    review.status = "approved";
    await redis.set(`review:${token}`, JSON.stringify(review), { ex: 60 * 60 * 24 * 365 }); // 1 an
    const key = `reviews:approved:${review.productId}`;
    const list = await redis.get(key);
    const arr = Array.isArray(list) ? list : (list ? JSON.parse(list) : []);
    arr.unshift({ name: review.name, comment: review.comment, stars: review.stars, date: review.date });
    await redis.set(key, JSON.stringify(arr.slice(0, 200)), { ex: 60 * 60 * 24 * 365 });
    return res.redirect(`${origin}/recenzii/${review.productId}?review=approved`);
  }

  if (action === "reject") {
    review.status = "rejected";
    await redis.set(`review:${token}`, JSON.stringify(review), { ex: 60 * 60 * 24 * 7 });
    return res.redirect(`${origin}/cos?review=rejected`);
  }

  return res.redirect(`${origin}/cos?review=error`);
};
