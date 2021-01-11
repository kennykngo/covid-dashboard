import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import * as d3 from "d3";

import CasesInfo from "./casesInfo";
import "./__casesStyles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import styled from "styled-components";

export default function CasesModule({ title, data, date }) {
  const covidTitle = ["Confirmed", "Deaths", "Recovered"];
  const covidChanges = ["totalCases", "totalDeaths", "totalRecovered"];

  const casesInfoArr = [];

  for (let i = 0; i < covidTitle.length; i++) {
    casesInfoArr.push({
      title: covidTitle[i],
      changes: data[0][`${covidChanges[i]}`] - data[1][`${covidChanges[i]}`],
      cases: data[0][`${covidChanges[i]}`],
    });
  }

  return (
    <Row className="cases-module-style pt-3 px-2 pb-3 bg-white">
      <div className="mb-2">
        <div>{title}</div>
        <div className="c-date"> Last Updated: {date}</div>
      </div>
      {casesInfoArr.map((data, i) => (
        <CasesInfo
          key={i}
          title={data.title}
          changes={data.changes}
          cases={data.cases}
        />
      ))}
    </Row>
  );
}
