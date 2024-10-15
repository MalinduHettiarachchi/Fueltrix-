import React from 'react';
import './WebAdminLogin.css';
import logo from '../../../img/istockphoto-1390980481-612x612-removebg-preview.png';  // Assuming you have a logo image in your project
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

const Login = () => {
    const navigate = useNavigate();  // Initialize useNavigate

    const handleBackClick = () => {
        navigate(-1); // Go to the previous page
    };

    return (
        <div className="WebAdminContent">
            {/* Back Button outside the main login container */}
            <button className="back-button-outside" onClick={handleBackClick}>Back</button>

            <div className="login-container">
                <div className="login-info">
                    {/* Image at the top */}
                    <img src={logo} alt="Fueltrix Logo" className="login-logo" />
                    <h1>Welcome to Fueltrix</h1>
                    <p>
                        Fueltrix is a fuel tracking system for managing and monitoring fuel usage efficiently.
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
                        <button type="submit" className="WebAdminlogin-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
