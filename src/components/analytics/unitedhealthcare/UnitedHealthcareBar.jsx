import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { tokens } from "../../../theme";
import { useGetUnitedHealthcareQuery } from "../../../features/analytics/analyticsApiSlice";

const UnitedHealthcareBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    data: carrier,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUnitedHealthcareQuery();

  let data_key_root = [];
  let data_value_root = [];

  if (isSuccess) {
    data_key_root = Object.keys(carrier["member_state"]);
    data_value_root = Object.values(carrier["member_state"]);
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
      text: "Enrollments by State",
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
        fontSize: "14px",
        fontFamily: "Roboto, sans-serif",
      },
    },
  };

  const series = [
    {
      name: "Enrollments",
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
      { isLoading ? (
        <Box>Loading ...</Box>
      ) : (
        <Chart
        options={options}
        series={series}
        type="bar"
        height={250}
        width={"100%"}
      />
      )}
      
    </Box>
  );
};

export default UnitedHealthcareBar;
