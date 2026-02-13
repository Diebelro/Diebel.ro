import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartCount } = useCart();
  return (
    <nav className="navbar-pro">
      <div className="navbar-inner">
        <Link className="brand" to="/">Diebel Parfum</Link>
        <ul className="nav-links">
          <li><NavLink to="/" end>Acasă</NavLink></li>
          <li><NavLink to="/men">Bărbați</NavLink></li>
          <li><NavLink to="/women">Femei</NavLink></li>
          <li>
            <Link to="/cos" className="nav-cart" aria-label={`Coș (${cartCount} produse)`}>
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
