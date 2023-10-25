import React from "react";
import { Box } from "@mui/material";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import Typography from "@mui/material/Typography";
import "mapbox-gl/dist/mapbox-gl.css";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGxhdGFmb3JtZTIwMjIiLCJhIjoiY2wxc2RnbTZiMHFpdDNjcXFsN3pkbmczNiJ9.lhXNyTrlWSI1ya1qZrk8fQ",
});

const CustomersMapView = ({ colors, customers, isLoading, isSuccess }) => {
  const markerCoordinates = [-73.985679, 40.748817]; // Example coordinates

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


          <Box sx={{ mt: 2}}>
            <Mapbox
              style="mapbox://styles/mapbox/streets-v11"
              containerStyle={{
                height: "74vh",
                width: "100%",
								mt: 1,
								borderRadius: '10px',
              }}
              center={markerCoordinates}
              zoom={[12]}
            >
              <Marker coordinates={markerCoordinates}>
                <img
                  src={"../../assets/pin.png"}
                  alt="Pin"
                  className="marker-icon rotating-marker"
                />
              </Marker>
            </Mapbox>
          </Box>
        </Box>
      </Box>
    );
  }

  return content;
};

export default CustomersMapView;
