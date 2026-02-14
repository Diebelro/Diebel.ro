import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WorkInProgressStamp from "./WorkInProgressStamp";
import Home from "./Home";
import MenPerfume from "./MenPerfume";
import WomenPerfume from "./WomenPerfume";
import Cos from "./Cos";
import Contact from "./Contact";
import LivrareRetur from "./LivrareRetur";
import Termeni from "./Termeni";
import Recenzii from "./Recenzii";
import ProductPage from "./ProductPage";
import ProductMen from "./ProductMen";
import Success from "./Success";
import Cancel from "./Cancel";

function AppContent() {
  const location = useLocation();
  const isPerfumeRoute = location.pathname === "/men" || location.pathname === "/women";

  useEffect(() => {
    document.body.style.overflow = isPerfumeRoute ? "hidden" : "";
  }, [isPerfumeRoute]);

  return (
    <div className={`app-layout${isPerfumeRoute ? " perfume-route" : ""}`}>
        <WorkInProgressStamp />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<MenPerfume />} />
            <Route path="/women" element={<WomenPerfume />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/product-men" element={<ProductMen />} />
            <Route path="/cos" element={<Cos />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/livrare-retur" element={<LivrareRetur />} />
            <Route path="/termeni" element={<Termeni />} />
            <Route path="/recenzii/:productId" element={<Recenzii />} />
          </Routes>
        </main>
        <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
