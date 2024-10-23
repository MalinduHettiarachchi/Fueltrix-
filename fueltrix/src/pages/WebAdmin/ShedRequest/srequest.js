import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import '../ShedRequest/srequest.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  position: 'relative',
};

const initialCenter = {
  lat: 6.9271, // Default latitude
  lng: 79.8612, // Default longitude
};

function SRequest() {
  const [stationName, setStationName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(initialCenter);
  const [mapVisible, setMapVisible] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false); // State to toggle address input
  const [isDoneClicked, setIsDoneClicked] = useState(false); // Track if the Done button has been clicked

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });

    // Use Geocoder to get the location address from lat, lng
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setSearchText(results[0].formatted_address); // Set the search input to the address
      } else {
        console.error('Geocoding failed: ', status);
        setSearchText(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`); // Fallback to coordinates
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

  const handlePickupClick = () => {
    setStationName('');
    setRegisterNumber('');
    setEmail('');
    setSearchText('');
    setMapVisible(true);
  };

  const handleDoneClick = () => {
    setMapVisible(false);
    setShowAddressInput(true); // Show the address input after done is clicked
    setIsDoneClicked(true); // Mark that the Done button was clicked
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

            {/* If showAddressInput is true, show the address input instead of the pickup button */}
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

            {/* Render the Submit button only if Done has been clicked */}
            {isDoneClicked && (
              <button className="submitshed"><a href="">Submit</a></button>
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
