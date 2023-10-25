import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { tokens } from "../../../theme";

import { useGetBcbsQuery } from "../../../features/analytics/analyticsApiSlice";

const BcbsDoughnuts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, isLoading, isSuccess, isError, error } = useGetBcbsQuery();

  let data_key_root = [];
  let data_value_root = [];

  if (isSuccess) {
    data_key_root = Object.keys(data["status"]);
    data_value_root = Object.values(data["status"]);
  }

  const chart_data = {
    "options": {
      "chart": {
        backgroundColor: colors.primary[710],
        foreColor: colors.contentSideBar[500],
        "type": "donut",
        "height": 350,
        "width": "100%"
      },
      "labels": data_key_root
    },
    "series": data_value_root
  }

  let content;

  if (isLoading) {
    content = "Counting ...";
  } else if (isSuccess) {
    content = (
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
            Enrollment Status
          </Typography>
        </Box>
        <Chart
          type="donut"
          height={260}
          width={"100%"}
          series={chart_data.series}
          options={chart_data.options}
        />
      </Box>
    );
    return content;
  }
};

export default BcbsDoughnuts;
