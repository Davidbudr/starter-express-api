const express = require("express");
const app = express();

const rpixSource = require('./routes/rpix');
const rpiSource = require('./routes/rpi');

app.use('/rpix', rpixSource);
app.use('/rpi', rpiSource);

app.get('/', (req,res,next)=>{
    res.send(`<p>to use ukrpix please do the following: <br>
    use ukrpix.cyclic.app/(indexation)/(year)/ <br>
    or <br>
    ukrpix.cyclic.app/(indexation)/(year)/(month) <br>
    where (year) is replaced by the year i.e. 2018 <br>
    and (month) is replaced by the either the word or numbered month i.e. October or 10 <br>
    (indexation) is replace by rpi or rpix depending on which you need</p>

    <a href='https://ukrpix.cyclic.app/rpix/2018/10' target='_blank'>Example of usage</a>
    `)
})


app.listen(3000, () =>{
    console.log("running on 3000");
})