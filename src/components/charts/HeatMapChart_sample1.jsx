import React from 'react';
import Chart from 'react-apexcharts';

class HeatMapChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: 'heatmap',
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            colorScale: {
              ranges: [
                {
                  from: -30,
                  to: 5,
                  name: 'Low',
                  color: '#00A100',
                },
                {
                  from: 6,
                  to: 20,
                  name: 'Medium',
                  color: '#128FD9',
                },
                {
                  from: 21,
                  to: 45,
                  name: 'High',
                  color: '#FFB200',
                },
                {
                  from: 46,
                  to: 60,
                  name: 'Extreme',
                  color: '#FF0000',
                },
              ],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: 'category',
          categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
        },
      },
      series: [
        {
          name: 'Metric 1',
          data: [42, -20, 0, 30, 55],
        },
        {
          name: 'Metric 2',
          data: [0, 10, 20, 30, 40],
        },
        {
          name: 'Metric 3',
          data: [5, 15, 25, 35, 45],
        },
        {
          name: 'Metric 4',
          data: [10, 20, 30, 40, 50],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Chart options={this.state.options} series={this.state.series} type="heatmap" height={350} />
      </div>
    );
  }
}

export default HeatMapChart;

