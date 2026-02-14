import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Success() {
  return (
    <div style={{ padding: "3rem", textAlign: "center", minHeight: "50vh" }}>
      <h1 style={{ color: "var(--color-gold)", marginBottom: "1rem" }}>
        Plata a fost efectuată cu succes!
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
        Îți mulțumim pentru comandă. Vei primi confirmarea pe email.
      </p>
      <Link to="/" className="cos-empty-link" style={{ padding: "0.75rem 1.5rem", display: "inline-block" }}>
        ← Înapoi la pagina principală
      </Link>
    </div>
  );
}
