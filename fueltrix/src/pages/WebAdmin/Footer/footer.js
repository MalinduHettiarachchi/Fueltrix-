import React from "react";
import './footer.css';
import { FaPhoneAlt, FaEnvelope, FaSkype } from 'react-icons/fa';
import { FaTwitter, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Logo Section */}
          <div className="footer-logo-section">
            <h1 className="footer-brand">Fueltrix</h1>
            <p className="footer-tagline">
              Overall client rating is 4.9 out<br /> of 10,000 Clients for Fueltrix.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaFacebook /></a>
              <a href="#" className="social-icon"><FaYoutube /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
            </div>
            <button className="brochure-btn">
            <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
              Contact Us
            </Link>
          </button>       
             </div>

          {/* For Work Inquiry Section */}
          <div className="footer-section">
            <h3 className="section-title">For Work Inquiry</h3>
            <ul className="contact-list">
              <li><FaPhoneAlt className="icon" /> +94 76 941 7154</li>
              <li><FaPhoneAlt className="icon" /> +94 77 008 5670</li>
              <li><FaEnvelope className="icon" /> career@fueltrix.lk</li>
              <li><FaEnvelope className="icon" /> info@fueltrix.lk</li>
              <li><FaSkype className="icon" /> fueltrix-skype</li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="footer-section">
  <h3 className="section-title">Company</h3>
  <ul className="link-list">

    <li className="desktop-only">
      <a href="/buy">Buy Now</a>
    </li>
    <li className="desktop-only">
      <a href="/ourteam">Our Team</a>
    </li>
    <li className="desktop-only">
      <a href="/about">About</a>
    </li>
    <li className="desktop-only">
      <a href="/contact">Contact</a>
    </li>
  </ul>
</div>


          {/* Services Section */}
          <div className="footer-section">
            <h3 className="section-title">Services</h3>
            <ul className="link-list">
            <li>Real-Time Fuel Delivery Tracking</li>
              <li>Fuel Inventory Management System</li>
              <li>Mobile App for Fuel Station Monitoring</li>
              <li>Advanced Analytics for Fuel Operations</li>
              <li>Fuel Theft Detection and Alerts</li>
              <li>Custom Reports for Fuel Usage</li>
            </ul>
          </div>

          {/* Industries Section */}

          <div className="footer-section">
          <div className="corner-section">

            <h3 className="section-title">Industries</h3>
            <ul className="link-list">
            <li>Transportation</li>
              <li>Construction</li>
              <li>Manufacturing</li>
              <li>Logistics</li>
              <li>Oil & Gas</li>
              <li>Agriculture</li>
            </ul>
          </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>We actively prevent unauthorized use and piracy of our content.</p>
          <p className="copyright">
          <p>Copyright © 2024 Fueltrix. All rights reserved. | Designed and Developed by Fueltrix IT (Pvt) Ltd</p>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;