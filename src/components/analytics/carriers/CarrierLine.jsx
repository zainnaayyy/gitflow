import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

import { useGetCarrierQuery } from "../../../features/analytics/analyticsApiSlice";

const CarrierLine = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const defineTheme = theme.palette.mode

  // This block is not working properly, when the status change, the useEffect is not updating component 


  const { data: carriers, isLoading, isSuccess } = useGetCarrierQuery();

  let final_list = [];
  let dates = [];

  if (isSuccess) {
    const carriers_list = carriers && carriers["carriers_list"];
    for (const item in carriers_list) {
      let add_value = [];

      for (const item2 in carriers["carriers_data"]) {
        if (
          carriers["carriers_data"][item2]["carrier_name"] ===
          carriers_list[item]["carrier_name"]
        ) {
          add_value.push(carriers["carriers_data"][item2]["total_customers"]);
          dates.push(carriers["carriers_data"][item2]["date"]);
        }
      }

      // Add all the records in a list
      final_list.push({
        name: carriers_list[item]["carrier_name"],
        data: add_value,
      });
    }
  }

  // Create a new Array with non-repeated dates from column
  let uniqueDates = [...new Set(dates)];

  const product = final_list

  const option = {
    title: { text: "Plans" },
    chart: {
      backgroundColor: colors.primary[710],
      foreColor: colors.contentSideBar[500],
    },
    xaxis: {
      title: "Xaxis",
      categories: uniqueDates,
    },
    yaxis: {
      title: { text: "Yaxis" },
    },

    tooltip: {
      theme: theme.palette.mode,
      style: {
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif'
      }
    },
    /*
    theme: {
      mode: 'dark',
      palette: 'palette3',
      monochrome: {
        enabled: true,
        color: '#fff',
        shadeTo: 'light',
        shadeIntensity: 0.65
      }
    },
    */

  };

  return (
    <Box>
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
            Active Members
          </Typography>
        </Box>
        {isLoading ? (
          <Box> Loading ... </Box>
        ) : (
          <Chart
            type="line"
            width={"100%"}
            height={250}
            series={product}
            options={option}
          />
        )}
        
      </Box>
    </Box>
  );
};

export default CarrierLine;
