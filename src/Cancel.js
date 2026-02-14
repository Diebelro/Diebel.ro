import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Cancel() {
  return (
    <div style={{ padding: "3rem", textAlign: "center", minHeight: "50vh" }}>
      <h1 style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
        Plata a fost anulată.
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
        Poți continua cumpărăturile oricând.
      </p>
      <Link to="/cos" className="cos-empty-link" style={{ padding: "0.75rem 1.5rem", display: "inline-block", marginRight: "1rem" }}>
        Vezi coșul
      </Link>
      <Link to="/" className="cos-empty-link" style={{ padding: "0.75rem 1.5rem", display: "inline-block" }}>
        ← Acasă
      </Link>
    </div>
  );
}
