import React, { useRef, useEffect } from "react";
import statesName from "../states";
import * as d3 from "d3";

export default function BarChart({ props }) {
  const svgRef = useRef();
  console.log(props);

  const { worldArr, statesArr } = props;
  console.log(worldArr);
  console.log(statesArr);

  const yValue = (d) => d.totalCases;
  const xValue = (d) => d.date;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    console.log(svg);

    const screenWidth = svg.attr("width");
    const height = svg.attr("height");

    const xScale = d3.scaleTime().domain();

    svg.selectAll(".bar").data(props).join("rect");
  }, [props]);

  return (
    <svg ref={svgRef}>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
}
