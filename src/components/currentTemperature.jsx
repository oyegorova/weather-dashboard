import React, { Component } from "react";
import { WebSocket_ENDPOINT } from "../services/API/index";

class CurrentTemperature extends Component {
  state = {
    value: 0
  };

  componentDidMount = () => {
    const sensorName = this.props.temperatureName;
    const ws = new WebSocket(WebSocket_ENDPOINT);
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onmessage = event => {
      // listen to data sent from the websocket server
      const message = JSON.parse(event.data);
      console.log("FROM WS: ", message);
      if (message.data.sensorName === sensorName) {
        this.setState({ value: message.data.value });
      }
    };
    ws.onclose = () => {
      console.log("disconnected");
      // TODO: automatically try to reconnect on connection loss
    };

    ws.onerror = e => {
      console.log("Error with web socket: ", e);
    };
  };

  render() {
    return (
      <div className="d-flex flex-column justify-content-between w-100 currentTemperatureWrapper">
        <div></div>
        <div className="temperatureValue">{this.state.value} &#x2103;</div>
        <h3 className="title m-0 pb-2">{this.props.title}</h3>
      </div>
    );
  }
}

export default CurrentTemperature;
