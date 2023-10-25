import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { tokens } from "../../../theme";

const DashHeatMapChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartLoaded(true);
    }, 200); // Adjust the delay value as needed

    return () => clearTimeout(timer);
  }, []);

  const options = {
    chart: {
      type: "heatmap",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: -30,
              to: 60,
              name: "Low",
              color: "#008ffb", // '#008ffb'
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      labels: {
        style: {
          colors: colors.grey[200],
        },
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        style: {
          colors: colors.grey[200],
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode,  // NEED TO FIX
      style: {
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif'
      }
    },
    legend: {
      labels: {
        colors: colors.grey[200], // Set the color of the legend text "Low",
      },
      show: false,
    },
  };

  const series = [
    {
      name: "Metric 1",
      data: [
        42, -20, 0, 30, 55, 10, -5, 20, 15, 8, 35, 50, -10, 22, 18, 38, 5, -15,
        28, 45, 16, 10, -8, 33,
      ],
    },
    {
      name: "Metric 2",
      data: [
        0, 10, 20, 30, 40, 5, 15, 25, 35, 45, -5, 18, 28, 42, 8, -20, 30, 55,
        12, -8, 33, 48, 10, -15,
      ],
    },
    {
      name: "Metric 3",
      data: [
        5, 15, 25, 35, 45, 0, 30, 50, 10, -20, 22, 12, 40, 16, -5, 33, 35, 48,
        18, -8, 38, 55, 28, 8,
      ],
    },
    {
      name: "Metric 4",
      data: [
        10, 20, 30, 40, 50, -10, 33, 48, 12, 5, 28, 45, 22, 30, 35, 15, -8, 16,
        38, -20, 5, 55, 10, -5,
      ],
    },
  ];


  return (
    <div>
      <Box
        backgroundColor={colors.primary[710]}
        className="card-dash card-shadow"
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
            Calls Intensity HeatMap
          </Typography>
        </Box>
        {chartLoaded && (
          <div style={{ overflow: "hidden" }}>
            {/* Preventing overlap div to the right */}
            <Chart
              options={options}
              series={series}
              type="heatmap"
              height={350}
              width="100%"
            />
          </div>
        )}
      </Box>
    </div>
  );
};

export default DashHeatMapChart;

