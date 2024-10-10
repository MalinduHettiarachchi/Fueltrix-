import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import './User/CSS/RegistrationReq.css'; // Link CSS file
import InfoImage from '../img/istockphoto-1390980481-612x612-removebg-preview.png';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Google Maps

const mapContainerStyle = {
  height: '300px',
  width: '100%',
};

const centerSriLanka = {
  lat: 7.8731,
  lng: 80.7718, // Central point of Sri Lanka
};

cconst RegistrationReq = () => {
  const [formData, setFormData] = useState({
    shedRegisterNumber: '',
    shedName: '',
    email: '',
    location: '',
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

  const handleLocationSelect = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    // Check if selected location is within Sri Lanka bounds
    if (lat < 5 || lat > 10 || lng < 79 || lng > 82) {
      setLocationError('Selected location is outside Sri Lanka. Please pick a valid location.');
      return;
    }

    const locationString = `Lat: ${lat}, Lng: ${lng}`;
    setFormData({ ...formData, location: locationString });
    setSelectedLocation({ lat, lng });
    setLocationError('');
    setShowMap(false); // Hide the map after selecting location
  };

  const resetLocation = () => {
    setSelectedLocation(null);
    setFormData({ ...formData, location: '' });
    setLocationError('');
    setShowMap(false);
  };

  return (
    <div className='commonn'>
      <Navbar />
      <div className="spacer" />
      <motion.div className="container registration-container">
        <motion.div className="info-section">
          {/* Information section with image */}
        </motion.div>

        <motion.div className="form-container">
          <motion.h2>Shed Registration Request</motion.h2>
          <motion.form onSubmit={handleSubmit}>
            {/* ShedRegisterNumber, ShedName, and Email fields */}

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
                >
                  Pick Location
                </motion.button>
              </div>
              {errors.location && <div className="error-message">{errors.location}</div>}
              {locationError && <div className="error-message">{locationError}</div>}
            </motion.div>

            {showMap && (
              <div className="map-container">
                <LoadScript googleMapsApiKey="API_KEY_HERE">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={centerSriLanka}
                    zoom={7}
                    onClick={handleLocationSelect}
                  >
                    {selectedLocation && <Marker position={selectedLocation} />}
                  </GoogleMap>
                </LoadScript>
                <motion.button
                  type="button"
                  className="reset-location-btn"
                  onClick={resetLocation}
                >
                  Reset Location
                </motion.button>
              </div>
            )}

            <motion.button type="submit" className="shedRegbtn">
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
