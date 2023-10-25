import React from "react";
import { Box, Grid } from "@mui/material";
import AmbetterBar from "../../../../components/analytics/ambetter/AmbetterBar";
import AmbetterDoughnuts from "../../../../components/analytics/ambetter/AmbetterDoughnuts";
import AmbetterDoughnuts2 from "../../../../components/analytics/ambetter/AmbetterDoughnuts2";
import CustomersCounter from "../../../../components/analytics/shared/CustomersCounter";


export const Ambetter = (props) => {
  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <CustomersCounter carrier={props.carrier} active_users={props.active_users}/>
        </Grid>
        <Grid item xs={12} md={5}>
          <AmbetterDoughnuts />
        </Grid>
        <Grid item xs={12} md={4}>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
        <AmbetterBar />
          {/*<AmbetterDoughnuts2 />*/}
        </Grid>

      </Grid>
    </Box>
  );
};
