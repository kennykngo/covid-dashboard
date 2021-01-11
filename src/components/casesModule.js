import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CasesInfo from "./casesInfo";
import "./__casesStyles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import styled from "styled-components";

// const Span = styled.span`
//   border-left: 1px solid black;
//   display: inline-block;
//   height: 184px;
// `;

export default function CasesModule({ title, data, date }) {
  return (
    <Row className="cases-module-style pt-3 pl-3 pb-3 bg-white">
      <div className="mb-2">
        <div>{title}</div>
        <div className="c-date"> Last Updated: {date}</div>
      </div>

      <CasesInfo title="Confirmed" addition={293} cases={"29,000"} />
      <CasesInfo title="Deaths" addition={-293} cases={29000} />
      <CasesInfo title="Recovered" addition={-293} cases={29000} />
    </Row>
  );
}
