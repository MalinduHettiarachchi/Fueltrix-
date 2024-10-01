// LocationPicker.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPicker = ({ setShedData, closeMap }) => {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setShedData((prevData) => ({
          ...prevData,
          location: `${e.latlng.lat}, ${e.latlng.lng}`,
        }));
        closeMap(); // Close the map after selecting a location
      },
    });

    return position ? (
      <Marker position={position}></Marker>
    ) : null;
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={[7.8731, 80.7718]} // Coordinates for Sri Lanka
        zoom={8} // Adjust zoom level for better visibility of Sri Lanka
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
          attribution='&copy; <a href="https://stamen.com">Stamen</a> contributors, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
