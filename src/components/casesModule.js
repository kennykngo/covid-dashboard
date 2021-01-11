import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import * as d3 from "d3";

import CasesInfo from "./casesInfo";
import "./__casesStyles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import styled from "styled-components";

export default function CasesModule({ title, data, date }) {
  const casesInfoArr = [
    {
      covidTitle: "Confirmed",
      addition: data[0].totalCases - data[1].totalCases,
      cases: data[0].totalCases,
    },
    {
      covidTitle: "Deaths",
      addition: data[0].totalDeaths - data[1].totalDeaths,
      cases: data[0].totalDeaths,
    },
    {
      covidTitle: "Recovered",
      addition: data[0].totalRecovered - data[1].totalRecovered,
      cases: data[0].totalRecovered,
    },
  ];

  return (
    <Row className="cases-module-style pt-3 px-2 pb-3 bg-white">
      <div className="mb-2">
        <div>{title}</div>
        <div className="c-date"> Last Updated: {date}</div>
      </div>
      {casesInfoArr.map((data) => (
        <CasesInfo
          title={data.covidTitle}
          addition={data.addition}
          cases={data.cases}
        />
      ))}
    </Row>
  );
}
