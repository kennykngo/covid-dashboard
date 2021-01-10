import React from "react";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import "./__casesStyles.scss";

const CasesInfo = ({ title, addition }) => {
  return (
    <Col>
      <Row className="d-flex justify-content-center">
        <div className="p-3 d-flex justify-content-center flex-column">
          <p className="text-center"> {title}</p>

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
