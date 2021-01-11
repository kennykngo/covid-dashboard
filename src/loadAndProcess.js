/* eslint-disable */
import * as d3 from "d3";
import statesName from "./states";

const formatDate = d3.timeFormat("%x, %X");
const formatDay = d3.timeFormat("%j");

const processData = (worldData, statesData) => {
  const dateParse = (d) => formatDate(new Date(d));
  // const dateParse = (d) => formatDate(new Date(d));

  // console.log(worldData);
  // console.log(new Date(dateParse(worldData[0].last_update)));

  const worldArr = [];
  worldData.forEach((data) => {
    const date = dateParse(data.last_update);
    const totalCases = data.total_cases;
    const totalDeaths = data.total_deaths;
    const totalRecovered = data.total_recovered;
    // const covidDate = data.last_update;

    let row = {
      date,
      totalCases,
      totalDeaths,
      totalRecovered,
      // covidDate,
    };

    worldArr.push(row);
  });

  // -------------------- statesArr section ----------------------
  const statesArr = [];
  statesData.forEach((data) => {
    statesName.forEach((state) => {
      const stateFullName = state[1] === data.state && state[0];
      const level = data.level;
      const cases = data.actuals.cases;
      const newCases = data.actuals.newCases;
      const deaths = data.actuals.deaths;

      let row = {
        level,
        stateFullName,
        cases,
        newCases,
        deaths,
      };
      row.stateFullName && statesArr.push(row);
    });
  });

  return { worldArr, statesArr };
};

const LoadAndProcess = async () => {
  return await Promise.all([
    d3.json("https://covid19-api.org/api/timeline"),
    d3.json(
      `https://api.covidactnow.org/v2/states.json?apiKey=50f2acf0397f4fa3b589ec44fb843786`
    ),
  ]).then(([props, propsTwo]) => {
    return processData(props, propsTwo);
  });
};
// async function LoadAndProcess() {
//   return await Promise.all([
//     d3.json("https://covid19-api.org/api/timeline"),
//     d3.json(
//       `https://api.covidactnow.org/v2/states.json?apiKey=50f2acf0397f4fa3b589ec44fb843786`
//     ),
//   ]).then(([props, propsTwo]) => {
//     return processData(props, propsTwo);
//   });
// }

export { formatDate, LoadAndProcess };
