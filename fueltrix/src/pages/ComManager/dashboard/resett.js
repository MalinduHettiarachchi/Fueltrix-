import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'; // Use this hook to read query params
import '../dashboard/resett.css';

function Reset() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { userDetails } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve email from query parameters
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    setEmail(emailParam);
  }, [location.search]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }), // Pass email automatically
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Password reset successfully! Redirecting to Dashboard...');
        setTimeout(() => {
          navigate('/signin', { state: { userDetails, email } });
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Failed to reset password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="rare-reset-container">
      <div className="rare-reset-box">
        <h2>Please reset your password</h2>
        {errorMessage && <p className="rare-error-message">{errorMessage}</p>}
        {successMessage && <p className="rare-success-message">{successMessage}</p>}
        <form onSubmit={handleReset}>
          <div className="rare-input-group">
            <label>New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="password-input"
            />
          </div>
          <div className="rare-input-group">
            <label>Re-enter Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="password-input"
            />
          </div>
          <button type="submit" className="rare-reset-button">Done</button>
        </form>
      </div>
    </div>
  );
}

export default Reset;
