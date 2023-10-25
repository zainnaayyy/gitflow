import { Box, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { tokens } from "../../../theme";

import { useGetAmbetterQuery } from "../../../features/analytics/analyticsApiSlice";

const AmbetterDoughnuts2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, isLoading, isSuccess, isError, error } = useGetAmbetterQuery();

  let doughnuts_keys_array = [];
  let doughnuts_values_array = [];

  if (isSuccess) {
    doughnuts_keys_array = Object.keys(data["state"]);
    doughnuts_values_array = Object.values(data["state"]);
  }

  const [option] = useState({
    chart: {
      backgroundColor: colors.primary[710],
      foreColor: colors.contentCard[600],
    },
    labels: doughnuts_keys_array,
  });

  let content;

  if (isLoading) {
    content = "Counting ...";
  } else if (isSuccess) {
    content = (
      <>
        <div>
          <Box
            m="0 0 20px 0"
            backgroundColor={colors.primary[710]}
            className="card-dash card-shadow card-animation"
          >
            <div className="header-card-chart">
              <span>Customers By State</span>
            </div>
            <Chart
              type="donut"
              height={360}
              width={"100%"}
              series={doughnuts_values_array}
              options={option}
            />
          </Box>
        </div>
      </>
    );
    return content;
  }
};

export default AmbetterDoughnuts2;
