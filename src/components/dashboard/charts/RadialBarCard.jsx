import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const RadialBarCard = ({ series, color, height, label }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [options] = useState({
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '16px',
          },
          value: {
            fontSize: '16px',
            color: '#ffffff', // add this line to set the color
            formatter: function(val) {
              return val + "%";
            }
          },
        },
        track: {
          strokeWidth: '70%',
          background: colors.primary[1000],
        },
      },
    },
    fill: {
      opacity: 1.5,
      colors: ['#008FFB'],
      type: 'gradient',
      gradient: {
          gradientToColors: ['#627AF7'],
          shadeIntensity: 1,
          opacityFrom: 1,
          opacityTo: 2,
          stops: [0, 50, 100],
          inverseColors: false
      },
    },
    labels: [label],
  });

  return (
    <div id="chart">
      <Chart options={options} series={series} type="radialBar" height={height} />
    </div>
  );
};

export default RadialBarCard;