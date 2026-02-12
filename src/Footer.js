import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-pro">
      <div className="footer-inner">
        <div className="brand-block">
          <p className="brand-name">Diebel Parfum</p>
          <p className="tagline">Parfumuri de excepție pentru bărbați și femei.</p>
        </div>
        <div className="footer-links-row">
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/livrare-retur" className="footer-link">Livrare & Retur</Link>
          <Link to="/termeni" className="footer-link">Termeni și condiții</Link>
        </div>
        <div>
          <p className="footer-heading">Social</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Diebel. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}

export default Footer;
