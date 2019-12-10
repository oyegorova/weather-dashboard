import React from "react";

const CurrentTemperature = props => (
  <div className="d-flex flex-column justify-content-between w-100 currentTemperatureWrapper">
    <h3 className="title">{props.title}</h3>
    <div className="temperatureValue">{props.temperature} C</div>
    <div className="conditions">{props.conditions}</div>
  </div>
);

export default CurrentTemperature;
