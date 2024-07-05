import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Modal from 'react-modal';
import AdminNavbar from './AdminNavbar';
import './CSS/ShedRegistration.css';
import Footer from '../../components/Footer';

const initialCenter = {
  lat: 5.9485,
  lng: 80.5353,
};

const ShedRegistration = () => {
  const [shedData, setShedData] = useState({
    location: '',
  });

  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;
    setShedData({ location: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const locationObj = JSON.parse(shedData.location);
      if (locationObj.lat && locationObj.lng) {
        setMapCenter({ lat: locationObj.lat, lng: locationObj.lng });
        setMarkerPosition({ lat: locationObj.lat, lng: locationObj.lng });
        setShowMap(true);
      } else {
        alert('Invalid JSON format. Please provide both lat and lng.');
      }
    } catch (error) {
      alert('Invalid JSON format. Please enter a valid JSON.');
    }
  };

  const closeMap = () => {
    setShowMap(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='common'>
      <AdminNavbar />

      <div className={`container ${loading ? 'loading' : ''}`}>
        {loading && <div className="loading-spinner"></div>}
        {!loading && (
          <>
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
              <LoadScript
                googleMapsApiKey="AIzaSyCBOLcE9tLLtCDH1fh10MZeSPLD_Qw_V70"
                onLoad={() => setLoading(false)} // Handle loading state if needed
              >
                <GoogleMap
                  mapContainerStyle={{ height: '600px', width: '600px' }}
                  center={mapCenter}
                  zoom={15}
                >
                  {markerPosition && (
                    <Marker 
                      position={markerPosition} 
                      icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        scaledSize: new window.google.maps.Size(30, 30)
                      }}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
              <button className="close" onClick={closeMap}>&times;</button>
            </Modal>

            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h1>Shed Registration</h1>
                <div className="form-group">
                  <label htmlFor="location">Location (JSON format):</label>
                  <div className="location-container">
                    <input type="text" id="location" name="location" className="location" value={shedData.location} onChange={handleChange} placeholder='{"lat":5.944550519515709,"lng":80.5253541469574}' />
                    <button type="submit" className="location-button">Show Location</button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShedRegistration;
