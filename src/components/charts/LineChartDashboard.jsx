import Chart from "react-apexcharts";
import React from "react";
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const LineChartDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [product] = useState([
    {
      name: "Ambetter",
      data: [12, 17, 21, 28, 32, 39, 48, 55, 64, 75, 87, 91],
    },
    {
      name: " Blue Cross",
      data: [8, 14, 16, 18, 23, 27, 30, 32, 36, 39, 42, 51],
    },
    {
      name: "Friday",
      data: [4, 7, 10, 14, 17, 21, 26, 34, 43, 49, 54, 60],
    },
  ]);

  const [option] = useState({
    title: { text: "Plans" },
    chart: {
      backgroundColor: colors.primary[710],
      foreColor: colors.contentCard[600],
    },
    xaxis: {
      title: "Xaxis",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: { text: "Yaxis" },
    },
  });
  return (
    <div>
      <Box
        backgroundColor={colors.primary[710]}
        className="card-dash card-shadow"
      >
        <Chart
          type="line"
          width="100%"
          height={450}
          series={product}
          options={option}
        />
      </Box>
    </div>
  );
};

export default LineChartDashboard;
