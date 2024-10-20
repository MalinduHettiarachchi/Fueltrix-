import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Userlogin/welcomefu.css'; // Path to your CSS

function Welcomeback() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the next page after 3 seconds
      navigate('/dashboard');
    }, 2000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

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
