import React, { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { BarChart, RadioButtonsGroup } from "./components";
import { LoadAndProcess } from "./loadAndProcess";

function App() {
  const [data, setData] = useState();
  var [selectedBar, setSelectedBar] = useState();
  let [currentCase, setCurrentCase] = useState("total cases");
  const globalCaseArr = ["total cases", "total deaths"];

  const onMouseOver = (d) => {
    return setSelectedBar((selectedBar = d));
    console.log("worky");
  };

  const onRadioClick = (e) => setCurrentCase(e.target.value);

  const margin = { top: 90, right: 100, bottom: 80, left: 150 };

  useEffect(() => {
    LoadAndProcess().then((d) => {
      setData(d);
    });
  }, []);

  return (
    <div className="App">
      <RadioButtonsGroup
        selectedCase={currentCase}
        setCurrentCase={onRadioClick}
        globalCaseArr={globalCaseArr}
      />
      <Container>
        <Row>
          {data ? (
            <BarChart
              currentCase={currentCase}
              svgWidth={960}
              svgHeight={500}
              // selectedRectBar={selectedBar}
              margin={margin}
              // onMouse={onMouseOver}
              props={data}
              x={margin.left}
              y={margin.top}
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
