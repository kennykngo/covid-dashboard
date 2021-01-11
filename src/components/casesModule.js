import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as d3 from "d3";

import CasesInfo from "./casesInfo";
import "./__casesStyles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import styled from "styled-components";

const commaInsertion = (num) => d3.format(",")(num);

export default function CasesModule({ title, data, date }) {
  console.log(data);

  return (
    <Row className="cases-module-style pt-3 px-2 pb-3 bg-white">
      <div className="mb-2">
        <div>{title}</div>
        <div className="c-date"> Last Updated: {date}</div>
      </div>

      <CasesInfo
        title="Confirmed"
        addition={commaInsertion(data[0].totalCases - data[1].totalCases)}
        cases={commaInsertion(data[0].totalCases)}
      />
      <CasesInfo
        title="Deaths"
        addition={commaInsertion(data[0].totalDeaths - data[1].totalDeaths)}
        cases={commaInsertion(data[0].totalDeaths)}
      />
      <CasesInfo
        title="Recovered"
        addition={commaInsertion(
          data[0].totalRecovered - data[1].totalRecovered
        )}
        cases={commaInsertion(data[0].totalRecovered)}
      />
    </Row>
  );
}
