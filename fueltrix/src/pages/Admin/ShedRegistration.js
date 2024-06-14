import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import Modal from 'react-modal';
import 'leaflet/dist/leaflet.css';
import AdminNavbar from './AdminNavbar';
import './CSS/ShedRegistration.css';
import Footer from '../../components/Footer';

const center = {
  lat: 5.9485,
  lng: 80.5353,
};

const LocationPicker = ({ setShedData, closeMap }) => {
  useMapEvents({
    click: (e) => {
      const selectedLocation = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };
      setShedData((prevData) => ({ ...prevData, location: JSON.stringify(selectedLocation) }));
      closeMap();
    },
  });
  return null;
};

const ShedRegistration = () => {
  const [shedData, setShedData] = useState({
    shedId: '',
    shedName: '',
    securityKey: '',
    location: '',
  });

  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShedData({ ...shedData, [name]: value });
  };

  const handlePickLocation = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shedData);
    // Your form submission logic here
  };

  // Simulate loading for 1.5 seconds
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <div>
      <AdminNavbar />
    <div className={`container ${loading ? 'loading' : ''}`}>
      
      <Modal
        isOpen={showMap}
        onRequestClose={closeMap}
        className="modal-content"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <MapContainer center={center} zoom={10} style={{ height: '400px', width: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationPicker setShedData={setShedData} closeMap={closeMap} />
        </MapContainer>
      </Modal>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Shed Registration</h1>
          <div className="form-group">
            <label htmlFor="shedId">Shed ID:</label>
            <input type="text" id="shedId" name="shedId" value={shedData.shedId} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="shedName">Shed Name:</label>
            <input type="text" id="shedName" name="shedName" value={shedData.shedName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="securityKey">Shed Security Key:</label>
            <input type="text" id="securityKey" name="securityKey" value={shedData.securityKey} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={shedData.location} onChange={handleChange} />
            <button type="button" onClick={handlePickLocation}>Pick Location</button>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ShedRegistration;
