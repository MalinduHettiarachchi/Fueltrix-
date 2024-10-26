import React from 'react'
import '../Footer/footer.css'

function footer() {
  return (
    <div className='ft'>
      <div className="footer-contact">
        <div>
          <i className="fab fa-whatsapp"></i>
          <span>WhatsApp</span>
          <p>+94 711691008</p>
        </div>
        <div>
          <i className="fas fa-phone"></i>
          <span>Call us</span>
          <p>+94 711691008</p>
        </div>
        <div>
          <i className="fas fa-envelope"></i>
          <span>Mail us</span>
          <p>info@luxncard.com</p>
        </div>
      </div>

      <div className="footer-links">
        <div className="column">
        <i className="fab fa-whatsapp"></i>
          <span>WhatsApp</span>
          <p>+94 711691008</p>
          <h4>LUXN Card</h4>
          <ul>
            <li>Buy Now</li>
            <li>Custom Card</li>
            <li>For Teams</li>
            <li>LUXN Review</li>
            <li>Blogs</li>
            <li>Login</li>
          </ul>
        </div>
        <div className="column">
          <h4>Help & Support</h4>
          <ul>
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Terms Of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="column">
          <h4>Social Media</h4>
          <ul className="social-icons">
            <li><i className="fab fa-facebook"></i></li>
            <li><i className="fab fa-instagram"></i></li>
            <li><i className="fab fa-twitter"></i></li>
            <li><i className="fab fa-linkedin"></i></li>
            <li><i className="fab fa-tiktok"></i></li>
          </ul>
        </div>
      </div>

      <div className="footer-payment">
        <img src="path-to-your-payment-icons.png" alt="Payment Methods" />
      </div>

      <div className="footer-bottom">
        <p>© 2024 LUXN | Powered by LUXN IT</p>
      </div>
    </div>
  )
}

export default footer
