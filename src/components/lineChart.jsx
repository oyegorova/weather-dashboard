import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = props => (
  <Line style={{ height: "50vh" }} data={props.data} options={props.options} />
);

export default LineChart;
