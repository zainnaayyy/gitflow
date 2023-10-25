import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import CarrierLine from "../../../components/analytics/carriers/CarrierLine";
import Header from "../../../components/Header";
import CarrierCounter from "../../../components/analytics/carriers/CarrierCounter";
import CarrierCard from "../../../components/analytics/carriers/CarrierCard";
import { tokens } from "../../../theme";

const CarriersAnalytics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Analytics Carriers" subtitle="Analytics" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} color={colors.grey[200]}>
          <CarrierCounter />
        </Grid>
        <Grid item xs={12} md={9}>
          <CarrierLine />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CarrierCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarriersAnalytics;
