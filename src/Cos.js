import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Cos.css";

function Cos() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = (stripeUrl, quantity) => {
    const url = new URL(stripeUrl);
    if (quantity > 1) url.searchParams.set("quantity", quantity);
    window.location.href = url.toString();
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
              <div className="cos-item-actions">
                <button
                  type="button"
                  className="cos-buy-btn"
                  onClick={() => handleCheckout(item.stripeUrl, item.quantity)}
                >
                  Cumpără
                </button>
                <button
                  type="button"
                  className="cos-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Sterge"
                >
                  Sterge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cos;
