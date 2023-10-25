import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import './style.css'

const BridgeUpdateDonutChart = ({colors}) => {
  // Sample data for the initial chart
  const initialData = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        backgroundColor: colors.primary[710],
        foreColor: colors.contentSideBar[500],
        type: 'donut',
      },
      labels: ['Apple', 'Banana', 'Cherry', 'Dates', 'Orange'],
    },
  };

  // State to store the current data of the chart
  const [chartData, setChartData] = useState(initialData);

  // Function to update the chart with new data on button click
  const handleUpdateChart = () => {
    const newData = {
      series: [30, 20, 10, 15, 25], // Sample new data
    };
    setChartData((prevData) => ({ ...prevData, series: newData.series }));
  };

  return (
    <div style={{ marginTop: 1}}>
      <ApexCharts options={chartData.options} series={chartData.series} type="donut" width="278" />
      {/*<button onClick={handleUpdateChart}>Update Chart</button>*/}
    </div>
  );
};

export default BridgeUpdateDonutChart;