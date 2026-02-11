import React from "react";
import { Link } from "react-router-dom";
import menImg from "./assets/men/men1.jpg";
import womenImg from "./assets/women/women1.jpg";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="categories">
        <h2 className="categories-heading">Explorează colecțiile</h2>
        <div className="category-cards">
          <Link to="/men" className="category-card category-card-men">
            <div className="category-card-bg" style={{ backgroundImage: `url(${menImg})` }} />
            <div className="category-card-overlay" />
            <div className="category-card-content">
              <span className="category-label">Pentru el</span>
              <h3>Parfum Bărbați</h3>
              <span className="category-cta">Vezi colecția →</span>
            </div>
          </Link>
          <Link to="/women" className="category-card category-card-women">
            <div className="category-card-bg" style={{ backgroundImage: `url(${womenImg})` }} />
            <div className="category-card-overlay" />
            <div className="category-card-content">
              <span className="category-label">Pentru ea</span>
              <h3>Parfum Femei</h3>
              <span className="category-cta">Vezi colecția →</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
