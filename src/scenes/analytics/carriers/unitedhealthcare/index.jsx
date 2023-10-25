import React from "react";
import { Box, Grid } from "@mui/material";
import UnitedHealthcareBar from "../../../../components/analytics/unitedhealthcare/UnitedHealthcareBar";
import UnitedHealthcareDoughnuts from "../../../../components/analytics/unitedhealthcare/UnitedHealthcareDoughnuts";
import CustomersCounter from "../../../../components/analytics/shared/CustomersCounter";


export const UnitedHealthcare = (props) => {
  return (
    <>
      <Box m="20px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <CustomersCounter carrier={props.carrier} active_users={props.active_users}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <UnitedHealthcareDoughnuts />
          </Grid>
          <Grid item xs={12} md={4}>
            
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
          <UnitedHealthcareBar />
          </Grid>

        </Grid>
      </Box>
    </>
  );
};
