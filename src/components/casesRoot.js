import React from "react";
import { CasesModule } from "./";
import * as d3 from "d3";

export default function CasesRoot({ data }) {
  const { worldArr, statesArr } = data;

  console.log(worldArr);
  const globalDate = worldArr[0].date;

  return (
    <div>
      <CasesModule title={"Global COVID Cases"} date={globalDate} data={data} />
    </div>
  );
}
