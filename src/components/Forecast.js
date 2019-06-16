import React, { Component } from "react";
import { observer } from "mobx-react";

var Chart = require("chart.js");

@observer
class Forecast extends Component {
  componentDidMount() {
    const node = this.node;
    new Chart(node, {
      type: "line",
      data: {
        labels: ["1 day", "2 days", "3 days", "4 days", "5days"],
        datasets: [
          {
            label: "5 days forecast",
            data: [20, 32, 26, 31, 25]
            // backgroundColor: [
            //   "rgba(255, 99, 132)",
            //   "rgba(54, 162, 23)",
            //   "rgba(55, 26, 86)",
            //   "rgba(75, 192, 192)",
            //   "rgba(153, 102, 255)",
            //   "rgba(255, 159, 64)"
            // ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="forecast-main-container">
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default Forecast;
