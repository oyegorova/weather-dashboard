import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
import LineChart from './components/lineChart';
import { lineChartData, lineChartOptions } from './services/chart.config';
import CurrentTemperature from './components/currentTemperature';
import { Temperature, sensorNames } from './services/API/index';
import { getImageList } from './services/images';
import VerticalBarChart from './components/verticalBarChart';

import moment from 'moment';

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
    timer: null,
    imageList: null,
    imgUrl: '',
    verticalBarData: [],
    verticalBarSeries: [],
    verticalBarColors: ['#fdde87', '#9dfd87', '#21a5f3'],
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
              if (key === "value") {
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

  getImages = () => {
    getImageList().then(
      data => {
        this.setState({ imageList: data.data });
        const imgLength = this.state.imageList.length;
        let i = imgLength - 1;
        this.setState({ imgUrl: this.state.imageList[i].download_url });
        // images slide show
        const imgTimer = setInterval(() => {
          i = i >= 0 ? i : imgLength - 1;
          this.setState({ imgUrl: this.state.imageList[i].download_url });
          i--;
        }, 180000);
        this.setState({ imgTimer });
      }
    )
  }

  calculateAverageTemperatures = async (daysNumber = 7) => {
    let averageTemperatures = {};
    let barData = [];
    let barLabels = [];
    daysNumber = parseInt(daysNumber);
    // get average values for all 3 sensors by every day
    for (let i = daysNumber; i >= 0; i--) {
      const response = await Temperature.byPeriod(sensorNames, moment().subtract(i, 'days').valueOf(), moment().subtract(i - 1, 'days').valueOf())
      const allTemperatures = response.data;
      _.map(allTemperatures, ((sensorData, index) => {
        const averageValue = _.meanBy(sensorData, (t) => t.value);
        let i = sensorNames.indexOf(index);
        averageTemperatures[i] = averageTemperatures[i] || [];
        averageTemperatures[i].push(averageValue.toFixed(2));
      }));

      // get dates for bar chart labels
      barLabels.push(moment().subtract(i, 'days').format('DD-MMM'));
      this.setState({ verticalBarSeries: barLabels });
    }

    // get average temperatures in the room for bar chart
    for (let i = 0; i < daysNumber; i++) {
      // each day has 2 values - avr temp for center room and near window
      barData[i] = barData[i] || [];
      for (let n = 0; n < 2; n++) {
        barData[i].push(averageTemperatures[n][i]);
      }
    }
    this.setState({ verticalBarData: barData });





    return averageTemperatures;
  }

  componentDidMount() {
    this._isMounted = true;
    this.getTemperatureData(sensorNames);
    this.calculateAverageTemperatures();
    const timer = setInterval(() => {
      this.getTemperatureData(sensorNames);
    }, 300000);
    const timerAverageTemp = setInterval(() => {
      this.calculateAverageTemperatures();
    }, 12 * 60 * 60 * 1000);
    this.setState({ timer, timerAverageTemp });
    // this.getImages();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.state.timer);
    clearInterval(this.state.imgTimer);
    clearInterval(this.state.timerAverageTemp);
  }

  render() {

    return (
      <div className="App">
        <div className="container-fluid dashboard">
          <div className="row vh-100">
            <div className="p-0 col col-3 col-md-2">
              <div className="d-flex flex-column justify-content-around align-items-start vh-100 p-2">
                <CurrentTemperature title='Outside' temperatureName="outside"></CurrentTemperature>
                <CurrentTemperature title='Center room' temperatureName="centerRoom"></CurrentTemperature>
                <CurrentTemperature title='Near window' temperatureName="nearWindow"></CurrentTemperature>
              </div>
            </div>
            <div className="col col-9 col-md-10 graphics d-flex flex-column justify-content-around vh-100 p-2">
              <div className="d-flex align-items-center justify-content-center" >
                {/* <img src={this.state.imgUrl} alt="random" /> */}
                <VerticalBarChart
                  data={this.state.verticalBarData}
                  labels={this.state.verticalBarSeries}
                  colors={this.state.verticalBarColors}
                  height={250}
                />
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
