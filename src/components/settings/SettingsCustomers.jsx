import React from "react";
import { Box, Grid } from "@mui/material";
import { useImportCustomersMutation } from "../../features/users/customerApiSlice";
import { useCollectCoordsMutation } from "../../features/users/addressApiSlice";

const SettingsCustomers = ({ colors }) => {
  const [importCustomers] = useImportCustomersMutation();
  const [collectCoords] = useCollectCoordsMutation();

  const ImportData = async () => {
    // const teste = await importCustomers();
     console.log("TESTESTESTES:::");
  };

  const CollectCoords = () => {
    collectCoords();
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h2>Customer Settings</h2>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: "100px" }}>
            <button disabled onClick={ImportData}>Import</button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
        <button onClick={CollectCoords}>Collect Coords</button>
        </Grid>
				<Grid item xs={12} md={4}>
          <Box>xs=6 md=8</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsCustomers;
