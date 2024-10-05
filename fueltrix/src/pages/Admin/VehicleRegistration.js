import React, { useState, useRef } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { QRCode } from 'qrcode.react'; // Import QR Code package
import './CSS/VehicleRegistration.css'; 
import InfoImage from '../../img/istockphoto-1390980481-612x612-removebg-preview.png';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    vehicleRegistrationNo: '',
    vehicleType: '',
    fuelType: '',
    fuelVolume: '',
  });

  const [errors, setErrors] = useState({});
  const qrRef = useRef(); // Reference to QR code for download

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.vehicleRegistrationNo) newErrors.vehicleRegistrationNo = "Vehicle Registration No is required.";
    if (!formData.vehicleType) newErrors.vehicleType = "Vehicle Type is required.";
    if (!formData.fuelType) newErrors.fuelType = "Fuel Type is required.";
    if (!formData.fuelVolume) newErrors.fuelVolume = "Fuel Volume is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log("Form Submitted:", formData);
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${formData.vehicleRegistrationNo}_qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className='hednav'>
      <AdminNavbar />
      <div className="spacer" />
      <motion.div className="registration-container">
        <motion.div className="info-section">
          <img src={InfoImage} alt="Info" className="info-image" />
          <h2>Welcome to Fueltrix</h2>
          <p>Fueltrix is a QR-based fuel tracking system designed for both mobile and web platforms.</p>
        </motion.div>
        <motion.div className="form-section">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Vehicle Registration
          </motion.h2>
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="registration-form">
            {/* Vehicle Registration No */}
            <motion.div className="form-group" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <label>Vehicle Registration No</label>
              <input
                type="text"
                name="vehicleRegistrationNo"
                value={formData.vehicleRegistrationNo}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your Vehicle Registration No"
              />
              {errors.vehicleRegistrationNo && <div className="error-message">{errors.vehicleRegistrationNo}</div>}
            </motion.div>

            {/* Vehicle Type */}
            <motion.div className="form-group" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <label>Vehicle Type</label>
              <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="form-control" required>
                <option value="">Select Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
                <option value="Motorbike">Motorbike</option>
              </select>
              {errors.vehicleType && <div className="error-message">{errors.vehicleType}</div>}
            </motion.div>

            {/* Fuel Type */}
            <motion.div className="form-group" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <label>Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="form-control" required>
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
              {errors.fuelType && <div className="error-message">{errors.fuelType}</div>}
            </motion.div>

            {/* Fuel Volume */}
            <motion.div className="form-group" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <label>Fuel Volume</label>
              <input
                type="number"
                name="fuelVolume"
                value={formData.fuelVolume}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter fuel volume"
              />
              {errors.fuelVolume && <div className="error-message">{errors.fuelVolume}</div>}
            </motion.div>

            <motion.button type="submit" className="userRegbtn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              Register
            </motion.button>
          </motion.form>

          {/* QR Code Section */}
          <div ref={qrRef} className="qr-code-container">
            {formData.vehicleRegistrationNo && (
              <QRCode value={formData.vehicleRegistrationNo} size={200} />
            )}
          </div>
          <motion.button
            onClick={handleDownloadQR}
            className="userRegbtn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Generate & Download QR Code
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default UserRegistration;
