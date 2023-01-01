const express = require('express');
const app = express();
const engine = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const Campdata = require('./models/CampModel');
const methodoverride = require('method-override');
const PORT = 3000;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://wintermingu12:!Mrlaalsrn12@dbgotripuser.enhtf48.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.use(express.urlencoded({extended:true}));
app.use(methodoverride('_method'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/campground', async (req, res) => {
    const data = await Campdata.find({});
    res.render('campground/home', {data})
})
app.get('/campground/new', (req, res) => {
    res.render('campground/new');
})
app.get('/campground/:id', async (req, res) => {
    const {id} = req.params;
    const data = await Campdata.findById(id);
    res.render('campground/show', {data});
})
app.get('/campground/:id/edit', async (req, res) => {
    const {id} = req.params;
    const data = await Campdata.findById(id);
    res.render('campground/edit', {data});
})
app.post('/campground', async (req, res) => {
    const data = new Campdata(req.body.camp);
    await data.save();
    res.redirect(`/campground/${data._id}`);
})
app.put('/campground/:id', async (req, res) => {
    const {id} = req.params;
    const data = await Campdata.findByIdAndUpdate(id, req.body.camp);
    res.redirect(`/campground/${data._id}`);
})
app.delete('/campground/:id', async (req, res) => {
    const {id} = req.params;
    const data = await Campdata.findByIdAndDelete(id);
    res.redirect('/campground');
})




app.listen(PORT, ()=>{
    console.log(`LISTENING ON PORT ${PORT}`);
})