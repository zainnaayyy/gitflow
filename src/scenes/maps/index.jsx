import React from "react";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Cube from "../../components/tests/blender/Cube";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGxhdGFmb3JtZTIwMjIiLCJhIjoiY2wxc2RnbTZiMHFpdDNjcXFsN3pkbmczNiJ9.lhXNyTrlWSI1ya1qZrk8fQ",
});

const Maps = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const markerCoordinates = [-73.985679, 40.748817]; // Example coordinates

  return (
    <Box className="wizard-container" m="20px">
      <Header title="Leads" subtitle="Manage Leads" />
      <Box>
        <Box>

        </Box>
        <Box>
          <Mapbox
            style="mapbox://styles/mapbox/streets-v11"
            containerStyle={{
              height: "70vh",
              width: "100vw",
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
};
export default Maps;
