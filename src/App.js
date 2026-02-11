import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Landing from "./Landing";
import Home from "./Home";
import MenPerfume from "./MenPerfume";
import WomenPerfume from "./WomenPerfume";

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      {!isLanding && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/men" element={<MenPerfume />} />
          <Route path="/women" element={<WomenPerfume />} />
        </Routes>
      </main>
      {!isLanding && <Footer />}
    </>
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
