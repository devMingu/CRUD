const express = require('express');
const app = express();
const engine = require('ejs-mate');
const PORT = 3000;


app.set('view engine', 'ejs');
app.engine('ejs', engine);


app.listen(PORT, ()=>{
    console.log(`LISTENING ON PORT ${PORT}`);
})