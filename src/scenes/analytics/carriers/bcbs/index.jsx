import React from "react";
import { Box, Grid } from "@mui/material";
import BcbsBar from "../../../../components/analytics/bcbs/BcbsBar";
import BcbsDoughnuts from "../../../../components/analytics/bcbs/BcbsDoughnuts";
import BcbsDoughnuts2 from "../../../../components/analytics/bcbs/BcbsDoughnuts2";
import CustomersCounter from "../../../../components/analytics/shared/CustomersCounter";


export const BCBS = (props) => {
  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <CustomersCounter carrier={props.carrier} active_users={props.active_users}/>
        </Grid>
        <Grid item xs={12} md={5}>
          <BcbsDoughnuts />
        </Grid>
        <Grid item xs={12} md={4}>
          <BcbsBar />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BcbsDoughnuts2 />
        </Grid>

      </Grid>
    </Box>
  );
};
