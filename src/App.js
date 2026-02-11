import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import MenPerfume from "./MenPerfume";
import WomenPerfume from "./WomenPerfume";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<MenPerfume />} />
          <Route path="/women" element={<WomenPerfume />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
