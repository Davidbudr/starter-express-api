const URL = 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/chmk/mm23/data';
const {fetchYear, fetchMonth, fetchData} = require('../middleware/fetchdata');

let yearData = [];
let monthData = [];

const Initialize = async () =>{
    const _data = await fetchData(URL);
    
    yearData = _data.years;
    monthData = _data.months;
}

Initialize();

exports.getRPIXbyYear = (req,res,next)=>{
    const { year} = req.params;

    fetchYear(URL, year, yearData)
    .then(data =>{        
        yearData = data.fullData;

        return (data.search.length > 0)?res.json({data: data.search}):res.json({data:[{date: year, label:year, year: year, value: NaN, sourceDataset: NaN}]});
    })
}


exports.getRPIXbyMonth = (req,res,next)=>{
    const { year, month} = req.params;

    fetchMonth(URL,year,month, monthData)
    .then(data =>{
        monthData = data.fullData;

        return (data.search.length > 0)?res.json({data: data.search}):res.json({data:[{date: `${year} ${month}` , label:year,year, month, value: NaN, sourceDataset: NaN}]});
    })
}