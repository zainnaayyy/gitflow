import React from 'react';
import Chart from 'react-apexcharts';

const TicketBarChart = () => {
  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    xaxis: {
      categories: ['Category A', 'Category B', 'Category C'],
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    dataLabels: {
      formatter: function (val) {
        return val.toFixed(2) + '%';
      },
      offsetY: -2,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ['#008FFB', '#00E396', '#FEB019'],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '%';
        },
      },
    },
  };

  const series = [
    {
      name: 'Series 1',
      data: [30.00, 45.00, 25.00],
    },
    {
      name: 'Series 2',
      data: [15.00, 20.00, 35.00],
    },
    {
      name: 'Series 3',
      data: [10.00, 20.00, 5.00],
    },
  ];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default TicketBarChart;
