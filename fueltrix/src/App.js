// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserRegistration from './pages/Admin/UserRegistration';
import VehicleRegistration from './pages/Admin/VehicleRegistration';
import ShedRegistration from './pages/Admin/ShedRegistration';
import ViewDetails from './pages/Admin/ViewDetails';
import ViewSummary from './pages/Admin/ViewSummary';
import Settings from './pages/Admin/Setting';
import AdminNavbar from './pages/Admin/AdminNavbar';
import ViewLocation from './pages/Admin/ViewLocation'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/vehicle-registration" element={<VehicleRegistration />} />
          <Route path="/shed-registration" element={<ShedRegistration />} />
          <Route path="/view-details" element={<ViewDetails />} />
          <Route path="/view-summary" element={<ViewSummary />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/adminNavbar" element={<AdminNavbar />} />
          <Route path="/viewlocation" element={<ViewLocation />} />



          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
