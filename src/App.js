import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
import LineChart from './components/lineChart';
import { lineChartData, lineChartOptions, barChartData, barChartOptions } from './services/chart.config';
import CurrentTemperature from './components/currentTemperature';
import { Temperature, sensorNames } from './services/API/index';

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

  componentDidMount() {
    this._isMounted = true;
    this.getTemperatureData(sensorNames);
    const timer = setInterval(() => { this.getTemperatureData(sensorNames) }, 300000);
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
            <div className="col-9 graphics d-flex flex-column vh-100 p-2">

              <div className="">
              </div>
              <div className="chart-container d-flex flex-row aling-content-center justify-content-center">
                <LineChart
                  data={this.state.lineChartData}
                  options={this.state.lineChartOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }

}

export default App;
