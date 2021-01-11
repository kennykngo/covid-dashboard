import React from "react";
import { CasesModule } from "./";

export default function CasesRoot({ data }) {
  const { worldArr, statesArr } = data;

  console.log(worldArr);
  const date = worldArr[0].date;

  return (
    <div>
      <CasesModule date={date} data={data} />
    </div>
  );
}
