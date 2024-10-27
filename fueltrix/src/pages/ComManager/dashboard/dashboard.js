import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../CMNav/navbar';
import '../dashboard/dashboard.css';

function Dashboard() {
  // Accessing manager data from the location state
  const location = useLocation();
  const { userDetails } = location.state || {}; // Destructure to retrieve managerData (userDetails)
  
  // Log manager details to verify data
  console.log("Manager Details:", userDetails);
  

  return (
    <div className="dashboard">
      <Navbar />
      <div className="up">
        <div className="left1">
          <h2>Welcome, {userDetails?.company}</h2> {/* Display company's name */}
          <p>Email: {userDetails?.email}</p>       {/* Display manager's email */}
          <p>Role: {userDetails?.role}</p>         {/* Display manager's role, if available */}
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
