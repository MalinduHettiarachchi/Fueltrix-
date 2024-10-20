import React from 'react';
import './login.css';
import img from './logo.png'


function Login() {
  return (
    <div className="two-column-container">
      <div className="leftc">
      <img src={img} alt="Fuletrix" className="left-image" />
      </div>
      <div className="rightc">
        <p className="login">Login</p>
        <label className="loginun">Login to your FULETRIX account.</label>
        <p className="email-label">Email</p>
        <div className="form-group">
          <input type="email" placeholder="Your email address" className="email-input" />
        </div>
        <p className="password-label">Password</p>
        <div className="form-group">
          <input type="password" placeholder="Your password" className="password-input" />
        </div>
        <button className="sign-in"><a href="/signin">SIGN IN</a></button>
        <p className="buyn">Don't have a FUELTRIX package? <span><a href="/buy">Buy Now</a></span></p>
      </div>
    </div>
  );
}

export default Login;
