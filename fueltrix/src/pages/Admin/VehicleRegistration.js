import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';

const VehicleRegistration = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicleNumber: '',
    vehicleType: '',
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
    <div>
      <AdminNavbar/>
    <div>
      <h2>Vehicle Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vehicleNumber">Vehicle Number:</label>
        <input type="text" id="vehicleNumber" name="vehicleNumber" value={vehicleData.vehicleNumber} onChange={handleChange} />

        <label htmlFor="vehicleType">Vehicle Type:</label>
        <input type="text" id="vehicleType" name="vehicleType" value={vehicleData.vehicleType} onChange={handleChange} />

        <label htmlFor="manufacturer">Manufacturer:</label>
        <input type="text" id="manufacturer" name="manufacturer" value={vehicleData.manufacturer} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default VehicleRegistration;
