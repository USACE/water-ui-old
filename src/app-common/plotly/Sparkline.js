import React from "react";
import PropTypes from "prop-types";
import A2Wplot from "./A2Wplot";

const Sparkline = ({ data }) => (
  <A2Wplot
    data={[{
      ...data,
      type: "scatter",
      mode: "lines",
      line: {
        width: 1,
        color: "blue"
      },
    }]}
    layout={{
      height: "50",
      width: "175",
      showlegend: false,
      hovermode: false,
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { t: 0, b: 0, l: 0, r: 0 },
      xaxis: {
        ticks: "", 
        showgrid: false, 
        showline: false, 
        zeroline: false, 
        showticklabels: false
      },
      yaxis: { 
        ticks: "", 
        showgrid: false, 
        showline: false, 
        zeroline: false, 
        showticklabels: false  
      },
    }}
    config={{
      displayModeBar: false,
    }}
  />
);

Sparkline.propTypes = {
  data: PropTypes.shape({
    x: PropTypes.array.isRequired,
    y: PropTypes.array.isRequired,
  }).isRequired,
}

export default Sparkline;
