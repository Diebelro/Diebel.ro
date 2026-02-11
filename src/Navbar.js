import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar-pro">
    <div className="navbar-inner">
      <Link className="brand" to="/">Diebel Parfum</Link>
      <ul className="nav-links">
        <li><NavLink to="/home" end>Acasă</NavLink></li>
        <li><NavLink to="/men">Bărbați</NavLink></li>
        <li><NavLink to="/women">Femei</NavLink></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
