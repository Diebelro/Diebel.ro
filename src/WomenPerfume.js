import React, { useState } from "react";
import { Link } from "react-router-dom";
import women1 from "./assets/women/women1.jpg";
import women2 from "./assets/women/women2.jpg";
import "./Perfume.css";

const images = [women1, women2];

const MIN_QTY = 1;
const MAX_QTY = 99;

function WomenPerfume() {
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const handleCheckout = () => {
    const url = new URL("https://buy.stripe.com/test_5kQdRb5M4g2MgKhcXW1ck01");
    if (quantity > 1) url.searchParams.set("quantity", quantity);
    window.location.href = url.toString();
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
        alt="Diebel Parfum Femei"
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
      <div className="buy-section buy-section-pro">
        <span className="buy-section-label">Parfum Femei</span>
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
        <button type="button" className="buy-button buy-button-pro" onClick={handleCheckout}>
          Cumpără {quantity} {quantity === 1 ? "bucată" : "bucăți"}
        </button>
      </div>
    </div>
  );
}

export default WomenPerfume;
