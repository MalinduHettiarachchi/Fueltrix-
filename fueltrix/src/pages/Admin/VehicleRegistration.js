import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas
import './CSS/VehicleRegistration.css';
import InfoImage from '../../img/istockphoto-1390980481-612x612-removebg-preview.png';


const VehicleRegistration = () => {
  const [formData, setFormData] = useState({
    vehicleRegistrationNumber: '',
    vehicleType: '',
    fuelType: '',
    fuelVolume: '',
  });

  const [errors, setErrors] = useState({});
  const [qrCode, setQRCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.vehicleRegistrationNumber) newErrors.vehicleRegistrationNumber = "Vehicle Registration Number is required.";
    if (!formData.vehicleType) newErrors.vehicleType = "Vehicle Type is required.";
    if (!formData.fuelType) newErrors.fuelType = "Fuel Type is required.";
    if (formData.fuelVolume <= 0) newErrors.fuelVolume = "Fuel Volume must be greater than 0.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Generate QR code based on vehicle registration number
    setQRCode(formData.vehicleRegistrationNumber);
    console.log("Form Submitted:", formData);
  };

  const handleRegister = () => {
    // Register logic here (e.g., saving formData to the database)
    console.log('Registering vehicle with data:', formData);
    alert('Vehicle successfully registered!');
  };

  return (
    <div className='hednav'>
      <AdminNavbar />
      <div className="spacer" />
      
      <motion.div className="registration-container">
      <motion.div className="info-section">
          <img src={InfoImage} alt="Info" className="info-image" />
          <h2>Welcome to Fueltrix</h2>
          <p>
            Fueltrix is a QR-based fuel tracking system designed for both mobile and web platforms.
            It provides a seamless experience for tracking fuel usage and management.
          </p>
        </motion.div>
        <motion.div className="form-section">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Vehicle Registration
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="registration-form"
          >
            <div className="form-group">
              <label>Vehicle Registration Number</label>
              <input
                type="text"
                name="vehicleRegistrationNumber"
                value={formData.vehicleRegistrationNumber}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter Vehicle Registration Number"
              />
              {errors.vehicleRegistrationNumber && <div className="error-message">{errors.vehicleRegistrationNumber}</div>}
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
              {errors.vehicleType && <div className="error-message">{errors.vehicleType}</div>}
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
              {errors.fuelType && <div className="error-message">{errors.fuelType}</div>}
            </div>
            <div className="form-group">
              <label>Fuel Volume</label>
              <input
                type="number"
                name="fuelVolume"
                value={formData.fuelVolume}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter Fuel Volume"
              />
              {errors.fuelVolume && <div className="error-message">{errors.fuelVolume}</div>}
            </div>

{/* Buttons container */}
<div className="buttons-container">
      <motion.button
        type="submit"
        className="userRegbtn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        Generate QR Code
      </motion.button>

      <motion.button
        type="button"
        className="registerBtn"
        onClick={handleRegister}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        Register Vehicle
      </motion.button>
    </div>
          </motion.form>
        </motion.div>

        <motion.div className="qr-code-section">
  {qrCode && (
    <>
      <h3 className="qr-code-title">Your QR Code</h3>
      <QRCodeCanvas value={qrCode} size={160} className="qr-code-canvas" />
      
      <motion.button
        onClick={() => {
          const canvas = document.querySelector('canvas');
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          
          // Set the filename based on the vehicle registration number
          link.download = `${formData.vehicleRegistrationNumber}`;
          link.click();
        }}
        className="download-qr-btn"
        whileHover={{ scale: 1.1, backgroundColor: '#006ae6' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Download QR Code
      </motion.button>
    </>
  )}
</motion.div>

      </motion.div>
      <Footer />
    </div>
  );
};

export default VehicleRegistration;
