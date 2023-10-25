import React, { useState } from "react";
import { Box } from "@mui/material";
import ReactMapboxGl, { Marker, Popup, ZoomControl } from "react-mapbox-gl";
import { makeStyles } from "@mui/styles";
import "mapbox-gl/dist/mapbox-gl.css";

import LocationOnIcon from "@mui/icons-material/LocationOn";
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
  const [pinZoom, setPinZoom] = useState([3.6]);
  const [latlng, setLatng ] = useState([-89.991074, 38.526684])

  const {
    data: addresses,
    isLoading: addressIsLoading,
    addressIsSuccess,
    addressIsError,
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
    console.log('latlng===~', latlng)

      setSelectedMarkerIndex(latlng)
  };

  const handleMarkerLeave = () => {
    setSelectedMarkerIndex(null);
  };

  const zoomFunc = () => {
    setPinZoom([14]);
  };

  const GetUserImage = (endpoint) => {
    let avatarUrl = "";
    if (isSuccess) {
      avatarUrl = `https://back.iqbot.live/media/image/avatar/${
        endpoint["user"]
      }.png?${Date.now()}`;
    }
    return avatarUrl;
  };

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
              style="mapbox://styles/mapbox/streets-v11"
              containerStyle={{
                height: "70vh",
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

                  // console.log('latlng::', latlng)

                  return (
                    <Marker
                      key={index}
                      coordinates={latlng}
                      onMouseEnter={() => handleMarkerHover(latlng)}
                    >
                      <LocationOnIcon
                        fontSize="large"
                        className={`marker-icon${
                          selectedMarkerIndex === index
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
                  offset={[0, -45]}
                  coordinates={selectedMarkerIndex}
                  onClose={handleMarkerLeave}
                  className={classes.popup}
                >
                  <div>
                    <h2>Marker Popup Title</h2>
                    <ZoomInMapIcon onClick={() => zoomFunc()} />
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
