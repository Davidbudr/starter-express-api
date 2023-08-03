const fetch = require('isomorphic-fetch');

const Months = [  "January",  "February",  "March",  "April",  "May",  "June",  "July",  "August",  "September",  "October",  "November",  "December"];

const fetchYear = (uri, year) => { return new Promise( (resolve,reject) =>{

    fetch(uri)
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
        resolve(year_data)
    })

})}

const fetchMonth = (uri, year, month) => { return new Promise((resolve,reject)=>{
    fetch(uri)
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

        let parsedMonth;
        if (month){
            if (isNumber(month)){
                parsedMonth = Months[month-1];
            }
            else{
                parsedMonth = capital(month);
            }
            const year_data = data.filter(obj=>{
                if (obj.year == year && obj.month == parsedMonth){
                    return obj;
                }
            })
            resolve(year_data);
        }
        
    })
})}
function isNumber(value){
    return !isNaN(parseInt(value))
}
function capital (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

exports.fetchYear = fetchYear;
exports.fetchMonth = fetchMonth;