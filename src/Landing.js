import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <div className="landing-yellow-patch" />
      <h1 className="landing-title">DIEBEL PARFUM</h1>
      <Link to="/home" className="landing-enter">
        Intră
      </Link>
    </div>
  );
}

export default Landing;
