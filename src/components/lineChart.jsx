import React from "react";
import { Line } from "react-chartjs-2";
import Spinner from "./spinner";

const LineChart = props => {
  console.log(props.data);
  if (!props.data.datasets[0].data.length) {
    return <Spinner fontSize="65px" />;
  }

  return (
    <Line
      style={{ height: "50vh" }}
      data={props.data}
      options={props.options}
    />
  );
};

export default LineChart;
