import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Venues from "./Pages/Venues";
// import VenuesID from "./Pages/VenuesID";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Venues" element={<Venues />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
