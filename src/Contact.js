import React from "react";
import { Link } from "react-router-dom";
import "./InfoPage.css";

function Contact() {
  return (
    <div className="info-page">
      <Link to="/" className="info-back">← Acasă</Link>
      <h1>Contact</h1>
      <p>Pentru întrebări sau comenzi, ne puteți contacta la:</p>
      <p><strong>Email:</strong> contact@diebel.ro</p>
      <p><strong>Telefon:</strong> [Număr de contact]</p>
    </div>
  );
}

export default Contact;
