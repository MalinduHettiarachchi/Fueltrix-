import React from 'react';
import Navbar from '../NavBarr/navbarr';
import Footer from '../Footer/footer';
import './contact.css';

function Contact() {
  return (
    <div>
      <Navbar/>
      <div className="ccontact">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p><i className="fas fa-envelope"></i> <strong>Email:</strong> coventry@gmail.com</p>
          <p><i className="fas fa-phone-alt"></i> <strong>Hotline:</strong> +94 71 169 1008</p>
          <p><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> COVENTRY, Hakmana Road, Gabada Veediya, Matara, LK</p>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-tiktok"></i>
          </div>
        </div>
        <div className="contactform">
          <form >
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Mobile" />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" required></textarea>
            <button type="csubmit">SUBMIT</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Contact;
