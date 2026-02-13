import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Perfume.css";

const PRODUCTS = {
  men: { id: "men-1", name: "Parfum Bărbați" },
  women: { id: "women-1", name: "Parfum Femei" },
};

export default function ProductPage() {
  const { productId } = useParams();
  const product = PRODUCTS[productId] || PRODUCTS.men;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const increase = () => setQuantity((q) => Math.min(99, q + 1));
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${window.location.origin}/api/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: product.id, quantity: Math.max(1, Number(quantity) || 1) }],
        }),
      });
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        setError("Checkout-ul funcționează doar pe diebel.ro. Rulează „vercel dev” local.");
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Eroare la checkout");
    } catch (err) {
      setError(err.message || "Eroare la conexiune");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, quantity });
  };

  return (
    <div className="perfume-page" style={{ padding: "2rem" }}>
      <Link to="/" className="perfume-back">← Acasă</Link>
      <h2>{product.name}</h2>
      <div className="quantity-row">
        <span className="quantity-label">Cantitate</span>
        <div className="quantity-controls">
          <button type="button" className="quantity-btn" onClick={decrease} aria-label="Micșorează">−</button>
          <span style={{ minWidth: "2rem", textAlign: "center" }}>{quantity}</span>
          <button type="button" className="quantity-btn" onClick={increase} aria-label="Mărește">+</button>
        </div>
      </div>
      {error && <p className="cos-error">{error}</p>}
      <div className="buy-buttons" style={{ marginTop: "1rem" }}>
        <button type="button" className="buy-button buy-button-pro" onClick={handleBuy} disabled={loading}>
          {loading ? "Se încarcă..." : "Cumpără"}
        </button>
        <button type="button" className="buy-button buy-button-cart" onClick={handleAddToCart}>
          Adaugă în coș
        </button>
      </div>
    </div>
  );
}
