import React, { useRef, useEffect } from "react";
import statesName from "../states";
import * as d3 from "d3";

export default function BarChart({ props }) {
  const svgRef = useRef();
  //   console.log(props);

  const xValue = (d) => d.date;
  const yValue = (d) => d.totalCases;

  useEffect(() => {
    const { worldArr, statesArr } = props;

    console.log(worldArr);
    console.log(statesArr);
    const svg = d3.select(svgRef.current);

    const width = +svg.attr("width");
    const height = svg.attr("height");

    console.log(worldArr[0].date);

    const xScale = d3
      .scaleTime()
      .domain(
        [new Date(worldArr[0].date), new Date(worldArr[120].date)].reverse()
      )
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(worldArr, yValue))
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickPadding(20);
    const yAxis = d3.axisLeft(yScale);

    svg.select(".x-axis").style("transform", "translateY(100px)").call(xAxis);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg.select("svg").attr("stroke", "black");
    svg.selectAll(".bar").data(props).join("rect");
  }, [props]);

  return (
    <svg width="960" height="500" ref={svgRef}>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
}
