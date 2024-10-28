import React from "react";
import "../Footer/footer.css";
import Payimg from '../Footer/pay.png'

function footer() {
  return (
    <div className="ft">
        <div className="footer-links">
        <div className="column">
          <div>
            <i className="fab fa-whatsapp"></i>
            <span> WhatsApp</span>
            <p>+94 770085670</p>
          </div>
          <h4>FUELTIX Card</h4>
          <ul>
            <li><a href="/buy">Buy Now</a></li>
            <li><a href="/ourteam">Our Team</a></li>
            <li><a href="/card">Custom Card</a></li>
            <li><a href="/review">Review</a></li>
          </ul>
        </div>
        <div className="column">
          <div>
            <i className="fas fa-phone"></i>
            <span> Call us</span>
            <p>+94 770085670</p>
          </div>
          <h4>Help & Support</h4>
          <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="column">
          <div>
            <i className="fas fa-envelope"></i>
            <span> Mail us</span>
            <p>fueltixsl@gmail.com</p>
          </div>
          <h4>Social Media</h4>
          <ul className="social-icons">
          <li>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook"></i>
    </a>
  </li>
  <li>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  </li>
  <li>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
  </li>
  <li>
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin"></i>
    </a>
  </li>
          </ul>
        </div>
      </div>

      <div className="footer-payment">
        <img src={Payimg} alt="Payment Methods" />
      </div>

      <div className="footer-bottom">
        <p>© 2024 FUELTIX | Powered by FUELTIX IT</p>
      </div>
    </div>
  );
}

export default footer;
