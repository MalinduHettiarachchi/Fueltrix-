import React from 'react';
import './login.css';

function Login() {
  return (
    <div className="two-column-container">
      <div className="leftc">
        <h5>www.fueltrix.com</h5>
      </div>
      <div className="rightc">
        <p className="login">Login</p>
        <label className="loginun">Login to your FULETRIX account.</label>
        <div className="form-group">
          <label className="email-label">Email</label>
          <input type="email" placeholder="Your email address" className="email-input" />
        </div>
        <div className="form-group">
          <label className="password-label">Password</label>
          <input type="password" placeholder="Your password" className="password-input" />
        </div>
        <p className="dont">Don't remember password?</p>
        <button className="sign-in">Sign In</button>
        <p className="buy-now">Don't have a FUELTRIX package? <span>Buy Now</span></p>
      </div>
    </div>
  );
}

export default Login;
