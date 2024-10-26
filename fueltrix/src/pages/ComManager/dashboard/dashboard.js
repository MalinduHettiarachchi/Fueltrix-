import React from 'react';
import Navbar from '../CMNav/navbar';
import '../dashboard/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="up">
        <div className="left1">
          {/* Add content for the left part here */}
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
