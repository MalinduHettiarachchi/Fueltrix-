import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import '../ShedRequest/srequest.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  position: 'relative',
};

const initialCenter = {
  lat: 6.9271,
  lng: 79.8612,
};

function SRequest() {
  const [stationName, setStationName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(initialCenter);
  const [mapVisible, setMapVisible] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [isDoneClicked, setIsDoneClicked] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setSearchText(results[0].formatted_address);
      } else {
        console.error('Geocoding failed: ', status);
        setSearchText(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
      }
    });
  };

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedPosition({ lat, lng });
        setSearchText(place.formatted_address || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
      } else {
        console.error('The selected place does not have a valid location.');
      }
    }
  };

  const generateKey = (stationName, registerNumber) => {
    const combined = `${stationName}-${registerNumber}`;
    let key = '';
    for (let i = 0; i < combined.length; i++) {
      // Include only alphanumeric characters
      if (/[a-zA-Z0-9]/.test(combined[i])) {
        key += combined[i];
      }
    }
    return key; // This will contain only letters and numbers
  };

  const handlePickupClick = () => {
    console.log("Pickup clicked"); // Check if function is triggered
    console.log(`Station Name: ${stationName}, Register Number: ${registerNumber}, Email: ${email}`); // Log inputs

    if (!stationName || !registerNumber || !email) {
      alert("Please fill in all fields before picking your location.");
      return; // Prevent proceeding if any field is empty
    }

    const key = generateKey(stationName, registerNumber); // Generate the alphanumeric key
    console.log('Generated Key:', key); // Display the key in the console
    setGeneratedKey(key); // Save the key to state

    setStationName(''); 
    setRegisterNumber('');
    setEmail('');
    setSearchText('');
    setMapVisible(true);
  };

  const handleDoneClick = () => {
    setMapVisible(false);
    setShowAddressInput(true);
    setIsDoneClicked(true);
  };

  return (
    <div className="shrc">
      <div className="leftsr">
        <p>Join With Us</p>
      </div>
      <div className="rightsr">
        {!mapVisible ? (
          <>
            <p className="shednum">Fuel Station Name</p>
            <div className="shed-group">
              <input
                type="text"
                placeholder="Your fuel station name"
                className="shednum-input"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
              />
            </div>
            <p className="shedname">Register Number</p>
            <div className="shed-group">
              <input
                type="text"
                placeholder="Your register number"
                className="shedname-input"
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
              />
            </div>
            <p className="shedem">Email</p>
            <div className="shed-group">
              <input
                type="email"
                placeholder="Your email"
                className="shedem-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="shedloc">Location</p>

            {showAddressInput ? (
              <div className="shed-group">
                <input
                  type="text"
                  placeholder="Your selected location"
                  className="shedloc-input"
                  value={searchText}
                  readOnly
                />
              </div>
            ) : (
              <button className="pickup" onClick={handlePickupClick}>Pick up your location</button>
            )}

            {isDoneClicked && (
              <button className="submitshed"><a href="/signin">Submit</a></button>
            )}
          </>
        ) : (
          <LoadScript googleMapsApiKey="AIzaSyCKMNZbr0Io8Cnnxm7XJo6u5l7MppdWNhI" libraries={['places']}>
            <div className="map-container">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={selectedPosition}
                onClick={handleMapClick}
              >
                <Marker position={selectedPosition} />
              </GoogleMap>

              <div className="search-box">
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    type="text"
                    placeholder="Search location..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="search-input"
                  />
                </Autocomplete>
              </div>
              <button className="done-button" onClick={handleDoneClick}>
                Done
              </button>
            </div>
          </LoadScript>
        )}
      </div>
    </div>
  );
}

export default SRequest;
