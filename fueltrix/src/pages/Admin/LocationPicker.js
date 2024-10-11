// LocationPicker.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LocationPicker = ({ setShedData, closeMap, shedLocation }) => {
  const [position, setPosition] = useState(null);

  // Initialize the position to shedLocation if provided
  useEffect(() => {
    if (shedLocation) {
      setPosition(shedLocation);
    }
  }, [shedLocation]);

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

    return position ? <Marker position={position} icon={highlightedIcon()} /> : null;
  };

  // Custom icon for highlighted shed location
  const highlightedIcon = () => {
    return L.icon({
      iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Customize the icon as needed
      iconSize: [38, 38], // size of the icon
      iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
    });
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={shedLocation || [7.8731, 80.7718]} // If no shed location, default to Sri Lanka
        zoom={8} // Adjust zoom level
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
