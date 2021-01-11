import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CasesInfo from "./casesInfo";
import "./__casesStyles.scss";

import styled from "styled-components";

// const Span = styled.span`
//   border-left: 1px solid black;
//   display: inline-block;
//   height: 184px;
// `;

export default function CasesModule({ data }) {
  return (
    <Row>
      <CasesInfo title="Confirmed" addition={293} />
      <CasesInfo title="Deaths" addition={-293} />
      <CasesInfo title="Recovered" addition={-293} />
    </Row>
  );
}
