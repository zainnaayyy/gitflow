import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Marker, Popup, ZoomControl } from "react-mapbox-gl";
import { makeStyles } from "@mui/styles";
import "mapbox-gl/dist/mapbox-gl.css";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';


const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaXZhbmNkZWhnIiwiYSI6ImNsbHk5cDlpZzI2NW4zZHBpM2tkdXM1b2IifQ.YQe5cuCyBGIxtI2SaU5h5w",
});

const LandingPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [belleville, setBelleville] = useState([-89.991074, 38.526684]);
  const [pinZoom, setPinZoom] = useState([3.6]);

  const zoomFunc = () => {
    setPinZoom([14])
  }

  console.log('pinZoom:', pinZoom)

  const useStyles = makeStyles((theme) => ({
    popup: {
      color: 'black',
    },
  }));

  const markerCoordinatesArray = [
    [-81.25993, 21.27443], // Example coordinates 1
    [-80.26912, 22.28476], // Example coordinates 2
    [-82.24935, 26.26412], // Example coordinates 3
    [-78.24935, 24.26412], // Example coordinates 3
    // Add more coordinates as needed
  ];

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const handleMarkerHover = (index) => {
    setSelectedMarkerIndex(index);
  };

  const handleMarkerLeave = () => {
    setSelectedMarkerIndex(null);
  };

  /* GEOLOCATION COOL
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);
  */

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
            center={belleville || markerCoordinatesArray[0]}
            scrollZoom={!selectedMarkerIndex}
            zoom={pinZoom}
          >
            <ZoomControl />

            {markerCoordinatesArray.map((coordinates, index) => (
              <Marker
                key={index}
                coordinates={coordinates}
                onMouseEnter={() => handleMarkerHover(index)}
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
                offset={[0, -45]}
                coordinates={markerCoordinatesArray[selectedMarkerIndex]}
                onClose={handleMarkerLeave}
                className="text-black"
              >
                <div>
                  <h2>Marker Popup Title</h2>
                  <ZoomInMapIcon onClick={() => zoomFunc()} />
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
