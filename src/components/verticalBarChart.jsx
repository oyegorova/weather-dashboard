import React, { Component } from "react";

class verticalBarChart extends Component {
  state = {};

  render() {
    const { data, height, labels, colors } = this.props;
    let max = 0;

    for (let t of data) {
      let highest = Math.max.apply(null, t);
      if (max < highest) max = highest;
    }

    return (
      <div className="w-100 wrapper">
        <h1 className="text-uppercase BarTitle">
          Weekly average temperature in 5.04 Tokyo
        </h1>
        <div className="legend"></div>
        <div className="Charts">
          {data.map((serie, serieIndex) => {
            return (
              <div className="Charts--serie" key={serieIndex}>
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
