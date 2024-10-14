import React from 'react';
import './WebAdminLogin.css';
import loginImage from '../../../img/logooo.jpg'; // Path to your image

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="login-form">
        <h2>Welcome to Fueltrix</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="#">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
