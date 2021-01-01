import { LoadAndProcess } from "./loadAndProcess";
import React, { useState, useEffect, useRef } from "react";
import { BarChart } from "./components";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const svgRef = useRef();

  useEffect(() => {
    LoadAndProcess().then((d) => {
      setData(d);
    });
  }, []);

  return (
    <div className="App">
      {data ? (
        <BarChart ref={svgRef} props={data} x={0} y={0} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
