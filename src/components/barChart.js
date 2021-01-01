import * as d3 from "d3";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "./__barChart.scss";
import { PopperTip } from "./";

const Text = styled.text`
  color: red;
  backgroundcolor: black;
`;

export default function BarChart({ props }) {
  const [tooltip, setTooltip] = useState(false);
  const svgRef = useRef();
  //   console.log(props);

  const xValue = (d) => d.date;
  const yValue = (d) => d.totalCases;

  useEffect(() => {
    const { worldArr, statesArr } = props;

    const globalArr = worldArr.slice(0, 90).reverse();
    console.log(globalArr);
    console.log(statesArr);

    const svg = d3
      .select(svgRef.current)
      .attr("height", 500)
      .attr("width", 960);

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const margin = { top: 60, right: 80, bottom: 88, left: 150 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    console.log(globalArr[0].date);

    const xScale = d3
      .scaleTime()
      .domain([
        new Date(globalArr[0].date),
        new Date(globalArr[globalArr.length - 1].date),
      ])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(globalArr, yValue))
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisRight(yScale);

    const g = svg.selectAll(".container").data([null]);
    const gEnter = g.enter().append("g").attr("class", "container");
    gEnter
      .merge(g)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xAxisG = g.select(".x-axis");
    const xAxisGEnter = gEnter.append("g").attr("class", "x-axis");
    xAxisGEnter.merge(xAxisG).call(xAxis).selectAll(".domain").remove();

    const yAxisG = g.select(".y-axis");
    const yAxisGEnter = gEnter.append("g").attr("class", "y-axis");
    yAxisGEnter.merge(yAxisG).call(yAxis).selectAll(".domain").remove();

    xAxisGEnter
      .append("text")
      .attr("class", "axis-label")
      .attr("x", -93)
      .attr("transform", `rotate(90)`)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .merge(xAxisG.select(".axis-label"))
      .attr("y", -innerWidth / 2);

    yAxisGEnter
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -93)
      .attr("transform", `rotate(90)`)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .merge(yAxisG.select(".axis-label"))
      .attr("x", -innerHeight / 2);

    // gEnter
    //   .selectAll("rect")
    //   .data(globalArr)
    //   .join("rect")
    //   .attr("height", (d) => yValue(d) / innerHeight)
    //   .attr("x", (d, i) => (i * innerWidth) / globalArr.length)
    //   .attr("y", (d) => yScale(yValue(d)))
    //   .attr("width", (d, i) => innerWidth / globalArr.length)
    //   .attr("fill", "black")
    //   .on("mouseenter", function (e, value) {
    //     const index = svg.selectAll("rect").nodes().indexOf(this);

    //     gEnter
    //       .selectAll(".tooltip")
    //       .data([value])
    //       .join((enter) => enter.append("text").attr("y", yScale(value)))
    //       .text(`${value.date} \n ${value.totalCases}`)
    //       .attr("class", "tooltip")
    //       .attr("x", () => (index * innerWidth) / globalArr.length)
    //       .attr("y", yScale(yValue(value)) - 12)
    //       .attr("text-anchor", "middle")
    //       .attr("opacity", 0.5)
    //       .style("background-color", "red");
    //     console.log(value, index);
    //   });
    // .on("mouseleave", () => svg.select(".tooltip").remove());
  }, [props]);

  return (
    // <svg ref={svgRef}>
    <g transform={`translate(${x}, ${y})`}>
      {data.map((d) => (
        <Rect
          height={(d) => yValue(d) / innerHeight}
          width={() => innerWidth / globalArr.length}
        />
      ))}
    </g>
    // <g className="y-axis" />
    // <g className="x-axis" />
    // </svg>
  );
}
