const Months = [  "January",  "February",  "March",  "April",  "May",  "June",  "July",  "August",  "September",  "October",  "November",  "December"];

const puppet = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

puppet.use(StealthPlugin());
puppet.use(AdblockerPlugin({ blockTrackers: true }));

const isNumber = (value) => {
  return !isNaN(parseInt(value));
}
const capital = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const fetchData = async (uri) => {
  const browser = await puppet.launch();

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  let data;

  page.on("response", async (response) => {
    data = await response.json();
  });

  await page.goto(uri, { waitUntil: "networkidle0" });

  await browser.close();

  return data;
};

const fetchYear = (uri,year,fullData) => { return new Promise( async (resolve,reject) =>{

    if (fullData.length > 0){
      const filtered = fullData.filter(d=>d.year === year);
      
      if (filtered.length > 0){
        return resolve({fullData: fullData, search: filtered});
      }
    }

    const data = await fetchData(uri);
    
    const newData = data.years.filter(d=>d.year === year);

    resolve({fullData:data.years, search: newData});

})}

const fetchMonth = (uri, year, month, fullData) => { return new Promise(async (resolve,reject)=>{
    let parsedMonth = '';

    if (isNumber(month)){
        parsedMonth = Months[month-1];
    }
    else{
        parsedMonth = capital(month);
    }
    if (fullData.length > 0){
      const filtered = fullData.filter(d=>d.year === year && d.month === parsedMonth);
  
      if (filtered.length > 0){
        return resolve({fullData: fullData, search: filtered});
      }
    }
    const data = await fetchData(uri);

    const newData = data.years.filter(d=>d.year === year && d.month === parsedMonth);

    resolve({fullData:data.months, search: newData});
})}



exports.fetchYear = fetchYear;
exports.fetchMonth = fetchMonth;
exports.fetchData = fetchData;