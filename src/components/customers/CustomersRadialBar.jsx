import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomersRadialBar = ({ colors, coordProfileId, customers }) => {
  const maxValue = 20000; // Set your desired maximum value
  const seriesValues = [13600, 8700, 2023, 600];

  console.log('coordProfileId::',coordProfileId)
  console.log('customers::', customers)

  // Scale the series values to fit within the range of 0 to maxValue
  const scaledSeries = seriesValues.map((value) => (value / maxValue) * 100);

  const [chartData, setChartData] = useState({
    series: scaledSeries,
    options: {
      chart: {
        height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 20,
          offsetX: 20,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
          maxValue: 100, // Set the maxValue to 100 to match the scaled values
        },
      },
      colors: [
        `${colors.icons[100]}`,
        `${colors.icons[200]}`,
        `${colors.icons[300]}`,
        `${colors.icons[400]}`,
      ],
      labels: ['Active', 'Inactive', 'Ending', 'Suspicious'],
      legend: {
        show: true,
        floating: true,
        fontSize: '12px',
        position: 'left',
        offsetX: -10,
        offsetY: -10,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ':  ' + Math.round((opts.w.globals.series[opts.seriesIndex] / 100) * maxValue);
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={200}
      />
    </div>
  );
};

export default CustomersRadialBar;
