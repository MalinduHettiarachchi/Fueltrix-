import React from 'react';
import './WebAdminLogin.css';
import logo from '../../../img/istockphoto-1390980481-612x612-removebg-preview.png';  // Assuming you have a logo image in your project
import { useHistory } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Login = () => {
    const history = useHistory();

    const handleBackClick = () => {
        history.goBack(); // Go to the previous page
    };

    return (
        <div className="WebAdminContent">
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
                    {/* Back Button */}
                    <button className="back-button" onClick={handleBackClick}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
