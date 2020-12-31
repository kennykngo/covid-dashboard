import React, { useRef, useEffect } from "react";
import statesName from "../states";
import * as d3 from "d3";

export default function BarChart({ props }) {
  console.log(props);
  const { worldArr, stateArr } = props;

  console.log([statesName]);

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    console.log(props);

    const xScale = d3.scaleTime().domain();

    // svg.selectAll(".bar").data(props).join("rect");
  }, [props]);

  return (
    <svg ref={svgRef}>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
}
