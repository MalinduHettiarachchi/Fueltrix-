import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';
import "./CSS/VehicleRegistration.css";

const VehicleRegistration = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicleId: '',
    vehicleRegistrationNo: '',
    vehicleType: '',
    fuelType: '',
    fuelVolume: '',
    manufacturer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
    console.log(vehicleData);
  };

  return (
    <div className='mmm'>
      <AdminNavbar />
    <div className='mvw'>
      
    <div className='navhedd'>
      
      <div className="container">
        <h2>Vehicle Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vehicleId">Vehicle ID</label>
            <input
              type="text"
              id="vehicleId"
              name="vehicleId"
              value={vehicleData.vehicleId}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleRegistrationNo">Vehicle Registration No</label>
            <input
              type="text"
              id="vehicleRegistrationNo"
              name="vehicleRegistrationNo"
              value={vehicleData.vehicleRegistrationNo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={vehicleData.vehicleType}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Truck">Truck</option>
              <option value="Motorcycle">Motorcycle</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fuelType">Fuel Type</label>
            <select
              id="fuelType"
              name="fuelType"
              value={vehicleData.fuelType}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fuelVolume">Fuel Volume</label>
            <input
              type="text"
              id="fuelVolume"
              name="fuelVolume"
              value={vehicleData.fuelVolume}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
     
    </div>
    
    </div>
    <Footer />
    </div>
  );
};

export default VehicleRegistration;
