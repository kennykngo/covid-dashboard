import { LoadAndProcess } from "./loadAndProcess";
import React, { useState, useEffect } from "react";
import { BarChart } from "./components";
import * as d3 from "d3";

import "./App.css";

function App() {
  const api_key = "50f2acf0397f4fa3b589ec44fb843786";

  const [data, setData] = useState(
    Promise.all([
      d3.json("https://covid19-api.org/api/timeline"),
      d3.json(
        `https://api.covidactnow.org/v2/states.json?apiKey=50f2acf0397f4fa3b589ec44fb843786`
      ),
    ]).then(([props, propsTwo]) => {
      console.log(props);
      // console.log(propsTwo);

      const stateCases = propsTwo.reduce((acc, d) => {
        acc[d["state"]] = d;
        // console.log(d.actuals.cases);
        return acc;
      }, {});

      console.log(stateCases);
      // return here
      return { stateCases };
    })
  );

  console.log(data);
  return (
    <div className="App">
      <BarChart data={data} />
    </div>
  );
}

export default App;

// let promiseData;

// LoadAndProcess().then((loadedData) => {
//   // promiseData = loadedData;
//   promiseData = loadedData.stateCases;
//   setData();
// });

// console.log(promiseData);
