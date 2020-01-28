import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart extends Component {
  state = {};
  render() {
    if (this.props.data.datasets[0].data.length === 5) {
      return (
        <Bar
          id="bar-chart"
          height={100}
          data={this.props.data}
          options={this.props.options}
        />
      );
    } else {
      return <p>Loading</p>;
    }
  }
}

export default BarChart;
