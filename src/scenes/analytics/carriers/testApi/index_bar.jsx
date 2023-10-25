import React from 'react'
import { useState } from "react";
import Chart from "react-apexcharts";
import { Box } from '@mui/system';
import Header from '../../../../components/Header';
import { useGetTestQuery } from '../../../../features/analytics/analyticsApiSlice';

const TestApi= () => {

  const { data: chartData } = useGetTestQuery();

  const [option] = useState({
    options: {
      chart: {
        foreColor: "#ffffff",
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
    <Box>
      <Box m="20px">
        <Header title="Test Chart" subtitle="Data Load issue" />
        <Box m="40px 0 0 0" height="75vh" className="card-shadow card-dash">
        <Chart
            options={option.options}
            series={option.series}
            type="bar"
            height={250}
            width={"100%"}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default TestApi;
