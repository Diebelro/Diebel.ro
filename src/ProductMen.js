import { useState } from "react";
import { Link } from "react-router-dom";
import "./Perfume.css";

export default function ProductMen() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const increase = () => setQuantity((q) => Math.min(99, q + 1));
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${window.location.origin}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, productType: "men" }),
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

  return (
    <div className="perfume-page" style={{ padding: "2rem" }}>
      <Link to="/" className="perfume-back">← Acasă</Link>
      <h2>Parfum Bărbați</h2>
      <div className="quantity-row">
        <div className="quantity-controls">
          <button type="button" className="quantity-btn" onClick={decrease}>−</button>
          <span style={{ minWidth: "2rem", textAlign: "center" }}>{quantity}</span>
          <button type="button" className="quantity-btn" onClick={increase}>+</button>
        </div>
      </div>
      {error && <p className="cos-error">{error}</p>}
      <button
        type="button"
        className="buy-button buy-button-pro"
        onClick={handleBuy}
        disabled={loading}
      >
        {loading ? "Se încarcă..." : "Cumpără"}
      </button>
    </div>
  );
}
