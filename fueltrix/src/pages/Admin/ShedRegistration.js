import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

const ShedRegistration = () => {
  const [shedData, setShedData] = useState({
    shedId: '',
    shedName: '',
    securityKey: '',
    location: '',
  });

  const [showMap, setShowMap] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShedData({ ...shedData, [name]: value });
  };

  const handlePickLocation = () => {
    setShowMap(true);
  };

  const handleMapClick = (e) => {
    const selectedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setShedData({ ...shedData, location: JSON.stringify(selectedLocation) });
    setShowMap(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shedData);
    // Your form submission logic here
  };

  return (
    <div>
      <br />
      <AdminNavbar />
      {showMap && (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onClick={handleMapClick}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shedId">Shed ID:</label>
          <input type="text" id="shedId" name="shedId" value={shedData.shedId} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="shedName">Shed Name:</label>
          <input type="text" id="shedName" name="shedName" value={shedData.shedName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="securityKey">Shed Security Key:</label>
          <input type="text" id="securityKey" name="securityKey" value={shedData.securityKey} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={shedData.location} onChange={handleChange} />
          <button type="button" onClick={handlePickLocation}>Pick Location</button>
        </div>
        <button type="submit">Submit</button>
      </form>
      <Footer />
    </div>
  );
};

export default ShedRegistration;
