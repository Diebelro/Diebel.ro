import React from "react";
import { Link } from "react-router-dom";
import "./InfoPage.css";

function LivrareRetur() {
  return (
    <div className="info-page">
      <Link to="/" className="info-back">← Acasă</Link>
      <h1>Livrare & Retur</h1>
      <h2>Livrare</h2>
      <p>Livrăm în toată țara. Timpul de livrare estimat: 2-5 zile lucrătoare.</p>
      <h2>Retur</h2>
      <p>Produsele nefolosite pot fi returnate în termen de 14 zile de la primire.</p>
    </div>
  );
}

export default LivrareRetur;
