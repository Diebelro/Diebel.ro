import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { loadReviews } from "./reviewsData";
import "./Recenzii.css";

const PRODUCT_NAMES = { men: "Parfum Bărbați", women: "Parfum Femei" };

function Recenzii() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const reviewAction = searchParams.get("review");
  const id = productId === "women" ? "women" : "men";
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showThanks, setShowThanks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    loadReviews(id).then(setReviews);
  }, [id, reviewAction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameTrim = name.trim();
    const text = message.trim();
    if (!nameTrim || !text || stars < 1) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const base = window.location.origin;
      const res = await fetch(`${base}/api/submit-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, name: nameTrim, comment: text, stars }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setName("");
        setMessage("");
        setStars(0);
        setShowThanks(true);
        setTimeout(() => setShowThanks(false), 4000);
      } else {
        setSubmitError(data.error || "Eroare la trimitere. Încearcă din nou.");
      }
    } catch (err) {
      setSubmitError("Eroare la conexiune. Recenzia funcționează pe diebel.ro după configurare.");
    } finally {
      setLoading(false);
    }
  };

  const displayStars = hoverStars || stars;
  const sortedReviews = [...reviews].sort((a, b) => (b.stars || 0) - (a.stars || 0));

  return (
    <div className="recenzii-page">
      <Link to={id === "men" ? "/men" : "/women"} className="recenzii-back">
        ← Înapoi
      </Link>
      <div className="recenzii-content">
        <h1>Recenzii – {PRODUCT_NAMES[id]}</h1>
        {showThanks && (
          <p className="review-thanks">Mulțumim! Recenzia ta a fost trimisă. O vei primi pe email pentru aprobare.</p>
        )}
        {reviewAction === "approved" && (
          <p className="review-thanks">Recenzia a fost aprobată și apare pe site.</p>
        )}
        {submitError && <p className="cos-error">{submitError}</p>}
        <div className="recenzii-list">
          {sortedReviews.length === 0 ? (
            <p className="recenzii-empty">Nicio recenzie încă. Fii primul!</p>
          ) : (
            sortedReviews.map((r, i) => (
              <article key={(r.date || "") + i} className="recenzii-item">
                <span className="review-stars">{"★".repeat(r.stars || 0)}</span>
                {r.name && <span className="review-name">{r.name}</span>}
                <p className="review-comment">{r.comment}</p>
              </article>
            ))
          )}
        </div>
        <form className="recenzii-form" onSubmit={handleSubmit}>
          <h2>Lasă o recenzie</h2>
          <input
            type="text"
            className="review-name-input"
            placeholder="Numele tău (obligatoriu)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="review-stars-input">
            <span className="stars-label">Evaluare (1–5 stele):</span>
            <div className="stars-select">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={n <= displayStars ? "star-btn active" : "star-btn"}
                  onClick={() => setStars(n)}
                  onMouseEnter={() => setHoverStars(n)}
                  onMouseLeave={() => setHoverStars(0)}
                  aria-label={n + " stele"}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="review-textarea"
            placeholder="Scrie mesajul tău..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            required
          />
          <button type="submit" className="review-submit" disabled={loading}>
            {loading ? "Se trimite..." : "Trimite"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Recenzii;
