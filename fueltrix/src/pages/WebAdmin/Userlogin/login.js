import React, { useState } from 'react';
import './login.css'; // Ensure your CSS file is linked
import img from './logo.png'; // Ensure the logo image path is correct
import { useNavigate } from "react-router-dom";
import Imgback from "../Userlogin/back.png";

function Login() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const navigate = useNavigate(); // Hook to navigate between routes
  

  // Function to handle login process
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send credentials
      });
      const data = await response.json(); // Parse response

      if (response.ok) {
        // Redirect based on response data
        navigate(data.redirect, { state: { userDetails: data.userDetails, email } });
      } else {
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error('Login failed:', error.message); // Log any error that occurs
    }
  };

  return (
    <div className="bg-color-login">
    <div className="two-column-container-login">
      <div className="leftc">
      <button
          className="lback-button"
          onClick={() => navigate('/fueltrix')} // Navigate back to the previous page
        >
          <img
            src={Imgback} // Replace with your image path
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
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
        </div>
        <p className="password-label-login">Password</p>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Your password" 
            className="password-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
          />
        </div>
        <button className="sign-in" onClick={handleLogin}>SIGN IN</button>
        <p className="buyn">Don't have a FUELTRIX package? <span><a href="/buy">Buy Now</a></span></p>
      </div>
    </div>
    </div>
  );
}

export default Login;
