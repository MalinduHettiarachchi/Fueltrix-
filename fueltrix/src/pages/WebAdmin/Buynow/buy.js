import React from 'react';
import '../Buynow/buy.css';
import Navbarr from '../NavBarr/navbarr';

function Buy() {
  return (
    <div className="buy-page">
      <Navbarr /> {/* Navbar at the top */}
      <div className="two-column-container">
        <div className="leftc">
        <p className="fueltrix">Join With US . </p>
        <p className="link">www.fuletrix.com</p>
        </div>
        <div className="rightc">
        <label className="loginun">Request to FULETRIX.</label>
        <p className="email-label">Company</p>
        <div className="form-group">
          <input type="email" placeholder="Company Name" className="email-input" />
        </div>
        <p className="password-label">Email</p>
        <div className="form-group">
          <input type="password" placeholder="Email" className="password-input" />
        </div>
        <p className="email-label">Package</p>
        <div className="form-group">
          <input type="email" placeholder="Not yet develope" className="email-input" />
        </div>
        <button className="sign-in"><a href="/sumbit">SUBMIT</a></button>
        </div>
      </div>
    </div>
  );
}

export default Buy;
