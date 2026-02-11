import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfume.css';

const CheckoutForm = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-container">
      <h2 className="title">Formular Comandă</h2>
      <form className="checkout-form">
        <input type="text" placeholder="Nume" className="form-input" />
        <input type="email" placeholder="Email" className="form-input" />
        <input type="number" placeholder="Cantitate" className="form-input" />
        <button type="submit" className="buy-button">Trimite Comanda</button>
      </form>

      {/* Buton Înapoi */}
      <button onClick={() => navigate(-1)} className="back-button">
        Înapoi
      </button>
    </div>
  );
};

export default CheckoutForm;
