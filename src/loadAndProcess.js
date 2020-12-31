import * as d3 from "d3";

export const formatDate = d3.timeFormat("%x");
export const formatDay = d3.timeFormat("%j");

const processData = (worldData, statesData) => {
  console.log(formatDate(new Date(worldData[0].last_update)));

  const dateParse = (d) => formatDate(new Date(d));

  const worldArr = [];
  worldData.forEach((data) => {
    const date = dateParse(data.last_update);
    const totalCases = data.total_cases;
    const totalDeaths = data.total_deaths;

    let row = {
      date,
      totalCases,
      totalDeaths,
    };

    worldArr.push(row);
  });
  console.log(worldArr);

  const stateCases = statesData.reduce((acc, d) => {
    acc[d["state"]] = d;

    return acc;
  }, {});

  return { stateCases, worldArr };
};

export const LoadAndProcess = () =>
  // ("https://covid19-api.org/api/status");
  Promise.all([
    d3.json("https://covid19-api.org/api/timeline"),
    d3.json(
      `https://api.covidactnow.org/v2/states.json?apiKey=50f2acf0397f4fa3b589ec44fb843786`
    ),
  ]).then(([props, propsTwo]) => {
    console.log(props);
    // console.log(propsTwo)

    return processData(props, propsTwo);
  });