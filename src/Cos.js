import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Cos.css";

function Cos() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckoutAll = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const base = window.location.origin;
      const res = await fetch(`${base}/api/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(({ id, quantity }) => {
            const q = Math.max(1, Math.floor(Number(quantity)) || 1);
            return { id, quantity: q };
          }),
        }),
      });
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        setError(
          "Checkout-ul funcționează doar pe site-ul live (diebel.ro). Configurează Stripe în Vercel și deploy-ează proiectul."
        );
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

  return (
    <div className="cos-page">
      <Link to="/" className="cos-back">← Acasă</Link>
      <h1>Coșul tău</h1>

      {cart.length === 0 ? (
        <div className="cos-empty">
          <p>Coșul tău este gol.</p>
          <p>Adaugă produse din colecțiile noastre:</p>
          <div className="cos-empty-links">
            <Link to="/men" className="cos-empty-link">Parfum Bărbați</Link>
            <Link to="/women" className="cos-empty-link">Parfum Femei</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="cos-items">
            {cart.map((item) => (
              <div key={item.id} className="cos-item">
                <div className="cos-item-info">
                  <h3>{item.name}</h3>
                  <div className="cos-item-qty">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="cos-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Sterge"
                >
                  Sterge
                </button>
              </div>
            ))}
          </div>
          {error && <p className="cos-error">{error}</p>}
          <button
            type="button"
            className="cos-buy-all"
            onClick={handleCheckoutAll}
            disabled={loading}
          >
            {loading ? "Se încarcă..." : `Cumpără tot (${cart.reduce((s, i) => s + i.quantity, 0)} produse)`}
          </button>
        </>
      )}
    </div>
  );
}

export default Cos;
