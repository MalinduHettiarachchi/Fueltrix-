import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import './User/CSS/RegistrationReq.css'; // Link CSS file
import InfoImage from '../img/istockphoto-1390980481-612x612-removebg-preview.png';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Google Maps
import axios from 'axios'; // Import Axios

const mapContainerStyle = {
  height: '300px',
  width: '100%',
};

const centerSriLanka = {
  lat: 7.8731,
  lng: 80.7718, // Central point of Sri Lanka
};

const RegistrationReq = () => {
  const [formData, setFormData] = useState({
    shedRegisterNumber: '',
    shedName: '',
    email: '',
    location: '', // Store address here
  });

  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // Store selected location
  const [locationError, setLocationError] = useState(''); // To display location error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.shedRegisterNumber) newErrors.shedRegisterNumber = 'Shed Register Number is required.';
    if (!formData.shedName) newErrors.shedName = 'Shed Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.location) newErrors.location = 'Location is required.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    alert('Shed Registration Request Submitted Successfully!');
    console.log('Form Data:', formData);
  };

  const handlePickLocation = () => {
    setShowMap(true);
  };

  const handleLocationSelect = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    // Check if selected location is within Sri Lanka bounds
    if (lat < 5 || lat > 10 || lng < 79 || lng > 82) {
      setLocationError('Selected location is outside Sri Lanka. Please pick a valid location.');
      return;
    }

    // Fetch address using Geocoding API
    try {
      const geocodeRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCKMNZbr0Io8Cnnxm7XJo6u5l7MppdWNhI`
      );
      const address = geocodeRes.data.results[0]?.formatted_address || 'Address not found';

      // Set the address in the formData
      setFormData({ ...formData, location: address });
      setSelectedLocation({ lat, lng }); // Set selected location
      setLocationError('');
    } catch (error) {
      setLocationError('Failed to retrieve address. Please try again.');
      console.error(error);
    }

    setShowMap(false); // Hide the map after selecting location
  };

  return (
    <div className='commonn'>
      <Navbar />
      <div className="spacer" />
      <motion.div className="container registration-container">
        <motion.div className="info-section">
          <img src={InfoImage} alt="Info" className="info-image" />
          <h2>Welcome to Fueltrix</h2>
          <p>
            Fueltrix is a QR-based fuel tracking system designed for both mobile and web platforms, offering a seamless experience for fuel usage and management.
          </p>
          <p>
            Once you submit your registration details, our team will review the information provided. You will receive an email with a unique security key once the review is complete. 
            After receiving the security key, you can securely access our system using the Fueltrix mobile app.
          </p>
          <p>
            We appreciate your patience and look forward to providing you with an efficient fuel management experience.
          </p>
        </motion.div>

        <motion.div className="form-container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shed Registration Request
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Shed Register Number */}
            <motion.div className="form-group">
              <label>Shed Register Number</label>
              <input
                type="text"
                name="shedRegisterNumber"
                value={formData.shedRegisterNumber}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter Shed Register Number"
              />
              {errors.shedRegisterNumber && <div className="error-message">{errors.shedRegisterNumber}</div>}
            </motion.div>

            {/* Shed Name */}
            <motion.div className="form-group">
              <label>Shed Name</label>
              <input
                type="text"
                name="shedName"
                value={formData.shedName}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter Shed Name"
              />
              {errors.shedName && <div className="error-message">{errors.shedName}</div>}
            </motion.div>

            {/* Email */}
            <motion.div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter Email Address"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </motion.div>

            {/* Location */}
            <motion.div className="form-group">
              <label>Location</label>
              <div className="location-container">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="location"
                  required
                  placeholder="Pick your location"
                  readOnly
                />
                <motion.button
                  type="button"
                  className="pick-location-btn"
                  onClick={handlePickLocation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Pick Location
                </motion.button>
              </div>
              {errors.location && <div className="error-message">{errors.location}</div>}
              {locationError && <div className="error-message">{locationError}</div>}
            </motion.div>

            {/* Map for Picking Location */}
            {showMap && (
              <div className="map-container">
                <LoadScript googleMapsApiKey="AIzaSyCKMNZbr0Io8Cnnxm7XJo6u5l7MppdWNhI">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={centerSriLanka}
                    zoom={7} // Zoom level for Sri Lanka
                    onClick={handleLocationSelect} // Get clicked location
                  >
                    {selectedLocation && (
                      <Marker position={selectedLocation} />
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="shedRegbtn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Submit Registration Request
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default RegistrationReq;
