import React, { useState } from 'react';
import LeafletMapComponent from './GoogleMapComponent';

const App = () => {
  const [locationInput, setLocationInput] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    try {
      const { lat, lng } = JSON.parse(locationInput);
      setLocation({ lat, lng });
      setShowMap(true);
    } catch (error) {
      console.error('Invalid input format');
    }
  };

  const handleInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Show Location on Map</h1>
      <input
        type="text"
        placeholder='Enter location JSON {"lat":5.944550519515709,"lng":80.5253541469574}'
        value={locationInput}
        onChange={handleInputChange}
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <button onClick={handleShowMap}>Show Map</button>
      {showMap && <LeafletMapComponent location={location} />}
    </div>
  );
};

export default App;
