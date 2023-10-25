import React, { useState, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ReactMapboxGl, { Marker, Popup, ZoomControl } from "react-mapbox-gl";
import { makeStyles } from "@mui/styles";
import "mapbox-gl/dist/mapbox-gl.css";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import CircleIcon from "@mui/icons-material/Circle";
import AdjustIcon from "@mui/icons-material/Adjust";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import { useGetAddressesQuery } from "../../features/users/addressApiSlice";
import CustomersRadialBar from "./CustomersRadialBar";
import CustomersStatusCount from "./CustomersStatusCount";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGxhdGFmb3JtZTIwMjIiLCJhIjoiY2wxc2RnbTZiMHFpdDNjcXFsN3pkbmczNiJ9.lhXNyTrlWSI1ya1qZrk8fQ",
});

const CustomersMapView = ({ colors, customers, isLoading, isSuccess }) => {
  const blairstown = null; // set coords as map center
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [mapCenter, setMapCenter] = useState([-96.991074, 38.526684]);
  const [pinZoom, setPinZoom] = useState([3.4]);
  const [zoomed, setZoomed] = useState(false);
  const [coordProfileId, setCoordProfileId] = useState(); // ID of the profile_link field in Address Model
  const [currentProfile, setCurrentProfile] = useState();
  const [pointsOnMap, setpointsOnMap] = useState()

  const mapRef = useRef(null);

  const { data: addresses } = useGetAddressesQuery();

  const filteredData = !!addresses && addresses.map((address) => {
    return address
  });

  const useStyles = makeStyles((theme) => ({
    popup: {
      color: "black",
    },
  }));

  const handleMarkerHover = (latlng, coordinates_id) => {
    setCoordProfileId(coordinates_id);
    setSelectedMarkerIndex(latlng);
  };

  const handleMarkerLeave = () => {
    setSelectedMarkerIndex(null);
  };

  const flyToCoordinates = () => {
    setZoomed(true);
    if (mapRef.current) {
      const targetCenter = selectedMarkerIndex; // New coordinates
      const targetZoom = 16; // New zoom level

      // Update the map's center and zoom directly
      setMapCenter(targetCenter);
      setPinZoom([targetZoom]);
    }
  };

  const flyBack = () => {
    setZoomed(false);
    setPinZoom([3.4]);
    setMapCenter([-96.991074, 38.526684]);
  };

  const GetCustomerData = (coordinateId) => {
    const customerProfile = customers.find(
      (customer) => customer.id === coordinateId.profile_link
    );
    return `${customerProfile.first_name} ${customerProfile.last_name}`;
  };

  const handleZoomChange = (getZoom) => {
    console.log("getZoom", getZoom); // USE TO SET THE MAXZOOM - THINK IN SOMETHING
  };

  let content;

  if (isLoading) {
    content = <Box> Waiting for Data ...</Box>;
  } else if (isSuccess) {
    content = (
      <Box m="26.3px 0 0 0" height="75vh">
        <Grid container spacing={2}>
          <Grid item xs={6} md={2.5}>
            <Box
              backgroundColor={colors.primary[710]}
              className="card-dash card-shadow"
              height={"100%"}
              width={"100%"}
              
            >
              <Box
                className="header-card card-shadow-2"
                sx={{ ml: '20px', mr: '20px', pb: '1px'}}
              >
                <Typography
                  color={colors.grey[200]}
                  mt={1}
                  mb={1}
                  textAlign="center"
                  fontWeight={600}
                >
                  Current Customers
                </Typography>
              </Box>
              <Box className="content-chart-card">

                <Box sx={{ display: "flex", justifyContent: "center", mr: '10px'  }}>
                  <Typography
                    variant="h1"
                    component="div"
                    sx={{
                      fontSize: "40px",
                      fontWeight: "600",
                      color: colors.icons[400],
                      mt: '5px',
                    }}
                  >
                    {filteredData && filteredData.length}
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: colors.contentSideBar[700],
                  }}
                >
                  On Map
                </Typography>
              </Box>
             <Box borderBottom={`1px dotted ${colors.grey[200]}`} className="box-spliter"></Box>
              <CustomersRadialBar colors={colors} coordProfileId={coordProfileId} customers={customers}/>
             <Box borderBottom={`1px dotted ${colors.grey[200]}`} className="box-spliter"></Box>
              <CustomersStatusCount customers={customers}/>
             <Box borderBottom={`1px dotted ${colors.grey[200]}`} className="box-spliter"></Box>
             {/** 
             <Box sx={{ display: "flex", justifyContent: "space-between", ml: '20px', mr: '20px' }}>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "400",
                      mt: 3,
                      color: colors.grey[200],
                    }}
                  >
                    Active
                  </Typography>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "400",
                      mt: 3,
                      color: colors.grey[200],
                    }}
                  >
                    1000
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: '-20px', ml: '20px', mr: '20px' }}>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "400",
                      mt: 3,
                      color: colors.grey[200],
                    }}
                  >
                    Inactive
                  </Typography>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "400",
                      mt: 3,
                      color: colors.grey[200],
                    }}
                  >
                    1000
                  </Typography>
                </Box>
                */}
            </Box>
          </Grid>
          <Grid item xs={6} md={9.5}>
          <Box
              backgroundColor={colors.primary[710]}
              className="card-dash card-shadow-2"
              height={"6.5%"}
              width={"100%"}
              sx={{ mb: '4px', mt: '16px'}}>          
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                      <LocationOnIcon />
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                      <MyLocationIcon />
                    </Box>
                  </Grid>
                <Grid item xs={6} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                  <RemoveCircleOutlineIcon />
                  <AddCircleOutlineIcon />
                </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Box>
                <Mapbox
                  ref={mapRef}
                  style="mapbox://styles/mapbox/streets-v11"
                  containerStyle={{
                    height: "75vh",
                    width: "62.3vw",
                    borderRadius: "10px",
                  }}
                  center={mapCenter}
                  scrollZoom={!selectedMarkerIndex}
                  zoom={pinZoom}
                  onZoom={(map) => handleZoomChange(map.getZoom())}
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
                      console.log('coordinates :>> ', filteredData);
                      return (
                        <Marker
                          key={index}
                          coordinates={latlng}
                          onMouseEnter={() =>
                            handleMarkerHover(latlng, coordinates)
                          }
                          onClick={flyToCoordinates}
                        >
                          {!zoomed ? (
                            <AdjustIcon
                              style={{ color: "blue", fontSize: "13px" }}
                            />
                          ) : (
                            <CircleIcon
                              style={{ color: "blue", fontSize: "14px" }}
                            />
                          )}
                        </Marker>
                      );
                    })}
                  {selectedMarkerIndex !== null && (
                    <Popup
                      offset={[0, -20]}
                      coordinates={selectedMarkerIndex}
                      onClose={handleMarkerLeave}
                      className="text-black"
                    >
                      <div>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "-8px",
                          }}
                        >
                          {!zoomed ? (
                            <ZoomInMapIcon
                              sx={{
                                color: "green",
                                fontSize: "18px",
                                cursor: "pointer",
                              }}
                              onClick={flyToCoordinates}
                            />
                          ) : (
                            <ZoomOutMapIcon
                              sx={{
                                color: "red",
                                fontSize: "18px",
                                cursor: "pointer",
                              }}
                              onClick={flyBack}
                            />
                          )}
                          <CancelIcon
                            sx={{
                              color: "red",
                              fontSize: "16px",
                              cursor: "pointer",
                            }}
                            onClick={() => setSelectedMarkerIndex(null)}
                          />
                        </Box>
                        <Box sx={{ mb: "-16px" }}>
                          <h3>{GetCustomerData(coordProfileId)}</h3>
                        </Box>
                      </div>
                    </Popup>
                  )}
                </Mapbox>
              </Box>
            </Box>

          </Grid>
        </Grid>
      </Box>
    );
  }

  return content;
};

export default CustomersMapView;
