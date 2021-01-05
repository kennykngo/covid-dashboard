import React, { useEffect, useRef, useState } from "react";

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

  const onRadioClick = (d) => setCurrentCase(d);

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
      {data ? (
        <BarChart
          svgWidth={960}
          svgHeight={500}
          selectedRectBar={selectedBar}
          margin={margin}
          onMouse={onMouseOver}
          props={data}
          x={margin.left}
          y={margin.top}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
