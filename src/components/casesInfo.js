import React from "react";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import "./__casesStyles.scss";
import styled from "styled-components";

import * as d3 from "d3";

const P = styled.p`
  text-align: center;
  display: inline-block;
  margin-bottom: 0;
  color: #666;
  font-size: 13px;
`;

const commaInsertion = (num) => d3.format(",")(num);

const CasesInfo = ({ title, changes, cases }) => {
  const changesFootnote = () => {
    return (
      <div className="bg-dark text-white d-inline py-1 px-2 rounded c-footnote">
        {changes > 0
          ? "+" + commaInsertion(changes)
          : changes === 0
          ? "-"
          : "-" + commaInsertion(changes)}
      </div>
    );
  };

  return (
    <Col xs={4} className="cases-info-row">
      <Row className="d-flex pb justify-content-center">
        <div className="px-3 d-flex justify-content-center flex-column ">
          <P> {title}</P>
          <div className="d-block text-center">
            {!cases ? "-" : commaInsertion(cases)}
          </div>
          <div className="text-center">{changesFootnote()}</div>
        </div>
      </Row>
    </Col>
  );
};

export default CasesInfo;
