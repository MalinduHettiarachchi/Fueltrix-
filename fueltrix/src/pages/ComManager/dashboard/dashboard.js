import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../CMNav/navbar";
import { ManagerContext } from "./ManagerContext";
import "../dashboard/dashboard.css";
import Ihome from '../dashboard/home.png';
import Idriver from '../dashboard/driver.png';
import Irequest from '../dashboard/request.png';
import Isetting from '../dashboard/setting.png';
import Ivehicle from '../dashboard/vehicle.png';

function Dashboard() {
  const location = useLocation();
  const { userDetails } = location.state || {};
  const { setManagerDetails } = useContext(ManagerContext);
  const [activeComponent, setActiveComponent] = useState("Home");

  useEffect(() => {
    if (userDetails) {
      setManagerDetails(userDetails);
    }
  }, [userDetails, setManagerDetails]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <div className="content-container">Welcome to the Home Page</div>;
      case "Vehicles":
        return <div className="content-container">Here is the Vehicles Information</div>;
      case "Drivers":
        return <div className="content-container">Details about Drivers</div>;
      case "Requests":
        return <div className="content-container">All pending Requests</div>;
      case "Settings":
        return <div className="content-container">Manage your Settings here</div>;
      default:
        return <div className="content-container">Welcome to the Home Page</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dshleft">
          <div className="sideitems">
            <p className="dhome" onClick={() => setActiveComponent("Home")}>
              <img src={Ihome} alt="Home Icon" className="icon" />
              Home
            </p>
            <p className="dvehicle" onClick={() => setActiveComponent("Vehicles")}>
              <img src={Ivehicle} alt="Vehicle Icon" className="icon" />
              Vehicles
            </p>
            <p className="ddriver" onClick={() => setActiveComponent("Drivers")}>
              <img src={Idriver} alt="Driver Icon" className="icon" />
              Drivers
            </p>
            <p className="drequest" onClick={() => setActiveComponent("Requests")}>
              <img src={Irequest} alt="Request Icon" className="icon" />
              Requests
            </p>
            <p className="dsetting" onClick={() => setActiveComponent("Settings")}>
              <img src={Isetting} alt="Setting Icon" className="icon" />
              Settings
            </p>
          </div>
        </div>
        <div className="dshright">
          {renderComponent()} {/* Render the selected container here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
