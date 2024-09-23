import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Venues from "./Pages/Venues";
import Venue from "./Pages/Venue";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ManagerDashboard from "./Pages/ManagerDashboard";

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/Holidaze" element={<Home />} />
          <Route path="/Venues" element={<Venues />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/venues/:venueId" element={<Venue />} />
          <Route path="/venue-manager" element={<ManagerDashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
