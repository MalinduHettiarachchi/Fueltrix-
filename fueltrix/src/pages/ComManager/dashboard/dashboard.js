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
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null); // Define selectedDriver state

  useEffect(() => {
    if (userDetails) {
      setManagerDetails(userDetails);
    }
  }, [userDetails, setManagerDetails]);

  // Sample data for the vehicle list
  const vehicleData = [
    { vehicle: "Homepage Overview", status: "Online", users: 212423, count: 8345, category: 18.5, avgTime: "2m 15s"  },
    { vehicle: "Product Details - Gadgets", status: "Online", users: 172240, count: 5653, category: 9.7, avgTime: "2m 30s"},
    { vehicle: "Checkout Process - Step 1", status: "Offline", users: 58240, count: 3455, category: 15.2, avgTime: "2m 10s"},
    { vehicle: "User Profile Dashboard", status: "Online", users: 96240, count: 112543, category: 4.5, avgTime: "2m 40s"},
    { vehicle: "Article Listing - Tech News", status: "Online", users: 142240, count: 3653, category: 3.1, avgTime: "2m 55s"},
  ];

  // Sample data for the driver list
  const driverData = [
    { name: "John Doe", status: "Active", vehicle: "Sedan - A123", trips: 152, rating: 4.8, avgTime: "4h 30m" },
    { name: "Jane Smith", status: "Inactive", vehicle: "Truck - B456", trips: 98, rating: 4.5, avgTime: "5h 20m" },
    { name: "Tom Brown", status: "Active", vehicle: "SUV - C789", trips: 200, rating: 4.9, avgTime: "3h 45m" },
  ];

  // Component to render the vehicle list table
  const VehicleList = () => (
    <div className="vehicle-list">
      <table>
        <thead>
          <tr>
            <th>Vehicles</th>
            <th>Status</th>
            <th>Category</th>
            <th>Fuel Count(L)</th>
            <th>The Driver in Use</th>
            <th>Average Time</th>
          </tr>
        </thead>
        <tbody>
          {vehicleData.map((vehicle, index) => (
            <tr key={index} onClick={() => setSelectedVehicle(vehicle)}>
              <td>{vehicle.vehicle}</td>
              <td>
                <span className={`status ${vehicle.status.toLowerCase()}`}>{vehicle.status}</span>
              </td>
              <td>{vehicle.category}</td>
              <td>{vehicle.count}</td>
              <td>{vehicle.users}</td>
              <td>{vehicle.avgTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Component to render the selected vehicle details
  const VehicleDetails = () => (
    <div className="vehicle-details">
      {selectedVehicle ? (
        <div>
          <h3><strong>{selectedVehicle.vehicle}</strong></h3>
          <p><strong>Status:</strong> {selectedVehicle.status}</p>
          <p><strong>Category:</strong> {selectedVehicle.category}</p>
          <p><strong>Fuel Count (L):</strong> {selectedVehicle.count}</p>
          <p><strong>Views per User:</strong> {selectedVehicle.users}</p>
          <p><strong>Average Time:</strong> {selectedVehicle.avgTime}</p>
          <button onClick={() => setSelectedVehicle(null)} className="vremovebutton">
            Remove Vehicle
          </button>
        </div>
      ) : (
        <p>Select a vehicle to view details</p>
      )}
    </div>
  );

  // Component to render the driver list table
  const DriverList = () => (
    <div className="driver-list">
      <table>
        <thead>
          <tr>
            <th>Driver</th>
            <th>Status</th>
            <th>Assigned Vehicle</th>
            <th>Trips Completed</th>
            <th>Rating</th>
            <th>Average Time</th>
          </tr>
        </thead>
        <tbody>
          {driverData.map((driver, index) => (
            <tr key={index} onClick={() => setSelectedDriver(driver)}>
              <td>{driver.name}</td>
              <td>
                <span className={`status ${driver.status.toLowerCase()}`}>{driver.status}</span>
              </td>
              <td>{driver.vehicle}</td>
              <td>{driver.trips}</td>
              <td>{driver.rating}</td>
              <td>{driver.avgTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Component to render the selected driver details
  const DriverDetails = () => (
    <div className="driver-details">
      {selectedDriver ? (
        <div>
          <h3><strong>{selectedDriver.name}</strong></h3>
          <p><strong>Status:</strong> {selectedDriver.status}</p>
          <p><strong>Assigned Vehicle:</strong> {selectedDriver.vehicle}</p>
          <p><strong>Trips Completed:</strong> {selectedDriver.trips}</p>
          <p><strong>Rating:</strong> {selectedDriver.rating}</p>
          <p><strong>Average Time:</strong> {selectedDriver.avgTime}</p>
          <button onClick={() => setSelectedDriver(null)} className="dremovebutton">
            Remove Driver
          </button>
        </div>
      ) : (
        <p>Select a driver to view details</p>
      )}
    </div>
  );

  // Render the appropriate component based on activeComponent
  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <div className="content-container">Welcome to the Home Page</div>;
      case "Vehicles":
        return (
          <div className="contentvehi">
            <div className="vehilesft">
              <VehicleList />
            </div>
            <div className="vehiright">
              <VehicleDetails />
            </div>
          </div>
        );
      case "Drivers":
        return (
          <div className="contentdriv">
            <div className="driverleft">
              <DriverList />
            </div>
            <div className="driverright">
              <DriverDetails />
            </div>
          </div>
        );
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
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
