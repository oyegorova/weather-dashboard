import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = props => (
  <Bar
    id="bar-chart"
    style={{ maxHeight: "30vh", position: "relative" }}
    data={props.data}
    options={props.options}
  />
);

export default BarChart;
