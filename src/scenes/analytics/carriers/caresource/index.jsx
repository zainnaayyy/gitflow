import React from "react";
import { Box, Grid } from "@mui/material";
import CaresourceBar from "../../../../components/analytics/caresource/CaresourceBar";
import NegativeChart from "../../../../components/charts/NegativeChart";
import CaresourceDoughnuts2 from "../../../../components/analytics/caresource/CaresourceDoughnuts2";
import Header from "../../../../components/Header";
import CaresourceDoughnuts from "../../../../components/analytics/caresource/CaresourceDoughnuts";
import VisitorsChart from "../../../../components/analytics/caresource/CaresourceCounter";
import CustomersCounter from "../../../../components/analytics/shared/CustomersCounter";

export const Caresource = (props) => {
  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <CustomersCounter carrier={props.carrier} active_users={props.active_users}/>
        </Grid>
        <Grid item xs={12} md={5}>
          <CaresourceDoughnuts />
        </Grid>
        <Grid item xs={12} md={4}>
          <CaresourceBar />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <CaresourceDoughnuts2 />
        </Grid>
      </Grid>
    </Box>
  );
};

