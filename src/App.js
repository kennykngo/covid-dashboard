import React, { useEffect, useRef, useState } from "react";

import { BarChart } from "./components";
import { LoadAndProcess } from "./loadAndProcess";

import "./App.css";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    LoadAndProcess().then((d) => {
      setData(d);
    });
  }, []);

  return (
    <div className="App">
      {data ? <BarChart props={data} x={100} y={100} /> : <h1>Loading...</h1>}
    </div>
  );
}

export default App;
