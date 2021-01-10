import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CasesInfo from "./casesInfo";

export default function CasesModule({ data }) {
  console.log(data);

  return (
    <Row>
      <CasesInfo title="Confirmed" />
      <CasesInfo title="Deaths" />
    </Row>
  );
}
