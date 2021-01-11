import React from "react";
import { CasesModule } from "./";
import * as d3 from "d3";

export default function CasesRoot({ data }) {
  const { worldArr, statesArr } = data;

  console.log(worldArr);
  const globalDate = worldArr[0].covidDate;
  const globalCases = [];

  globalCases.push(worldArr[0], worldArr[1]);

  return (
    <div className="d-inline">
      <CasesModule
        title={"Global COVID Cases"}
        date={globalDate}
        data={globalCases}
      />
      <CasesModule
        title={"Global COVID Cases"}
        date={globalDate}
        data={globalCases}
      />
    </div>
  );
}
