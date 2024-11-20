import React, { useEffect, useState } from 'react';

function Text({ userDetails }) {
  const [managerDetails, setManagerDetails] = useState(null);

  useEffect(() => {
    if (userDetails) {
      console.log("Setting manager details:", userDetails);
      setManagerDetails(userDetails);
    }
  }, [userDetails]);

  // Function to create the query parameters for the manager details
  const getQueryParams = () => {
    if (managerDetails) {
      const params = new URLSearchParams();
      params.append("company", managerDetails.company);  // Assuming 'company' is a field in userDetails
      // Add more fields if needed
      return params.toString();
    }
    return "";
  };

  return (
    <div>
      <h1>Manager Details</h1>
      {managerDetails ? (
        <div>
          <p>Company: {managerDetails.company}</p> {/* This should correctly display the company name */}
          <p>Query Params: {getQueryParams()}</p>
        </div>
      ) : (
        <p>No manager details available</p>
      )}
    </div>
  );
}

export default Text;
