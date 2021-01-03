import React, { useEffect, useRef, useState } from "react";

import { BarChart } from "./components";
import { LoadAndProcess } from "./loadAndProcess";

import "./App.css";

function App() {
  const [data, setData] = useState();
  // let [selectedBar, setSelectedBar] = useState([]);

  const onMouseOver = (d) => {
    setSelectedBar((selectedBar = d));
    console.log("worky");
  };

  useEffect(() => {
    LoadAndProcess().then((d) => {
      setData(d);
    });
  }, []);

  return (
    <div className="App">
      {data ? (
        <BarChart
          svgWidth={960}
          svgHeight={500}
          // selectedRectBar={selectedBar}
          // onMouse={onMouseOver}
          props={data}
          x={100}
          y={100}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
