import React, { Component } from 'react';
import ReactApexCharts from 'react-apexcharts';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: 'distance',
        data: this.props.distances
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          // formatter: function (val) {
          //   return val + "%";
          // },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: this.props.dates,
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 10000],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            // formatter: function (val) {
            //   return val + "%";
            // }
          }
        },
        title: {
          text: `Distance travelled by ${this.props.barber.phone}`,
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
      
      
    };
  }

    

    render() {



      return (
          <div className="container" style={{paddingTop: '5%'}}>
              <div id="chart">
                  <ReactApexCharts options={this.state.options} series={this.state.series} type="bar" height={350} />
              </div>
          </div>
      );
    }
}

export default BarChart;