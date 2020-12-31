import { LoadAndProcess } from "./loadAndProcess";
import React, { useState, useEffect } from "react";
import { BarChart } from "./components";
import * as d3 from "d3";

import "./App.css";

function App() {
  const api_key = "50f2acf0397f4fa3b589ec44fb843786";

  const [data, setData] = useState([]);

  console.log(data);
  useEffect(() => {
    let loaded = true;
    LoadAndProcess().then((d) => {
      loaded && setData(d);
    });
    return () => (loaded = false);
  }, []);

  return (
    <div className="App">
      <BarChart props={data} />
    </div>
  );
}

export default App;
