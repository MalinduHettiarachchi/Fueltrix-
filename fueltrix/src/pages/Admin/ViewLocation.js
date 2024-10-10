import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  // Default map center (any default location you want)
  const [mapCenter, setMapCenter] = useState({ lat: 7.270856777915222, lng: 80.69489570312501 });
  const [lat, setLat] = useState(7.270856777915222);
  const [lng, setLng] = useState(80.69489570312501);

  // Handle form submission to update the map center
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLat = parseFloat(lat);
    const newLng = parseFloat(lng);

    if (!isNaN(newLat) && !isNaN(newLng)) {
      setMapCenter({ lat: newLat, lng: newLng });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Enter Latitude"
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Enter Longitude"
          />
        </label>
        <br />
        <button type="submit">Show Location</button>
      </form>

      <LoadScript googleMapsApiKey="AIzaSyCKMNZbr0Io8Cnnxm7XJo6u5l7MppdWNhI">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={15}
        >
          {/* Marker to show the entered location */}
          <Marker position={mapCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
