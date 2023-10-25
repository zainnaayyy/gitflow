import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { tokens } from "../../theme";

const NegativeChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [option] = useState({
    series: [
      {
        data: [
          {
            x: "Team A",
            y: [1, 5],
          },
          {
            x: "Team B",
            y: [4, 6],
          },
          {
            x: "Team C",
            y: [5, 8],
          },
          {
            x: "Team D",
            y: [3, 11],
          },
        ],
      },
      {
        data: [
          {
            x: "Team A",
            y: [2, 6],
          },
          {
            x: "Team B",
            y: [1, 3],
          },
          {
            x: "Team C",
            y: [7, 8],
          },
          {
            x: "Team D",
            y: [5, 9],
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "rangeBar",
        height: 450,
        foreColor: colors.contentSideBar[500],
      },

      plotOptions: {
        bar: {
          horizontal: false,
        },
        fill: {
          colors: colors.grey[90],
        },
        dataLabels: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
    },
  });
  return (
    <>
      <div>
        <Box
          m="20px 0 20px 0"
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
              Negative chart
            </Typography>
          </Box>
          <Chart
            options={option.options}
            series={option.series}
            type="rangeBar"
            height={250}
            width={"100%"}
          />
        </Box>
      </div>
    </>
  );
};

export default NegativeChart;
