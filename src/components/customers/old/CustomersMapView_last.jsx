import React, { useState, useRef } from "react";
import ReactMapboxGl, { Marker, Popup, ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircleIcon from '@mui/icons-material/Circle';
import AdjustIcon from '@mui/icons-material/Adjust';
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

import { useGetAddressesQuery } from "../../features/users/addressApiSlice";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGxhdGFmb3JtZTIwMjIiLCJhIjoiY2wxc2RnbTZiMHFpdDNjcXFsN3pkbmczNiJ9.lhXNyTrlWSI1ya1qZrk8fQ",
});

const CustomersMapView = ({ colors, customers, isLoading, isSuccess }) => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [mapCenter, setMapCenter] = useState([-93.991074, 38.526684]);
  const [pinZoom, setpinZoom] = useState([3.6])
  const [zoomed, setZoomed] = useState(false)

  const mapRef = useRef(null);

  const {
    data: addresses,
    isLoading: addressIsLoading,
    isSuccess: addressIsSuccess,
    isError: addressIsError,
    error,
  } = useGetAddressesQuery();

  const filteredData =
    addresses && addresses.filter((address) => address.latlng);

  const useStyles = makeStyles((theme) => ({
    popup: {
      color: "black",
    },
  }));
  const classes = "";

  const handleMarkerHover = (latlng) => {
    setSelectedMarkerIndex(latlng);
  };

  const handleMarkerLeave = () => {
    setSelectedMarkerIndex(null);
  };

  const flyToCoordinates = () => {
    if (mapRef.current) {
      setZoomed(true)
      console.log('mapRef.current.props.center::', mapRef.current.props.center)
      console.log('selectedMarkerIndex===~', selectedMarkerIndex)
      const targetCenter = selectedMarkerIndex; // New coordinates
      const targetZoom = 14; // New zoom level
      const duration = 1000; // Animation duration in milliseconds
  
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) {
          startTime = timestamp;
        }
        const progress = (timestamp - startTime) / duration;
  
        if (progress < 1) {
          const newCenter = [
            mapCenter[0] + (targetCenter[0] - mapCenter[0]) * progress,
            mapCenter[1] + (targetCenter[1] - mapCenter[1]) * progress,
          ];
  
          const newZoom = pinZoom[0] + (targetZoom - pinZoom[0]) * progress;
  
          // Update the map's center and zoom
          setMapCenter(newCenter);
          setpinZoom([newZoom]);
  
          requestAnimationFrame(animate);
        }
      };
  
      requestAnimationFrame(animate);
    }
  };

  const flyBack = () => {
    setZoomed(false)
    setpinZoom([3.6])
    setMapCenter([-93.991074, 38.526684])
  }

  let content;

  if (isLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (isSuccess) {
    content = (
      <Box m="40px 0 0 0" height="75vh" className="card-shadow card-dash">
        <Box
          backgroundColor={colors.primary[710]}
          className="card-dash card-shadow"
        >
          <Box>
            <Mapbox
              ref={mapRef}
              style="mapbox://styles/mapbox/streets-v11"
              containerStyle={{
                height: "74vh",
                width: "80vw",
                borderRadius: "10px",
              }}
              center={mapCenter}
              scrollZoom={!selectedMarkerIndex}
              zoom={pinZoom}
            >
              <ZoomControl />

              {filteredData &&
                filteredData.map((coordinates, index) => {
                  const finalCords = coordinates.latlng;
                  const [longitudeString, latitudeString] =
                    finalCords.split(", ");

                  // Convert latitude and longitude to numbers
                  const latitude = parseFloat(latitudeString);
                  const longitude = parseFloat(longitudeString);
                  const latlng = [longitude, latitude];

                  return (
                    <Marker
                      key={index}
                      coordinates={latlng}
                      onMouseEnter={() => handleMarkerHover(latlng)}
                    >
                      <CircleIcon
                        fontSize="1px"
                        className={`marker-icon${
                          selectedMarkerIndex === latlng
                            ? " rotating-marker"
                            : ""
                        }`}
                        style={{ color: "blue" }}
                      />
                    </Marker>
                  );
                })}
              {selectedMarkerIndex !== null && (
                <Popup
                  offset={[0, -20]}
                  coordinates={selectedMarkerIndex}
                  onClose={handleMarkerLeave}
                  className={classes.popup}
                >
                  <div>
                    <h2>Marker Popup Title</h2>
                    { !zoomed ? <ZoomInMapIcon onClick={flyToCoordinates} /> : <ZoomOutMapIcon onClick={flyBack} />}
                    

                    <button onClick={() => setSelectedMarkerIndex(null)}>
                      Close
                    </button>
                  </div>
                </Popup>
              )}
            </Mapbox>
          </Box>
        </Box>
      </Box>
    );
  }
  return content;
};

export default CustomersMapView;
