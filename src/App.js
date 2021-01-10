import React, { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// import { BarChart, CasesModule, RadioButtonsGroup } from "react-use";

// import { BarChart, CasesModule, RadioButtonsGroup } from "react-use";

import { BarChart, RadioButtonsGroup, CasesModule } from "./components";
import { LoadAndProcess } from "./loadAndProcess";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState();
  var [selectedBar, setSelectedBar] = useState();
  let [currentCase, setCurrentCase] = useState("total cases");
  const globalCaseArr = ["total cases", "total deaths"];
  // const [ref, { width }] = useMeasure();
  // const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();

  // const onMouseOver = (d) => {
  //   return setSelectedBar((selectedBar = d));
  //   console.log("worky");
  // };

  const onRadioClick = (e) => setCurrentCase(e.target.value);

  const margin = { top: 90, right: 50, bottom: 80, left: 30 };

  useEffect(() => {
    LoadAndProcess().then((d) => {
      setData(d);
    });
  }, []);

  return (
    <div className="App" style={{ height: "100vh" }}>
      <Container>
        <Row className="pt-5">
          {data ? (
            <Col md={8} xs={12}>
              <Row>
                <RadioButtonsGroup
                  selectedCase={currentCase}
                  setCurrentCase={onRadioClick}
                  globalCaseArr={globalCaseArr}
                />
                <BarChart
                  currentCase={currentCase}
                  // svgWidth={width}
                  // svgHeight={heigh}
                  // selectedRectBar={selectedBar}
                  margin={margin}
                  // onMouse={onMouseOver}
                  props={data}
                  x={margin.left}
                  y={margin.top}
                />
              </Row>
            </Col>
          ) : (
            <h1> Loading... </h1>
          )}
          {data ? (
            <Col md={4}>
              <CasesModule data={data} />
            </Col>
          ) : (
            <h1>Loading cases...</h1>
          )}
        </Row>

        <Row style={{ marginTop: "30px" }}>
          <Col
            style={{ backgroundColor: "black", height: "30px" }}
            sm={12}
            lg={6}
          ></Col>
          <Col
            style={{ backgroundColor: "red", height: "30px" }}
            sm={12}
            lg={6}
          ></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
