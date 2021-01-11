import React from "react";
import { CasesModule } from "./";
import * as d3 from "d3";

export default function CasesRoot({ data }) {
  const { worldArr, statesArr } = data;

  console.log(worldArr);
  const date = worldArr[0].date;
  console.log(d3.time);

  return (
    <div>
      <CasesModule date={date} data={data} />
    </div>
  );
}
