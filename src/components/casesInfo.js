import React from "react";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import "./__casesStyles.scss";
import styled from "styled-components";

const P = styled.p`
  text-align: center;
  display: inline-block;
  margin-bottom: 0;
  color: #666;
  font-size: 13px;
`;

const CasesInfo = ({ title, addition, cases }) => {
  return (
    <Col className="cases-info-row">
      <Row className="d-flex justify-content-center">
        <div className="p-3 d-flex justify-content-center flex-column">
          <P> {title}</P>
          <div className="d-block text-center">{!cases ? "-" : cases}</div>
          <div className="text-center">
            <div className="bg-dark text-white d-inline py-1 px-2 rounded c-footnote">
              {addition > 0 ? "+" + addition : addition}
            </div>
          </div>
        </div>
      </Row>
    </Col>
  );
};

export default CasesInfo;
