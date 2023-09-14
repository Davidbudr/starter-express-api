const URL = 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/chaw/mm23/data';
const { fetchYear, fetchMonth, fetchData } = require("../middleware/fetchdata");


let monthData = [];
let yearData = [];

Initialize();

async function Initialize() {
    const data = await fetchData(URL);

    monthData = data.months;
    yearData = data.years;
}


exports.getRPIbyYear = (req, res, next) => {
  const { year } = req.params;
  fetchYear(URL, year, yearData).then((data) => {
    yearData = data.dataset;

    return data.result.length > 0
      ? res.json({ data: data.result })
      : res.json({ status: "data not found", data: [{
        date: year,
        value: NaN,
        year: year,
        month: NaN,
        sourceDataset: NaN,
      }] });
  });
};

exports.getRPIbyMonth = (req, res, next) => {
  const { year, month } = req.params;
  fetchMonth(URL, year, month, monthData).then((data) => {
    monthData = data.dataset;

    return data.result.length > 0
      ? res.json({ data: data.result })
      : res.json({ status: "data not found", data: [{
        date: `${year} ${month}`,
        value: NaN,
        year: year,
        month: month,
        sourceDataset: NaN,
      }] });
  });
};
