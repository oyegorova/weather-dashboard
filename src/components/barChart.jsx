import React, { Component } from "react";
import BarChart from 'react-bar-chart';

const data = [
  {text: 'Outside', value: 500}, 
  {text: 'Center Room', value: 300},
  {text: 'Near Window', value: 279},
];
 
const margin = {top: 20, right: 20, bottom: 30, left: 40};

class BarChartComp extends Component {
  state = {
    width: 500
  };
  componentDidMount = () => {
    window.onresize = () => {
     this.setState({width: this.refs.root.offsetWidth}); 
    };
  }

  render() {
   let style = {
      stroke: "steelblue",
      strokeWidth: "1px"
    }
    
    let textStyle = {
      fontSize: "0.8em",
      fill: "steelblue",
      textAnchor: "end"
    }
      return (
        <div ref='root'>
            <div style={{width: '50%'}}> 
                <BarChart ylabel='Weekly Average Temperature'
                  width={this.state.width}
                  height={500}
                  margin={margin}
                  data={data}
                  style={ style }
                  onBarClick={this.handleBarClick}/>
            </div>
        </div>
      );
    } 
}

export default BarChartComp;
