import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { tokens } from "../../theme";
const BarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [option] = useState({
    options: {
      chart: {
        foreColor: colors.contentSideBar[500],
      },
      xaxis: {
        categories: ["New York", "Sao Paulo", "Tokyo"],
      },
      plotoptions: {
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
        text: "Cities",
        align: "center",
        margin: 20,
        offsetY: 20,
        style: {
          fontSize: "25px",
        },
      },
    },
    series: [
      {
        name: "population",
        data: [432434, 133223, 345534],
      },
    ],
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
              Bar chart
            </Typography>
          </Box>
          <Chart
            options={option.options}
            series={option.series}
            type="bar"
            height={250}
            width={"100%"}
          />
        </Box>
      </div>
    </>
  );
};

export default BarChart;
