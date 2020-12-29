import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

// https://covid19-api.org/api/timeline
// timeline
let data;
// ("https://covid19-api.org/api/status");
d3.json("https://covid19-api.org/api/timeline").then((loadedData) => {
  data = loadedData;
  console.log(data);
});

export default function LoadAndProcess() {
  const svgRef = useRef();
  console.log(data);
}
