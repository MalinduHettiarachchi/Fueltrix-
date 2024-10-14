import React from 'react';
import './WebAdminLogin.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-info">
                <h1>Welcome to Fueltrix</h1>
                <p>
                    Fueltrix is a QR-based fuel tracking system designed for both mobile and web platforms. It provides a seamless experience for tracking fuel usage and management.
                </p>
            </div>
            <div className="login-form">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="forgot-password">Forgot your password?</p>
            </div>
        </div>
    );
};

export default Login;  
