import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import '../Card/thank.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  position: 'relative',
};

const initialCenter = {
  lat: 6.0945, // Latitude for Morawaka
  lng: 80.7035, // Longitude for Morawaka
};

function Thank() {
  const [selectedPosition, setSelectedPosition] = useState(initialCenter);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [mapVisible, setMapVisible] = useState(false); // State to control map visibility

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });

    // Reverse geocoding to get the address from lat/lng (optional step)
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setSearchText(results[0].formatted_address); // Set the search input to the address
      }
    });
  };

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      
      // Check if the place has a geometry before using it
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedPosition({
          lat,
          lng,
        });
      } else {
        console.error("The selected place does not have a valid location.");
      }
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDoneClick = () => {
    console.log('Selected location:', selectedPosition);
    alert(`Selected location: ${selectedPosition.lat}, ${selectedPosition.lng}`);
  };

  const handleGoMapClick = () => {
    setMapVisible(true); // Show the map when the button is clicked
  };

  return (
    <div>
      <button onClick={handleGoMapClick} className="go-map-button">
        Go Map
      </button>

      {mapVisible && ( // Conditionally render the map based on mapVisible state
        <LoadScript googleMapsApiKey="AIzaSyCKMNZbr0Io8Cnnxm7XJo6u5l7MppdWNhI" libraries={["places"]}>
          <div className="map-container">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={selectedPosition}
              onClick={handleMapClick} // Handle click on the map to set marker
            >
              <Marker position={selectedPosition} />
            </GoogleMap>

            <div className="search-box">
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchText} // Update the input field with the selected location
                  onChange={handleSearchInputChange} // Capture input changes
                  className="search-input"
                />
              </Autocomplete>
            </div>

            {/* Done Button */}
            <button className="done-button" onClick={handleDoneClick}>
              Done
            </button>
          </div>
        </LoadScript>
      )}
    </div>
  );
}

export default Thank;
