import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { tokens } from "../../../theme";

import { useGetCaresourceQuery } from "../../../features/analytics/analyticsApiSlice";

const CaresourceBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: caresource,
    isLoading,
    isSuccess,
  } = useGetCaresourceQuery();

  let data_key_root = [];
  let data_value_root = [];

  if (isSuccess) {
    data_key_root = Object.keys(caresource["policy_state"]);
    data_value_root = Object.values(caresource["policy_state"]);
  }

  const options = {
    chart: {
      foreColor: colors.contentSideBar[500],
    },
    xaxis: {
      categories: data_key_root,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    fill: {
      colors: "#f44336",
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "States",
      align: "center",
      margin: 20,
      offsetY: 20,
      style: {
        fontSize: "25px",
      },
    },
    tooltip: {
      theme: theme.palette.mode,
      style: {
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif'
      }
    },
  };

  const series = [
    {
      name: "Population",
      data: data_value_root,
    },
  ];

  return (
    <Box
      m="0 0 20px 0"
      backgroundColor={colors.primary[710]}
      className="card-dash card-shadow card-animation"
    >
      <Box
        borderBottom={`0.5px solid ${colors.grey[90]}`}
        className="header-card-chart"
      >
        <Typography
          color={colors.grey[200]}
          ml={1}
          mt={1}
          mb={1}
          fontWeight={600}
        >
          Enrollments by State
        </Typography>
      </Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={250}
          width="100%"
        />
      )}
    </Box>
  );
};

export default CaresourceBar;
