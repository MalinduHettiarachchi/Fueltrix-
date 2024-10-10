import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import './User/CSS/RegistrationReq.css'; // Ensure the CSS for the new UI is defined here
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'; // For map functionality

const RegistrationReq = () => {
  const [formData, setFormData] = useState({
    shedRegisterNumber: '',
    shedName: '',
    email: '',
    location: '',
  });

  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

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
    // Display a friendly message box (simple alert for now)
    alert('Shed Registration Request Submitted Successfully!');
    console.log('Form Data:', formData);
  };

  const handlePickLocation = () => {
    setShowMap(true); // Show the map to pick the location
  };

  const handleLocationSelect = (lat, lng) => {
    const locationString = `Lat: ${lat}, Lng: ${lng}`;
    setFormData({ ...formData, location: locationString });
    setSelectedLocation(locationString);
    setShowMap(false); // Hide the map after selecting the location
  };

  // Component to handle the location picking on the map
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        handleLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return selectedLocation ? (
      <Marker position={[selectedLocation.lat, selectedLocation.lng]}></Marker>
    ) : null;
  };

  return (
    <div className='shed-reg'>
      <AdminNavbar />
      <div className="spacer" />
      <motion.div className="registration-container">
        <motion.div className="form-section">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shed Registration
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="registration-form"
          >
            {['shedRegisterNumber', 'shedName', 'email'].map((field, index) => (
              <motion.div
                className="form-group"
                key={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <label>{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim()}`}
                />
                {errors[field] && <div className="error-message">{errors[field]}</div>}
              </motion.div>
            ))}

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label>Location</label>
              <div className="location-picker">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
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
            </motion.div>

            {showMap && (
              <div className="map-container">
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker />
                </MapContainer>
              </div>
            )}

            <motion.button
              type="submit"
              className="shedRegbtn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Request
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default RegistrationReq;
