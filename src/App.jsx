import React from "react";
import { Routes, Route } from "react-router-dom";
import FontLoader from "./components/FontLoader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";
import Academics from "./pages/Academics";
import StudentLife from "./pages/StudentLife";
import News from "./pages/News";
import Alumni from "./pages/Alumni";
import AlumniSubmit from "./pages/AlumniSubmit";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="mnss-app min-h-screen">
      <FontLoader />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/students" element={<StudentLife />} />
        <Route path="/news" element={<News />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/alumni/submit" element={<AlumniSubmit />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}
