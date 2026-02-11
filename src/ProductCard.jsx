import React, { useState } from "react";
import "./index.css"; // aici ai stilurile

function ProductCard({ productName }) {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    alert(`Ai ales ${quantity} bucăți din ${productName}`);
    // aici poți pune logica de checkout (Stripe Payment Link)
  };

  return (
    <div className="product-card">
      <h3>{productName}</h3>
      <div className="quantity-container">
        <label htmlFor="quantity">Cantitate:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button className="buy-button" onClick={handleBuy}>
        Cumpără
      </button>
    </div>
  );
}

export default ProductCard;
