const STORAGE_KEY = "diebel_reviews";

export async function loadReviews(productId) {
  try {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const res = await fetch(`${base}/api/reviews?productId=${productId}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch {}
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const all = data ? JSON.parse(data) : {};
    return all[productId] || [];
  } catch {
    return [];
  }
}

export function saveReview(productId, review) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  all[productId] = all[productId] || [];
  all[productId].unshift(review);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
