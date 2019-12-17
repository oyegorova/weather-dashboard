import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import CurrentTemperature from './components/currentTemperature';
import { Temperature, sensorNames } from './services/API/index';
import { Chart } from 'react-chartjs-2';

class App extends Component {
  state = {};
  chartRef = React.createRef();

  getTemperatureArray = sensorName => {
    Temperature.byDay(sensorName)
      .then(data => {
        const temperatureArray = data.data[sensorName];
        console.log(sensorName, temperatureArray);
      })
      .catch(error => {
        console.log("Error in byDay request: ", error);
      });
  }

  getData = () => {
    sensorNames.forEach(sensor => {
      this.getTemperatureArray(sensor);
    });
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: ['00', '02', '03', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
        datasets: [
          {
            label: "Outside",
            data: [22, 45, 10, 22, 67, 10, 78, 45, 10, 90, 45, 10, 3],
            fill: false,
            lineTension: 0.1,
            backgroundColor: "blue",
            borderColor: "blue",
            spanGaps: true,
            pointRadius: 4,
          },
          {
            label: "Center Room",
            data: [86, 67, 91, 86, 67, 91, 86, 67, 91, 86, 67, 91, 24],
            fill: false,
            lineTension: 0.1,
            backgroundColor: "aquamarine",
            borderColor: "aquamarine",
            spanGaps: true,
            pointRadius: 4,
          }
        ]
      },
      options: {
        //Customize chart options
        responsive: true,
        maintainAspectRatio: false,
      }
    });
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
              <canvas className="w-100"
                id="myChart"
                ref={this.chartRef}
              />
            </div>
            <div className="col-1 bordered image"></div>
          </div>
        </div>
      </div >
    );
  }

}

export default App;
