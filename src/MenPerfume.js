import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import men1 from "./assets/men/men1.jpg";
import men2 from "./assets/men/men2.jpg";
import ReviewForm from "./ReviewForm";
import "./Perfume.css";

const images = [men1, men2];
const MIN_QTY = 1;
const MAX_QTY = 99;

function MenPerfume() {
  const { addToCart } = useCart();
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const base = window.location.origin;
      const res = await fetch(`${base}/api/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: "men-1", quantity: Math.max(1, Number(quantity) || 1) }],
        }),
      });
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        setCheckoutError(
          "Checkout-ul funcționează doar pe site-ul live (diebel.ro). Rulează „vercel dev” local sau deploy-ează pe Vercel."
        );
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setCheckoutError(data.error || "Eroare la checkout");
    } catch (err) {
      setCheckoutError(err.message || "Eroare la conexiune");
    } finally {
      setCheckoutLoading(false);
    }
  };
  const handleAddToCart = () => {
    addToCart({
      id: "men-1",
      name: "Parfum Bărbați",
      quantity,
    });
  };

  return (
    <div className="perfume-page">
      <Link to="/" className="perfume-back">
        ← Acasă
      </Link>
      <button
        type="button"
        className="arrow arrow-left"
        onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
        aria-label="Imaginea anterioară"
      >
        ‹
      </button>
      <img
        src={images[index]}
        alt="Diebel Parfum Bărbați"
        className="full-image"
      />
      <button
        type="button"
        className="arrow arrow-right"
        onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
        aria-label="Imaginea următoare"
      >
        ›
      </button>
      {index === 0 && (
      <div className="perfume-bottom">
      <div className="buy-section buy-section-pro">
        <span className="buy-section-label">Parfum Bărbați</span>
        <div className="quantity-row">
          <span className="quantity-label">Cantitate</span>
          <div className="quantity-controls">
            <button
              type="button"
              className="quantity-btn"
              onClick={() => setQuantity((q) => (q <= MIN_QTY ? q : q - 1))}
              aria-label="Micșorează cantitatea"
            >
              −
            </button>
            <input
              type="number"
              min={MIN_QTY}
              max={MAX_QTY}
              value={quantity}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!Number.isNaN(v)) setQuantity(Math.min(MAX_QTY, Math.max(MIN_QTY, v)));
              }}
              className="quantity-input"
              aria-label="Cantitate"
            />
            <button
              type="button"
              className="quantity-btn"
              onClick={() => setQuantity((q) => (q >= MAX_QTY ? q : q + 1))}
              aria-label="Mărește cantitatea"
            >
              +
            </button>
          </div>
        </div>
        {checkoutError && <p className="cos-error" style={{ marginTop: "0.5rem" }}>{checkoutError}</p>}
        <div className="buy-buttons">
          <button type="button" className="buy-button buy-button-pro" onClick={handleCheckout} disabled={checkoutLoading}>
            {checkoutLoading ? "Se încarcă..." : "Cumpără"}
          </button>
          <button type="button" className="buy-button buy-button-cart" onClick={handleAddToCart}>
            Adaugă în coș
          </button>
        </div>
      </div>
      <ReviewForm productId="men" />
      </div>
      )}
    </div>
  );
}

export default MenPerfume;
