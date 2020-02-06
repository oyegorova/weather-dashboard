import React, { Component } from "react";

class verticalBarChart extends Component {
  state = {};

  render() {
    const { data, height, labels, colors } = this.props;
    let max = 0;

    for (let i = data.length; i--; ) {
      for (let j = data[i].length; j--; ) {
        if (data[i][j] > max) {
          max = data[i][j];
        }
      }
    }
    return (
      <div>
        <h1 className="text-uppercase BarTitle">Weekly temperature</h1>
        <div className="Charts">
          {data.map(function(serie, serieIndex) {
            return (
              <div
                className="Charts--serie"
                key={serieIndex}
                style={{
                  height: height ? height : "auto"
                }}
              >
                <label>{labels[serieIndex]}</label>
                {serie.map(function(item, itemIndex) {
                  var color = colors[itemIndex],
                    style,
                    size = (item / max) * 100;

                  style = {
                    backgroundColor: color,
                    zIndex: item
                  };
                  style["height"] = size + "%";

                  return (
                    <div className="Charts--item" style={style} key={itemIndex}>
                      <b style={{ color: color }}>{item}</b>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default verticalBarChart;
