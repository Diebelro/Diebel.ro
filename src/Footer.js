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
        <div>
          <p className="footer-heading">Navigare</p>
          <ul className="footer-links">
            <li><Link to="/">Acasă</Link></li>
            <li><Link to="/men">Parfum Bărbați</Link></li>
            <li><Link to="/women">Parfum Femei</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Social</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Diebel Parfum. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}

export default Footer;
