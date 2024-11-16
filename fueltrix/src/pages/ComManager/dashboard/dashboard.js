import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../CMNav/navbar";
import { ManagerContext } from "./ManagerContext";
import "../dashboard/dashboard.css";
import Ihome from "../dashboard/home.png";
import Idriver from "../dashboard/driver.png";
import Irequest from "../dashboard/request.png";
import Isetting from "../dashboard/setting.png";
import Ivehicle from "../dashboard/vehicle.png";
import IPayment from "../dashboard/payment.png";
import axios from "axios";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { userDetails } = location.state || {};
  const { setManagerDetails, managerDetails } = useContext(ManagerContext);
  const [activeComponent, setActiveComponent] = useState("Home");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (userDetails) {
      setManagerDetails(userDetails);
    }
  }, [userDetails, setManagerDetails]);

  // Function to create the query parameters for the manager details
  const getQueryParams = () => {
    if (managerDetails) {
      const params = new URLSearchParams();
      params.append("company", managerDetails.company);
      // Add more fields if needed
      return params.toString();
    }
    return "";
  };

  const handleAddVehicle = () => {
    const queryParams = getQueryParams();
    navigate(`/vehicle?${queryParams}`);
  };

  const handleAddDriver = () => {
    const queryParams = getQueryParams();
    navigate(`/drivers?${queryParams}`);
  };

  // Sample data for the request list
  const requestData = [
    {
      id: 1,
      type: "Fuel Request",
      status: "Pending",
      driver: "John Doe",
      fuelCount: 150,
      category: "Urgent",
      date: "2024-11-12",
    },
    {
      id: 2,
      type: "Maintenance Request",
      status: "Approved ",
      driver: "Jane Smith",
      fuelCount: 0,
      category: "Routine",
      date: "2024-11-10",
    },
    {
      id: 3,
      type: "Route Adjustment",
      status: "Rejected",
      driver: "Tom Brown",
      fuelCount: 300,
      category: "High",
      date: "2024-11-11",
    },
  ];

  // Define the breadcrumb component
  const Breadcrumb = () => (
    <div className="breadcrumb">
      <span>Dashboard</span> &gt; <span>{activeComponent}</span>
    </div>
  );

  useEffect(() => {
    if (managerDetails?.company) {
      const fetchVehicles = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/vehicles?company=${managerDetails.company}`
          );
          const companyVehicles =
            response.data[managerDetails.company]?.vehicles || [];
          setVehicles(companyVehicles);
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      };

      fetchVehicles();
    }
  }, [managerDetails]);

  // Component to render the vehicle list table
  const VehicleList = () => (
    <div className="vehicle-list">
      <table>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Vehicle Type</th>
            <th>Fuel Type</th>
            <th>Fuel Volume (L)</th>
            <th>Pumped Volume (L)</th>
            <th>Requested Volume (L)</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index} onClick={() => setSelectedVehicle(vehicle)}>
              <td>{vehicle.registrationNumber}</td>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.fuelType}</td>
              <td>{vehicle.fuelVolume}</td>
              <td>{vehicle.pumpedVolume}</td>
              <td>{vehicle.requestedVolume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Component to render selected vehicle details
  const VehicleDetails = () => (
    <div className="vehicle-details">
      {selectedVehicle ? (
        <div>
          <h3>
            <strong>{selectedVehicle.registrationNumber}</strong>
          </h3>
          <p>
            <strong>Vehicle Type:</strong> {selectedVehicle.vehicleType}
          </p>
          <p>
            <strong>Fuel Type:</strong> {selectedVehicle.fuelType}
          </p>
          <p>
            <strong>Fuel Volume (L):</strong> {selectedVehicle.fuelVolume}
          </p>
          <p>
            <strong>Pumped Volume (L):</strong> {selectedVehicle.pumpedVolume}
          </p>
          <p>
            <strong>Requested Volume (L):</strong>{" "}
            {selectedVehicle.requestedVolume}
          </p>
          <button
            onClick={() => setSelectedVehicle(null)}
            className="vremovebutton"
          >
            Remove Vehicle
          </button>
        </div>
      ) : (
        <p>Select a vehicle to view details</p>
      )}
    </div>
  );

  useEffect(() => {
    if (managerDetails?.company) {
      const fetchDrivers = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/drivers?company=${managerDetails.company}`
          );
          // Filter the drivers based on the logged-in company
          const filteredDrivers = response.data.filter(
            (driver) => driver.company === managerDetails.company
          );
          setDrivers(filteredDrivers);
        } catch (error) {
          console.error("Error fetching drivers:", error);
        }
      };

      fetchDrivers();
    }
  }, [managerDetails]);

  // Component to render driver list table
  const DriverList = () => (
    <div className="driver-list">
      <table>
        <thead>
          <tr>
            <th>Driver</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.name} onClick={() => setSelectedDriver(driver)}>
              <td>{driver.name}</td>
              <td>{driver.email}</td>
              <td>{driver.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Component to render selected driver details
  const DriverDetails = () => (
    <div className="driver-details">
      {selectedDriver ? (
        <div>
          <h3>
            <strong>{selectedDriver.name}</strong>
          </h3>
          <p>
            <strong></strong> {selectedDriver.email}
          </p>
          <p>
            <strong></strong> {selectedDriver.contact}
          </p>
          <button
            onClick={() => setSelectedDriver(null)}
            className="dremovebutton"
          >
            Remove Driver
          </button>
        </div>
      ) : (
        <p>Select a driver to view details</p>
      )}
    </div>
  );
  // Component to render the request list table
  const RequestList = () => (
    <div className="request-list">
      <table>
        <thead>
          <tr>
            <th>Request Type</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Fuel Count (L)</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {requestData.map((request) => (
            <tr key={request.id} onClick={() => setSelectedRequest(request)}>
              <td>{request.type}</td>
              <td>
                <span className={`status ${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
              </td>
              <td>{request.driver}</td>
              <td>{request.fuelCount}</td>
              <td>{request.category}</td>
              <td>{request.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Component to render selected request details
  const RequestDetails = () => (
    <div className="request-details">
      {selectedRequest ? (
        <div>
          <h3>
            <strong>{selectedRequest.type}</strong>
          </h3>
          <p>
            <strong>Fuel Count:</strong> {selectedRequest.fuelCount}
          </p>
          <p>
            <strong>Category:</strong> {selectedRequest.category}
          </p>
          <p>
            <strong>Driver:</strong> {selectedRequest.driver}
          </p>
          <div className="request-buttons">
            <button
              className="approvebtn"
              onClick={() => handleApproveRequest(selectedRequest)}
            >
              Approve
            </button>
            <button
              className="rejectbtn"
              onClick={() => handleCancelRequest(selectedRequest)}
            >
              Reject
            </button>
          </div>
        </div>
      ) : (
        <p>Select a request to Approve or Reject</p>
      )}
    </div>
  );

  // Handle Approve and Cancel actions
  const handleApproveRequest = (request) => {
    // Implement the logic for approving the request
    console.log(`Request ${request.type} approved`);
  };

  const handleCancelRequest = (request) => {
    // Implement the logic for canceling the request
    console.log(`Request ${request.type} canceled`);
  };
  // Render the appropriate component based on activeComponent
  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <div className="content-container"></div>;
      case "Vehicles":
        return (
          <div className="contentvehi">
            <div className="vehilesft">
              <VehicleList />
            </div>
            <div className="vehiright">
              <button className="addvehi" onClick={handleAddVehicle}>
                Add Vehicle
              </button>
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
              <button className="adddri" onClick={handleAddDriver}>
                Add Driver
              </button>
              <DriverDetails />
            </div>
          </div>
        );
      case "Requests":
        return (
          <div className="contentreq">
            <div className="requestleft">
              <p className="reqtopic">Fuel Reqest</p>
              <RequestList />
            </div>
            <div className="requestright">
              <RequestDetails />
            </div>
          </div>
        );
      case "Payment":
        return <div className="content-container">Payment Section</div>;
      case "Settings":
        return (
          <div className="contentset">
            <h2>Update Your Account</h2>
            <div className="account">
            <p className="setname">Company Name</p>
            <div className="set-group">
              <input
                type="text"
                className="setname-input"
              />
            </div>
            <p className="setemail">Email</p>
            <div className="set-group">
              <input
                type="text"
                className="setemail-input"
              />
            </div>
            <p className="setpack">Your Package</p>
            <div className="set-group">
              <input
                type="text"
                className="setpack-input"
              />
            </div>
            </div>
          </div>
        );
      default:
        return <div className="content-container"></div>;
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
            <p
              className="dvehicle"
              onClick={() => setActiveComponent("Vehicles")}
            >
              <img src={Ivehicle} alt="Vehicle Icon" className="icon" />
              Vehicles
            </p>
            <p
              className="ddriver"
              onClick={() => setActiveComponent("Drivers")}
            >
              <img src={Idriver} alt="Driver Icon" className="icon" />
              Drivers
            </p>
            <p
              className="drequest"
              onClick={() => setActiveComponent("Requests")}
            >
              <img src={Irequest} alt="Request Icon" className="icon" />
              Requests
            </p>
            <p
              className="dpayment"
              onClick={() => setActiveComponent("Payment")}
            >
              <img src={IPayment} alt="Payment Icon" className="icon" />
              Payment
            </p>
            <p
              className="dsetting"
              onClick={() => setActiveComponent("Settings")}
            >
              <img src={Isetting} alt="Setting Icon" className="icon" />
              Settings
            </p>
          </div>
        </div>
        <div className="dshright">
          <Breadcrumb />
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
