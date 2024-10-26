import React, { useEffect, useState } from 'react';
import Navbar from '../CMNav/navbar';
import '../dashboard/dashboard.css';

function Dashboard() {
  const [managerDetails, setManagerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManagerDetails = async () => {
      try {
        const response = await fetch('/api/manager-details', {
          credentials: 'include',
        });
    
        // Log the status and headers to debug
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
    
        // Get the raw response text for debugging
        const textResponse = await response.text();
        console.log("Raw Response:", textResponse); // Log the raw response
    
        if (!response.ok) {
          throw new Error(`Failed to fetch manager details: ${textResponse}`);
        }
    
        // Try parsing as JSON
        const data = JSON.parse(textResponse);
        console.log("Parsed Manager Details:", data); // Log the parsed data
        setManagerDetails(data);
      } catch (error) {
        console.error("Error fetching manager details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchManagerDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <Navbar />
      <div className="up">
        <div className="left1">
          {/* Add content for the left part here */}
          {managerDetails && (
            <div>
              <h3>Manager Details</h3>
              <p>Name: {managerDetails.name}</p>
              <p>Email: {managerDetails.email}</p>
              {/* Add more details as needed */}
            </div>
          )}
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
