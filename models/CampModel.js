const mongoose = require('mongoose');

const CampSchema = new mongoose.Schema({
    location: String,
    title: String,
    price: Number,
    image: String,
    description: String,
});

const Campdata = mongoose.model('Campdata', CampSchema);

module.exports = Campdata;


