import React, { useState, useEffect } from "react";
import "./ReviewForm.css";

const STORAGE_KEY = "diebel_reviews";

function loadReviews(productId) {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const all = data ? JSON.parse(data) : {};
    return all[productId] || [];
  } catch {
    return [];
  }
}

function saveReview(productId, review) {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  all[productId] = all[productId] || [];
  all[productId].unshift(review);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function ReviewForm({ productId = "men" }) {
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(loadReviews(productId));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (text) {
      const review = { comment: text, date: new Date().toISOString() };
      saveReview(productId, review);
      setReviews((prev) => [review, ...prev]);
      setMessage("");
    }
  };

  return (
    <section className="reviews-section">
      <h3>Recenzii</h3>
      {reviews.length > 0 && (
        <ul className="reviews-list">
          {reviews.map((r, i) => (
            <li key={(r.date || "") + i} className="review-item">
              <p className="review-comment">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          className="review-textarea"
          placeholder="Scrie mesajul tău..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          required
        />
        <button type="submit" className="review-submit">
          Trimite
        </button>
      </form>
    </section>
  );
}

export default ReviewForm;
