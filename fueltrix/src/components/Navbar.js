// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="mainnavbar">
      <div className="navbar-brand">
        <Link to="/">Fueltrix</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/"></Link></li>
        <li><Link to="/vehicle-registration">Services</Link></li>
        <li><Link to="/registrationReq">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/webAdminLogin">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


