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
    const svg = d3
      .select(svgRef.current)
      .attr("height", 500)
      .attr("width", 960);

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const margin = { top: 60, right: 280, bottom: 88, left: 105 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    console.log(worldArr[0].date);

    const xScale = d3
      .scaleTime()
      .domain(
        [new Date(worldArr[0].date), new Date(worldArr[90].date)].reverse()
      )
      .range([innerWidth, 0]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(worldArr, yValue))
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisRight(yScale);

    const g = svg.selectAll(".container").data([null]);
    const gEnter = g.enter().append("g").attr("class", "container");
    gEnter
      .merge(g)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xAxisG = g.select(".x-axis");

    const yAxisG = g.select(".y-axis");
    const yAxisGEnter = gEnter.append("g").attr("class", "y-axis");
    yAxisGEnter.merge(yAxisG).call(yAxis).selectAll(".domain").remove();

    yAxisGEnter.append("text").attr("class", "axis-label");

    // svg.select(".x-axis").style("transform", "translateY(100px)").call(xAxis);
    // svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    gEnter
      .selectAll("rect")
      .data(worldArr.reverse())
      .join("rect")
      .attr("height", (d) => yValue(d) / 10000)
      .attr("x", (d, i) => 10 * i)
      .attr("width", 2)
      .attr("fill", "black");
  }, [props]);

  return (
    <svg ref={svgRef}>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
}
