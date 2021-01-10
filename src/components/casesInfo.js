import React from "react";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const CasesInfo = ({ title, addition }) => {
  return (
    <Col className="d-flex">
      <h6> {title}</h6>

      <div className="p-3">
        <p>{addition > 0 ? "+" + addition : addition}</p>
      </div>
    </Col>
  );
};

export default CasesInfo;
