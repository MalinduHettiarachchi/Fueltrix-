import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const center = {
  lat: 5.9485,
  lng: 80.5353,
};

const LocationPicker = ({ setShedData, closeMap }) => {
  const [map, setMap] = useState(null);

  const handleClick = (e) => {
    const selectedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setShedData((prevData) => ({ ...prevData, location: JSON.stringify(selectedLocation) }));
    closeMap();
  };

  useEffect(() => {
    if (map) {
      const listener = map.addListener('click', handleClick);
      return () => {
        listener.remove();
      };
    }
  }, [map]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCKMNZbr0Io8Cnnxm7XJo6u5l7MppdWNhI">
      <GoogleMap
        mapContainerStyle={{ height: '600px', width: '600px' }}
        center={center}
        zoom={10}
        onLoad={map => setMap(map)}
      />
    </LoadScript>
  );
};

export default LocationPicker;
