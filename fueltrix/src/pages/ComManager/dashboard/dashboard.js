// Dashboard.js
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../CMNav/navbar";
import { ManagerContext } from "./ManagerContext"; // Import the context
import "../dashboard/dashboard.css";
import Ihome from '../dashboard/home.png'
import Idriver from '../dashboard/driver.png'
import Irequest from '../dashboard/request.png'
import Isetting from '../dashboard/setting.png'
import Ivehicle from '../dashboard/vehicle.png'

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
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dshleft">
          <div className="sideitems">
            <p className="dhome">
              <img
                src={Ihome}
                alt="Home Icon"
                className="icon"
              />
              Home
            </p>
            <p className="dvehicle">
              <img
                src={Ivehicle}
                alt="Vehicle Icon"
                className="icon"
              />
              Vehicles
            </p>
            <p className="ddriver">
              <img
                src={Idriver}
                alt="Driver Icon"
                className="icon"
              />
              Drivers
            </p>
            <p className="drequest">
              <img
                src={Irequest}
                alt="Request Icon"
                className="icon"
              />
              Requests
            </p>
            <p className="dsetting">
              <img
                src={Isetting}
                alt="Setting Icon"
                className="icon"
              />
              Settings
            </p>
          </div>
        </div>
        <div className="dshright"></div>
      </div>
    </div>
  );
}

export default Dashboard;