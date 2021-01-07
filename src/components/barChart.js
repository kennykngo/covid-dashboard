import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import { useMeasure } from "react-use";
import ResizeObserver from "resize-observer-polyfill";
import styled from "styled-components";

import "./__barChart.scss";

const Rect = styled.rect`
  fill: steelblue;
  stroke: 1px solid black;
`;

let currentValue;

const xValue = (d) => d.date;
const yValue = (d) =>
  currentValue === "total cases" ? d.totalCases : d.totalDeaths;

const Tooltip = ({ x, y, data, style }) => (
  <ForeignObject x={x} y={y} width={100} height={50} style={style}>
    <div>
      {/* {console.log(y)} */}
      <h6>{data.date}</h6>
      <p> {d3.format(",")(yValue(data))}</p>
    </div>
  </ForeignObject>
);

const ForeignObject = styled.foreignObject`
  text-align: center;
  font-size: 9px;
  border-radius: 10px;
`;

const BarChart = ({
  // svgWidth,
  // svgHeight,
  currentCase,
  margin,
  props,
  x,
  y,
}) => {
  let [tooltip, setTooltip] = useState(false);
  let [indexOfBar, setIndexOfBar] = useState(0);

  const [
    ref,
    {
      // x,
      // y,
      width,
      // height
      top,
      right,
      bottom,
      left,
    },
  ] = useMeasure();

  const svgRef = useRef(null);
  const { worldArr, statesArr } = props;
  const globalArr = worldArr.slice(0, 90).reverse();
  currentValue = currentCase;

  useEffect(() => draw(), [globalArr]);

  console.log(width);
  const height = 500;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // const xScale = d3
  //   .scaleTime()
  //   .domain([
  //     new Date(globalArr[0].date),
  //     new Date(globalArr[globalArr.length - 1].date),
  //   ])
  //   .range([0, width]);
  // .range([0, innerWidth]);

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

    const yTickFormat = (num) => d3.format(".2s")(num);

    const xTickValues = globalArr.map((d) => xValue(d));

    const xAxis = d3
      .axisBottom(xScale)
      // .tickValues([1, 2, 3, 4, 5])
      .tickFormat(d3.utcFormat("%-m/%-d"))
      .ticks(innerWidth < 500 ? 6 : 10);
    // d3.utcMonday
    //   .every(width > 720 ? 1 : 2)
    //   .range(globalArr[0].date, globalArr[globalArr.length - 1].date)

    const yAxis = d3
      .axisRight(yScale)
      .tickSize(innerWidth)
      .tickFormat(yTickFormat);
    // .nice();

    const g = svg.selectAll(".container").data([null]);
    const gEnter = g.enter().append("g").attr("class", "container");
    gEnter
      .merge(g)
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll(".container")
      .remove();

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

    // const rectBars = gEnter.selectAll(".rectBars").data(globalArr).join("rect");

    svg
      .selectAll("rect")
      .data(globalArr)
      .attr("opacity", (d) => (!tooltip || d === tooltip ? 1 : 0.5))
      .attr("x", (d, i) => (i * innerWidth) / globalArr.length);
    // .transition()
    // .duration(250);

    gEnter
      .append("text")
      .attr(
        "transform",
        `translate(${width / 2}, ${-margin.top + margin.bottom / 2})`
      )
      .attr("class", "title")
      .text("Global COVID Cases");

    // svg
    //   .selectAll("foreignobject")
    //   .data(globalArr)
    //   .attr("x", (d, i) => (i * innerWidth) / globalArr.length);

    // const title = d3.select(".title").data([null]);
    // const titleEnter = title.join("h1").attr("class", "title").text("Hi");
  };

  const bars = globalArr.map((d, index) => (
    <Rect
      rx={"1px"}
      height={innerHeight - yScale(yValue(d))}
      width={innerWidth / globalArr.length}
      y={yScale(yValue(d))}
      x={(index * innerWidth) / globalArr.length}
      style={
        currentCase === "total cases"
          ? { fill: "steelblue" }
          : { fill: "indianred" }
      }
      id={index}
      key={index}
      onMouseOver={() => {
        setIndexOfBar(index);
        return setTooltip(d);
      }}
      onMouseOut={() => setTooltip(false)}
    />
  ));

  return (
    <Col className="d-flex" ref={ref}>
      <svg ref={svgRef} height={height} width={width} id="svg-id">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {bars}
          {tooltip && (
            <Tooltip
              // x={xScale(xValue(tooltip))}
              x={
                indexOfBar > 63
                  ? (indexOfBar * innerWidth) / globalArr.length -
                    margin.left * 3.5
                  : (indexOfBar * innerWidth) / globalArr.length
              }
              y={
                width < 420 && indexOfBar > 50
                  ? yScale(yValue(tooltip)) + margin.top
                  : yScale(yValue(tooltip)) - margin.top
              }
              style={
                currentCase === "total cases"
                  ? { backgroundColor: "steelblue" }
                  : { backgroundColor: "indianred" }
              }
              // y={innerHeight - margin.top}
              data={tooltip}
            />
          )}
        </g>
        <g className="y-axis" />
        <g className="x-axis" />
      </svg>
    </Col>
  );
};

export default BarChart;
