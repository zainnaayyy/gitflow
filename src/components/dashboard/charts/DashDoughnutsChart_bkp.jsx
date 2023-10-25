import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { tokens } from "../../../theme";
const DashDoughnutsChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [option] = useState({
    chart: {
      backgroundColor: colors.primary[710],
      foreColor: colors.contentSideBar[500],
    },
    labels: ["USA", "China", "Russia", "India"],
  });
  return (
    <>
      <div>
        <Box
          m=" 0 0 0"
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
              Doughnuts chart
            </Typography>
          </Box>
          <Chart
            type="donut"
            height={450}
            width={"100%"}
            series={[45, 67, 25, 76]}
            options={option}
          />
        </Box>
      </div>
    </>
  );
};

export default DashDoughnutsChart;
