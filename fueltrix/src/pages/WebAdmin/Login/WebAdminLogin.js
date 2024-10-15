// src/components/WebAdminLogin/Login.js
import React, { useState } from 'react';
import './WebAdminLogin.css';
import logo from '../../../img/istockphoto-1390980481-612x612-removebg-preview.png';  // Assuming you have a logo image in your project
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import axios from 'axios'; // Make sure to install axios for API requests

const Login = () => {
    const navigate = useNavigate();  // Initialize useNavigate
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleBackClick = () => {
        navigate('/'); // Go to the previous page
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // API call to validate login credentials
            const response = await axios.post('http://localhost:5000/WebAdminLogin', {
                email: username,
                password: password,
            });
            if (response.data.success) {
                // Redirect to dashboard or another page on successful login
                navigate('/webAdminDashboard');
            } else {
                setError(response.data.message); // Show error message
            }
        } catch (err) {
            setError('An error occurred during login.'); // Handle error
        }
    };

    return (
        <div className="WebAdminContent">
            {/* Back Button outside the main login container */}
            <button className="btn-back" onClick={handleBackClick}>Back</button>

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
                    {error && (
                        <div className="alert-box">
                            {error}
                        </div>
                    )} {/* Error message display */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="email"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="WebAdminlogin-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
