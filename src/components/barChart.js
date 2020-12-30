import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function BarChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    console.log(data);

    const xScale = d3.scaleTime().domain();

    // svg.selectAll(".bar").data(data).join("rect");
  }, [data]);

  return (
    <svg ref={svgRef}>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
}
