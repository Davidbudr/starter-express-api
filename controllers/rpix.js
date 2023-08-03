
const URL = 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/chmk/mm23/data';
const {fetchYear, fetchMonth} = require('../middleware/fetchdata');

exports.getRPIXbyYear = (req,res,next)=>{
    const { year} = req.params;
    fetchYear(URL, year)
    .then(data =>{
        return (data)?res.json({data: data}):res.json({status: 'error'});
    })
}


exports.getRPIXbyMonth = (req,res,next)=>{
    const { year, month} = req.params;
    fetchMonth(URL, year, month)
    .then(data =>{
        return (data)?res.json({data: data}):res.json({status: 'error'});
    })
}