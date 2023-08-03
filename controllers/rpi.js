const URL = 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/chaw/mm23/data';
const {fetchYear, fetchMonth} = require('../middleware/fetchdata');

exports.getRPIbyYear = (req,res,next)=>{
    const { year} = req.params;
    fetchYear(URL, year)
    .then(data =>{
        return (data)?res.json({data: data}):res.json({status: 'error'});
    })
}


exports.getRPIbyMonth = (req,res,next)=>{
    const { year, month} = req.params;
    fetchMonth(URL, year, month)
    .then(data =>{
        return (data)?res.json({data: data}):res.json({status: 'error'});
    })
}