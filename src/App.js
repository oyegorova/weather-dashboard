import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
import moment from 'moment';
import LineChart from './components/lineChart';
import BarChart from './components/barChart';
import { lineChartData, lineChartOptions, barChartData, barChartOptions } from './services/chart.config';
import CurrentTemperature from './components/currentTemperature';
import { Temperature, sensorNames } from './services/API/index';
import { Chart } from 'react-chartjs-2';

class App extends Component {
  _isMounted = false;

  state = {
    outside: null,
    centerRoom: null,
    nearWindow: null,
    d3: null,
    data: null,
    lineChartData: lineChartData,
    lineChartOptions: lineChartOptions,
    barChartData: barChartData,
    barChartOptions: barChartOptions,
    timer: null
  };

  getTemperatureData = sensorName => {
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
          if (this._isMounted) {
            this.setState({ lineChartData: newChartData });
          }

        })

      })
      .catch(error => {
        console.log("Error in byDay request: ", error);
      });
  }



  calculateAverageTemperatures = (daysNumber) => {
    let averageTemperatures = {};
    const oldBarDataSet = this.state.barChartData.datasets;
    let newBarDataSet = [...oldBarDataSet];
    const newBarChartData = {
      ...this.state.barChartData
    };
    // get average values for all sensors by every day
    for (let i = parseInt(daysNumber); i >= 0; i--) {
      Temperature.byPeriod(sensorNames, moment().subtract(i, 'days').valueOf(), moment().subtract(i - 1, 'days').valueOf())
        .then(response => {
          const allTemperatures = response.data;
          _.map(allTemperatures, ((sensorData, index) => {

            const averageValue = _.meanBy(sensorData, (t) => t.value);
            let i = sensorNames.indexOf(index);
            newBarDataSet[i] = { ...this.state.barChartData.datasets[i] };
            newBarDataSet[i].data = newBarDataSet[i].data || [];
            newBarDataSet[i].data.push(averageValue.toFixed(2));
            newBarChartData.datasets = newBarDataSet;


          }));
          this.setState({ barChartData: newBarChartData });
          return newBarChartData;

        });
    }

  }

  componentDidMount() {
    this._isMounted = true;
    this.getTemperatureData(sensorNames);
    const timer = setInterval(() => { this.getTemperatureData(sensorNames) }, 300000);
    this.setState({ timer });
    const newData = this.calculateAverageTemperatures(5);
    //this.setState({ barChartData: newData });
    const ctx = document.getElementById("bar-chart").getContext("2d");
    let gradientStroke = ctx.createLinearGradient(0, 500, 0, 100);

    const oldBarDataSet = this.state.barChartData.datasets;
    const newBarDataSet = [...oldBarDataSet];
    _.map(newBarDataSet, (set, i) => {
      gradientStroke.addColorStop(0, 'rgba(3, 2, 252, 0.85)');
      gradientStroke.addColorStop(1, 'rgba(224, 76, 5, 0.95)');
      set.backgroundColor = gradientStroke;
    })
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
            <div className="col-8 graphics d-flex flex-column vh-100 p-2">
              <div className="chart-container">
                <LineChart
                  data={this.state.lineChartData}
                  options={this.state.lineChartOptions}
                />
              </div>
              <div className="bar-container">
                <BarChart data={this.state.barChartData} options={this.state.barChartOptions}></BarChart>
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
