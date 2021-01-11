import React from "react";
import { CasesModule } from "./";

export default function CasesRoot({ data }) {
  const { worldArr, statesArr } = data;

  console.log(worldArr);

  return (
    <div>
      <CasesModule data={data} />
    </div>
  );
}
