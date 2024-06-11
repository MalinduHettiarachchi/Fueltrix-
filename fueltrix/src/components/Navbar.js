// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Fueltrix</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Welcome</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/user-registration">Services</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
