import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import "./__barChart.scss";

const Rect = styled.rect`
  fill: red;
`;

const xValue = (d) => d.date;
const yValue = (d) => d.totalCases;

const Tooltip = ({ x, y, data }) => (
  <ForeignObject x={x} y={y} width={100} height={50}>
    <div>
      {console.log(x, y)}
      <strong>{data.date}</strong>
      <p> {data.totalCases}</p>
    </div>
  </ForeignObject>
);

const ForeignObject = styled.foreignObject`
  background-color: green;
  font-size: 9px;
`;

// const BarChart = ({ props, forwardedRef, x, y }) => {
const BarChart = ({
  svgWidth,
  svgHeight,
  selectedRectBar,
  margin,
  onMouse,
  props,
  x,
  y,
}) => {
  let [selectedBar, setSelectedBar] = useState();
  let [tooltip, setTooltip] = useState(false);
  // console.log(props);
  const svgRef = useRef(null);
  const { worldArr, statesArr } = props;
  const globalArr = worldArr.slice(0, 90).reverse();

  // onMouse(globalArr);
  // console.log(selectedRectBar);

  const onClick = (d) => setSelectedBar((selectedBar = d));

  useEffect(() => draw(), [globalArr]);

  // const onClick = (d) => {
  //   selectedBar = d;
  // };

  const width = svgWidth;
  const height = svgHeight;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleTime()
    .domain([
      new Date(globalArr[0].date),
      new Date(globalArr[globalArr.length - 1].date),
    ])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(globalArr.map((d) => yValue(d)))])
    // .domain(d3.extent(globalArr, yValue))
    .range([innerHeight, 0]);

  const draw = () => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleTime()
      .domain([
        new Date(globalArr[0].date),
        new Date(globalArr[globalArr.length - 1].date),
      ])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(globalArr.map((d) => yValue(d)))])
      // .domain(d3.extent(globalArr, yValue))
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisRight(yScale).tickSize(innerWidth);

    const g = svg.selectAll(".container").data([null]);
    const gEnter = g.enter().append("g").attr("class", "container");
    gEnter
      .merge(g)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xAxisG = g.select(".x-axis");
    const xAxisGEnter = gEnter
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`);
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

    const rectBars = gEnter.selectAll(".rectBars").data(globalArr).join("rect");

    svg
      .selectAll("rect")
      .data(globalArr)
      .attr("opacity", (d) => (!tooltip || d === tooltip ? 1 : 0.5))
      .transition()
      .duration(250);
    // rectBars
    //   .attr("x", (d, i) => (i * innerWidth) / globalArr.length)
    //   .attr("y", (d) => yScale(yValue(d)))
    //   .attr("width", (d, i) => innerWidth / globalArr.length)
    //   .attr("height", (d) => innerHeight - yScale(yValue(d)))
    //   .attr("class", "rectBars")
    //   .attr("opacity", (d) => (!selectedBar || d === selectedBar ? 1 : 0.5));
    // // .transition()

    // gEnter
    //   .selectAll(".rectBars")
    //   .on("mouseenter", function (e, value) {
    //     const index = svg.selectAll("rect").nodes().indexOf(this);
    //     onClick(value);

    //     // console.log(this);
    //     // d3.select(this)
    //     //   .transition()
    //     //   .duration(350)
    //     //   .attr("opacity", (d) => (d === selectedBar ? 1 : 0.5));
    //     d3.selectAll("rect")
    //       .transition()
    //       .duration(50)
    //       .attr("opacity", (d) =>
    //         !selectedBar || d === selectedBar ? 1 : 0.5
    //       );

    //     // setSelectedBar((selectedBar = value));
    //     console.log(selectedBar);

    //     gEnter
    //       .selectAll(".tooltip")
    //       .data([value])
    //       .join((enter) => enter.append("text").attr("y", yScale(value)))
    //       .text(`${value.date}\n ${value.totalCases}`)
    //       .attr("class", "tooltip")
    //       .attr("x", () => (index * innerWidth) / globalArr.length)
    //       .attr("y", yScale(yValue(value)) - 12)
    //       .attr("text-anchor", "middle");
    //     // .attr("opacity", 0.5)
    //     // .style("background-color", "red");
    //   })
    //   .on("mouseleave", () => {
    //     svg.select(".tooltip").remove();
    //   });
  };

  const bars = globalArr.map((d, i) => (
    <Rect
      height={innerHeight - yScale(yValue(d))}
      width={innerWidth / globalArr.length}
      y={yScale(yValue(d))}
      x={(i * innerWidth) / globalArr.length}
      onMouseOver={() => setTooltip(d)}
      onMouseOut={() => setTooltip(false)}
    />
  ));

  return (
    <svg ref={svgRef} height={svgHeight} width={svgWidth}>
      <g transform={`translate(${x}, ${y})`}>
        {bars}
        {tooltip && (
          <Tooltip
            x={xScale(xValue(tooltip))}
            y={yScale(yValue(tooltip))}
            data={tooltip}
          />
        )}
      </g>
      <g className="y-axis" />
      <g className="x-axis" />
    </svg>
  );
};

export default BarChart;
