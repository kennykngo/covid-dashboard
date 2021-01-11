import React from "react";
import { CasesModule } from "./";
import * as d3 from "d3";

export default function CasesRoot({ data }) {
  const { worldArr, usArr, statesArr } = data;

  console.log(worldArr);
  const globalDate = worldArr[0].covidDate;
  const globalCases = [];

  console.log(usArr);

  globalCases.push(worldArr[0], worldArr[1]);
  const usDate = usArr[0].date;
  const usCountry = usArr[0].country;
  const usCases = [];

  usCases.push(usArr[0], usArr[1]);

  return (
    <div className="d-inline">
      <CasesModule
        title={"Global COVID Cases"}
        date={globalDate}
        data={globalCases}
      />
      <CasesModule
        title={`${usCountry} COVID Cases`}
        date={usDate}
        data={usCases}
      />
    </div>
  );
}
