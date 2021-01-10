import React from "react";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const CasesInfo = ({ title }) => {
  return (
    <Col className="d-flex">
      <h6> {title}</h6>
      <div>
        <p>+293</p>
      </div>
    </Col>
  );
};

export default CasesInfo;
