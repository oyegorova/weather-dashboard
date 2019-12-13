import React, { Component } from "react";
import worker from "../worker";
import WebWorker from "../workerSetup";

class CurrentTemperature extends Component {
  state = {
    value: 0
  };

  fetchWebWorker = () => {
    this.worker.postMessage(this.props.temperatureName);

    this.worker.addEventListener("message", event => {
      this.setState({
        value: event.data
      });
    });
  };

  componentDidMount = () => {
    this.worker = new WebWorker(worker);
    this.fetchWebWorker();
  };

  componentWillUnmount = () => {
    this.worker.terminate();
  };

  render() {
    return (
      <div className="d-flex flex-column justify-content-between w-100 currentTemperatureWrapper">
        <h3 className="title">{this.props.title}</h3>
        <div className="temperatureValue">{this.state.value} C</div>
        <div className="conditions">sunny</div>
      </div>
    );
  }
}

export default CurrentTemperature;
