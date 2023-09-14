const fetch = require('isomorphic-fetch');
const clouds = require('cloudscraper');

const Months = [  "January",  "February",  "March",  "April",  "May",  "June",  "July",  "August",  "September",  "October",  "November",  "December"];

const fetchData = async (uri) =>{
  const response = await clouds.get(uri);
  const result = await JSON.parse(response);

  return result;
}

const fetchYear = (uri, year, dataset) => { return new Promise( async (resolve,reject) =>{

    const filteredDataset = dataset.filter(d => d.year === year);
    
    if (filteredDataset.length > 0) {
      return resolve({dataset: dataset, result: filteredDataset});
    }

    const newData = await fetchData(uri);
    const result = newData.years.filter(d => d.year === year);

    return resolve({dataset: newData.years, result: result});

})}

const fetchMonth = (uri, year, month, dataset) => { return new Promise( async (resolve,reject)=>{

  let parsedMonth;

  if (isNumber(month)){
      parsedMonth = Months[month-1];
  }
  else{
      parsedMonth = capital(month);
  }

  const filteredDataset = dataset.filter(d => d.year === year && d.month === parsedMonth);
    
  if (filteredDataset.length > 0) {
    return resolve({dataset: dataset, result: filteredDataset});
  }

  const newData = await fetchData(uri);
  const result = newData.months.filter(d => d.year === year && d.month === parsedMonth);

  return resolve({dataset: newData.months, result: result});

})}
function isNumber(value){
    return !isNaN(parseInt(value))
}
function capital (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

exports.fetchYear = fetchYear;
exports.fetchMonth = fetchMonth;
exports.fetchData = fetchData;