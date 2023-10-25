// IMPLEMENT: https://github.com/visgl/react-map-gl/blob/7.1-release/examples/controls/src/app.tsx

import React, { useState} from "react";
import ReactMapboxGl, { Marker, Popup, ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaXZhbmNkZWhnIiwiYSI6ImNsbHk5cDlpZzI2NW4zZHBpM2tkdXM1b2IifQ.YQe5cuCyBGIxtI2SaU5h5w",
});

// pk.eyJ1IjoicGxhdGFmb3JtZTIwMjIiLCJhIjoiY2wxc2RnbTZiMHFpdDNjcXFsN3pkbmczNiJ9.lhXNyTrlWSI1ya1qZrk8fQ

const LandingPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const markerCoordinatesArray = [
    [-80.25993, 26.27443], // Example coordinates 1
    [-80.26912, 26.28476], // Example coordinates 2
    [-80.24935, 26.26412], // Example coordinates 3
    // Add more coordinates as needed
  ];

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const handleMarkerHover = (index) => {
    setSelectedMarkerIndex(index);
  };

  const handleMarkerLeave = () => {
    setSelectedMarkerIndex(null);
  };

  return (
    <Box className="wizard-container" m="20px">
      <Header title="Leads" subtitle="Manage Leads" />
      <Box>
        <Box>
          {/* This box is just a spacer to create some space for the popup */}
        </Box>
        <Box>
          <Mapbox
            style="mapbox://styles/mapbox/streets-v11"
            containerStyle={{
              height: "70vh",
              width: "80vw",
              borderRadius: '10px',
            }}
            center={markerCoordinatesArray[0]} // Set initial center to the first marker
            // zoom={[12]}
            scrollZoom={!selectedMarkerIndex} // Disable scroll zoom when a marker is hovered
          >
            <ZoomControl />

            {markerCoordinatesArray.map((coordinates, index) => (
              <Marker
                key={index}
                coordinates={coordinates}
                onMouseEnter={() => handleMarkerHover(index)}
                // onMouseLeave={handleMarkerLeave}
              >
                <LocationOnIcon
                  fontSize="large"
                  className={`marker-icon${selectedMarkerIndex === index ? ' rotating-marker' : ''}`}
                  style={{ color: 'blue' }}
                />
              </Marker>
            ))}
            {selectedMarkerIndex !== null && (
              <Popup
                offset={[0, -55]}
                coordinates={markerCoordinatesArray[selectedMarkerIndex]}
                onClose={handleMarkerLeave}
              >
                <div>
                  <h2>Marker Popup Title</h2>
                  <button onClick={() => setSelectedMarkerIndex(null)}>Close</button>
                </div>
              </Popup>
            )}
          </Mapbox>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
