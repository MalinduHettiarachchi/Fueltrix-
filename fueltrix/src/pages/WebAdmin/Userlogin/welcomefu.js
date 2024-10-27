import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Userlogin/welcomefu.css'; // Path to your CSS

function Welcomeback() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Destructure userDetails and email from location.state
  const { userDetails, email } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the dashboard with userDetails and email after 2 seconds
      if (userDetails && email) {
        navigate('/dashboard', { state: { userDetails, email } });
      } else {
        console.error("User details or email not found in state.");
      }
    }, 2000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate, userDetails, email]);

  return (
    <div className='welc'>
      <p>Welcome to FUELTRIX</p>
      <div className="loading-wrapper">
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
}

export default Welcomeback;
