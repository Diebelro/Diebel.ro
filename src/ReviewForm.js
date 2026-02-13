import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadReviews } from "./reviewsData";
import "./ReviewForm.css";

function ReviewForm({ productId = "men" }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews(productId).then(setReviews);
  }, [productId]);

  const avgStars = reviews.length
    ? Math.round(reviews.reduce((s, r) => s + (r.stars || 0), 0) / reviews.length)
    : 0;

  return (
    <section className="reviews-section reviews-section-compact">
      <Link to={`/recenzii/${productId}`} className="reviews-button">
        <span className="reviews-button-text">Recenzii</span>
        <span className="reviews-button-stars">
          {avgStars > 0 ? "★".repeat(avgStars) : "★"}
        </span>
        {reviews.length > 0 && (
          <span className="reviews-button-count">({reviews.length})</span>
        )}
      </Link>
    </section>
  );
}

export default ReviewForm;
