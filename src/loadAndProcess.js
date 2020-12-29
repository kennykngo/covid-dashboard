import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

export const LoadAndProcess = () =>
  // ("https://covid19-api.org/api/status");
  Promise.all([
    d3.json("https://covid19-api.org/api/timeline"),
    d3.json(
      `https://api.covidactnow.org/v2/states.json?apiKey=50f2acf0397f4fa3b589ec44fb843786`
    ),
  ]).then(([props, propsTwo]) => {
    // console.log(props);
    // console.log(propsTwo);
    const globalArr = [];

    const globalCases = props.map((d) => {
      // console.log(d);
    });

    const stateCases = propsTwo.reduce((acc, d) => {
      acc[d["state"]] = d;

      return acc;
    }, {});

    // console.log(stateCases);
    // return here
    return { stateCases, globalCases };
  });
// const globalCases = props.reduce((acc, d) => {
//   // return acc;
// }, {});
