import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import CurrentTemperature from './components/currentTemperature';
import { Temperature, sensorNames } from './services/API/index';
import LineChart from './components/lineChart';
import _ from 'lodash'

class App extends Component {
  _isMounted = false;

  state = {
    outside: null,
    centerRoom: null,
    nearWindow: null,
    d3: null,
    data: null,
    lineChartData: {
      datasets: [
        {
          type: "scatter",
          label: "Center Room",
          showLine: true,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: '#9dfd87',
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          borderWidth: "2",
          lineTension: 0.05,
          data: [],
          yAxisID: 'A'
        },
        {
          type: "scatter",
          label: "Near Window",
          showLine: true,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: '#fdde87',
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          borderWidth: "2",
          lineTension: 0.05,
          data: [],
          yAxisID: 'A'
        }, {
          type: "scatter",
          label: "Outside",
          showLine: true,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: '#21a5f3',
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          borderWidth: "2",
          lineTension: 0.05,
          data: [],
          yAxisID: 'B'
        },
      ]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      padding: 10,
      title: {
        display: true,
        text: "HOURLY TEMPERATURE",
        fontSize: 25,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontColor: 'white',
        padding: 15,
      },
      tooltips: {
        enabled: true,
        mode: 'index',
        intersect: false,
        fontColor: 'white',
      },
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
          gridLines: {
            display: true,
            color: '#ffffff45'
          },
          ticks: {
            lineHeight: 2.5,
            fontSize: 16,
            fontFamily: 'Roboto',
            fontColor: 'white',
            stacked: true,
            callback: value => `${value} °`
          }
        }, {
          id: 'B',
          type: 'linear',
          position: 'right',
          gridLines: {
            display: true,
            color: '#ffffff45'
          },
          ticks: {
            auto: true,
            lineHeight: 2.5,
            fontSize: 22,
            fontFamily: 'Roboto',
            fontColor: '#21a5f3',
            stacked: true,
            callback: value => `${value} °`
          }
        }],
        xAxes: [{
          type: 'time',
          distribution: 'series',
          gridLines: {
            display: false,
            color: 'white'
          },
          time: {
            unit: 'hour',
            displayFormats: {
              quarter: 'h:mm a'
            }
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            maxTicksLimit: 10,
            lineHeight: 2.5,
            fontSize: 16,
            fontFamily: 'Roboto',
            fontColor: 'white',
          }
        }]
      },
      legend: {
        labels: {
          fontColor: "white",
          fontSize: 18
        }
      },
    },
    timer: null
  };

  getTemperatureArray = sensorName => {
    const oldDataSet = this.state.lineChartData.datasets;
    let newDataSet = [...oldDataSet];

    Temperature.byDay(sensorName)
      .then(data => {
        sensorNames.forEach((sensor, index) => {
          const temperatureArray = data.data[sensor];
          // transform obj to have x-y values
          let newData = temperatureArray.map(obj => {
            return _.transform(obj, (result, value, key) => {
              if (key == "value") {
                return result["y"] = value;
              } else {
                let v = new Date(value).getTime();
                return result["x"] = v;
              }
            });
          });
          newDataSet[index].data = newData;
          const newChartData = {
            ...this.state.lineChartData
          };
          newChartData.datasets = newDataSet;
          if (this._isMounted) this.setState({ lineChartData: newChartData });
          console.log('datasets: ', this.state.lineChartData.datasets)
        })

      })
      .catch(error => {
        console.log("Error in byDay request: ", error);
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.getTemperatureArray(sensorNames);
    const timer = setInterval(() => { this.getTemperatureArray(sensorNames) }, 300000);
    this.setState({ timer });
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.state.timer);
  }

  render() {

    return (
      <div className="App">
        <div className="container-fluid dashboard">
          <div className="row vh-100">
            <div className="p-0">
              <div className="d-flex flex-column justify-content-around align-items-start vh-100 p-2">
                <CurrentTemperature title='Outside' temperatureName="outside"></CurrentTemperature>
                <CurrentTemperature title='Center room' temperatureName="centerRoom"></CurrentTemperature>
                <CurrentTemperature title='Near window' temperatureName="nearWindow"></CurrentTemperature>
              </div>
            </div>
            <div className="col-8 graphics d-flex flex-column justify-content-around vh-100 p-2">
              <div className="chart-container">
                <LineChart
                  data={this.state.lineChartData}
                  options={this.state.lineChartOptions}
                />
              </div>
            </div>
            <div className="col-1 bordered image"></div>
          </div>
        </div>
      </div >
    );
  }

}

export default App;
