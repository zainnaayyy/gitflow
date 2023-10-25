import React from "react";
import { Box, Grid } from "@mui/material";
import BarChart from "../../components/charts/BarChart";
import NegativeChart from "../../components/charts/NegativeChart";
import LineChart from "../../components/charts/LineChart";
import Header from "../../components/Header";
import DoughnutsChart from "../../components/charts/DoughnutsChart";
import VisitorsChart from "../../components/charts/VisitorsChart";

const Charts = () => {
  return (
    <>
      <Box m="20px">
        <Header title="Charts" subtitle="Analytics" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <VisitorsChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <BarChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <NegativeChart />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <DoughnutsChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <LineChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <LineChart />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Charts;
