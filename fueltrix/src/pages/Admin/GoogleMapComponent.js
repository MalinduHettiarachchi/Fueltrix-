import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const GoogleMapComponent = ({ google, location }) => {
  const { lat, lng } = location;

  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyles}
      initialCenter={{ lat, lng }}
      center={{ lat, lng }}
    >
      <Marker position={{ lat, lng }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCKMNZbr0Io8Cnnxm7XJo6u5l7MppdWNhI', // Replace with your actual API key
  libraries: ['places'],
})(GoogleMapComponent);
