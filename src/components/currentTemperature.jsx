import React, { Component } from "react";
import { WebSocket_ENDPOINT } from "../services/API/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
class CurrentTemperature extends Component {
  state = {
    value: null,
    highLimit: 26,
    lowLimit: 20
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
    const { value, highLimit, lowLimit } = this.state;
    let currentTemperature;
    let temperatureLevel = "normal";
    let isOutside = this.props.temperatureName === "outside";

    // temperature level for css class
    if (value && value > highLimit && !isOutside) {
      temperatureLevel = "high";
    } else if (value && value < lowLimit && !isOutside) {
      temperatureLevel = "low";
    }
    // show preloader before get temperature data
    if (!value) {
      currentTemperature = (
        <span>
          <FontAwesomeIcon icon={faSpinner} spin />
        </span>
      );
    } else {
      currentTemperature = <span>{value} &#x2103;</span>;
    }
    return (
      <div
        className={`d-flex flex-column justify-content-between w-100 currentTemperatureWrapper currentTemperatureWrapper--${temperatureLevel}`}
      >
        <div></div>
        <div className="temperatureValue">{currentTemperature}</div>
        <h3 className="title m-0 pb-2">{this.props.title}</h3>
      </div>
    );
  }
}

export default CurrentTemperature;
