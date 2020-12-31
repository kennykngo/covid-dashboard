import React, { useRef, useEffect } from "react";
import statesName from "../states";
import * as d3 from "d3";

export default function BarChart({ props }) {
  const svgRef = useRef();
  //   console.log(props);

  const yValue = (d) => d.totalCases;
  const xValue = (d) => d.date;

  useEffect(() => {
    const { worldArr, statesArr } = props;

    console.log(worldArr);
    console.log(statesArr);
    const svg = d3.select(svgRef.current);

    console.log(svg);
    const screenWidth = svg.attr("width");
    const height = svg.attr("height");
    console.log(worldArr[0].date);

    const xScale = d3
      .scaleTime()
      .domain([new Date(worldArr[0].date), new Date(worldArr[120].date)])
      .range([0, 300]);

    const yScale = d3
      .scaleTime()
      .domain(d3.extent(worldArr, yValue))
      .range([0, 150]);

    // const xScale = d3
    //   .scaleTime()
    //   .domain(
    //     d3.extent(new Date(worldArr[0].date), new Date(worldArr[120].date))
    //   );
    //   .range([0, 300]);

    svg.selectAll(".bar").data(props).join("rect");
  }, [props]);

  return (
    <svg ref={svgRef}>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
}
