import React, { useState, useEffect } from "react";
import { BarChart } from "./components";
import * as d3 from "d3";

import LoadAndProcess from "./loadAndProcess.js";

import "./App.css";

function App() {
  // useEffect(() => {
  //   Promise.all([
  //     d3.json("https://covid19-api.org/api/timeline"),
  //   ]).then(([data]) => console.log(data));
  // }, []);

  const api_key = "50f2acf0397f4fa3b589ec44fb843786";

  const [data, setData] = useState(
    Promise.all([
      d3.json("https://covid19-api.org/api/timeline"),
      d3.json(
        `https://api.covidactnow.org/v2/states.json?apiKey=50f2acf0397f4fa3b589ec44fb843786`
      ),
      d3.json(
        `https://api.covidactnow.org/v2/state/CA.json?apiKey=50f2acf0397f4fa3b589ec44fb843786`
      ),
    ]).then(([props, propsTwo, propsThree]) => {
      // console.log(json);
      // console.log(csv);
      console.log(props);
      console.log(propsTwo);
      console.log(propsThree);
    })
  );
  return (
    <div className="App">
      <BarChart data={data} />
    </div>
  );
}

export default App;
