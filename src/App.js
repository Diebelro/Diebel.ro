import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import MenPerfume from "./MenPerfume";
import WomenPerfume from "./WomenPerfume";
import Cos from "./Cos";
import Contact from "./Contact";
import LivrareRetur from "./LivrareRetur";
import Termeni from "./Termeni";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<MenPerfume />} />
          <Route path="/women" element={<WomenPerfume />} />
          <Route path="/cos" element={<Cos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/livrare-retur" element={<LivrareRetur />} />
          <Route path="/termeni" element={<Termeni />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
