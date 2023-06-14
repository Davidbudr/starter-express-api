const express = require("express");
const app = express();
const fetch = require('isomorphic-fetch');

const URL = 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/chmk/mm23/data';

app.get('/rpix/:year', (req,res,next)=>{
    
    const { year} = req.params;
    fetch(URL)
    .then( response => {       
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(result =>{
        return result.years
    })
    .then( data => {
        const year_data = data.filter(obj=>{
            if (obj.year == year){
                return obj;
            }
        })
        res.json({data: year_data});
        
    })
    // return res.json({data: "success"});
})

app.get('/rpix/:year/:month', (req,res,next)=>{
    const { year, month} = req.params;
    fetch(URL)
    .then( response => {       
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(result =>{
        return result.months
    })
    .then( data => {
        const year_data = data.filter(obj=>{
            if (obj.year == year && obj.month == month){
                return obj;
            }
        })
        res.json({data: year_data});
        
    })
})

app.listen(3000, () =>{
    console.log("running on 3000");
})