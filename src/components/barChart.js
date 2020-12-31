import React, { useRef, useEffect } from "react";
import states from "../states";
import * as d3 from "d3";

export default function BarChart({ props }) {
  console.log(props);
  const { worldArr, stateArr } = props;

  console.log([states]);

  console.log(worldArr, stateArr);
  const svgRef = useRef();

  //   useEffect(() => {
  //     const svg = d3.select(svgRef.current);
  //     console.log(data);

  //     const xScale = d3.scaleTime().domain();

  //     // svg.selectAll(".bar").data(data).join("rect");
  //   }, [data]);

  return (
    <svg ref={svgRef}>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
}
