import React from "react";
import { Link } from "react-router-dom";
import "./InfoPage.css";

function Termeni() {
  return (
    <div className="info-page">
      <Link to="/" className="info-back">← Acasă</Link>
      <h1>Termeni și condiții</h1>
      <p>Utilizând acest site, acceptați termenii și condițiile noastre.</p>
      <h2>Comandă și plată</h2>
      <p>Plata se efectuează la finalizarea comenzii. Acceptăm plăți online prin card.</p>
      <h2>Confidențialitate</h2>
      <p>Datele dumneavoastră sunt protejate și nu sunt partajate cu terți.</p>
      <h2>Contact</h2>
      <p>Pentru întrebări: contact@diebel.ro</p>
    </div>
  );
}

export default Termeni;
