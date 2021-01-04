import React, { useEffect, useRef, useState } from "react";

import { BarChart } from "./components";
import { LoadAndProcess } from "./loadAndProcess";

function App() {
  const [data, setData] = useState();
  var [selectedBar, setSelectedBar] = useState();

  const onMouseOver = (d) => {
    return setSelectedBar((selectedBar = d));
    console.log("worky");
  };

  const margin = { top: 60, right: 80, bottom: 80, left: 150 };

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
