import { Box, Typography, useTheme } from "@mui/material";
import React, { useState} from "react";
import Chart from "react-apexcharts";
import Header from '../../../../components/Header';
import { tokens } from "../../../../theme";
import { useGetTestQuery } from "../../../../features/analytics/analyticsApiSlice";


const DoughnutsChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: apiData, isSuccess } = useGetTestQuery();

  let data_key_root = []
  let data_value_root = []

  if(isSuccess){
    data_key_root = Object.keys(apiData['carros'])
    data_value_root = Object.values(apiData['carros'])
  }

  const chart_data = {
    "options": {
      "chart": {
        "type": "donut",
        "height": 350,
        "width": "100%"
      },
      "colors": ["#008FFB", "#00E396", "#FEB019"],
      "labels": data_key_root
    },
    "series": data_value_root
  }

  return (
    <Box>
      <Box m="20px">
        <Header title="Test Chart" subtitle="Data Load issue" />
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
            series={chart_data.series}
            options={chart_data.options}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DoughnutsChart;
