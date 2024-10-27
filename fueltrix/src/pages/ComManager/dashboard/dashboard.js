// Dashboard.js
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../CMNav/navbar';
import { ManagerContext } from './ManagerContext'; // Import the context
import '../dashboard/dashboard.css';

function Dashboard() {
  const location = useLocation();
  const { userDetails } = location.state || {}; // Destructure to retrieve managerData (userDetails)
  const { setManagerDetails } = useContext(ManagerContext); // Access setManagerDetails

  useEffect(() => {
    if (userDetails) {
      setManagerDetails(userDetails); // Set manager details in context
    }
  }, [userDetails, setManagerDetails]);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="up">
        <div className="left1">
        </div>
        <div className="right1">
          <div className="left11">
            {/* Add content for the left part here */}
          </div>
          <div className="right11">
            {/* Add content for the right part here */}
          </div>
        </div>
      </div>
      <div className="down">
        <div className="left2">
          {/* Add content for the left part here */}
        </div>
        <div className="right2">
          <div className="left21">
            {/* Add content for the left part here */}
          </div>
          <div className="right21">
            <div className="button-container">
              <button className="request">
                <a href="/request" className="request-link">Request</a>
              </button>
              <button className="vehicle">
                <a href="/vehicle" className="vehicle-link">Vehicle</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
