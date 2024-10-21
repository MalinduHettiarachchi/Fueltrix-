import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import '../Card/thank.css';

const libraries = ['places'];  // Include the 'places' library for autocomplete

export default function Thank() {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [location, setLocation] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCCpZk_0MWqHOikfHmLbO46CKj0IVfqvZE',  // Replace with your actual API key
    libraries,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setLocation(place.formatted_address);
      }
    }
  };

  return (
    <div className="thankp">
      <div className="close-btnn">
        <a href="/close"><span>&times;</span></a>
      </div>

      <div className="thank-container">
        <p className="shedloc">Location</p>

        <div className="shed-group">
          {isLoaded && (
            <>
              <Autocomplete
                onLoad={onAutocompleteLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Pick up your location"
                  className="shedloc-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Autocomplete>

              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={{ lat: -34.397, lng: 150.644 }}  // Default map center
                zoom={8}
                onLoad={onLoad}
              />
            </>
          )}
          <button className="pick-up-btn">Pick UP</button>
        </div>
      </div>
    </div>
  );
}
