// Login.js
import React, { useState } from 'react';
import './login.css';
import img from './logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        // Redirect based on role
        window.location.href = data.redirect;
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

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
          <input 
            type="email" 
            placeholder="Your email address" 
            className="email-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <p className="password-label">Password</p>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Your password" 
            className="password-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button className="sign-in" onClick={handleLogin}>SIGN IN</button>
        <p className="buyn">Don't have a FUELTRIX package? <span><a href="/buy">Buy Now</a></span></p>
      </div>
    </div>
  );
}

export default Login;
