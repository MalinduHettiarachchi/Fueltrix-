import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './login.css';
import img from './logo.png';
import { useNavigate } from "react-router-dom";
import Imgback from "../Userlogin/back.png";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate(data.redirect, { state: { userDetails: data.userDetails, email } });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="bg-color-login">
      <div className="two-column-container-login">
        <div className="leftc">
          <button
            className="lback-button"
            onClick={() => navigate('/fueltrix')}
          >
            <img
              src={Imgback}
              alt="Back Icon"
              className="lback-image"
            />
            <span>Previous</span>
          </button>
          <img src={img} alt="Fuletrix" className="left-image" />
        </div>
        <div className="rightc">
          <p className="loginnn">Login</p>
          <label className="loginun">Login to your FULETRIX account.</label>
          <p className="email-label-login">Email</p>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="email-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="password-label-login">Password</p>
          <div className="form-group password-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Your password" 
              className="password-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              className="password-toggle-icon" 
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <button className="sign-in" onClick={handleLogin}>SIGN IN</button>
          <p className="buyn">Don't have a FUELTRIX package? <span><a href="/buy">Buy Now</a></span></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
