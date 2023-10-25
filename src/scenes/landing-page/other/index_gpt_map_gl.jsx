import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const MapWithPinsAndPopups = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });

  const [selectedPin, setSelectedPin] = useState(null);

  const pins = [
    { id: 1, latitude: 37.7749, longitude: -122.4194 },
    { id: 2, latitude: 37.7935, longitude: -122.4082 },
    // Add more pins as needed
  ];

  const YOUR_MAPBOX_ACCESS_TOKEN = "sk.eyJ1IjoiaXZhbmNkZWhnIiwiYSI6ImNsbHk5enl0eDBvbzAzY3M2cmY3YW5tdG0ifQ.oofONDzeCnhCyS03bhm3Aw"

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={YOUR_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          latitude={pin.latitude}
          longitude={pin.longitude}
        >
          <button
            className="pin-btn"
            onClick={() => setSelectedPin(pin)}
          >
            <img src="pin-icon.png" alt="Pin" />
          </button>
        </Marker>
      ))}
      
      {selectedPin && (
        <Popup
          latitude={selectedPin.latitude}
          longitude={selectedPin.longitude}
          onClose={() => setSelectedPin(null)}
        >
          <div>
            <h2>Pin {selectedPin.id}</h2>
            <p>Latitude: {selectedPin.latitude}</p>
            <p>Longitude: {selectedPin.longitude}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default MapWithPinsAndPopups;
