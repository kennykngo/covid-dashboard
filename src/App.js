import { LoadAndProcess } from "./loadAndProcess";
import React, { useState, useEffect } from "react";
import { BarChart } from "./components";
import * as d3 from "d3";

import "./App.css";

function App() {
  const api_key = "50f2acf0397f4fa3b589ec44fb843786";

  const [data, setData] = useState();

  useEffect(() => {
    LoadAndProcess().then((d) => {
      setData(d);
    });
  }, []);

  return (
    <div className="App">
      {data ? <BarChart props={data} /> : <h1>Loading...</h1>}
    </div>
  );
}

export default App;

// useEffect(() => {
//   loaded = true;
//   LoadAndProcess().then(async (d) => {
//     (await loaded) && setData(d);
//   });
//   return () => (loaded = true);
// }, []);
