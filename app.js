const express = require('express');
const app = express();
const engine = require('ejs-mate');
const path = require('path');
const PORT = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);

app.get(`/`, (req, res) => {
    res.render('home');
})


app.listen(PORT, ()=>{
    console.log(`LISTENING ON PORT ${PORT}`);
})