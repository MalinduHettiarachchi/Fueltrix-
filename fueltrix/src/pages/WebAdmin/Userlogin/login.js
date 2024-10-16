import React from 'react';
import './login.css';
import img from '../Userlogin/Fueltixlogo2.png'

function Login() {
  return (
    <div className="two-column-container">
      <div className="leftc">
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
        <p className="dont">Don't remember password?</p>
        <button className="sign-in">SIGN IN</button>
        <p className="buy-now">Don't have a FUELTRIX package? <span>Buy Now</span></p>
      </div>
    </div>
  );
}

export default Login;
